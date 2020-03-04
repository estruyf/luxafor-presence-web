import React, { Component } from "react";
import {
  msalApp,
  requiresInteraction,
  fetchMsGraph,
  isIE,
  GRAPH_ENDPOINTS,
  GRAPH_REQUESTS
} from "../../constants";
import { Presence } from "../../models";
import { AuthProviderProps, AuthProviderState } from '.';

// If you support IE, our recommendation is that you sign-in using Redirect APIs
const useRedirectFlow = isIE();
// const useRedirectFlow = true;

export default (C: any) => class AuthProvider extends Component<AuthProviderProps, AuthProviderState> {
  private authCalled: boolean = false;
  
  constructor(props: AuthProviderProps) {
    super(props);
    
    this.state = {
      account: null,
      error: null,
      presence: null
    };
  }

  /**
   * componentDidMount lifecycle hook
   */
  public async componentDidMount() {
    msalApp.handleRedirectCallback((error: any) => {
      if (error) {
        const errorMessage = error.errorMessage ? error.errorMessage : "Unable to acquire access token.";
        // setState works as long as navigateToLoginRequestUrl: false
        this.setState({
          error: errorMessage
        });
      }
    });
    
    const account = msalApp.getAccount();
    
    this.setState({
      account
    });
  }
  
  /**
   * Acquire token
   * 
   * @param request 
   * @param redirect 
   */
  public async acquireToken(request: any, redirect?: boolean) {
    try {
      return await msalApp.acquireTokenSilent(request);
    } catch (error) {
      // Call acquireTokenPopup (popup window) in case of acquireTokenSilent failure
      // due to consent or interaction required ONLY
      if (requiresInteraction(error.errorCode)) {
        return redirect ? msalApp.acquireTokenRedirect(request) : msalApp.acquireTokenPopup(request);
      } else {
        console.error('Non-interactive error:', error.errorCode)
      }
    }
  }
  
  /**
   * Sign in the user
   * 
   * @param redirect 
   */
  public async onSignIn(redirect: boolean) {
    if (this.authCalled) {
      return;
    }

    this.authCalled = true;

    if (redirect) {
      return msalApp.loginRedirect(GRAPH_REQUESTS.PRESENCE);
    }
    
    const loginResponse = await msalApp.loginPopup(GRAPH_REQUESTS.PRESENCE).catch(error => {
      this.setState({
        error: error.message
      });
    });

    if (loginResponse) {
      this.setState({
        account: loginResponse.account,
        error: null
      });
    }
  }
     
  /**
   * Sign out the user
   */
  public onSignOut() {
    msalApp.logout();
  }

  

  public getAccessToken(): string {
    return "";
  }
      
  /**
   * Render the authentication component as a wrapper for the APP
   */
  render() {
    return (
      <C {...this.props}
         account={this.state.account}
         error={this.state.error}
         presence={this.state.presence}
         onSignIn={() => this.onSignIn(useRedirectFlow)}
         onSignOut={() => this.onSignOut()}
         acquireToken={this.acquireToken} />
    );
  }
};