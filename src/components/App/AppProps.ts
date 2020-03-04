import { AuthProviderState } from "../Authenticator";

export interface AppProps extends AuthProviderState {
  onSignIn: () => void;
  onSignOut: () => void;
  refreshUpdate: (nrOfMinutes: string) => void;
  getAccessToken: () => string;
  acquireToken: (request: any, redirect?: boolean) => Promise<any>;
}