import React from 'react';
import { Account } from "msal";
import './LuxaforPresence.css';
import { PresenceContext } from '../../services/PresenceContext';
import { Availability } from '../../models';

export const LuxaforPresence = () => {

  
  
  return (
    <PresenceContext.Consumer>
      {
        info => {
          let color = `#282c34`;
          switch (info.presence) {
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
                info.presence && <h2>{info.presence}</h2>
              }
            </main>
          );
        }
      }
    </PresenceContext.Consumer>
  );
};