!function(t){var n={};function e(o){if(n[o])return n[o].exports;var r=n[o]={i:o,l:!1,exports:{}};return t[o].call(r.exports,r,r.exports,e),r.l=!0,r.exports}e.m=t,e.c=n,e.d=function(t,n,o){e.o(t,n)||Object.defineProperty(t,n,{enumerable:!0,get:o})},e.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},e.t=function(t,n){if(1&n&&(t=e(t)),8&n)return t;if(4&n&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(e.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&n&&"string"!=typeof t)for(var r in t)e.d(o,r,function(n){return t[n]}.bind(null,r));return o},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},e.p="",e(e.s=1079)}({0:function(t,n,e){"use strict";function o(){}e.d(n,"a",(function(){return Nt})),e.d(n,"b",(function(){return g})),e.d(n,"c",(function(){return bt})),e.d(n,"d",(function(){return ht})),e.d(n,"e",(function(){return B})),e.d(n,"f",(function(){return j})),e.d(n,"g",(function(){return u})),e.d(n,"h",(function(){return L})),e.d(n,"i",(function(){return zt})),e.d(n,"j",(function(){return it})),e.d(n,"k",(function(){return ut})),e.d(n,"l",(function(){return jt})),e.d(n,"m",(function(){return a})),e.d(n,"n",(function(){return $})),e.d(n,"o",(function(){return et})),e.d(n,"p",(function(){return Mt})),e.d(n,"q",(function(){return It})),e.d(n,"r",(function(){return p})),e.d(n,"s",(function(){return qt})),e.d(n,"t",(function(){return C})),e.d(n,"u",(function(){return S})),e.d(n,"v",(function(){return M})),e.d(n,"w",(function(){return z})),e.d(n,"x",(function(){return y})),e.d(n,"y",(function(){return rt})),e.d(n,"z",(function(){return At})),e.d(n,"A",(function(){return Pt})),e.d(n,"B",(function(){return Ot})),e.d(n,"C",(function(){return r})),e.d(n,"D",(function(){return Dt})),e.d(n,"E",(function(){return k})),e.d(n,"F",(function(){return f})),e.d(n,"G",(function(){return I})),e.d(n,"H",(function(){return Lt})),e.d(n,"I",(function(){return o})),e.d(n,"J",(function(){return nt})),e.d(n,"K",(function(){return tt})),e.d(n,"L",(function(){return s})),e.d(n,"M",(function(){return l})),e.d(n,"N",(function(){return ot})),e.d(n,"O",(function(){return q})),e.d(n,"P",(function(){return N})),e.d(n,"Q",(function(){return R})),e.d(n,"R",(function(){return m})),e.d(n,"S",(function(){return W})),e.d(n,"T",(function(){return D})),e.d(n,"U",(function(){return T})),e.d(n,"V",(function(){return d})),e.d(n,"W",(function(){return P})),e.d(n,"X",(function(){return A})),e.d(n,"Y",(function(){return pt})),e.d(n,"Z",(function(){return G})),e.d(n,"ab",(function(){return kt})),e.d(n,"bb",(function(){return St})),e.d(n,"cb",(function(){return b}));const r=t=>t;function u(t,n){for(const e in n)t[e]=n[e];return t}function c(t){return t()}function i(){return Object.create(null)}function s(t){t.forEach(c)}function f(t){return"function"==typeof t}function l(t,n){return t!=t?n==n:t!==n||t&&"object"==typeof t||"function"==typeof t}function d(t,...n){if(null==t)return o;const e=t.subscribe(...n);return e.unsubscribe?()=>e.unsubscribe():e}function a(t,n,e){t.$$.on_destroy.push(d(n,e))}function p(t,n,e,o){if(t){const r=h(t,n,e,o);return t[0](r)}}function h(t,n,e,o){return t[1]&&o?u(e.ctx.slice(),t[1](o(n))):e.ctx}function b(t,n,e,o,r,u,c){const i=function(t,n,e,o){if(t[2]&&o){const r=t[2](o(e));if(void 0===n.dirty)return r;if("object"==typeof r){const t=[],e=Math.max(n.dirty.length,r.length);for(let o=0;o<e;o+=1)t[o]=n.dirty[o]|r[o];return t}return n.dirty|r}return n.dirty}(n,o,r,u);if(i){const r=h(n,e,o,c);t.p(r,i)}}function y(t){const n={};for(const e in t)"$"!==e[0]&&(n[e]=t[e]);return n}function $(t,n){const e={};n=new Set(n);for(const o in t)n.has(o)||"$"===o[0]||(e[o]=t[o]);return e}function m(t,n,e=n){return t.set(e),n}function g(t){return t&&f(t.destroy)?t.destroy:o}const _="undefined"!=typeof window;let v=_?()=>window.performance.now():()=>Date.now(),w=_?t=>requestAnimationFrame(t):o;const x=new Set;function E(t){x.forEach(n=>{n.c(t)||(x.delete(n),n.f())}),0!==x.size&&w(E)}function O(t){let n;return 0===x.size&&w(E),{promise:new Promise(e=>{x.add(n={c:t,f:e})}),abort(){x.delete(n)}}}function j(t,n){t.appendChild(n)}function k(t,n,e){t.insertBefore(n,e||null)}function S(t){t.parentNode.removeChild(t)}function C(t,n){for(let e=0;e<t.length;e+=1)t[e]&&t[e].d(n)}function M(t){return document.createElement(t)}function P(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function A(t){return document.createTextNode(t)}function T(){return A(" ")}function z(){return A("")}function I(t,n,e,o){return t.addEventListener(n,e,o),()=>t.removeEventListener(n,e,o)}function L(t,n,e){null==e?t.removeAttribute(n):t.getAttribute(n)!==e&&t.setAttribute(n,e)}function q(t,n){const e=Object.getOwnPropertyDescriptors(t.__proto__);for(const o in n)null==n[o]?t.removeAttribute(o):"style"===o?t.style.cssText=n[o]:"__value"===o?t.value=t[o]=n[o]:e[o]&&e[o].set?t[o]=n[o]:L(t,o,n[o])}function D(t,n){for(const e in n)L(t,e,n[e])}function N(t,n){n=""+n,t.wholeText!==n&&(t.data=n)}function R(t,n){t.value=null==n?"":n}function W(t,n,e,o){t.style.setProperty(n,e,o?"important":"")}let F;function H(){if(void 0===F){F=!1;try{"undefined"!=typeof window&&window.parent&&window.parent.document}catch(t){F=!0}}return F}function B(t,n){const e=getComputedStyle(t),o=(parseInt(e.zIndex)||0)-1;"static"===e.position&&(t.style.position="relative");const r=M("iframe");r.setAttribute("style",`display: block; position: absolute; top: 0; left: 0; width: 100%; height: 100%; overflow: hidden; border: 0; opacity: 0; pointer-events: none; z-index: ${o};`),r.setAttribute("aria-hidden","true"),r.tabIndex=-1;const u=H();let c;return u?(r.src="data:text/html,<script>onresize=function(){parent.postMessage(0,'*')}<\/script>",c=I(window,"message",t=>{t.source===r.contentWindow&&n()})):(r.src="about:blank",r.onload=()=>{c=I(r.contentWindow,"resize",n)}),j(t,r),()=>{(u||c&&r.contentWindow)&&c(),S(r)}}function G(t,n,e){t.classList[e?"add":"remove"](n)}function J(t,n){const e=document.createEvent("CustomEvent");return e.initCustomEvent(t,!1,!1,n),e}const K=new Set;let Q,U=0;function V(t,n,e,o,r,u,c,i=0){const s=16.666/o;let f="{\n";for(let t=0;t<=1;t+=s){const o=n+(e-n)*u(t);f+=100*t+`%{${c(o,1-o)}}\n`}const l=f+`100% {${c(e,1-e)}}\n}`,d=`__svelte_${function(t){let n=5381,e=t.length;for(;e--;)n=(n<<5)-n^t.charCodeAt(e);return n>>>0}(l)}_${i}`,a=t.ownerDocument;K.add(a);const p=a.__svelte_stylesheet||(a.__svelte_stylesheet=a.head.appendChild(M("style")).sheet),h=a.__svelte_rules||(a.__svelte_rules={});h[d]||(h[d]=!0,p.insertRule(`@keyframes ${d} ${l}`,p.cssRules.length));const b=t.style.animation||"";return t.style.animation=`${b?b+", ":""}${d} ${o}ms linear ${r}ms 1 both`,U+=1,d}function X(t,n){const e=(t.style.animation||"").split(", "),o=e.filter(n?t=>t.indexOf(n)<0:t=>-1===t.indexOf("__svelte")),r=e.length-o.length;r&&(t.style.animation=o.join(", "),U-=r,U||w(()=>{U||(K.forEach(t=>{const n=t.__svelte_stylesheet;let e=n.cssRules.length;for(;e--;)n.deleteRule(e);t.__svelte_rules={}}),K.clear())}))}function Y(t){Q=t}function Z(){if(!Q)throw new Error("Function called outside component initialization");return Q}function tt(t){Z().$$.on_mount.push(t)}function nt(t){Z().$$.on_destroy.push(t)}function et(){const t=Z();return(n,e)=>{const o=t.$$.callbacks[n];if(o){const r=J(n,e);o.slice().forEach(n=>{n.call(t,r)})}}}function ot(t,n){Z().$$.context.set(t,n)}function rt(t){return Z().$$.context.get(t)}function ut(t,n){const e=t.$$.callbacks[n.type];e&&e.slice().forEach(t=>t(n))}const ct=[],it=[],st=[],ft=[],lt=Promise.resolve();let dt=!1;function at(){dt||(dt=!0,lt.then(mt))}function pt(){return at(),lt}function ht(t){st.push(t)}function bt(t){ft.push(t)}let yt=!1;const $t=new Set;function mt(){if(!yt){yt=!0;do{for(let t=0;t<ct.length;t+=1){const n=ct[t];Y(n),gt(n.$$)}for(ct.length=0;it.length;)it.pop()();for(let t=0;t<st.length;t+=1){const n=st[t];$t.has(n)||($t.add(n),n())}st.length=0}while(ct.length);for(;ft.length;)ft.pop()();dt=!1,yt=!1,$t.clear()}}function gt(t){if(null!==t.fragment){t.update(),s(t.before_update);const n=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,n),t.after_update.forEach(ht)}}let _t;function vt(){return _t||(_t=Promise.resolve(),_t.then(()=>{_t=null})),_t}function wt(t,n,e){t.dispatchEvent(J(`${n?"intro":"outro"}${e}`))}const xt=new Set;let Et;function Ot(){Et={r:0,c:[],p:Et}}function jt(){Et.r||s(Et.c),Et=Et.p}function kt(t,n){t&&t.i&&(xt.delete(t),t.i(n))}function St(t,n,e,o){if(t&&t.o){if(xt.has(t))return;xt.add(t),Et.c.push(()=>{xt.delete(t),o&&(e&&t.d(1),o())}),t.o(n)}}const Ct={duration:0};function Mt(t,n,e,u){let c=n(t,e),i=u?0:1,l=null,d=null,a=null;function p(){a&&X(t,a)}function h(t,n){const e=t.b-i;return n*=Math.abs(e),{a:i,b:t.b,d:e,duration:n,start:t.start,end:t.start+n,group:t.group}}function b(n){const{delay:e=0,duration:u=300,easing:f=r,tick:b=o,css:y}=c||Ct,$={start:v()+e,b:n};n||($.group=Et,Et.r+=1),l?d=$:(y&&(p(),a=V(t,i,n,u,e,f,y)),n&&b(0,1),l=h($,u),ht(()=>wt(t,n,"start")),O(n=>{if(d&&n>d.start&&(l=h(d,u),d=null,wt(t,l.b,"start"),y&&(p(),a=V(t,i,l.b,l.duration,0,f,c.css))),l)if(n>=l.end)b(i=l.b,1-i),wt(t,l.b,"end"),d||(l.b?p():--l.group.r||s(l.group.c)),l=null;else if(n>=l.start){const t=n-l.start;i=l.a+l.d*f(t/l.duration),b(i,1-i)}return!(!l&&!d)}))}return{run(t){f(c)?vt().then(()=>{c=c(),b(t)}):b(t)},end(){p(),l=d=null}}}"undefined"!=typeof window?window:"undefined"!=typeof globalThis?globalThis:global;function Pt(t,n){const e={},o={},r={$$scope:1};let u=t.length;for(;u--;){const c=t[u],i=n[u];if(i){for(const t in c)t in i||(o[t]=1);for(const t in i)r[t]||(e[t]=i[t],r[t]=1);t[u]=i}else for(const t in c)r[t]=1}for(const t in o)t in e||(e[t]=void 0);return e}function At(t){return"object"==typeof t&&null!==t?t:{}}new Set(["allowfullscreen","allowpaymentrequest","async","autofocus","autoplay","checked","controls","default","defer","disabled","formnovalidate","hidden","ismap","loop","multiple","muted","nomodule","novalidate","open","playsinline","readonly","required","reversed","selected"]);let Tt;function zt(t,n,e){const o=t.$$.props[n];void 0!==o&&(t.$$.bound[o]=e,e(t.$$.ctx[o]))}function It(t){t&&t.c()}function Lt(t,n,e){const{fragment:o,on_mount:r,on_destroy:u,after_update:i}=t.$$;o&&o.m(n,e),ht(()=>{const n=r.map(c).filter(f);u?u.push(...n):s(n),t.$$.on_mount=[]}),i.forEach(ht)}function qt(t,n){const e=t.$$;null!==e.fragment&&(s(e.on_destroy),e.fragment&&e.fragment.d(n),e.on_destroy=e.fragment=null,e.ctx=[])}function Dt(t,n,e,r,u,c,f=[-1]){const l=Q;Y(t);const d=n.props||{},a=t.$$={fragment:null,ctx:null,props:c,update:o,not_equal:u,bound:i(),on_mount:[],on_destroy:[],before_update:[],after_update:[],context:new Map(l?l.$$.context:[]),callbacks:i(),dirty:f};let p=!1;if(a.ctx=e?e(t,d,(n,e,...o)=>{const r=o.length?o[0]:e;return a.ctx&&u(a.ctx[n],a.ctx[n]=r)&&(a.bound[n]&&a.bound[n](r),p&&function(t,n){-1===t.$$.dirty[0]&&(ct.push(t),at(),t.$$.dirty.fill(0)),t.$$.dirty[n/31|0]|=1<<n%31}(t,n)),e}):[],a.update(),p=!0,s(a.before_update),a.fragment=!!r&&r(a.ctx),n.target){if(n.hydrate){const t=function(t){return Array.from(t.childNodes)}(n.target);a.fragment&&a.fragment.l(t),t.forEach(S)}else a.fragment&&a.fragment.c();n.intro&&kt(t.$$.fragment),Lt(t,n.target,n.anchor),mt()}Y(l)}"function"==typeof HTMLElement&&(Tt=class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){for(const t in this.$$.slotted)this.appendChild(this.$$.slotted[t])}attributeChangedCallback(t,n,e){this[t]=e}$destroy(){qt(this,1),this.$destroy=o}$on(t,n){const e=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return e.push(n),()=>{const t=e.indexOf(n);-1!==t&&e.splice(t,1)}}$set(){}});class Nt{$destroy(){qt(this,1),this.$destroy=o}$on(t,n){const e=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return e.push(n),()=>{const t=e.indexOf(n);-1!==t&&e.splice(t,1)}}$set(){}}},1079:function(t,n,e){t.exports=e(1086)},1080:function(t,n,e){},1086:function(t,n,e){"use strict";e.r(n);var o=e(0);e(1080);function r(t){let n;return{c(){n=Object(o.v)("div"),n.textContent="hello",Object(o.h)(n,"class","svelte-25r32y")},m(t,e){Object(o.E)(t,n,e)},p:o.I,i:o.I,o:o.I,d(t){t&&Object(o.u)(n)}}}class u extends o.a{constructor(t){super(),Object(o.D)(this,t,null,r,o.M,{})}}const c=new u({target:document.body});n.default=c}});