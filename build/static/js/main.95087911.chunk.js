(this["webpackJsonpluxafor-presence-web"]=this["webpackJsonpluxafor-presence-web"]||[]).push([[0],[,,function(e,t,r){"use strict";var n=r(8);r.d(t,"Availability",(function(){return n.a}));r(9)},,,,,,function(e,t,r){"use strict";var n;r.d(t,"a",(function(){return n})),function(e){e.Available="Available",e.AvailableIdle="AvailableIdle",e.Away="Away",e.BeRightBack="BeRightBack",e.Busy="Busy",e.BusyIdle="BusyIdle",e.DoNotDisturb="DoNotDisturb",e.Offline="Offline",e.PresenceUnknown="PresenceUnknown"}(n||(n={}))},function(e,t){},,,,,,function(e,t,r){e.exports=r(23)},,,,,function(e,t,r){},function(e,t,r){},,function(e,t,r){"use strict";r.r(t);var n,a=r(0),i=r.n(a),c=r(10),o=r.n(c),u=(r(20),r(4)),s=(r(21),r(1)),l=r.n(s),f=r(3),p=r(5),h=r(6),v=r(13),b=r(11),g=r(14),d=r(12),m=function(){var e=Object(f.a)(l.a.mark((function e(t,r){var n;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch(t,{headers:{Authorization:"Bearer ".concat(r)}});case 2:return n=e.sent,e.abrupt("return",n.json());case 4:case"end":return e.stop()}}),e)})));return function(t,r){return e.apply(this,arguments)}}(),y=function(){var e=window.navigator.userAgent,t=e.indexOf("MSIE ")>-1,r=e.indexOf("Trident/")>-1;return t||r},k="https://graph.microsoft.com/beta/me/presence",S={LOGIN:{scopes:["openid","profile","User.Read"]},PRESENCE:{scopes:["Presence.Read"]}},O=new d.a({auth:{clientId:"66204339-daf1-40fa-aa31-57342272edce",authority:"https://login.microsoftonline.com/common",validateAuthority:!0,postLogoutRedirectUri:"https://luxafor-presence.azurewebsites.net",navigateToLoginRequestUrl:!1},cache:{cacheLocation:"sessionStorage",storeAuthStateInCookie:y()},system:{navigateFrameWait:0,logger:{error:console.error,errorPii:console.error,info:console.log,infoPii:console.log,verbose:console.log,verbosePii:console.log,warning:console.warn,warningPii:console.warn}}}),w=y(),x=r(2),E=function(){function e(){Object(p.a)(this,e)}return Object(h.a)(e,null,[{key:"setColor",value:function(){var e=Object(f.a)(l.a.mark((function e(t,r){var n,a,i;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n="000000",t&&r){e.next=3;break}return e.abrupt("return",n);case 3:e.t0=r,e.next=e.t0===x.Availability.Available||e.t0===x.Availability.AvailableIdle?6:e.t0===x.Availability.Away||e.t0===x.Availability.BeRightBack?8:e.t0===x.Availability.Busy||e.t0===x.Availability.BusyIdle||e.t0===x.Availability.DoNotDisturb?10:(e.t0===x.Availability.Offline||(e.t0,x.Availability.PresenceUnknown),12);break;case 6:return n="008000",e.abrupt("break",14);case 8:return n="B2B200",e.abrupt("break",14);case 10:return n="990000",e.abrupt("break",14);case 12:return n="000000",e.abrupt("break",14);case 14:return a={userId:t,actionFields:{color:"custom",custom_color:n}},e.next=17,fetch("/api/setColor",{method:"POST",headers:{"content-type":"application/json",accept:"application/json"},body:JSON.stringify(a)});case 17:if(!(i=e.sent)||!i.ok){e.next=22;break}return e.abrupt("return",n);case 22:return e.abrupt("return","000000");case 23:case"end":return e.stop()}}),e)})));return function(t,r){return e.apply(this,arguments)}}()},{key:"getDeviceSetting",value:function(e){return localStorage&&localStorage.getItem("Luxafor:".concat(e))||""}},{key:"setDeviceSetting",value:function(e,t){localStorage&&localStorage.setItem("Luxafor:".concat(e),t)}}]),e}(),j=function(e){if(e&&e.includes(":")){var t=e.split(":");return{hour:parseInt(t[0]),minutes:parseInt(t[1])}}return null},A=(n=function(e){var t=Object(a.useState)("000000"),r=Object(u.a)(t,2),n=r[0],c=r[1],o=Object(a.useState)(""),s=Object(u.a)(o,2),l=s[0],f=s[1],p=Object(a.useState)(E.getDeviceSetting("Device:ID")),h=Object(u.a)(p,2),v=h[0],b=h[1],g=Object(a.useState)("2"),d=Object(u.a)(g,2),m=d[0],y=d[1],k=Object(a.useState)(E.getDeviceSetting("StartTime")),S=Object(u.a)(k,2),O=S[0],w=S[1],x=Object(a.useState)(E.getDeviceSetting("EndTime")),A=Object(u.a)(x,2),T=A[0],I=A[1];e.account,v&&e.presence&&l!==e.presence&&E.setColor(v,e.presence).then((function(t){c(t),f(e.presence)}));var C=j(O),D=j(T),P=new Date,N=null,B=null;C&&(P.getHours()<C.hour||P.getHours()===C.hour&&P.getMinutes()<C.minutes)&&(N="Out of office",B="000000"),D&&(P.getHours()>D.hour||P.getHours()===D.hour&&P.getMinutes()>D.minutes)&&(N="Out of office",B="000000");var R=function(e,t){e&&t&&(E.setDeviceSetting(e,t),"StartTime"===e?w(t):I(t))};return i.a.createElement("div",{className:"App"},i.a.createElement("section",{className:"App-login"},e.account?i.a.createElement("button",{onClick:e.onSignOut},"Sign Out: ",e.account.userName):i.a.createElement("button",{onClick:e.onSignIn},"Sign In"),i.a.createElement("input",{className:"input__device-id",value:v,placeholder:"Device ID",onChange:function(e){e&&e.target&&e.target.value&&(E.setDeviceSetting("Device:ID",e.target.value),b(e.target.value))}}),i.a.createElement("input",{className:"input__refresh",value:m,placeholder:"Refresh rate in minutes",type:"number",onChange:function(t){e.refreshUpdate(t.target.value),y(t.target.value)}}),i.a.createElement("input",{className:"input__start",value:O,placeholder:"Start day",pattern:"([01]?[0-9]|2[0-3]):[0-5][0-9]",onChange:function(e){return R("StartTime",e.target.value)}}),i.a.createElement("input",{className:"input__end",value:T,placeholder:"End day",pattern:"([01]?[0-9]|2[0-3]):[0-5][0-9]",onChange:function(e){return R("EndTime",e.target.value)}})),i.a.createElement("header",{className:"App-header",style:{backgroundColor:"#".concat(B||n)}},i.a.createElement("h1",null,"Luxafor - Presence"),N?i.a.createElement("h2",null,N):e.presence&&i.a.createElement("h2",null,e.presence)))},function(e){function t(e){var r;return Object(p.a)(this,t),(r=Object(v.a)(this,Object(b.a)(t).call(this,e))).authCalled=!1,r.nrOfMinutes=2,r.refreshTimer=void 0,r.queryPresence=function(){var e=Object(f.a)(l.a.mark((function e(t){var n,a;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.prev=1,e.next=4,r.acquireToken(S.PRESENCE,t);case 4:n=e.sent,e.next=11;break;case 7:return e.prev=7,e.t0=e.catch(1),r.setState({error:e.t0.message}),e.abrupt("return");case 11:if(!n){e.next=16;break}return e.next=14,m(k,n.accessToken);case 14:(a=e.sent)&&a.availability&&r.setState({presence:a.availability});case 16:e.next=21;break;case 18:e.prev=18,e.t1=e.catch(0),r.setState({error:"Unable to fetch Graph profile."});case 21:r.refreshTimer=setTimeout((function(){r.queryPresence()}),60*r.nrOfMinutes*1e3);case 22:case"end":return e.stop()}}),e,null,[[0,18],[1,7]])})));return function(t){return e.apply(this,arguments)}}(),r.updateRefresh=function(e){var t=parseInt(e);!isNaN(t)&&t&&(r.refreshTimer&&(clearTimeout(r.refreshTimer),r.refreshTimer=null),r.refreshTimer=setTimeout((function(){r.queryPresence()}),60*t*1e3))},r.state={account:null,error:null,presence:null},r}return Object(g.a)(t,e),Object(h.a)(t,[{key:"componentDidMount",value:function(){var e=Object(f.a)(l.a.mark((function e(){var t,r=this;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:O.handleRedirectCallback((function(e){if(e){var t=e.errorMessage?e.errorMessage:"Unable to acquire access token.";r.setState({error:t})}})),t=O.getAccount(),this.setState({account:t}),t&&this.queryPresence(w);case 4:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"acquireToken",value:function(){var e=Object(f.a)(l.a.mark((function e(t,r){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,O.acquireTokenSilent(t);case 3:return e.abrupt("return",e.sent);case 6:if(e.prev=6,e.t0=e.catch(0),!((n=e.t0.errorCode)&&n.length&&(n.indexOf("consent_required")>-1||n.indexOf("interaction_required")>-1||n.indexOf("login_required")>-1))){e.next=12;break}return e.abrupt("return",r?O.acquireTokenRedirect(t):O.acquireTokenPopup(t));case 12:console.error("Non-interactive error:",e.t0.errorCode);case 13:case"end":return e.stop()}var n}),e,null,[[0,6]])})));return function(t,r){return e.apply(this,arguments)}}()},{key:"onSignIn",value:function(){var e=Object(f.a)(l.a.mark((function e(t){var r,n=this;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!this.authCalled){e.next=2;break}return e.abrupt("return");case 2:if(this.authCalled=!0,!t){e.next=5;break}return e.abrupt("return",O.loginRedirect(S.PRESENCE));case 5:return e.next=7,O.loginPopup(S.PRESENCE).catch((function(e){n.setState({error:e.message})}));case 7:(r=e.sent)&&(this.setState({account:r.account,error:null}),this.queryPresence());case 9:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"onSignOut",value:function(){O.logout(),this.refreshTimer&&(clearTimeout(this.refreshTimer),this.refreshTimer=null)}},{key:"render",value:function(){var e=this;return i.a.createElement(n,Object.assign({},this.props,{account:this.state.account,error:this.state.error,presence:this.state.presence,onSignIn:function(){return e.onSignIn(w)},onSignOut:function(){return e.onSignOut()},refreshUpdate:this.updateRefresh}))}}]),t}(a.Component));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(i.a.createElement(A,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}],[[15,1,2]]]);
//# sourceMappingURL=main.95087911.chunk.js.map