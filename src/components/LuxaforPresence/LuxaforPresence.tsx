import React from 'react';
import { Account } from "msal";
import './LuxaforPresence.css';
import { PresenceContext } from '../../services/PresenceContext';
import { Availability } from '../../models';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { Button } from '@material-ui/core';

export interface LuxafoPresenceProps {
  overwritePresense: (presense: string | null)  => void;
}

export const LuxaforPresence = (props: LuxafoPresenceProps) => {

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    props.overwritePresense(event.target.value as string);
  };
  
  return (
    <PresenceContext.Consumer>
      {
        info => {
          let color = `#282c34`;
          switch (info.overwrittenPresence || info.presence) {
            case Availability.Available:
            case Availability.AvailableIdle:
              color = `#58BC82`;
              break;
            case Availability.Busy:
            case Availability.BusyIdle:
            case Availability.DoNotDisturb:
              color = `#6F1A07`;
              break;
            case Availability.Away:
            case Availability.BeRightBack:
              color = `#F6AE2D`;
              break;
            default: 
              color = `#282c34`;
              break;
          }

          return (
            <main className="app__main" style={{
              backgroundColor: `${color}`
            }}>
              <h1>Luxafor - Presence</h1>
              {
                (info.overwrittenPresence || info.presence) && (
                  <>
                    <Select className="app__main_select" value={info.overwrittenPresence || info.presence} onChange={handleChange} title="Manually select a presence status">
                      {
                        Object.keys(Availability).map(key => (
                          <MenuItem value={key}>{key}</MenuItem>
                        ))
                      }
                    </Select>

                    {
                      info.overwrittenPresence && <Button className="app__main__reset" variant="outlined" color="secondary" title="Reset the presence status. This will restart the automatic refresh." onClick={() => props.overwritePresense(null)}>Reset presence</Button>
                    }
                  </>
                )
              }
            </main>
          );
        }
      }
    </PresenceContext.Consumer>
  );
};