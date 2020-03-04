import { Account } from "msal";

export interface AuthProviderState {
  account: Account | null;
  error: string | null;
  presence: string | null;
}