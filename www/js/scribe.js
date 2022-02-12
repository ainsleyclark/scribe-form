(()=>{"use strict";var e,r={673:()=>{function e(e,r){for(var t=0;t<r.length;t++){var n=r[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var r,t,n,a=function(){function r(){!function(e,r){if(!(e instanceof r))throw new TypeError("Cannot call a class as a function")}(this,r)}var t,n,a;return t=r,a=[{key:"error",value:function(e){for(var r=arguments.length,t=new Array(r>1?r-1:0),n=1;n<r;n++)t[n-1]=arguments[n];console.error(this.prefix,e,t)}},{key:"warn",value:function(e){for(var r=arguments.length,t=new Array(r>1?r-1:0),n=1;n<r;n++)t[n-1]=arguments[n];console.warn(this.prefix,e,t)}},{key:"info",value:function(e){for(var r=arguments.length,t=new Array(r>1?r-1:0),n=1;n<r;n++)t[n-1]=arguments[n];console.log(this.prefix,e,t)}}],(n=null)&&e(t.prototype,n),a&&e(t,a),Object.defineProperty(t,"prototype",{writable:!1}),r}();function o(e){var r=e.closest("form");return r?r.querySelectorAll('input[name="'+e.getAttribute("name")+'"]:checked').length:0}function i(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function u(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?i(Object(t),!0).forEach((function(r){s(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function l(e,r){return function(e){if(Array.isArray(e))return e}(e)||function(e,r){var t=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==t)return;var n,a,o=[],i=!0,u=!1;try{for(t=t.call(e);!(i=(n=t.next()).done)&&(o.push(n.value),!r||o.length!==r);i=!0);}catch(e){u=!0,a=e}finally{try{i||null==t.return||t.return()}finally{if(u)throw a}}return o}(e,r)||function(e,r){if(!e)return;if("string"==typeof e)return c(e,r);var t=Object.prototype.toString.call(e).slice(8,-1);"Object"===t&&e.constructor&&(t=e.constructor.name);if("Map"===t||"Set"===t)return Array.from(e);if("Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return c(e,r)}(e,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function c(e,r){(null==r||r>e.length)&&(r=e.length);for(var t=0,n=new Array(r);t<r;t++)n[t]=e[t];return n}function f(e,r){for(var t=0;t<r.length;t++){var n=r[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function s(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}n="Scribe -",(t="prefix")in(r=a)?Object.defineProperty(r,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):r[t]=n;var p=function(){function e(){var r=this;!function(e,r){if(!(e instanceof r))throw new TypeError("Cannot call a class as a function")}(this,e),s(this,"tests",void 0),this.tests={},v.forEach((function(e){return r.add(e.name,e.validate,e.priority)}))}var r,t,n;return r=e,(t=[{key:"add",value:function(e,r,t,n){Object.prototype.hasOwnProperty.call(this.tests,e)?a.error("Validator already exists:",e):(t||(t=1),this.tests[e]={name:e,priority:t,validate:r,message:n},this.sort())}},{key:"sort",value:function(){this.tests=Object.entries(this.tests).sort((function(e,r){return r[1].priority-e[1].priority})).reduce((function(e,r){var t=l(r,2),n=t[0],a=t[1];return u(u({},e),{},s({},n,a))}),{})}}])&&f(r.prototype,t),n&&f(r,n),Object.defineProperty(r,"prototype",{writable:!1}),e}(),v=[{name:"required",priority:99,validate:function(e){var r=e.value;return"radio"===e.type||"checkbox"===e.type?0===o(e):void 0!==r&&""!==r}},{name:"email",priority:1,validate:function(e){return!!e.value.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)}},{name:"number",priority:1,validate:function(e){return!e.value||!isNaN(parseFloat(e.value))}},{name:"url",priority:1,validate:function(e){return!!e.value.match(RegExp("[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)"))}},{name:"minlength",priority:1,validate:function(e,r){return!e.value||e.value.length>=parseInt(r)}},{name:"maxlength",priority:1,validate:function(e,r){return!e.value||e.value.length<=parseInt(r)}},{name:"min",priority:1,validate:function(e,r){return"checkbox"===e.type?o(e)>=parseInt(r):parseFloat(e.value)>=parseFloat(r)}},{name:"max",priority:1,validate:function(e,r){return"checkbox"===e.type?o(e)<=parseInt(r):parseFloat(e.value)<=parseFloat(r)}},{name:"pattern",priority:1,validate:function(e,r){var t=new RegExp("^/(.*?)/([gimy]*)$"),n=r.match(t);return!e.value||new RegExp(n[1],n[2]).test(e.value)}},{name:"equals",priority:1,validate:function(e,r){var t=document.querySelector(r);return t?t.value==e.value:(a.error("No query selector found for equals:",r),!1)}}];new p;var y;!function(e){e.Next="next",e.Previous="prev",e.First="first",e.Last="last"}(y||(y={}))},923:()=>{}},t={};function n(e){var a=t[e];if(void 0!==a)return a.exports;var o=t[e]={exports:{}};return r[e](o,o.exports,n),o.exports}n.m=r,e=[],n.O=(r,t,a,o)=>{if(!t){var i=1/0;for(f=0;f<e.length;f++){for(var[t,a,o]=e[f],u=!0,l=0;l<t.length;l++)(!1&o||i>=o)&&Object.keys(n.O).every((e=>n.O[e](t[l])))?t.splice(l--,1):(u=!1,o<i&&(i=o));if(u){e.splice(f--,1);var c=a();void 0!==c&&(r=c)}}return r}o=o||0;for(var f=e.length;f>0&&e[f-1][2]>o;f--)e[f]=e[f-1];e[f]=[t,a,o]},n.o=(e,r)=>Object.prototype.hasOwnProperty.call(e,r),(()=>{var e={375:0,528:0};n.O.j=r=>0===e[r];var r=(r,t)=>{var a,o,[i,u,l]=t,c=0;if(i.some((r=>0!==e[r]))){for(a in u)n.o(u,a)&&(n.m[a]=u[a]);if(l)var f=l(n)}for(r&&r(t);c<i.length;c++)o=i[c],n.o(e,o)&&e[o]&&e[o][0](),e[o]=0;return n.O(f)},t=self.webpackChunkscribe_form=self.webpackChunkscribe_form||[];t.forEach(r.bind(null,0)),t.push=r.bind(null,t.push.bind(t))})(),n.O(void 0,[528],(()=>n(673)));var a=n.O(void 0,[528],(()=>n(923)));a=n.O(a)})();
//# sourceMappingURL=scribe.js.map