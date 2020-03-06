import React, { useState } from 'react';
import { Luxafor, KEY_DEVICE_ID, KEY_REFRESH_NR, KEY_START_TIME, KEY_END_TIME, DEFAULT_COLOR } from ".";
import { AppState } from "../components/App";

export const defaultContextValues = {
  deviceId: Luxafor.getDeviceSetting<string>(KEY_DEVICE_ID),
  refreshNr: Luxafor.getDeviceSetting<number>(KEY_REFRESH_NR) as number || 2,
  startTime: Luxafor.getDeviceSetting<string>(KEY_START_TIME),
  endTime: Luxafor.getDeviceSetting<string>(KEY_END_TIME),
  presence: "",
  overwrittenPresence: null,
  color: DEFAULT_COLOR
} as AppState;

export const PresenceContext = React.createContext(defaultContextValues);