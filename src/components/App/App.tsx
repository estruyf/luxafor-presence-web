import React from 'react';
import './App.css';
import AuthProvider from '../Authenticator/AuthProvider';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Header from '../Header/Header';
import { Footer } from '../Footer';
import { AppProps, AppState } from '.';
import { Luxafor, KEY_REFRESH_NR, KEY_DEVICE_ID } from '../../services';
import { LuxaforPresence } from '../LuxaforPresence';
import { defaultContextValues, PresenceContext } from '../../services/PresenceContext';
import { TimeType, Presence, Availability } from '../../models';
import { GRAPH_REQUESTS, fetchMsGraph, GRAPH_ENDPOINTS } from '../../constants';
import { splitHours } from '../../helpers/TimeHelpers';

/**
 * TODO:
 * - Manual or automated work
 */
const theme = createMuiTheme({
  palette: {
    type: 'dark'
  },
  overrides: {
    MuiSelect: {
      select: {
        fontSize: "calc(10px + 2vmin)"
      }
    }
  }
});

class App extends React.Component<AppProps, AppState> {
  private refreshTimer: any;
  
  constructor(props: AppProps) {
    super(props);

    this.state = {
      ...defaultContextValues
    };
  }

  componentDidMount() {
    if (this.props.account && this.state.deviceId && this.state.refreshNr) {
      this.startDataFetching();
    }
  }

  componentDidUpdate(prevProps: AppProps, prevState: AppState) {
    if (prevState.refreshNr !== this.state.refreshNr ||
        prevState.startTime !== this.state.startTime ||
        prevState.endTime !== this.state.endTime) {
      this.startDataFetching();
    }

    if (prevProps.account !== this.props.account && this.props.account) {
      this.startDataFetching();
    }

    if (!this.props.account) {
      this.stopPresenceCheck();
    }
  }

  private updateDeviceId = (deviceId: string): void => {
    this.setState((prevState: AppState) => {
      const cloned = {...prevState};
      cloned.deviceId = deviceId;
      Luxafor.setDeviceSetting(KEY_DEVICE_ID, deviceId);
      return {
        ...prevState,
        deviceId
      };
    });
  };

  private updateRefresh = (refreshNr: number): void => {
    this.setState((prevState: AppState) => {
      Luxafor.setDeviceSetting(KEY_REFRESH_NR, refreshNr);
      return {
        ...prevState,
        refreshNr
      };
    });
  };

  private updateTime = (name: TimeType, time: string) => {
    if (name && time) {
      Luxafor.setDeviceSetting(TimeType[name], time);
      if (name === TimeType.StartTime) {
        this.setState({
          startTime: time
        });
      } else {
        this.setState({
          endTime: time
        });
      }
    }
  };

  /**
   * Start fetching the data
   */
  private startDataFetching() {
    const { deviceId, startTime, endTime, refreshNr } = this.state;

    const startTimeSplit = splitHours(startTime);
    const endTimeSplit = splitHours(endTime);
    const crntDate = new Date();
    let statusMsg: string | null = null;
    let statusColor: string | null = null;

    if (startTimeSplit && (crntDate.getHours() < startTimeSplit.hour || crntDate.getHours() === startTimeSplit.hour && crntDate.getMinutes() < startTimeSplit.minutes)) {
      statusMsg = Availability.Offline;
      statusColor = "000000";
    }

    if (endTimeSplit && (crntDate.getHours() > endTimeSplit.hour || crntDate.getHours() === endTimeSplit.hour && crntDate.getMinutes() > endTimeSplit.minutes)) {
      statusMsg = Availability.Offline;
      statusColor = "000000";
    }

    let doCheck = true;
    if (statusMsg) {
      // Only update if needed
      if (statusMsg !== this.state.presence) {
        Luxafor.setColor(deviceId, Availability.Offline);
        this.setState({
          presence: statusMsg as string,
          color: statusColor as string
        });
      }
      doCheck = false;
    }

    if (doCheck) {
      this.startPresenceCheck();
    }

    if (refreshNr) {
      this.refreshTimer = setTimeout(() => {
        this.startDataFetching();
      }, refreshNr * 60 * 1000);
    }
  }

  /**
   * Start checking the user its presence
   */
  private startPresenceCheck = async () => {
    const { acquireToken } = this.props;

    try {
      let token;

      try {
        token = await acquireToken(GRAPH_REQUESTS.PRESENCE);
      } catch (error) {
        this.setState({
          error: error.message
        });
        return;
      }

      if (token) {
        const presence: Presence = await fetchMsGraph(GRAPH_ENDPOINTS.PRESENCE, token.accessToken);
        if (presence && presence.availability) {
          const color = await Luxafor.setColor(this.state.deviceId, presence.availability);
          this.setState({
            presence: presence.availability,
            color
          });
        }
      }
    } catch (error) {
      this.setState({
        error: "Unable to fetch Graph profile."
      });
    }
  }

  private stopPresenceCheck() {
    if (this.refreshTimer) {
      clearTimeout(this.refreshTimer);
      this.refreshTimer = null;
    }
  }

  private overwritePresense = async (presence: string | null = null): Promise<void> => {
    if (presence) {
      debugger;
      this.stopPresenceCheck();
      const color = await Luxafor.setColor(this.state.deviceId, presence as string);
      this.setState({
        color
      });
    } else {
      this.startDataFetching();
    }

    this.setState({
      overwrittenPresence: presence
    });
  }

  public render(): React.ReactElement<AppProps> {
    return (
      <PresenceContext.Provider value={{
        ...this.state,
        error: ""
      }}>
        <ThemeProvider theme={theme}>
          <div className="app">
            <Header account={this.props.account}
                    onSignIn={this.props.onSignIn} 
                    onSignOut={this.props.onSignOut}
                    updateRefresh={this.updateRefresh}
                    updateDeviceId={this.updateDeviceId}
                    updateTime={this.updateTime} />
  
            <LuxaforPresence overwritePresense={this.overwritePresense} />

            {
              this.state.error && <p className="app__error">{this.state.error}</p>
            }
  
            <Footer />
          </div>
        </ThemeProvider>
      </PresenceContext.Provider>
    );
  }
}

export const AppWithAuth = AuthProvider(App);