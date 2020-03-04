(this["webpackJsonpluxafor-presence-web"]=this["webpackJsonpluxafor-presence-web"]||[]).push([[0],{10:function(e,t,r){"use strict";var n=r(40);r.d(t,"Availability",(function(){return n.a}));var a=r(41);r.o(a,"TimeType")&&r.d(t,"TimeType",(function(){return a.TimeType}));var i=r(42);r.d(t,"TimeType",(function(){return i.a}))},40:function(e,t,r){"use strict";var n;r.d(t,"a",(function(){return n})),function(e){e.Available="Available",e.AvailableIdle="AvailableIdle",e.Away="Away",e.BeRightBack="BeRightBack",e.Busy="Busy",e.BusyIdle="BusyIdle",e.DoNotDisturb="DoNotDisturb",e.Offline="Offline",e.PresenceUnknown="PresenceUnknown"}(n||(n={}))},41:function(e,t){},42:function(e,t,r){"use strict";var n;r.d(t,"a",(function(){return n})),function(e){e[e.StartTime=1]="StartTime",e[e.EndTime=2]="EndTime"}(n||(n={}))},46:function(e,t){},47:function(e,t){},48:function(e,t,r){"use strict";var n=r(12),a=r.n(n),i=r(16),c=r(28),o=r(15),s=r(13),u=r(25),l=r(26),p=r(27),h=r(0),f=r.n(h),m=(r(66),r(53)),v=function(){var e=Object(i.a)(a.a.mark((function e(t,r){var n;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch(t,{headers:{Authorization:"Bearer ".concat(r)}});case 2:return n=e.sent,e.abrupt("return",n.json());case 4:case"end":return e.stop()}}),e)})));return function(t,r){return e.apply(this,arguments)}}(),d=function(){var e=window.navigator.userAgent,t=e.indexOf("MSIE ")>-1,r=e.indexOf("Trident/")>-1;return t||r},g="https://graph.microsoft.com/beta/me/presence",b={LOGIN:{scopes:["openid","profile","User.Read"]},PRESENCE:{scopes:["Presence.Read"]}},y=new m.a({auth:{clientId:"66204339-daf1-40fa-aa31-57342272edce",authority:"https://login.microsoftonline.com/common",validateAuthority:!0,postLogoutRedirectUri:"https://luxafor-presence.azurewebsites.net",navigateToLoginRequestUrl:!1},cache:{cacheLocation:"sessionStorage",storeAuthStateInCookie:d()},system:{navigateFrameWait:0,logger:{error:console.error,errorPii:console.error,info:console.log,infoPii:console.log,verbose:console.log,verbosePii:console.log,warning:console.warn,warningPii:console.warn}}}),k=d(),T=r(54),S=r(109),E=r(111),O=r(110),x=r(107),w=r(108),I=(r(67),r(10)),C=function(){function e(){Object(o.a)(this,e)}return Object(s.a)(e,null,[{key:"setColor",value:function(){var e=Object(i.a)(a.a.mark((function e(t,r){var n,i,c;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n="000000",t&&r){e.next=3;break}return e.abrupt("return",n);case 3:e.t0=r,e.next=e.t0===I.Availability.Available||e.t0===I.Availability.AvailableIdle?6:e.t0===I.Availability.Away||e.t0===I.Availability.BeRightBack?8:e.t0===I.Availability.Busy||e.t0===I.Availability.BusyIdle||e.t0===I.Availability.DoNotDisturb?10:(e.t0===I.Availability.Offline||(e.t0,I.Availability.PresenceUnknown),12);break;case 6:return n="008000",e.abrupt("break",14);case 8:return n="B2B200",e.abrupt("break",14);case 10:return n="990000",e.abrupt("break",14);case 12:return n="000000",e.abrupt("break",14);case 14:return i={userId:t,actionFields:{color:"custom",custom_color:n}},e.next=17,fetch("/api/setColor",{method:"POST",headers:{"content-type":"application/json",accept:"application/json"},body:JSON.stringify(i)});case 17:if(!(c=e.sent)||!c.ok){e.next=22;break}return e.abrupt("return",n);case 22:return e.abrupt("return","000000");case 23:case"end":return e.stop()}}),e)})));return function(t,r){return e.apply(this,arguments)}}()},{key:"getDeviceSetting",value:function(e){return localStorage&&localStorage.getItem("Luxafor:".concat(e))||""}},{key:"setDeviceSetting",value:function(e,t){localStorage&&localStorage.setItem("Luxafor:".concat(e),t)}}]),e}(),D={deviceId:C.getDeviceSetting("Device:ID"),refreshNr:C.getDeviceSetting("RefreshNr")||2,startTime:C.getDeviceSetting("StartTime"),endTime:C.getDeviceSetting("EndTime"),presence:"",color:"000000"},j=f.a.createContext(D),A=function(e){function t(e){var r;return Object(o.a)(this,t),(r=Object(u.a)(this,Object(l.a)(t).call(this,e))).deviceChange=function(e){e&&e.target&&e.target.value&&r.props.updateDeviceId(e.target.value)},r.refreshChange=function(e){e&&e.target&&e.target.value&&r.props.updateRefresh(parseInt(e.target.value))},r}return Object(p.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e=this.props,t=e.account,r=e.onSignIn,n=e.onSignOut,a=e.updateTime,i=this.context,c=i.deviceId,o=i.refreshNr,s=i.startTime,u=i.endTime;return f.a.createElement("header",{className:"app__header"},t?f.a.createElement(x.a,{fixed:!0},f.a.createElement(w.a,{container:!0,style:{flexGrow:1},spacing:1},f.a.createElement(w.a,{item:!0,xs:12},f.a.createElement(E.a,{onClick:n,variant:"outlined",color:"secondary"},"Sign Out: ",t.userName)),f.a.createElement(w.a,{item:!0,xs:3},f.a.createElement(O.a,{label:"Device ID",variant:"filled",required:!0,value:c,onChange:this.deviceChange})),f.a.createElement(w.a,{item:!0,xs:3},f.a.createElement(O.a,{label:"Refresh time (minutes)",variant:"filled",value:o||"",type:"number",inputProps:{min:"1",max:"10",step:"1"},onChange:this.refreshChange})),f.a.createElement(w.a,{item:!0,xs:3},f.a.createElement(O.a,{label:"Start time",variant:"filled",value:s,inputProps:{pattern:"([01]?[0-9]|2[0-3]):[0-5][0-9]"},onChange:function(e){return a(I.TimeType.StartTime,e.target.value)}})),f.a.createElement(w.a,{item:!0,xs:3},f.a.createElement(O.a,{label:"End time",variant:"filled",value:u,inputProps:{pattern:"([01]?[0-9]|2[0-3]):[0-5][0-9]"},onChange:function(e){return a(I.TimeType.EndTime,e.target.value)}})))):f.a.createElement(E.a,{onClick:r,variant:"outlined",color:"primary"},"Sign In"))}}]),t}(f.a.Component);A.contextType=j;var N=A,P=(r(71),r(52)),R=r.n(P),B=r(51),_=r.n(B),q=function(e){return f.a.createElement("footer",{className:"app__footer"},f.a.createElement(E.a,{href:"https://www.eliostruyf.com",title:"Go to the website of Elio Struyf"},"Copyright ",f.a.createElement(_.a,null)," Elio Struyf - https://www.eliostruyf.com")," - ",f.a.createElement(E.a,{href:"https://github.com/estruyf",className:"app__footer_github"},f.a.createElement(R.a,null)))},U=(r(73),function(){return f.a.createElement(j.Consumer,null,(function(e){return f.a.createElement("main",{className:"app__main",style:{backgroundColor:"000000"===e.color?"282c34":e.color}},f.a.createElement("h1",null,"Luxafor - Presence"),e.presence&&f.a.createElement("h2",null,e.presence))}))}),F=function(e){if(e&&e.includes(":")){var t=e.split(":");return{hour:parseInt(t[0]),minutes:parseInt(t[1])}}return null};r.d(t,"a",(function(){return G}));var L,M=Object(T.a)({palette:{type:"dark"}}),W=function(e){function t(e){var r;return Object(o.a)(this,t),(r=Object(u.a)(this,Object(l.a)(t).call(this,e))).refreshTimer=void 0,r.updateDeviceId=function(e){r.setState((function(t){return Object(c.a)({},t).deviceId=e,C.setDeviceSetting("Device:ID",e),Object(c.a)({},t,{deviceId:e})}))},r.updateRefresh=function(e){r.setState((function(t){return C.setDeviceSetting("RefreshNr",e),Object(c.a)({},t,{refreshNr:e})}))},r.updateTime=function(e,t){e&&t&&(C.setDeviceSetting(I.TimeType[e],t),e===I.TimeType.StartTime?r.setState({startTime:t}):r.setState({endTime:t}))},r.startPresenceCheck=Object(i.a)(a.a.mark((function e(){var t,n,i,c;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=r.props.acquireToken,e.prev=1,e.prev=2,e.next=5,t(b.PRESENCE);case 5:n=e.sent,e.next=12;break;case 8:return e.prev=8,e.t0=e.catch(2),r.setState({error:e.t0.message}),e.abrupt("return");case 12:if(!n){e.next=21;break}return e.next=15,v(g,n.accessToken);case 15:if(!(i=e.sent)||!i.availability){e.next=21;break}return e.next=19,C.setColor(r.state.deviceId,i.availability);case 19:c=e.sent,r.setState({presence:i.availability,color:c});case 21:e.next=26;break;case 23:e.prev=23,e.t1=e.catch(1),r.setState({error:"Unable to fetch Graph profile."});case 26:case"end":return e.stop()}}),e,null,[[1,23],[2,8]])}))),r.state=Object(c.a)({},D),r}return Object(p.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){this.props.account&&this.state.deviceId&&this.state.refreshNr&&this.startDataFetching()}},{key:"componentDidUpdate",value:function(e,t){t.refreshNr===this.state.refreshNr&&t.startTime===this.state.startTime&&t.endTime===this.state.endTime||this.startDataFetching(),e.account!==this.props.account&&this.props.account&&this.startDataFetching(),this.props.account||this.stopPresenceCheck()}},{key:"startDataFetching",value:function(){var e=this,t=this.state,r=t.deviceId,n=t.startTime,a=t.endTime,i=t.refreshNr,c=F(n),o=F(a),s=new Date,u=null,l=null;c&&(s.getHours()<c.hour||s.getHours()===c.hour&&s.getMinutes()<c.minutes)&&(u=I.Availability.Offline,l="000000"),o&&(s.getHours()>o.hour||s.getHours()===o.hour&&s.getMinutes()>o.minutes)&&(u=I.Availability.Offline,l="000000");var p=!0;u&&(C.setColor(r,I.Availability.Offline),this.setState({presence:u,color:l}),p=!1),p&&this.startPresenceCheck(),i&&(this.refreshTimer=setTimeout((function(){e.startDataFetching()}),60*i*1e3))}},{key:"stopPresenceCheck",value:function(){this.refreshTimer&&(clearTimeout(this.refreshTimer),this.refreshTimer=null)}},{key:"render",value:function(){return f.a.createElement(j.Provider,{value:{deviceId:this.state.deviceId,refreshNr:this.state.refreshNr,color:this.state.color,endTime:this.state.endTime,startTime:this.state.startTime,presence:this.state.presence,error:""}},f.a.createElement(S.a,{theme:M},f.a.createElement("div",{className:"app"},f.a.createElement(N,{account:this.props.account,onSignIn:this.props.onSignIn,onSignOut:this.props.onSignOut,updateRefresh:this.updateRefresh,updateDeviceId:this.updateDeviceId,updateTime:this.updateTime}),f.a.createElement(U,null),this.state.error&&f.a.createElement("p",{className:"app__error"},this.state.error),f.a.createElement(q,null))))}}]),t}(f.a.Component),G=(L=W,function(e){function t(e){var r;return Object(o.a)(this,t),(r=Object(u.a)(this,Object(l.a)(t).call(this,e))).authCalled=!1,r.state={account:null,error:null,presence:null},r}return Object(p.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){var e=Object(i.a)(a.a.mark((function e(){var t,r=this;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:y.handleRedirectCallback((function(e){if(e){var t=e.errorMessage?e.errorMessage:"Unable to acquire access token.";r.setState({error:t})}})),t=y.getAccount(),this.setState({account:t});case 3:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"acquireToken",value:function(){var e=Object(i.a)(a.a.mark((function e(t,r){return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,y.acquireTokenSilent(t);case 3:return e.abrupt("return",e.sent);case 6:if(e.prev=6,e.t0=e.catch(0),!((n=e.t0.errorCode)&&n.length&&(n.indexOf("consent_required")>-1||n.indexOf("interaction_required")>-1||n.indexOf("login_required")>-1))){e.next=12;break}return e.abrupt("return",r?y.acquireTokenRedirect(t):y.acquireTokenPopup(t));case 12:console.error("Non-interactive error:",e.t0.errorCode);case 13:case"end":return e.stop()}var n}),e,null,[[0,6]])})));return function(t,r){return e.apply(this,arguments)}}()},{key:"onSignIn",value:function(){var e=Object(i.a)(a.a.mark((function e(t){var r,n=this;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!this.authCalled){e.next=2;break}return e.abrupt("return");case 2:if(this.authCalled=!0,!t){e.next=5;break}return e.abrupt("return",y.loginRedirect(b.PRESENCE));case 5:return e.next=7,y.loginPopup(b.PRESENCE).catch((function(e){n.setState({error:e.message})}));case 7:(r=e.sent)&&this.setState({account:r.account,error:null});case 9:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"onSignOut",value:function(){y.logout()}},{key:"getAccessToken",value:function(){return""}},{key:"render",value:function(){var e=this;return f.a.createElement(L,Object.assign({},this.props,{account:this.state.account,error:this.state.error,presence:this.state.presence,onSignIn:function(){return e.onSignIn(k)},onSignOut:function(){return e.onSignOut()},acquireToken:this.acquireToken}))}}]),t}(h.Component))},49:function(e,t,r){"use strict";var n=r(48);r.d(t,"AppWithAuth",(function(){return n.a}));r(46),r(47)},59:function(e,t,r){e.exports=r(74)},64:function(e,t,r){},66:function(e,t,r){},67:function(e,t,r){},71:function(e,t,r){},73:function(e,t,r){},74:function(e,t,r){"use strict";r.r(t);var n=r(0),a=r.n(n),i=r(8),c=r.n(i),o=(r(64),r(49));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(a.a.createElement(o.AppWithAuth,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[59,1,2]]]);
//# sourceMappingURL=main.795c9fc5.chunk.js.map