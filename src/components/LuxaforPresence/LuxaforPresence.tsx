import React from 'react';
import { Account } from "msal";
import './LuxaforPresence.css';
import { PresenceContext } from '../../services/PresenceContext';

export const LuxaforPresence = () => {
  
  return (
    <PresenceContext.Consumer>
      {
        info => (
          <main className="app__main" style={{
            backgroundColor: info.color === "000000" ? "282c34" : info.color
          }}>
            <h1>Luxafor - Presence</h1>
            {
              info.presence && <h2>{info.presence}</h2>
            }
          </main>
        )
      }
    </PresenceContext.Consumer>
  );
};