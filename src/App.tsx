import React, { useState } from 'react';
import './App.css';
import AuthProvider, { AuthProviderState } from "./services/AuthProvider";
import Luxafor, { DEFAULT_COLOR } from "./services/Luxafor";

// TODO: Specify the ID of the Luxafor device

interface AppProps extends AuthProviderState {
  onSignIn: () => void;
  onSignOut: () => void;
  refreshUpdate: (nrOfMinutes: string) => void;
}

const App = (props: AppProps) => {
  // const [authCalled, setAuthCalled] = useState(false);
  const [color, setColor] = useState(DEFAULT_COLOR);
  const [presence, setPresence] = useState("");
  const [deviceId, setDeviceId] = useState(Luxafor.getDeviceId());
  const [nrOfMinutes, setMinutes] = useState("2");

  if (!props.account) {
    // props.onSignIn();
  }

  const deviceChange = (newIdInput: React.ChangeEvent<HTMLInputElement>) => {
    if (newIdInput && newIdInput.target && newIdInput.target.value) {
      Luxafor.setDeviceId(newIdInput.target.value);
      setDeviceId(newIdInput.target.value);
    }
  };

  if (deviceId && props.presence && presence !== props.presence) {
    Luxafor.setColor(deviceId, props.presence as string).then(color => {
      setColor(color);
      setPresence(props.presence as string);
    });
  }

  return (
    <div className="App">
      <section className="App-login">
        {!props.account ? (
          <button onClick={props.onSignIn}>Sign In</button>
        ) : (
          <button onClick={props.onSignOut}>Sign Out</button>
        )}

        <input value={deviceId} placeholder="Device ID" onChange={deviceChange} />
        <input value={nrOfMinutes} placeholder="Refresh rate in minutes" type="number" onChange={e => {
          props.refreshUpdate(e.target.value);
          setMinutes(e.target.value);
        }} />
      </section>

      <header className="App-header" style={{
        backgroundColor: `#${color}`
      }} >
        <h1>Luxafor - Presence</h1>
        { props.presence && <h2>{props.presence}</h2> }
      </header>
    </div>
  );
};

export default AuthProvider(App);
