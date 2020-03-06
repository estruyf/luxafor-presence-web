export interface AppState {
  deviceId: string;
  refreshNr: number;
  startTime: string;
  endTime: string;
  presence: string;
  overwrittenPresence: string | null;
  color: string;
  error: string;
}