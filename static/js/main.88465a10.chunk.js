(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{14:function(e,t,n){e.exports=n(28)},26:function(e,t,n){},28:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(6),l=n.n(c),u=n(1),i=n(2),o=n(5),f=function(e){var t=function(t){var n=Object(a.useRef)(null),c=function(){return 100/(t.scale||t.to-t.from)},l={rangeSliderWidth:0,rangeStartLeft:c()*(t.defaultRangeStart-t.from),rangeEndLeft:c()*(t.defaultRangeEnd-t.from),activeRange:"",isTouchActive:!1},f=Object(a.useState)(l),b=Object(u.a)(f,2),m=b[0],g=b[1],d=function(e){return function(e){var t=("ontouchstart"in window?e.touches[0].clientX:e.pageX)-e.currentTarget.getBoundingClientRect().left;return t>m.rangeSliderWidth?m.rangeSliderWidth:t<0?0:t}(e)/m.rangeSliderWidth*100},E=function(e,t){return Math.floor(e/c())*c()},s=function(e){return Math.round(e.rangeStartLeft/c()+t.from)},v=function(e){return Math.round(e.rangeEndLeft/c()+t.from)},p=function(){return{start:s(m),end:v(m)}};return Object(a.useEffect)(function(){var e=n.current.getBoundingClientRect().width,t=Object(o.a)({},m,{rangeSliderWidth:e});g(t)},{}),r.a.createElement(e,Object.assign({onTouchStart:function(e){var n;e.preventDefault();var a=d(e),r=m.rangeStartLeft,c=m.rangeEndLeft,l=Math.abs(r-a)<Math.abs(c-a)?"rangeStartLeft":"rangeEndLeft",u=Object(o.a)({},m,(n={},Object(i.a)(n,l,E(a)),Object(i.a)(n,"activeRange",l),Object(i.a)(n,"isTouchActive",!0),n));Math.abs(s(u)-v(u))>=t.rangeDiffLimit&&g(u)},onMove:function(e){if(e.preventDefault(),m.isTouchActive){var n=d(e),a=Object(o.a)({},m,Object(i.a)({},m.activeRange,E(n,m.activeRange)));v(a)-s(a)>=t.rangeDiffLimit&&g(a)}},onTouchEnd:function(e){e.preventDefault();var n=Object(o.a)({},m,{activeRange:"",isTouchActive:!1});g(n),t.onAfterChange(p())},selectedRangeWidth:m.rangeEndLeft-m.rangeStartLeft},m,{isActiveRange:function(e){return m.activeRange===e},getRange:p,wrapperRef:n},t))};return t.defaultProps={defaultRangeStart:0,defaultRangeEnd:0},Object(a.memo)(t)},b=n(3),m=n(4);function g(){var e=Object(b.a)(["\n  ","\n"]);return g=function(){return e},e}function d(){var e=Object(b.a)(["\n  left: ",";\n"]);return d=function(){return e},e}function E(){var e=Object(b.a)(["\n  position: absolute;\n  top: -5px;\n  left: ",";\n  transform: ",";\n  height: 12px;\n  width: 12px;\n  background: #00bcd5;\n  border-radius: 50%;\n  box-shadow: -1px 0 2px #cfcfcf;\n"]);return E=function(){return e},e}function s(){var e=Object(b.a)(["\n  position: absolute;\n  top: 0;\n  left: ",";\n  width: ",";\n  height: 2px;\n  background: #00bcd5;\n"]);return s=function(){return e},e}function v(){var e=Object(b.a)(["\n  width: 100%;\n  margin: 0 auto;\n  height: 2px;\n  background: #dfe0e3;\n  position: relative;\n"]);return v=function(){return e},e}function p(){var e=Object(b.a)(["\n  padding: 10px;\n"]);return p=function(){return e},e}function h(){var e=Object(b.a)(["\n  margin: 15px 0;\n"]);return h=function(){return e},e}function j(){var e=Object(b.a)(["\n  flex: 1;\n  text-align: ",";\n"]);return j=function(){return e},e}function O(){var e=Object(b.a)(["\n  display: flex;\n  flex-wrap: wrap;\n  align-content: space-between;\n  margin: 10px 0;\n"]);return O=function(){return e},e}function S(){var e=Object(b.a)(["\n  width: 90%;\n  margin: 0 auto;\n"]);return S=function(){return e},e}var R=m.a.div(S()),w=m.a.div(O()),x=m.a.div(j(),function(e){var t=e.textAlign;return void 0===t?"left":t}),M=m.a.div(h()),L=m.a.div(p()),y=m.a.div(v()),C=m.a.div(s(),function(e){return e.left},function(e){return e.width}),T=m.a.div(E(),function(e){return e.left},function(e){var t=e.scale;return"scale(".concat(void 0===t?1:t,")")}),A=Object(m.a)(T)(d(),function(e){return e.left}),D=Object(m.a)(T)(g(),function(e){var t=e.positionFrom,n=e.positionAt;return"".concat(t,": ").concat(n)}),W=f(Object(a.memo)(function(e){var t,n=!!("ontouchstart"in window),a=n?"onTouchStart":"onMouseDown",c=n?"onTouchEnd":"onMouseUp",l=n?"onTouchMove":"onMouseMove",u=(t={},Object(i.a)(t,a,e.onTouchStart),Object(i.a)(t,l,e.onMove),Object(i.a)(t,c,e.onTouchEnd),t),o=function(t){return e.isActiveRange(t)?2:1};return r.a.createElement(R,null,r.a.createElement(w,null,r.a.createElement(x,null,"From ",e.getRange().start," years"),r.a.createElement(x,{textAlign:"right"},"To ",e.getRange().end," years")),r.a.createElement(M,null,r.a.createElement(L,u,r.a.createElement(y,{ref:e.wrapperRef},r.a.createElement(C,{left:"".concat(e.rangeStartLeft,"%"),width:"".concat(e.selectedRangeWidth,"%")}),r.a.createElement(A,{left:"".concat(e.rangeStartLeft,"%"),scale:o("rangeStartLeft")}),r.a.createElement(D,{positionFrom:"".concat(100===e.rangeEndLeft?"right":"left"),positionAt:"".concat(100===e.rangeEndLeft?0:"".concat(e.rangeEndLeft,"%")),scale:o("rangeEndLeft")})))),r.a.createElement("div",{className:"range-ruler"},r.a.createElement("div",{className:"range-start"}),r.a.createElement("div",{className:"range-end"})))})),k=function(e){return console.log(e)},q=function(e){return r.a.createElement(W,Object.assign({onAfterChange:k},e))},F=(n(26),function(){var e=Object(a.useState)(21),t=Object(u.a)(e,2),n=t[0],c=t[1],l=Object(a.useState)(36),i=Object(u.a)(l,2),o=i[0],f=i[1],b=Object(a.useState)(24),m=Object(u.a)(b,2),g=m[0],d=m[1],E=Object(a.useState)(36),s=Object(u.a)(E,2),v=s[0],p=s[1],h=Object(a.useState)(25),j=Object(u.a)(h,2),O=j[0],S=j[1],R=Object(a.useState)(29),w=Object(u.a)(R,2),x=w[0],M=w[1],L=Object(a.useState)(3),y=Object(u.a)(L,2),C=y[0],T=y[1],A=Object(a.useState)(46),D=Object(u.a)(A,2),W=D[0],k=D[1],F=Object(a.useState)(21),N=Object(u.a)(F,2),B=N[0],J=N[1],X=Object(a.useState)(W-B),I=Object(u.a)(X,2),P=I[0],U=I[1],z={rangeStartMin:n,rangeStartMax:o,rangeEndMin:g,rangeEndMax:v,scale:P,from:B,to:W,defaultRangeStart:O,defaultRangeEnd:x,rangeDiffLimit:C};Object(a.useEffect)(function(){var e=W-B;e!==P&&U(e)},[W,B]);var G=function(e){return function(t){return e(t.target.value)}};return r.a.createElement("div",{className:"App"},r.a.createElement("h1",null,"Range Slider"),r.a.createElement("h2",null,"Example!"),r.a.createElement("br",null),r.a.createElement("label",null,"Scale ",r.a.createElement("br",null),"(Difference between from and to which gets auto calculated on changing from and to)"),r.a.createElement("br",null),r.a.createElement("input",{type:"number",value:P,onChange:G(U)}),r.a.createElement("br",null),r.a.createElement("label",null,"From"),r.a.createElement("br",null),r.a.createElement("input",{type:"number",value:B,onChange:G(J)}),r.a.createElement("br",null),r.a.createElement("label",null,"To"),r.a.createElement("br",null),r.a.createElement("input",{type:"number",value:W,onChange:G(k)}),r.a.createElement("br",null),r.a.createElement("label",null,"Range Start Min (Will be implemented if required)"),r.a.createElement("br",null),r.a.createElement("input",{type:"number",value:n,onChange:G(c)}),r.a.createElement("br",null),r.a.createElement("label",null,"Default Range Start "),r.a.createElement("br",null),r.a.createElement("input",{type:"number",value:O,onChange:G(S)}),r.a.createElement("br",null),r.a.createElement("label",null,"Range Start Max  (Will be implemented if required)"),r.a.createElement("br",null),r.a.createElement("input",{type:"number",value:o,onChange:G(f)}),r.a.createElement("br",null),r.a.createElement("label",null,"Default Range End  (Will be implemented if required)"),r.a.createElement("br",null),r.a.createElement("input",{type:"number",value:x,onChange:G(M)}),r.a.createElement("br",null),r.a.createElement("label",null,"Range End Min"),r.a.createElement("br",null),r.a.createElement("input",{type:"number",value:g,onChange:G(d)}),r.a.createElement("br",null),r.a.createElement("label",null,"Range End Max (Will be implemented if required)"),r.a.createElement("br",null),r.a.createElement("input",{type:"number",value:v,onChange:G(p)}),r.a.createElement("br",null),r.a.createElement("label",null,"Range Difference"),r.a.createElement("br",null),r.a.createElement("input",{type:"number",value:C,onChange:G(T)}),r.a.createElement(q,z))}),N=document.getElementById("root");l.a.render(r.a.createElement(F,null),N)}},[[14,2,1]]]);
//# sourceMappingURL=main.88465a10.chunk.js.map