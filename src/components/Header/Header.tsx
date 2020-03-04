import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Settings from '@material-ui/icons/Settings';
import Grid from '@material-ui/core/Grid';
import { Account } from "msal";
import './Header.css';
import { PresenceContext } from '../../services/PresenceContext';
import { AppState } from '../App';
import { TimeType } from '../../models';

export interface HeaderProps {
  account: Account | null;

  onSignIn: () => void;
  onSignOut: () => void;
  updateRefresh: (refreshNr: number) => void;
  updateDeviceId: (deviceId: string) => void;
  updateTime: (name: TimeType, time: string) => void;
}

export interface HeaderState {
  deviceId: string;
}

class Header extends React.Component<HeaderProps, HeaderState> {
  
  constructor(props: HeaderProps) {
    super(props);
  }

  private deviceChange = (newIdInput: React.ChangeEvent<HTMLInputElement>) => {
    if (newIdInput && newIdInput.target && newIdInput.target.value) {
      this.props.updateDeviceId(newIdInput.target.value);
    }
  };

  private refreshChange = (newIdInput: React.ChangeEvent<HTMLInputElement>) => {
    if (newIdInput && newIdInput.target && newIdInput.target.value) {
      this.props.updateRefresh(parseInt(newIdInput.target.value));
    }
  };

  public render(): React.ReactElement<HeaderProps> {
    const { account, onSignIn, onSignOut, updateTime } = this.props;
    const { deviceId, refreshNr, startTime, endTime } = this.context as AppState;

    return (
      <header className="app__header">
        {
        !account ? (
          <Button onClick={onSignIn} variant="outlined" color="primary">Sign In</Button>
        ) : (
          <Container fixed>
            <Grid container style={{flexGrow:1}} spacing={1}>
              <Grid item xs={12}>
                <Button onClick={onSignOut} variant="outlined" color="secondary">Sign Out: {account.userName}</Button>
              </Grid>
              <Grid item xs={3}>
                <TextField label="Device ID" 
                           variant="filled" 
                           required
                           value={deviceId}
                           onChange={this.deviceChange} />
              </Grid>
              <Grid item xs={3}>
                <TextField label="Refresh time (minutes)" 
                           variant="filled"
                           value={refreshNr ? refreshNr : ""}
                           type="number"
                           inputProps={{ min: "1", max: "10", step: "1" }}
                           onChange={this.refreshChange} />
              </Grid>
              <Grid item xs={3}>
                <TextField label="Start time" 
                           variant="filled"
                           value={startTime}
                           inputProps={{
                            pattern: "([01]?[0-9]|2[0-3]):[0-5][0-9]"
                           }}
                           onChange={e => updateTime(TimeType.StartTime, e.target.value)} />
              </Grid>
              <Grid item xs={3}>
                <TextField label="End time" 
                           variant="filled"
                           value={endTime}
                           inputProps={{
                            pattern: "([01]?[0-9]|2[0-3]):[0-5][0-9]"
                           }}
                           onChange={e => updateTime(TimeType.EndTime, e.target.value)} />
              </Grid>
            </Grid>
          </Container>
        )}
      </header>
    );
  }
}

Header.contextType = PresenceContext;

export default Header;