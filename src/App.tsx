import React, { useState } from 'react';
import './App.css';
import AuthProvider, { AuthProviderState } from "./services/AuthProvider";
import Luxafor, { DEFAULT_COLOR } from "./services/Luxafor";
import { Availability, Presence } from './models';

// TODO: Specify the ID of the Luxafor device

interface AppProps extends AuthProviderState {
  onSignIn: () => void;
  onSignOut: () => void;
  refreshUpdate: (nrOfMinutes: string) => void;
}

const splitHours = (time: string): { hour: number, minutes: number} | null => {
  if (time && time.includes(":")) {
    const daySplit = time.split(":");
    return {
      hour: parseInt(daySplit[0]),
      minutes: parseInt(daySplit[1])
    }
  }

  return null;
}

const setDeviceColor = (deviceId: string, presence: string, setColor:(color: string) => void, setPresence:(presence: string) => void) => {
  Luxafor.setColor(deviceId, presence as string).then(color => {
    setColor(color);
    setPresence(presence);
  });
}

const App = (props: AppProps) => {
  // const [authCalled, setAuthCalled] = useState(false);
  const [color, setColor] = useState(DEFAULT_COLOR);
  const [presence, setPresence] = useState("");
  const [deviceId, setDeviceId] = useState(Luxafor.getDeviceSetting("Device:ID"));
  const [nrOfMinutes, setMinutes] = useState("2");
  const [startDay, setStartDay] = useState(Luxafor.getDeviceSetting("StartTime"));
  const [endDay, setEndDay] = useState(Luxafor.getDeviceSetting("EndTime"));

  if (!props.account) {
    // props.onSignIn();
  }

  const deviceChange = (newIdInput: React.ChangeEvent<HTMLInputElement>) => {
    if (newIdInput && newIdInput.target && newIdInput.target.value) {
      Luxafor.setDeviceSetting("Device:ID", newIdInput.target.value);
      setDeviceId(newIdInput.target.value);
    }
  };

  const startTime = splitHours(startDay);
  const endTime = splitHours(endDay);
  const crntDate = new Date();
  let statusMsg: string | null = null;
  let statusColor: string | null = null;

  if (startTime && (crntDate.getHours() < startTime.hour || crntDate.getHours() === startTime.hour && crntDate.getMinutes() < startTime.minutes)) {
    statusMsg = Availability.Offline;
    statusColor = "000000";
  }

  if (endTime && (crntDate.getHours() > endTime.hour || crntDate.getHours() === endTime.hour && crntDate.getMinutes() > endTime.minutes)) {
    statusMsg = Availability.Offline;
    statusColor = "000000";
  }

  if (deviceId && props.presence && presence !== props.presence && !statusMsg) {
    setDeviceColor(deviceId, props.presence as string, setColor, setPresence);
  } else if (statusMsg && presence !== Availability.Offline) {
    setDeviceColor(deviceId, Availability.Offline, setColor, setPresence);
  }

  const timeChange = (name: string, time: string) => {
    if (name && time) {
      Luxafor.setDeviceSetting(name, time);
      if (name === "StartTime") {
        setStartDay(time);
      } else {
        setEndDay(time);
      }
    }
  };

  return (
    <div className="App">
      <section className="App-login">
        {!props.account ? (
          <button onClick={props.onSignIn}>Sign In</button>
        ) : (
        <button onClick={props.onSignOut}>Sign Out: {props.account.userName}</button>
        )}

        <input className="input__device-id" value={deviceId} placeholder="Device ID" onChange={deviceChange} />
        <input className="input__refresh" value={nrOfMinutes} placeholder="Refresh rate in minutes" type="number" onChange={e => {
          props.refreshUpdate(e.target.value);
          setMinutes(e.target.value);
        }} />

        <input className="input__start" value={startDay} placeholder="Start day" pattern="([01]?[0-9]|2[0-3]):[0-5][0-9]" onChange={e => timeChange("StartTime", e.target.value)} />
        <input className="input__end" value={endDay} placeholder="End day" pattern="([01]?[0-9]|2[0-3]):[0-5][0-9]" onChange={e => timeChange("EndTime", e.target.value)} />
      </section>

      <header className="App-header" style={{
        backgroundColor: `#${statusColor || color}`
      }} >
        <h1>Luxafor - Presence</h1>
        {
          statusMsg ? (
            <h2>{statusMsg}</h2>
          ) : (
            props.presence && <h2>{props.presence}</h2>
          )
        }
      </header>
    </div>
  );
};

export default AuthProvider(App);
