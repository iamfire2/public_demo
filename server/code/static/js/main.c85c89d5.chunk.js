(this.webpackJsonpdemo=this.webpackJsonpdemo||[]).push([[0],{199:function(e,t,n){},200:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),i=n(7),o=n.n(i),c=n(48),u=n(22),l=n(82),s=n(237),d=n(60),p=n(231),g=n(235),m=n(236),h=n(238),E=n(240),f=n(83),b=n(84),O=n(92),y=n(91),S=n(17),I=Object(S.a)(),v=function(e){Object(O.a)(n,e);var t=Object(y.a)(n);function n(){var e;Object(f.a)(this,n);for(var a=arguments.length,r=new Array(a),i=0;i<a;i++)r[i]=arguments[i];return(e=t.call.apply(t,[this].concat(r))).onAuthChange=function(t){t?e.props.signIn(e.auth.currentUser.get().getId()):e.props.signOut()},e.onSignInClick=function(){e.auth.signIn()},e.onSignOutClick=function(){e.auth.signOut()},e}return Object(b.a)(n,[{key:"componentDidMount",value:function(){var e=this;window.gapi.load("client:auth2",(function(){window.gapi.client.init({clientId:"390486224557-853u366v4pao19i98ufoj6cj1mf8q07a.apps.googleusercontent.com",scope:"email"}).then((function(){e.auth=window.gapi.auth2.getAuthInstance(),e.onAuthChange(e.auth.isSignedIn.get()),e.auth.isSignedIn.listen(e.onAuthChange)}))}))}},{key:"renderAuthButton",value:function(){return null===this.props.isSignedIn?null:this.props.isSignedIn?r.a.createElement("button",{onClick:this.onSignOutClick,className:"ui red google button",style:this.props.style?this.props.style:{}},r.a.createElement("i",{className:"google icon"}),"Logout"):r.a.createElement("button",{onClick:this.onSignInClick,className:"ui red google button",style:this.props.style?this.props.style:{}},r.a.createElement("i",{className:"google icon"}),"Login")}},{key:"render",value:function(){return r.a.createElement("div",null,this.renderAuthButton())}}]),n}(r.a.Component),j=Object(c.b)((function(e){return{isSignedIn:e.auth.isSignedIn}}),{signIn:function(e){return{type:"SIGN_IN",payload:e}},signOut:function(){return{type:"SIGN_OUT"}}})(v),w=n(85),C=n.n(w);var T=function(){var e=Object(a.useState)(""),t=Object(d.a)(e,2),n=t[0],i=t[1],o=Object(a.useState)(""),c=Object(d.a)(o,2),u=c[0],l=c[1];return r.a.createElement(p.a,{container:!0,direction:"row",justify:"center",alignItems:"center",style:{left:"25%",top:"50%",marginLeft:"-25%",position:"absolute",marginTop:"-25%"}},r.a.createElement(g.a,{elevation:3,style:{padding:"2rem"}},r.a.createElement(m.a,{variant:"h6"},"Sign in"),r.a.createElement("form",{onSubmit:function(e){e.preventDefault(),C.a.create({baseURL:"http://localhost:5000"}).post("/auth",{username:n,password:u}).catch((function(e){return console.log(e)})).then((function(e){return console.log(e.data.access_token)}))}},r.a.createElement(p.a,{item:!0,lg:12},r.a.createElement(h.a,{required:!0,id:"standard-required",label:"Username",defaultValue:n,onChange:function(e){i(e.target.value)}})),r.a.createElement(p.a,{item:!0,lg:12},r.a.createElement(h.a,{id:"standard-password-input",label:"Password",type:"password",autoComplete:"current-password",required:!0,defaultValue:u,onChange:function(e){l(e.target.value)}})),r.a.createElement(p.a,{item:!0,lg:12,style:{marginTop:"2rem"}},r.a.createElement(E.a,{variant:"contained",color:"primary",fullWidth:!0,type:"submit"},"Login"))),r.a.createElement(j,{style:{marginTop:"1rem",width:"100%"}})))},_=function(){return r.a.createElement("div",{className:"ui container"},r.a.createElement(s.b,{history:I},r.a.createElement("div",null,r.a.createElement(s.c,null,r.a.createElement(s.a,{path:"/",exact:!0,component:T})))))},A=n(239),N=n(12),k={isSignedIn:null,userId:null},R=n(32),L=n(58),M=n.n(L),D=Object(u.c)({auth:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:k,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SIGN_IN":return Object(N.a)(Object(N.a)({},e),{},{isSignedIn:!0,userId:t.payload});case"SIGN_OUT":return Object(N.a)(Object(N.a)({},e),{},{isSignedIn:!1,userId:null});default:return e}},form:A.a,streams:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"FETCH_STREAM":case"CREATE_STREAM":case"EDIT_STREAM":return Object(N.a)(Object(N.a)({},e),{},Object(R.a)({},t.payload.id,t.payload));case"DELETE_STREAM":return M.a.omit(e,t.payload);case"FETCH_STREAMS":return Object(N.a)(Object(N.a)({},e),M.a.mapKeys(t.payload,"id"));default:return e}}}),U=(n(199),window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||u.d),q=Object(u.e)(D,U(Object(u.a)(l.a)));o.a.render(r.a.createElement(c.a,{store:q},r.a.createElement(_,null)),document.querySelector("#root"))},98:function(e,t,n){e.exports=n(200)}},[[98,1,2]]]);
//# sourceMappingURL=main.c85c89d5.chunk.js.map