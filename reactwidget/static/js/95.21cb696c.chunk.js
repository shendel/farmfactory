(self.webpackChunkfarm_widget=self.webpackChunkfarm_widget||[]).push([[95],{9122:function(t,e,n){"use strict";function r(){return(null===n.g||void 0===n.g?void 0:n.g.crypto)||(null===n.g||void 0===n.g?void 0:n.g.msCrypto)||{}}function o(){var t=r();return t.subtle||t.webkitSubtle}Object.defineProperty(e,"__esModule",{value:!0}),e.isBrowserCryptoAvailable=e.getSubtleCrypto=e.getBrowerCrypto=void 0,e.getBrowerCrypto=r,e.getSubtleCrypto=o,e.isBrowserCryptoAvailable=function(){return!!r()&&!!o()}},4683:function(t,e){"use strict";function n(){return"undefined"===typeof document&&"undefined"!==typeof navigator&&"ReactNative"===navigator.product}function r(){return"undefined"!==typeof process&&"undefined"!==typeof process.versions&&"undefined"!==typeof process.versions.node}Object.defineProperty(e,"__esModule",{value:!0}),e.isBrowser=e.isNode=e.isReactNative=void 0,e.isReactNative=n,e.isNode=r,e.isBrowser=function(){return!n()&&!r()}},7323:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n(3431);r.__exportStar(n(9122),e),r.__exportStar(n(4683),e)},159:function(t,e,n){"use strict";n.d(e,{k:function(){return l},Z:function(){return d}});var r=n(4165),o=n(5861),i=n(5671),s=n(3144),u=n(7465),c=n(8524),a=n.n(c),f=n(5457),p=n(8477),h={headers:{Accept:"application/json","Content-Type":"application/json"},method:"POST"},l=function(){function t(e){var n=arguments.length>1&&void 0!==arguments[1]&&arguments[1];if((0,i.Z)(this,t),this.url=e,this.disableProviderPing=n,this.events=new u.EventEmitter,this.isAvailable=!1,this.registering=!1,!(0,p.isHttpUrl)(e))throw new Error("Provided URL is not compatible with HTTP connection: ".concat(e));this.url=e,this.disableProviderPing=n}return(0,s.Z)(t,[{key:"connected",get:function(){return this.isAvailable}},{key:"connecting",get:function(){return this.registering}},{key:"on",value:function(t,e){this.events.on(t,e)}},{key:"once",value:function(t,e){this.events.once(t,e)}},{key:"off",value:function(t,e){this.events.off(t,e)}},{key:"removeListener",value:function(t,e){this.events.removeListener(t,e)}},{key:"open",value:function(){var t=(0,o.Z)((0,r.Z)().mark((function t(){var e,n=arguments;return(0,r.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e=n.length>0&&void 0!==n[0]?n[0]:this.url,t.next=3,this.register(e);case 3:case"end":return t.stop()}}),t,this)})));return function(){return t.apply(this,arguments)}}()},{key:"close",value:function(){var t=(0,o.Z)((0,r.Z)().mark((function t(){return(0,r.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(this.isAvailable){t.next=2;break}throw new Error("Connection already closed");case 2:this.onClose();case 3:case"end":return t.stop()}}),t,this)})));return function(){return t.apply(this,arguments)}}()},{key:"send",value:function(){var t=(0,o.Z)((0,r.Z)().mark((function t(e,n){var o,i,s;return(0,r.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(this.isAvailable){t.next=3;break}return t.next=3,this.register();case 3:return t.prev=3,o=(0,f.u)(e),t.next=7,a()(this.url,Object.assign(Object.assign({},h),{body:o}));case 7:return i=t.sent,t.next=10,i.json();case 10:s=t.sent,this.onPayload({data:s}),t.next=17;break;case 14:t.prev=14,t.t0=t.catch(3),this.onError(e.id,t.t0);case 17:case"end":return t.stop()}}),t,this,[[3,14]])})));return function(e,n){return t.apply(this,arguments)}}()},{key:"register",value:function(){var t=(0,o.Z)((0,r.Z)().mark((function t(){var e,n,o,i,s=this,u=arguments;return(0,r.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(e=u.length>0&&void 0!==u[0]?u[0]:this.url,(0,p.isHttpUrl)(e)){t.next=3;break}throw new Error("Provided URL is not compatible with HTTP connection: ".concat(e));case 3:if(!this.registering){t.next=7;break}return n=this.events.getMaxListeners(),(this.events.listenerCount("register_error")>=n||this.events.listenerCount("open")>=n)&&this.events.setMaxListeners(n+1),t.abrupt("return",new Promise((function(t,e){s.events.once("register_error",(function(t){s.resetMaxListeners(),e(t)})),s.events.once("open",(function(){if(s.resetMaxListeners(),"undefined"===typeof s.isAvailable)return e(new Error("HTTP connection is missing or invalid"));t()}))})));case 7:if(this.url=e,this.registering=!0,t.prev=9,this.disableProviderPing){t.next=14;break}return o=(0,f.u)({id:1,jsonrpc:"2.0",method:"test",params:[]}),t.next=14,a()(e,Object.assign(Object.assign({},h),{body:o}));case 14:this.onOpen(),t.next=23;break;case 17:throw t.prev=17,t.t0=t.catch(9),i=this.parseError(t.t0),this.events.emit("register_error",i),this.onClose(),i;case 23:case"end":return t.stop()}}),t,this,[[9,17]])})));return function(){return t.apply(this,arguments)}}()},{key:"onOpen",value:function(){this.isAvailable=!0,this.registering=!1,this.events.emit("open")}},{key:"onClose",value:function(){this.isAvailable=!1,this.registering=!1,this.events.emit("close")}},{key:"onPayload",value:function(t){if("undefined"!==typeof t.data){var e="string"===typeof t.data?(0,f.D)(t.data):t.data;this.events.emit("payload",e)}}},{key:"onError",value:function(t,e){var n=this.parseError(e),r=n.message||n.toString(),o=(0,p.formatJsonRpcError)(t,r);this.events.emit("payload",o)}},{key:"parseError",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:this.url;return(0,p.parseConnectionError)(t,e,"HTTP")}},{key:"resetMaxListeners",value:function(){this.events.getMaxListeners()>10&&this.events.setMaxListeners(10)}}]),t}(),d=l},8524:function(t,e){var n="undefined"!==typeof self?self:this,r=function(){function t(){this.fetch=!1,this.DOMException=n.DOMException}return t.prototype=n,new t}();!function(t){!function(e){var n="URLSearchParams"in t,r="Symbol"in t&&"iterator"in Symbol,o="FileReader"in t&&"Blob"in t&&function(){try{return new Blob,!0}catch(t){return!1}}(),i="FormData"in t,s="ArrayBuffer"in t;if(s)var u=["[object Int8Array]","[object Uint8Array]","[object Uint8ClampedArray]","[object Int16Array]","[object Uint16Array]","[object Int32Array]","[object Uint32Array]","[object Float32Array]","[object Float64Array]"],c=ArrayBuffer.isView||function(t){return t&&u.indexOf(Object.prototype.toString.call(t))>-1};function a(t){if("string"!==typeof t&&(t=String(t)),/[^a-z0-9\-#$%&'*+.^_`|~]/i.test(t))throw new TypeError("Invalid character in header field name");return t.toLowerCase()}function f(t){return"string"!==typeof t&&(t=String(t)),t}function p(t){var e={next:function(){var e=t.shift();return{done:void 0===e,value:e}}};return r&&(e[Symbol.iterator]=function(){return e}),e}function h(t){this.map={},t instanceof h?t.forEach((function(t,e){this.append(e,t)}),this):Array.isArray(t)?t.forEach((function(t){this.append(t[0],t[1])}),this):t&&Object.getOwnPropertyNames(t).forEach((function(e){this.append(e,t[e])}),this)}function l(t){if(t.bodyUsed)return Promise.reject(new TypeError("Already read"));t.bodyUsed=!0}function d(t){return new Promise((function(e,n){t.onload=function(){e(t.result)},t.onerror=function(){n(t.error)}}))}function v(t){var e=new FileReader,n=d(e);return e.readAsArrayBuffer(t),n}function y(t){if(t.slice)return t.slice(0);var e=new Uint8Array(t.byteLength);return e.set(new Uint8Array(t)),e.buffer}function m(){return this.bodyUsed=!1,this._initBody=function(t){var e;this._bodyInit=t,t?"string"===typeof t?this._bodyText=t:o&&Blob.prototype.isPrototypeOf(t)?this._bodyBlob=t:i&&FormData.prototype.isPrototypeOf(t)?this._bodyFormData=t:n&&URLSearchParams.prototype.isPrototypeOf(t)?this._bodyText=t.toString():s&&o&&((e=t)&&DataView.prototype.isPrototypeOf(e))?(this._bodyArrayBuffer=y(t.buffer),this._bodyInit=new Blob([this._bodyArrayBuffer])):s&&(ArrayBuffer.prototype.isPrototypeOf(t)||c(t))?this._bodyArrayBuffer=y(t):this._bodyText=t=Object.prototype.toString.call(t):this._bodyText="",this.headers.get("content-type")||("string"===typeof t?this.headers.set("content-type","text/plain;charset=UTF-8"):this._bodyBlob&&this._bodyBlob.type?this.headers.set("content-type",this._bodyBlob.type):n&&URLSearchParams.prototype.isPrototypeOf(t)&&this.headers.set("content-type","application/x-www-form-urlencoded;charset=UTF-8"))},o&&(this.blob=function(){var t=l(this);if(t)return t;if(this._bodyBlob)return Promise.resolve(this._bodyBlob);if(this._bodyArrayBuffer)return Promise.resolve(new Blob([this._bodyArrayBuffer]));if(this._bodyFormData)throw new Error("could not read FormData body as blob");return Promise.resolve(new Blob([this._bodyText]))},this.arrayBuffer=function(){return this._bodyArrayBuffer?l(this)||Promise.resolve(this._bodyArrayBuffer):this.blob().then(v)}),this.text=function(){var t=l(this);if(t)return t;if(this._bodyBlob)return function(t){var e=new FileReader,n=d(e);return e.readAsText(t),n}(this._bodyBlob);if(this._bodyArrayBuffer)return Promise.resolve(function(t){for(var e=new Uint8Array(t),n=new Array(e.length),r=0;r<e.length;r++)n[r]=String.fromCharCode(e[r]);return n.join("")}(this._bodyArrayBuffer));if(this._bodyFormData)throw new Error("could not read FormData body as text");return Promise.resolve(this._bodyText)},i&&(this.formData=function(){return this.text().then(R)}),this.json=function(){return this.text().then(JSON.parse)},this}h.prototype.append=function(t,e){t=a(t),e=f(e);var n=this.map[t];this.map[t]=n?n+", "+e:e},h.prototype.delete=function(t){delete this.map[a(t)]},h.prototype.get=function(t){return t=a(t),this.has(t)?this.map[t]:null},h.prototype.has=function(t){return this.map.hasOwnProperty(a(t))},h.prototype.set=function(t,e){this.map[a(t)]=f(e)},h.prototype.forEach=function(t,e){for(var n in this.map)this.map.hasOwnProperty(n)&&t.call(e,this.map[n],n,this)},h.prototype.keys=function(){var t=[];return this.forEach((function(e,n){t.push(n)})),p(t)},h.prototype.values=function(){var t=[];return this.forEach((function(e){t.push(e)})),p(t)},h.prototype.entries=function(){var t=[];return this.forEach((function(e,n){t.push([n,e])})),p(t)},r&&(h.prototype[Symbol.iterator]=h.prototype.entries);var g=["DELETE","GET","HEAD","OPTIONS","POST","PUT"];function b(t,e){var n=(e=e||{}).body;if(t instanceof b){if(t.bodyUsed)throw new TypeError("Already read");this.url=t.url,this.credentials=t.credentials,e.headers||(this.headers=new h(t.headers)),this.method=t.method,this.mode=t.mode,this.signal=t.signal,n||null==t._bodyInit||(n=t._bodyInit,t.bodyUsed=!0)}else this.url=String(t);if(this.credentials=e.credentials||this.credentials||"same-origin",!e.headers&&this.headers||(this.headers=new h(e.headers)),this.method=function(t){var e=t.toUpperCase();return g.indexOf(e)>-1?e:t}(e.method||this.method||"GET"),this.mode=e.mode||this.mode||null,this.signal=e.signal||this.signal,this.referrer=null,("GET"===this.method||"HEAD"===this.method)&&n)throw new TypeError("Body not allowed for GET or HEAD requests");this._initBody(n)}function R(t){var e=new FormData;return t.trim().split("&").forEach((function(t){if(t){var n=t.split("="),r=n.shift().replace(/\+/g," "),o=n.join("=").replace(/\+/g," ");e.append(decodeURIComponent(r),decodeURIComponent(o))}})),e}function w(t){var e=new h;return t.replace(/\r?\n[\t ]+/g," ").split(/\r?\n/).forEach((function(t){var n=t.split(":"),r=n.shift().trim();if(r){var o=n.join(":").trim();e.append(r,o)}})),e}function E(t,e){e||(e={}),this.type="default",this.status=void 0===e.status?200:e.status,this.ok=this.status>=200&&this.status<300,this.statusText="statusText"in e?e.statusText:"OK",this.headers=new h(e.headers),this.url=e.url||"",this._initBody(t)}b.prototype.clone=function(){return new b(this,{body:this._bodyInit})},m.call(b.prototype),m.call(E.prototype),E.prototype.clone=function(){return new E(this._bodyInit,{status:this.status,statusText:this.statusText,headers:new h(this.headers),url:this.url})},E.error=function(){var t=new E(null,{status:0,statusText:""});return t.type="error",t};var x=[301,302,303,307,308];E.redirect=function(t,e){if(-1===x.indexOf(e))throw new RangeError("Invalid status code");return new E(null,{status:e,headers:{location:t}})},e.DOMException=t.DOMException;try{new e.DOMException}catch(L){e.DOMException=function(t,e){this.message=t,this.name=e;var n=Error(t);this.stack=n.stack},e.DOMException.prototype=Object.create(Error.prototype),e.DOMException.prototype.constructor=e.DOMException}function _(t,n){return new Promise((function(r,i){var s=new b(t,n);if(s.signal&&s.signal.aborted)return i(new e.DOMException("Aborted","AbortError"));var u=new XMLHttpRequest;function c(){u.abort()}u.onload=function(){var t={status:u.status,statusText:u.statusText,headers:w(u.getAllResponseHeaders()||"")};t.url="responseURL"in u?u.responseURL:t.headers.get("X-Request-URL");var e="response"in u?u.response:u.responseText;r(new E(e,t))},u.onerror=function(){i(new TypeError("Network request failed"))},u.ontimeout=function(){i(new TypeError("Network request failed"))},u.onabort=function(){i(new e.DOMException("Aborted","AbortError"))},u.open(s.method,s.url,!0),"include"===s.credentials?u.withCredentials=!0:"omit"===s.credentials&&(u.withCredentials=!1),"responseType"in u&&o&&(u.responseType="blob"),s.headers.forEach((function(t,e){u.setRequestHeader(e,t)})),s.signal&&(s.signal.addEventListener("abort",c),u.onreadystatechange=function(){4===u.readyState&&s.signal.removeEventListener("abort",c)}),u.send("undefined"===typeof s._bodyInit?null:s._bodyInit)}))}_.polyfill=!0,t.fetch||(t.fetch=_,t.Headers=h,t.Request=b,t.Response=E),e.Headers=h,e.Request=b,e.Response=E,e.fetch=_,Object.defineProperty(e,"__esModule",{value:!0})}({})}(r),r.fetch.ponyfill=!0,delete r.fetch.polyfill;var o=r;(e=o.fetch).default=o.fetch,e.fetch=o.fetch,e.Headers=o.Headers,e.Request=o.Request,e.Response=o.Response,t.exports=e},2829:function(t,e,n){"use strict";n.d(e,{r:function(){return p}});var r=n(4165),o=n(5861),i=n(5671),s=n(3144),u=n(136),c=n(9388),a=n(7465),f=n(8477),p=function(t){(0,u.Z)(n,t);var e=(0,c.Z)(n);function n(t){var r;return(0,i.Z)(this,n),(r=e.call(this,t)).events=new a.EventEmitter,r.hasRegisteredEventListeners=!1,r.connection=r.setConnection(t),r.connection.connected&&r.registerEventListeners(),r}return(0,s.Z)(n,[{key:"connect",value:function(){var t=(0,o.Z)((0,r.Z)().mark((function t(){var e,n=arguments;return(0,r.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e=n.length>0&&void 0!==n[0]?n[0]:this.connection,t.next=3,this.open(e);case 3:case"end":return t.stop()}}),t,this)})));return function(){return t.apply(this,arguments)}}()},{key:"disconnect",value:function(){var t=(0,o.Z)((0,r.Z)().mark((function t(){return(0,r.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,this.close();case 2:case"end":return t.stop()}}),t,this)})));return function(){return t.apply(this,arguments)}}()},{key:"on",value:function(t,e){this.events.on(t,e)}},{key:"once",value:function(t,e){this.events.once(t,e)}},{key:"off",value:function(t,e){this.events.off(t,e)}},{key:"removeListener",value:function(t,e){this.events.removeListener(t,e)}},{key:"request",value:function(){var t=(0,o.Z)((0,r.Z)().mark((function t(e,n){return(0,r.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",this.requestStrict((0,f.formatJsonRpcRequest)(e.method,e.params||[],e.id||(0,f.getBigIntRpcId)().toString()),n));case 1:case"end":return t.stop()}}),t,this)})));return function(e,n){return t.apply(this,arguments)}}()},{key:"requestStrict",value:function(){var t=(0,o.Z)((0,r.Z)().mark((function t(e,n){var i=this;return(0,r.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",new Promise(function(){var t=(0,o.Z)((0,r.Z)().mark((function t(o,s){return(0,r.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(i.connection.connected){t.next=9;break}return t.prev=1,t.next=4,i.open();case 4:t.next=9;break;case 6:t.prev=6,t.t0=t.catch(1),s(t.t0);case 9:return i.events.on("".concat(e.id),(function(t){(0,f.isJsonRpcError)(t)?s(t.error):o(t.result)})),t.prev=10,t.next=13,i.connection.send(e,n);case 13:t.next=18;break;case 15:t.prev=15,t.t1=t.catch(10),s(t.t1);case 18:case"end":return t.stop()}}),t,null,[[1,6],[10,15]])})));return function(e,n){return t.apply(this,arguments)}}()));case 1:case"end":return t.stop()}}),t)})));return function(e,n){return t.apply(this,arguments)}}()},{key:"setConnection",value:function(){return arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.connection}},{key:"onPayload",value:function(t){this.events.emit("payload",t),(0,f.isJsonRpcResponse)(t)?this.events.emit("".concat(t.id),t):this.events.emit("message",{type:t.method,data:t.params})}},{key:"onClose",value:function(t){t&&3e3===t.code&&this.events.emit("error",new Error("WebSocket connection closed abnormally with code: ".concat(t.code," ").concat(t.reason?"(".concat(t.reason,")"):""))),this.events.emit("disconnect")}},{key:"open",value:function(){var t=(0,o.Z)((0,r.Z)().mark((function t(){var e,n=arguments;return(0,r.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(e=n.length>0&&void 0!==n[0]?n[0]:this.connection,this.connection!==e||!this.connection.connected){t.next=3;break}return t.abrupt("return");case 3:if(this.connection.connected&&this.close(),"string"!==typeof e){t.next=8;break}return t.next=7,this.connection.open(e);case 7:e=this.connection;case 8:return this.connection=this.setConnection(e),t.next=11,this.connection.open();case 11:this.registerEventListeners(),this.events.emit("connect");case 13:case"end":return t.stop()}}),t,this)})));return function(){return t.apply(this,arguments)}}()},{key:"close",value:function(){var t=(0,o.Z)((0,r.Z)().mark((function t(){return(0,r.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,this.connection.close();case 2:case"end":return t.stop()}}),t,this)})));return function(){return t.apply(this,arguments)}}()},{key:"registerEventListeners",value:function(){var t=this;this.hasRegisteredEventListeners||(this.connection.on("payload",(function(e){return t.onPayload(e)})),this.connection.on("close",(function(e){return t.onClose(e)})),this.connection.on("error",(function(e){return t.events.emit("error",e)})),this.connection.on("register_error",(function(e){return t.onClose()})),this.hasRegisteredEventListeners=!0)}}]),n}(f.IJsonRpcProvider)},5670:function(t,e,n){"use strict";n.d(e,{XR:function(){return c},x0:function(){return a}});var r=n(3144),o=n(5671),i=n(136),s=n(9388),u=(0,r.Z)((function t(){(0,o.Z)(this,t)})),c=function(t){(0,i.Z)(n,t);var e=(0,s.Z)(n);function n(t){return(0,o.Z)(this,n),e.call(this)}return(0,r.Z)(n)}(u),a=function(t){(0,i.Z)(n,t);var e=(0,s.Z)(n);function n(t){return(0,o.Z)(this,n),e.call(this)}return(0,r.Z)(n)}(function(t){(0,i.Z)(n,t);var e=(0,s.Z)(n);function n(){return(0,o.Z)(this,n),e.call(this)}return(0,r.Z)(n)}(u))},476:function(t,e,n){"use strict";n.d(e,{CA:function(){return s},JV:function(){return a},O4:function(){return i},dQ:function(){return u},xK:function(){return c}});var r,o=n(4942),i="INTERNAL_ERROR",s="SERVER_ERROR",u=[-32700,-32600,-32601,-32602,-32603],c=(r={},(0,o.Z)(r,"PARSE_ERROR",{code:-32700,message:"Parse error"}),(0,o.Z)(r,"INVALID_REQUEST",{code:-32600,message:"Invalid Request"}),(0,o.Z)(r,"METHOD_NOT_FOUND",{code:-32601,message:"Method not found"}),(0,o.Z)(r,"INVALID_PARAMS",{code:-32602,message:"Invalid params"}),(0,o.Z)(r,i,{code:-32603,message:"Internal error"}),(0,o.Z)(r,s,{code:-32e3,message:"Server error"}),r),a=s},5812:function(t,e,n){"use strict";var r=n(7323);n.o(r,"IJsonRpcProvider")&&n.d(e,{IJsonRpcProvider:function(){return r.IJsonRpcProvider}}),n.o(r,"formatJsonRpcError")&&n.d(e,{formatJsonRpcError:function(){return r.formatJsonRpcError}}),n.o(r,"formatJsonRpcRequest")&&n.d(e,{formatJsonRpcRequest:function(){return r.formatJsonRpcRequest}}),n.o(r,"formatJsonRpcResult")&&n.d(e,{formatJsonRpcResult:function(){return r.formatJsonRpcResult}}),n.o(r,"getBigIntRpcId")&&n.d(e,{getBigIntRpcId:function(){return r.getBigIntRpcId}}),n.o(r,"isHttpUrl")&&n.d(e,{isHttpUrl:function(){return r.isHttpUrl}}),n.o(r,"isJsonRpcError")&&n.d(e,{isJsonRpcError:function(){return r.isJsonRpcError}}),n.o(r,"isJsonRpcRequest")&&n.d(e,{isJsonRpcRequest:function(){return r.isJsonRpcRequest}}),n.o(r,"isJsonRpcResponse")&&n.d(e,{isJsonRpcResponse:function(){return r.isJsonRpcResponse}}),n.o(r,"isJsonRpcResult")&&n.d(e,{isJsonRpcResult:function(){return r.isJsonRpcResult}}),n.o(r,"isLocalhostUrl")&&n.d(e,{isLocalhostUrl:function(){return r.isLocalhostUrl}}),n.o(r,"isReactNative")&&n.d(e,{isReactNative:function(){return r.isReactNative}}),n.o(r,"isWsUrl")&&n.d(e,{isWsUrl:function(){return r.isWsUrl}}),n.o(r,"payloadId")&&n.d(e,{payloadId:function(){return r.payloadId}})},1154:function(t,e,n){"use strict";n.d(e,{CX:function(){return u},L2:function(){return s},by:function(){return i},i5:function(){return o}});var r=n(476);function o(t){return r.dQ.includes(t)}function i(t){return Object.keys(r.xK).includes(t)?r.xK[t]:r.xK[r.JV]}function s(t){var e=Object.values(r.xK).find((function(e){return e.code===t}));return e||r.xK[r.JV]}function u(t,e,n){return t.message.includes("getaddrinfo ENOTFOUND")||t.message.includes("connect ECONNREFUSED")?new Error("Unavailable ".concat(n," RPC url at ").concat(e)):t}},810:function(t,e,n){"use strict";n.d(e,{CS:function(){return s},RI:function(){return a},o0:function(){return i},sT:function(){return u},tm:function(){return c}});var r=n(1154),o=n(476);function i(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:3;return Date.now()*Math.pow(10,t)+Math.floor(Math.random()*Math.pow(10,t))}function s(){return BigInt(i(arguments.length>0&&void 0!==arguments[0]?arguments[0]:6))}function u(t,e,n){return{id:n||i(),jsonrpc:"2.0",method:t,params:e}}function c(t,e){return{id:t,jsonrpc:"2.0",result:e}}function a(t,e,n){return{id:t,jsonrpc:"2.0",error:f(e,n)}}function f(t,e){return"undefined"===typeof t?(0,r.by)(o.O4):("string"===typeof t&&(t=Object.assign(Object.assign({},(0,r.by)(o.CA)),{message:t})),"undefined"!==typeof e&&(t.data=e),(0,r.i5)(t.code)&&(t=(0,r.L2)(t.code)),t)}},8477:function(t,e,n){"use strict";n.d(e,{IJsonRpcProvider:function(){return s.x0},formatJsonRpcError:function(){return i.RI},formatJsonRpcRequest:function(){return i.sT},formatJsonRpcResult:function(){return i.tm},getBigIntRpcId:function(){return i.CS},isHttpUrl:function(){return u.jK},isJsonRpcError:function(){return c.jg},isJsonRpcRequest:function(){return c.DW},isJsonRpcResponse:function(){return c.u},isJsonRpcResult:function(){return c.k4},isLocalhostUrl:function(){return u.JF},isWsUrl:function(){return u.UZ},parseConnectionError:function(){return r.CX},payloadId:function(){return i.o0}});n(476);var r=n(1154),o=n(5812);n.o(o,"IJsonRpcProvider")&&n.d(e,{IJsonRpcProvider:function(){return o.IJsonRpcProvider}}),n.o(o,"formatJsonRpcError")&&n.d(e,{formatJsonRpcError:function(){return o.formatJsonRpcError}}),n.o(o,"formatJsonRpcRequest")&&n.d(e,{formatJsonRpcRequest:function(){return o.formatJsonRpcRequest}}),n.o(o,"formatJsonRpcResult")&&n.d(e,{formatJsonRpcResult:function(){return o.formatJsonRpcResult}}),n.o(o,"getBigIntRpcId")&&n.d(e,{getBigIntRpcId:function(){return o.getBigIntRpcId}}),n.o(o,"isHttpUrl")&&n.d(e,{isHttpUrl:function(){return o.isHttpUrl}}),n.o(o,"isJsonRpcError")&&n.d(e,{isJsonRpcError:function(){return o.isJsonRpcError}}),n.o(o,"isJsonRpcRequest")&&n.d(e,{isJsonRpcRequest:function(){return o.isJsonRpcRequest}}),n.o(o,"isJsonRpcResponse")&&n.d(e,{isJsonRpcResponse:function(){return o.isJsonRpcResponse}}),n.o(o,"isJsonRpcResult")&&n.d(e,{isJsonRpcResult:function(){return o.isJsonRpcResult}}),n.o(o,"isLocalhostUrl")&&n.d(e,{isLocalhostUrl:function(){return o.isLocalhostUrl}}),n.o(o,"isReactNative")&&n.d(e,{isReactNative:function(){return o.isReactNative}}),n.o(o,"isWsUrl")&&n.d(e,{isWsUrl:function(){return o.isWsUrl}}),n.o(o,"payloadId")&&n.d(e,{payloadId:function(){return o.payloadId}});var i=n(810),s=n(8480),u=n(9493),c=n(806)},8480:function(t,e,n){"use strict";n.d(e,{x0:function(){return r.x0}});var r=n(5670)},9493:function(t,e,n){"use strict";n.d(e,{JF:function(){return c},UZ:function(){return u},jK:function(){return s}});var r="^https?:",o="^wss?:";function i(t,e){var n=function(t){var e=t.match(new RegExp(/^\w+:/,"gi"));if(e&&e.length)return e[0]}(t);return"undefined"!==typeof n&&new RegExp(e).test(n)}function s(t){return i(t,r)}function u(t){return i(t,o)}function c(t){return new RegExp("wss?://localhost(:d{2,5})?").test(t)}},806:function(t,e,n){"use strict";function r(t){return"object"===typeof t&&"id"in t&&"jsonrpc"in t&&"2.0"===t.jsonrpc}function o(t){return r(t)&&"method"in t}function i(t){return r(t)&&(s(t)||u(t))}function s(t){return"result"in t}function u(t){return"error"in t}n.d(e,{DW:function(){return o},jg:function(){return u},k4:function(){return s},u:function(){return i}})},5457:function(t,e,n){"use strict";n.d(e,{D:function(){return i},u:function(){return s}});var r=function(t){return JSON.stringify(t,(function(t,e){return"bigint"===typeof e?e.toString()+"n":e}))},o=function(t){var e=t.replace(/([\[:])?(\d{17,}|(?:[9](?:[1-9]07199254740991|0[1-9]7199254740991|00[8-9]199254740991|007[2-9]99254740991|007199[3-9]54740991|0071992[6-9]4740991|00719925[5-9]740991|007199254[8-9]40991|0071992547[5-9]0991|00719925474[1-9]991|00719925474099[2-9])))([,\}\]])/g,'$1"$2n"$3');return JSON.parse(e,(function(t,e){return"string"===typeof e&&e.match(/^\d+n$/)?BigInt(e.substring(0,e.length-1)):e}))};function i(t){if("string"!==typeof t)throw new Error("Cannot safe json parse value of type ".concat(typeof t));try{return o(t)}catch(e){return t}}function s(t){return"string"===typeof t?t:r(t)||""}},7465:function(t){"use strict";var e,n="object"===typeof Reflect?Reflect:null,r=n&&"function"===typeof n.apply?n.apply:function(t,e,n){return Function.prototype.apply.call(t,e,n)};e=n&&"function"===typeof n.ownKeys?n.ownKeys:Object.getOwnPropertySymbols?function(t){return Object.getOwnPropertyNames(t).concat(Object.getOwnPropertySymbols(t))}:function(t){return Object.getOwnPropertyNames(t)};var o=Number.isNaN||function(t){return t!==t};function i(){i.init.call(this)}t.exports=i,t.exports.once=function(t,e){return new Promise((function(n,r){function o(n){t.removeListener(e,i),r(n)}function i(){"function"===typeof t.removeListener&&t.removeListener("error",o),n([].slice.call(arguments))}v(t,e,i,{once:!0}),"error"!==e&&function(t,e,n){"function"===typeof t.on&&v(t,"error",e,n)}(t,o,{once:!0})}))},i.EventEmitter=i,i.prototype._events=void 0,i.prototype._eventsCount=0,i.prototype._maxListeners=void 0;var s=10;function u(t){if("function"!==typeof t)throw new TypeError('The "listener" argument must be of type Function. Received type '+typeof t)}function c(t){return void 0===t._maxListeners?i.defaultMaxListeners:t._maxListeners}function a(t,e,n,r){var o,i,s,a;if(u(n),void 0===(i=t._events)?(i=t._events=Object.create(null),t._eventsCount=0):(void 0!==i.newListener&&(t.emit("newListener",e,n.listener?n.listener:n),i=t._events),s=i[e]),void 0===s)s=i[e]=n,++t._eventsCount;else if("function"===typeof s?s=i[e]=r?[n,s]:[s,n]:r?s.unshift(n):s.push(n),(o=c(t))>0&&s.length>o&&!s.warned){s.warned=!0;var f=new Error("Possible EventEmitter memory leak detected. "+s.length+" "+String(e)+" listeners added. Use emitter.setMaxListeners() to increase limit");f.name="MaxListenersExceededWarning",f.emitter=t,f.type=e,f.count=s.length,a=f,console&&console.warn&&console.warn(a)}return t}function f(){if(!this.fired)return this.target.removeListener(this.type,this.wrapFn),this.fired=!0,0===arguments.length?this.listener.call(this.target):this.listener.apply(this.target,arguments)}function p(t,e,n){var r={fired:!1,wrapFn:void 0,target:t,type:e,listener:n},o=f.bind(r);return o.listener=n,r.wrapFn=o,o}function h(t,e,n){var r=t._events;if(void 0===r)return[];var o=r[e];return void 0===o?[]:"function"===typeof o?n?[o.listener||o]:[o]:n?function(t){for(var e=new Array(t.length),n=0;n<e.length;++n)e[n]=t[n].listener||t[n];return e}(o):d(o,o.length)}function l(t){var e=this._events;if(void 0!==e){var n=e[t];if("function"===typeof n)return 1;if(void 0!==n)return n.length}return 0}function d(t,e){for(var n=new Array(e),r=0;r<e;++r)n[r]=t[r];return n}function v(t,e,n,r){if("function"===typeof t.on)r.once?t.once(e,n):t.on(e,n);else{if("function"!==typeof t.addEventListener)throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type '+typeof t);t.addEventListener(e,(function o(i){r.once&&t.removeEventListener(e,o),n(i)}))}}Object.defineProperty(i,"defaultMaxListeners",{enumerable:!0,get:function(){return s},set:function(t){if("number"!==typeof t||t<0||o(t))throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received '+t+".");s=t}}),i.init=function(){void 0!==this._events&&this._events!==Object.getPrototypeOf(this)._events||(this._events=Object.create(null),this._eventsCount=0),this._maxListeners=this._maxListeners||void 0},i.prototype.setMaxListeners=function(t){if("number"!==typeof t||t<0||o(t))throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received '+t+".");return this._maxListeners=t,this},i.prototype.getMaxListeners=function(){return c(this)},i.prototype.emit=function(t){for(var e=[],n=1;n<arguments.length;n++)e.push(arguments[n]);var o="error"===t,i=this._events;if(void 0!==i)o=o&&void 0===i.error;else if(!o)return!1;if(o){var s;if(e.length>0&&(s=e[0]),s instanceof Error)throw s;var u=new Error("Unhandled error."+(s?" ("+s.message+")":""));throw u.context=s,u}var c=i[t];if(void 0===c)return!1;if("function"===typeof c)r(c,this,e);else{var a=c.length,f=d(c,a);for(n=0;n<a;++n)r(f[n],this,e)}return!0},i.prototype.addListener=function(t,e){return a(this,t,e,!1)},i.prototype.on=i.prototype.addListener,i.prototype.prependListener=function(t,e){return a(this,t,e,!0)},i.prototype.once=function(t,e){return u(e),this.on(t,p(this,t,e)),this},i.prototype.prependOnceListener=function(t,e){return u(e),this.prependListener(t,p(this,t,e)),this},i.prototype.removeListener=function(t,e){var n,r,o,i,s;if(u(e),void 0===(r=this._events))return this;if(void 0===(n=r[t]))return this;if(n===e||n.listener===e)0===--this._eventsCount?this._events=Object.create(null):(delete r[t],r.removeListener&&this.emit("removeListener",t,n.listener||e));else if("function"!==typeof n){for(o=-1,i=n.length-1;i>=0;i--)if(n[i]===e||n[i].listener===e){s=n[i].listener,o=i;break}if(o<0)return this;0===o?n.shift():function(t,e){for(;e+1<t.length;e++)t[e]=t[e+1];t.pop()}(n,o),1===n.length&&(r[t]=n[0]),void 0!==r.removeListener&&this.emit("removeListener",t,s||e)}return this},i.prototype.off=i.prototype.removeListener,i.prototype.removeAllListeners=function(t){var e,n,r;if(void 0===(n=this._events))return this;if(void 0===n.removeListener)return 0===arguments.length?(this._events=Object.create(null),this._eventsCount=0):void 0!==n[t]&&(0===--this._eventsCount?this._events=Object.create(null):delete n[t]),this;if(0===arguments.length){var o,i=Object.keys(n);for(r=0;r<i.length;++r)"removeListener"!==(o=i[r])&&this.removeAllListeners(o);return this.removeAllListeners("removeListener"),this._events=Object.create(null),this._eventsCount=0,this}if("function"===typeof(e=n[t]))this.removeListener(t,e);else if(void 0!==e)for(r=e.length-1;r>=0;r--)this.removeListener(t,e[r]);return this},i.prototype.listeners=function(t){return h(this,t,!0)},i.prototype.rawListeners=function(t){return h(this,t,!1)},i.listenerCount=function(t,e){return"function"===typeof t.listenerCount?t.listenerCount(e):l.call(t,e)},i.prototype.listenerCount=l,i.prototype.eventNames=function(){return this._eventsCount>0?e(this._events):[]}},5559:function(t){"use strict";t.exports=function(){throw new Error("ws does not work in the browser. Browser clients must use the native WebSocket object")}}}]);
//# sourceMappingURL=95.21cb696c.chunk.js.map