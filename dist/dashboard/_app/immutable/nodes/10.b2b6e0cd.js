import{s as X,a as I,f as _,l as Q,D as Z,d as h,c as P,g as v,h as w,x as L,m as W,j as n,i as T,y as o,E as O,A as G,F as $,z as ee,n as te,G as se}from"../chunks/scheduler.de195056.js";import{S as ae,i as re,a as R,t as M,c as le,f as Y,g as oe}from"../chunks/index.c6f2ad36.js";import{p as ie}from"../chunks/stores.6150b2da.js";import{g as ne}from"../chunks/database.5ddaa35e.js";import{s as J}from"../chunks/index.3f7c9ec2.js";function K(f){let r,t,c,s,d,p,m;return{c(){r=_("div"),t=_("i"),c=I(),s=_("span"),d=Q(f[1]),this.h()},l(e){r=v(e,"DIV",{class:!0});var l=w(r);t=v(l,"I",{class:!0}),w(t).forEach(h),c=P(l),s=v(l,"SPAN",{});var i=w(s);d=W(i,f[1]),i.forEach(h),l.forEach(h),this.h()},h(){n(t,"class","fa-solid fa-circle-exclamation"),n(r,"class","alert alert-error mb-5")},m(e,l){T(e,r,l),o(r,t),o(r,c),o(r,s),o(s,d),m=!0},p(e,l){(!m||l&2)&&te(d,e[1])},i(e){m||(e&&se(()=>{m&&(p||(p=Y(r,J,{},!0)),p.run(1))}),m=!0)},o(e){e&&(p||(p=Y(r,J,{},!1)),p.run(0)),m=!1},d(e){e&&h(r),e&&p&&p.end()}}}function ce(f){let r,t,c,s,d,p="New Password",m,e,l,i,g="New Password",N,b,j,C,x,E,A,k,B,U,a=f[1]&&K(f);return{c(){r=I(),t=_("div"),c=_("div"),s=_("div"),d=_("h2"),d.textContent=p,m=I(),e=_("form"),l=_("div"),i=_("label"),i.textContent=g,N=I(),b=_("input"),j=I(),a&&a.c(),C=I(),x=_("div"),E=_("button"),A=Q("Save "),k=_("i"),this.h()},l(u){Z("svelte-1at4xjh",document.head).forEach(h),r=P(u),t=v(u,"DIV",{class:!0});var q=w(t);c=v(q,"DIV",{class:!0});var z=w(c);s=v(z,"DIV",{class:!0});var S=w(s);d=v(S,"H2",{class:!0,"data-svelte-h":!0}),L(d)!=="svelte-65sokr"&&(d.textContent=p),m=P(S),e=v(S,"FORM",{});var D=w(e);l=v(D,"DIV",{class:!0});var V=w(l);i=v(V,"LABEL",{class:!0,for:!0,"data-svelte-h":!0}),L(i)!=="svelte-1ysxw7n"&&(i.textContent=g),N=P(V),b=v(V,"INPUT",{type:!0,class:!0,id:!0,autocomplete:!0}),V.forEach(h),j=P(D),a&&a.l(D),C=P(D),x=v(D,"DIV",{class:!0});var H=w(x);E=v(H,"BUTTON",{type:!0,class:!0});var F=w(E);A=W(F,"Save "),k=v(F,"I",{class:!0}),w(k).forEach(h),F.forEach(h),H.forEach(h),D.forEach(h),S.forEach(h),z.forEach(h),q.forEach(h),this.h()},h(){document.title="Reset Your Password - PocketHost",n(d,"class","card-title mb-4"),n(i,"class","label"),n(i,"for","password"),n(b,"type","password"),n(b,"class","input input-bordered w-full max-w-xs"),n(b,"id","password"),b.required=!0,n(b,"autocomplete","new-password"),n(l,"class","form-control w-full max-w-xs"),n(k,"class","bi bi-arrow-right-short"),n(E,"type","submit"),n(E,"class","btn btn-primary w-100"),E.disabled=f[2],n(x,"class","mt-4 card-actions justify-end"),n(s,"class","card-body"),n(c,"class","card w-96 bg-zinc-900 mx-auto shadow-xl overflow-hidden"),n(t,"class","min-h-screen flex items-center justify-center")},m(u,y){T(u,r,y),T(u,t,y),o(t,c),o(c,s),o(s,d),o(s,m),o(s,e),o(e,l),o(l,i),o(l,N),o(l,b),O(b,f[0]),o(e,j),a&&a.m(e,null),o(e,C),o(e,x),o(x,E),o(E,A),o(E,k),B||(U=[G(b,"input",f[5]),G(e,"submit",f[3])],B=!0)},p(u,[y]){y&1&&b.value!==u[0]&&O(b,u[0]),u[1]?a?(a.p(u,y),y&2&&R(a,1)):(a=K(u),a.c(),R(a,1),a.m(e,C)):a&&(oe(),M(a,1,1,()=>{a=null}),le()),y&4&&(E.disabled=u[2])},i(u){R(a)},o(u){M(a)},d(u){u&&(h(r),h(t)),a&&a.d(),B=!1,$(U)}}}function de(f,r,t){let c;ee(f,ie,i=>t(4,c=i));let s="",d="",p="",m=!0;const e=async i=>{i.preventDefault(),t(2,m=!0),d&&(await ne(d,s,g=>{t(1,p=g)}),window.location.href="/?view=login",t(2,m=!1))};function l(){s=this.value,t(0,s)}return f.$$.update=()=>{var i,g;f.$$.dirty&16&&(d=(g=(i=c==null?void 0:c.url)==null?void 0:i.searchParams)==null?void 0:g.get("token")),f.$$.dirty&1&&t(2,m=s.length===0)},[s,p,m,e,c,l]}class _e extends ae{constructor(r){super(),re(this,r,de,ce,X,{})}}export{_e as component};