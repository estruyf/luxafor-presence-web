import { UserAgentApplication, Configuration } from "msal";

export const requiresInteraction = (errorMessage: any) => {
  if (!errorMessage || !errorMessage.length) {
    return false;
  }
  
  return (
    errorMessage.indexOf("consent_required") > -1 ||
    errorMessage.indexOf("interaction_required") > -1 ||
    errorMessage.indexOf("login_required") > -1
  );
};
  
export const fetchMsGraph = async (url: string, accessToken: string) => {
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
  
  return response.json();
};
  
export const isIE = (): boolean => {
  const ua = window.navigator.userAgent;
  const msie = ua.indexOf("MSIE ") > -1;
  const msie11 = ua.indexOf("Trident/") > -1;
  
  // If you as a developer are testing using Edge InPrivate mode, please add "isEdge" to the if check
  // const isEdge = ua.indexOf("Edge/") > -1;
  
  return msie || msie11;
};
  
export const GRAPH_SCOPES = {
  OPENID: "openid",
  PROFILE: "profile",
  USER_READ: "User.Read",
  PRESENCE_READ: "Presence.Read"
};
  
export const GRAPH_ENDPOINTS = {
  ME: "https://graph.microsoft.com/v1.0/me",
  PRESENCE: "https://graph.microsoft.com/beta/me/presence"
};
  
export const GRAPH_REQUESTS = {
  LOGIN: {
    scopes: [
      GRAPH_SCOPES.OPENID,
      GRAPH_SCOPES.PROFILE,
      GRAPH_SCOPES.USER_READ
    ]
  },
  PRESENCE: {
    scopes: [GRAPH_SCOPES.PRESENCE_READ]
  }
};
  
export const msalApp = new UserAgentApplication({
  auth: {
    clientId: "66204339-daf1-40fa-aa31-57342272edce",
    authority: "https://login.microsoftonline.com/1a8ddc4e-a051-46a5-b1a2-0438a5f7f8c4",
    validateAuthority: true,
    postLogoutRedirectUri: "http://localhost:3000",
    navigateToLoginRequestUrl: false
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: isIE()
  },
  system: {
    navigateFrameWait: 0,
    logger: {
      error: console.error,
      errorPii: console.error,
      info: console.log,
      infoPii: console.log,
      verbose: console.log,
      verbosePii: console.log,
      warning: console.warn,
      warningPii: console.warn
    }
  }
} as Configuration);