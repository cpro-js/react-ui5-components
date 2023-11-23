import{j as Ie}from"./useIsomorphicLayoutEffect-xRq3KBKR.js";import{R as S,r as B}from"./index-9BFB80ap.js";var ne=e=>e.type==="checkbox",Z=e=>e instanceof Date,U=e=>e==null;const Ye=e=>typeof e=="object";var R=e=>!U(e)&&!Array.isArray(e)&&Ye(e)&&!Z(e),Ze=e=>R(e)&&e.target?ne(e.target)?e.target.checked:e.target.value:e,br=e=>e.substring(0,e.search(/\.\d+(\.|$)/))||e,er=(e,t)=>e.has(br(t)),me=e=>Array.isArray(e)?e.filter(Boolean):[],D=e=>e===void 0,f=(e,t,r)=>{if(!t||!R(e))return r;const i=me(t.split(/[,[\].]+?/)).reduce((n,o)=>U(n)?n:n[o],e);return D(i)||i===e?D(e[t])?r:e[t]:i};const fe={BLUR:"blur",FOCUS_OUT:"focusout",CHANGE:"change"},N={onBlur:"onBlur",onChange:"onChange",onSubmit:"onSubmit",onTouched:"onTouched",all:"all"},W={max:"max",min:"min",maxLength:"maxLength",minLength:"minLength",pattern:"pattern",required:"required",validate:"validate"},rr=S.createContext(null),pe=()=>S.useContext(rr),vr=e=>{const{children:t,...r}=e;return S.createElement(rr.Provider,{value:r},e.children)};var tr=(e,t,r,i=!0)=>{const n={};for(const o in e)Object.defineProperty(n,o,{get:()=>{const d=o;return t[d]!==N.all&&(t[d]=!i||N.all),r&&(r[d]=!0),e[d]}});return n},M=e=>R(e)&&!Object.keys(e).length,sr=(e,t,r)=>{const{name:i,...n}=e;return M(n)||Object.keys(n).length>=Object.keys(t).length||Object.keys(n).find(o=>t[o]===(!r||N.all))},ue=e=>Array.isArray(e)?e:[e],ir=(e,t,r)=>r&&t?e===t:!e||!t||e===t||ue(e).some(i=>i&&(i.startsWith(t)||t.startsWith(i)));function Re(e){const t=S.useRef(e);t.current=e,S.useEffect(()=>{const r=n=>{n&&n.unsubscribe()},i=!e.disabled&&t.current.subject.subscribe({next:t.current.callback});return()=>r(i)},[e.disabled])}function _r(e){const t=pe(),{control:r=t.control,disabled:i,name:n,exact:o}=e||{},[d,g]=S.useState(r._formState),V=S.useRef({isDirty:!1,dirtyFields:!1,touchedFields:!1,isValidating:!1,isValid:!1,errors:!1}),_=S.useRef(n),x=S.useRef(!0);_.current=n;const b=S.useCallback(y=>x.current&&ir(_.current,y.name,o)&&sr(y,V.current)&&g({...r._formState,...y}),[r,o]);return Re({disabled:i,callback:b,subject:r._subjects.state}),S.useEffect(()=>(x.current=!0,()=>{x.current=!1}),[]),tr(d,r._proxyFormState,V.current,!1)}var I=e=>typeof e=="string",nr=(e,t,r,i)=>{const n=Array.isArray(e);return I(e)?(i&&t.watch.add(e),f(r,e)):n?e.map(o=>(i&&t.watch.add(o),f(r,o))):(i&&(t.watchAll=!0),r)},be=e=>typeof e=="function",Oe=e=>{for(const t in e)if(be(e[t]))return!0;return!1};function Fr(e){const t=pe(),{control:r=t.control,name:i,defaultValue:n,disabled:o,exact:d}=e||{},g=S.useRef(i);g.current=i;const V=S.useCallback(b=>{if(ir(g.current,b.name,d)){const y=nr(g.current,r._names,b.values||r._formValues);x(D(g.current)||R(y)&&!Oe(y)?{...y}:Array.isArray(y)?[...y]:D(y)?n:y)}},[r,d,n]);Re({disabled:o,subject:r._subjects.watch,callback:V});const[_,x]=S.useState(D(n)?r._getWatch(i):n);return S.useEffect(()=>{r._removeUnmounted()}),_}function Br(e){const t=pe(),{name:r,control:i=t.control,shouldUnregister:n}=e,o=er(i._names.array,r),d=Fr({control:i,name:r,defaultValue:f(i._formValues,r,f(i._defaultValues,r,e.defaultValue)),exact:!0}),g=_r({control:i,name:r}),V=S.useRef(i.register(r,{...e.rules,value:d}));return S.useEffect(()=>{const _=(x,b)=>{const y=f(i._fields,x);y&&(y._f.mount=b)};return _(r,!0),()=>{const x=i._options.shouldUnregister||n;(o?x&&!i._stateFlags.action:x)?i.unregister(r):_(r,!1)}},[r,i,o,n]),{field:{name:r,value:d,onChange:S.useCallback(_=>{V.current.onChange({target:{value:Ze(_),name:r},type:fe.CHANGE})},[r]),onBlur:S.useCallback(()=>{V.current.onBlur({target:{value:f(i._formValues,r),name:r},type:fe.BLUR})},[r,i]),ref:S.useCallback(_=>{const x=f(i._fields,r);_&&x&&_.focus&&(x._f.ref={focus:()=>_.focus(),setCustomValidity:b=>_.setCustomValidity(b),reportValidity:()=>_.reportValidity()})},[r,i._fields])},formState:g,fieldState:Object.defineProperties({},{invalid:{get:()=>!!f(g.errors,r)},isDirty:{get:()=>!!f(g.dirtyFields,r)},isTouched:{get:()=>!!f(g.touchedFields,r)},error:{get:()=>f(g.errors,r)}})}}var Vr=(e,t,r,i,n)=>t?{...r[e],types:{...r[e]&&r[e].types?r[e].types:{},[i]:n||!0}}:{},Te=e=>/^\w*$/.test(e),lr=e=>me(e.replace(/["|']|\]/g,"").split(/\.|\[/));function k(e,t,r){let i=-1;const n=Te(t)?[t]:lr(t),o=n.length,d=o-1;for(;++i<o;){const g=n[i];let V=r;if(i!==d){const _=e[g];V=R(_)||Array.isArray(_)?_:isNaN(+n[i+1])?{}:[]}e[g]=V,e=e[g]}return e}const De=(e,t,r)=>{for(const i of r||Object.keys(e)){const n=f(e,i);if(n){const{_f:o,...d}=n;if(o&&t(o.name)){if(o.ref.focus&&D(o.ref.focus()))break;if(o.refs){o.refs[0].focus();break}}else R(d)&&De(d,t)}}};var je=(e,t,r)=>!r&&(t.watchAll||t.watch.has(e)||[...t.watch].some(i=>e.startsWith(i)&&/^\.\w+/.test(e.slice(i.length)))),Ee=typeof window<"u"&&typeof window.HTMLElement<"u"&&typeof document<"u";function Q(e){let t;const r=Array.isArray(e);if(e instanceof Date)t=new Date(e);else if(e instanceof Set)t=new Set(e);else if(!(Ee&&(e instanceof Blob||e instanceof FileList))&&(r||R(e))){t=r?[]:{};for(const i in e)t[i]=be(e[i])?e[i]:Q(e[i])}else return e;return t}function Ar(e,t){const r=t.slice(0,-1).length;let i=0;for(;i<r;)e=D(e)?i++:e[t[i++]];return e}function T(e,t){const r=Te(t)?[t]:lr(t),i=r.length==1?e:Ar(e,r),n=r[r.length-1];let o;i&&delete i[n];for(let d=0;d<r.slice(0,-1).length;d++){let g=-1,V;const _=r.slice(0,-(d+1)),x=_.length-1;for(d>0&&(o=e);++g<_.length;){const b=_[g];V=V?V[b]:e[b],x===g&&(R(V)&&M(V)||Array.isArray(V)&&!V.filter(y=>!D(y)).length)&&(o?delete o[b]:delete e[b]),o=V}}return e}function xe(){let e=[];return{get observers(){return e},next:n=>{for(const o of e)o.next(n)},subscribe:n=>(e.push(n),{unsubscribe:()=>{e=e.filter(o=>o!==n)}}),unsubscribe:()=>{e=[]}}}var de=e=>U(e)||!Ye(e);function ee(e,t){if(de(e)||de(t))return e===t;if(Z(e)&&Z(t))return e.getTime()===t.getTime();const r=Object.keys(e),i=Object.keys(t);if(r.length!==i.length)return!1;for(const n of r){const o=e[n];if(!i.includes(n))return!1;if(n!=="ref"){const d=t[n];if(Z(o)&&Z(d)||R(o)&&R(d)||Array.isArray(o)&&Array.isArray(d)?!ee(o,d):o!==d)return!1}}return!0}var He=e=>({isOnSubmit:!e||e===N.onSubmit,isOnBlur:e===N.onBlur,isOnChange:e===N.onChange,isOnAll:e===N.all,isOnTouch:e===N.onTouched}),ye=e=>typeof e=="boolean",Ue=e=>e.type==="file",Ce=e=>e instanceof HTMLElement,ar=e=>e.type==="select-multiple",Le=e=>e.type==="radio",xr=e=>Le(e)||ne(e),we=e=>Ce(e)&&e.isConnected;function he(e,t={}){const r=Array.isArray(e);if(R(e)||r)for(const i in e)Array.isArray(e[i])||R(e[i])&&!Oe(e[i])?(t[i]=Array.isArray(e[i])?[]:{},he(e[i],t[i])):U(e[i])||(t[i]=!0);return t}function ur(e,t,r){const i=Array.isArray(e);if(R(e)||i)for(const n in e)Array.isArray(e[n])||R(e[n])&&!Oe(e[n])?D(t)||de(r[n])?r[n]=Array.isArray(e[n])?he(e[n],[]):{...he(e[n])}:ur(e[n],U(t)?{}:t[n],r[n]):r[n]=!ee(e[n],t[n]);return r}var Se=(e,t)=>ur(e,t,he(t));const We={value:!1,isValid:!1},$e={value:!0,isValid:!0};var or=e=>{if(Array.isArray(e)){if(e.length>1){const t=e.filter(r=>r&&r.checked&&!r.disabled).map(r=>r.value);return{value:t,isValid:!!t.length}}return e[0].checked&&!e[0].disabled?e[0].attributes&&!D(e[0].attributes.value)?D(e[0].value)||e[0].value===""?$e:{value:e[0].value,isValid:!0}:$e:We}return We},cr=(e,{valueAsNumber:t,valueAsDate:r,setValueAs:i})=>D(e)?e:t?e===""?NaN:+e:r&&I(e)?new Date(e):i?i(e):e;const Ke={isValid:!1,value:null};var fr=e=>Array.isArray(e)?e.reduce((t,r)=>r&&r.checked&&!r.disabled?{isValid:!0,value:r.value}:t,Ke):Ke;function ke(e){const t=e.ref;if(!(e.refs?e.refs.every(r=>r.disabled):t.disabled))return Ue(t)?t.files:Le(t)?fr(e.refs).value:ar(t)?[...t.selectedOptions].map(({value:r})=>r):ne(t)?or(e.refs).value:cr(D(t.value)?e.ref.value:t.value,e)}var wr=(e,t,r,i)=>{const n={};for(const o of e){const d=f(t,o);d&&k(n,o,d._f)}return{criteriaMode:r,names:[...e],fields:n,shouldUseNativeValidation:i}},ge=e=>e instanceof RegExp,te=e=>D(e)?void 0:ge(e)?e.source:R(e)?ge(e.value)?e.value.source:e.value:e,Sr=e=>e.mount&&(e.required||e.min||e.max||e.maxLength||e.minLength||e.pattern||e.validate);function Ge(e,t,r){const i=f(e,r);if(i||Te(r))return{error:i,name:r};const n=r.split(".");for(;n.length;){const o=n.join("."),d=f(t,o),g=f(e,o);if(d&&!Array.isArray(d)&&r!==o)return{name:r};if(g&&g.type)return{name:o,error:g};n.pop()}return{name:r}}var kr=(e,t,r,i,n)=>n.isOnAll?!1:!r&&n.isOnTouch?!(t||e):(r?i.isOnBlur:n.isOnBlur)?!e:(r?i.isOnChange:n.isOnChange)?e:!0,Dr=(e,t)=>!me(f(e,t)).length&&T(e,t),oe=e=>I(e)||S.isValidElement(e);function ze(e,t,r="validate"){if(oe(e)||Array.isArray(e)&&e.every(oe)||ye(e)&&!e)return{type:r,message:oe(e)?e:"",ref:t}}var Y=e=>R(e)&&!ge(e)?e:{value:e,message:""},Je=async(e,t,r,i)=>{const{ref:n,refs:o,required:d,maxLength:g,minLength:V,min:_,max:x,pattern:b,validate:y,name:O,valueAsNumber:$,mount:K,disabled:X}=e._f;if(!K||X)return{};const E=o?o[0]:n,p=A=>{i&&E.reportValidity&&(E.setCustomValidity(ye(A)?"":A||" "),E.reportValidity())},F={},j=Le(n),H=ne(n),ve=j||H,q=($||Ue(n))&&!n.value||t===""||Array.isArray(t)&&!t.length,J=Vr.bind(null,O,r,F),G=(A,v,C,L=W.maxLength,P=W.minLength)=>{const re=A?v:C;F[O]={type:A?L:P,message:re,ref:n,...J(A?L:P,re)}};if(d&&(!ve&&(q||U(t))||ye(t)&&!t||H&&!or(o).isValid||j&&!fr(o).isValid)){const{value:A,message:v}=oe(d)?{value:!!d,message:d}:Y(d);if(A&&(F[O]={type:W.required,message:v,ref:E,...J(W.required,v)},!r))return p(v),F}if(!q&&(!U(_)||!U(x))){let A,v;const C=Y(x),L=Y(_);if(isNaN(t)){const P=n.valueAsDate||new Date(t);I(C.value)&&(A=P>new Date(C.value)),I(L.value)&&(v=P<new Date(L.value))}else{const P=n.valueAsNumber||+t;U(C.value)||(A=P>C.value),U(L.value)||(v=P<L.value)}if((A||v)&&(G(!!A,C.message,L.message,W.max,W.min),!r))return p(F[O].message),F}if((g||V)&&!q&&I(t)){const A=Y(g),v=Y(V),C=!U(A.value)&&t.length>A.value,L=!U(v.value)&&t.length<v.value;if((C||L)&&(G(C,A.message,v.message),!r))return p(F[O].message),F}if(b&&!q&&I(t)){const{value:A,message:v}=Y(b);if(ge(A)&&!t.match(A)&&(F[O]={type:W.pattern,message:v,ref:n,...J(W.pattern,v)},!r))return p(v),F}if(y){if(be(y)){const A=await y(t),v=ze(A,E);if(v&&(F[O]={...v,...J(W.validate,v.message)},!r))return p(v.message),F}else if(R(y)){let A={};for(const v in y){if(!M(A)&&!r)break;const C=ze(await y[v](t),E,v);C&&(A={...C,...J(v,C.message)},p(C.message),r&&(F[O]=A))}if(!M(A)&&(F[O]={ref:E,...A},!r))return F}}return p(!0),F};const Er={mode:N.onSubmit,reValidateMode:N.onChange,shouldFocusError:!0};function Cr(e={}){let t={...Er,...e},r={isDirty:!1,isValidating:!1,dirtyFields:{},isSubmitted:!1,submitCount:0,touchedFields:{},isSubmitting:!1,isSubmitSuccessful:!1,isValid:!1,errors:{}},i={},n=Q(t.defaultValues)||{},o=t.shouldUnregister?{}:Q(n),d={action:!1,mount:!1,watch:!1},g={mount:new Set,unMount:new Set,array:new Set,watch:new Set},V,_=0,x={};const b={isDirty:!1,dirtyFields:!1,touchedFields:!1,isValidating:!1,isValid:!1,errors:!1},y={watch:xe(),array:xe(),state:xe()},O=He(t.mode),$=He(t.reValidateMode),K=t.criteriaMode===N.all,X=(s,l)=>(...a)=>{clearTimeout(_),_=window.setTimeout(()=>s(...a),l)},E=async s=>{let l=!1;return b.isValid&&(l=t.resolver?M((await q()).errors):await G(i,!0),!s&&l!==r.isValid&&(r.isValid=l,y.state.next({isValid:l}))),l},p=(s,l=[],a,c,h=!0,u=!0)=>{if(c&&a){if(d.action=!0,u&&Array.isArray(f(i,s))){const m=a(f(i,s),c.argA,c.argB);h&&k(i,s,m)}if(b.errors&&u&&Array.isArray(f(r.errors,s))){const m=a(f(r.errors,s),c.argA,c.argB);h&&k(r.errors,s,m),Dr(r.errors,s)}if(b.touchedFields&&u&&Array.isArray(f(r.touchedFields,s))){const m=a(f(r.touchedFields,s),c.argA,c.argB);h&&k(r.touchedFields,s,m)}b.dirtyFields&&(r.dirtyFields=Se(n,o)),y.state.next({isDirty:v(s,l),dirtyFields:r.dirtyFields,errors:r.errors,isValid:r.isValid})}else k(o,s,l)},F=(s,l)=>(k(r.errors,s,l),y.state.next({errors:r.errors})),j=(s,l,a,c)=>{const h=f(i,s);if(h){const u=f(o,s,D(a)?f(n,s):a);D(u)||c&&c.defaultChecked||l?k(o,s,l?u:ke(h._f)):P(s,u),d.mount&&E()}},H=(s,l,a,c,h)=>{let u=!1;const m={name:s},w=f(r.touchedFields,s);if(b.isDirty){const z=r.isDirty;r.isDirty=m.isDirty=v(),u=z!==m.isDirty}if(b.dirtyFields&&(!a||c)){const z=f(r.dirtyFields,s);ee(f(n,s),l)?T(r.dirtyFields,s):k(r.dirtyFields,s,!0),m.dirtyFields=r.dirtyFields,u=u||z!==f(r.dirtyFields,s)}return a&&!w&&(k(r.touchedFields,s,a),m.touchedFields=r.touchedFields,u=u||b.touchedFields&&w!==a),u&&h&&y.state.next(m),u?m:{}},ve=async(s,l,a,c,h)=>{const u=f(r.errors,l),m=b.isValid&&r.isValid!==a;if(e.delayError&&c?(V=V||X(F,e.delayError),V(l,c)):(clearTimeout(_),c?k(r.errors,l,c):T(r.errors,l)),((c?!ee(u,c):u)||!M(h)||m)&&!s){const w={...h,...m?{isValid:a}:{},errors:r.errors,name:l};r={...r,...w},y.state.next(w)}x[l]--,b.isValidating&&!Object.values(x).some(w=>w)&&(y.state.next({isValidating:!1}),x={})},q=async s=>t.resolver?await t.resolver({...o},t.context,wr(s||g.mount,i,t.criteriaMode,t.shouldUseNativeValidation)):{},J=async s=>{const{errors:l}=await q();if(s)for(const a of s){const c=f(l,a);c?k(r.errors,a,c):T(r.errors,a)}else r.errors=l;return l},G=async(s,l,a={valid:!0})=>{for(const c in s){const h=s[c];if(h){const{_f:u,...m}=h;if(u){const w=await Je(h,f(o,u.name),K,t.shouldUseNativeValidation);if(w[u.name]&&(a.valid=!1,l))break;l||(w[u.name]?k(r.errors,u.name,w[u.name]):T(r.errors,u.name))}m&&await G(m,l,a)}}return a.valid},A=()=>{for(const s of g.unMount){const l=f(i,s);l&&(l._f.refs?l._f.refs.every(a=>!we(a)):!we(l._f.ref))&&Fe(s)}g.unMount=new Set},v=(s,l)=>(s&&l&&k(o,s,l),!ee(Me(),n)),C=(s,l,a)=>{const c={...d.mount?o:D(l)?n:I(s)?{[s]:l}:l};return nr(s,g,c,a)},L=s=>me(f(d.mount?o:n,s,e.shouldUnregister?f(n,s,[]):[])),P=(s,l,a={})=>{const c=f(i,s);let h=l;if(c){const u=c._f;u&&(!u.disabled&&k(o,s,cr(l,u)),h=Ee&&Ce(u.ref)&&U(l)?"":l,ar(u.ref)?[...u.ref.options].forEach(m=>m.selected=h.includes(m.value)):u.refs?ne(u.ref)?u.refs.length>1?u.refs.forEach(m=>!m.disabled&&(m.checked=Array.isArray(h)?!!h.find(w=>w===m.value):h===m.value)):u.refs[0]&&(u.refs[0].checked=!!h):u.refs.forEach(m=>m.checked=m.value===h):Ue(u.ref)?u.ref.value="":(u.ref.value=h,u.ref.type||y.watch.next({name:s})))}(a.shouldDirty||a.shouldTouch)&&H(s,h,a.shouldTouch,a.shouldDirty,!0),a.shouldValidate&&_e(s)},re=(s,l,a)=>{for(const c in l){const h=l[c],u=`${s}.${c}`,m=f(i,u);(g.array.has(s)||!de(h)||m&&!m._f)&&!Z(h)?re(u,h,a):P(u,h,a)}},le=(s,l,a={})=>{const c=f(i,s),h=g.array.has(s),u=Q(l);k(o,s,u),h?(y.array.next({name:s,values:o}),(b.isDirty||b.dirtyFields)&&a.shouldDirty&&(r.dirtyFields=Se(n,o),y.state.next({name:s,dirtyFields:r.dirtyFields,isDirty:v(s,u)}))):c&&!c._f&&!U(u)?re(s,u,a):P(s,u,a),je(s,g)&&y.state.next({}),y.watch.next({name:s})},Pe=async s=>{const l=s.target;let a=l.name;const c=f(i,a);if(c){let h,u;const m=l.type?ke(c._f):Ze(s),w=s.type===fe.BLUR||s.type===fe.FOCUS_OUT,z=!Sr(c._f)&&!t.resolver&&!f(r.errors,a)&&!c._f.deps||kr(w,f(r.touchedFields,a),r.isSubmitted,$,O),ae=je(a,g,w);k(o,a,m),w?c._f.onBlur&&c._f.onBlur(s):c._f.onChange&&c._f.onChange(s);const Ae=H(a,m,w,!1),gr=!M(Ae)||ae;if(!w&&y.watch.next({name:a,type:s.type}),z)return gr&&y.state.next({name:a,...ae?{}:Ae});if(!w&&ae&&y.state.next({}),x[a]=(x[a],1),y.state.next({isValidating:!0}),t.resolver){const{errors:Ne}=await q([a]),mr=Ge(r.errors,i,a),qe=Ge(Ne,i,mr.name||a);h=qe.error,a=qe.name,u=M(Ne)}else h=(await Je(c,f(o,a),K,t.shouldUseNativeValidation))[a],u=await E(!0);c._f.deps&&_e(c._f.deps),ve(!1,a,u,h,Ae)}},_e=async(s,l={})=>{let a,c;const h=ue(s);if(y.state.next({isValidating:!0}),t.resolver){const u=await J(D(s)?s:h);a=M(u),c=s?!h.some(m=>f(u,m)):a}else s?(c=(await Promise.all(h.map(async u=>{const m=f(i,u);return await G(m&&m._f?{[u]:m}:m)}))).every(Boolean),!(!c&&!r.isValid)&&E()):c=a=await G(i);return y.state.next({...!I(s)||b.isValid&&a!==r.isValid?{}:{name:s},...t.resolver?{isValid:a}:{},errors:r.errors,isValidating:!1}),l.shouldFocus&&!c&&De(i,u=>f(r.errors,u),s?h:g.mount),c},Me=s=>{const l={...n,...d.mount?o:{}};return D(s)?l:I(s)?f(l,s):s.map(a=>f(l,a))},Be=(s,l)=>({invalid:!!f((l||r).errors,s),isDirty:!!f((l||r).dirtyFields,s),isTouched:!!f((l||r).touchedFields,s),error:f((l||r).errors,s)}),dr=s=>{s?ue(s).forEach(l=>T(r.errors,l)):r.errors={},y.state.next({errors:r.errors})},yr=(s,l,a)=>{const c=(f(i,s,{_f:{}})._f||{}).ref;k(r.errors,s,{...l,ref:c}),y.state.next({name:s,errors:r.errors,isValid:!1}),a&&a.shouldFocus&&c&&c.focus&&c.focus()},hr=(s,l)=>be(s)?y.watch.subscribe({next:a=>s(C(void 0,l),a)}):C(s,l,!0),Fe=(s,l={})=>{for(const a of s?ue(s):g.mount)g.mount.delete(a),g.array.delete(a),f(i,a)&&(l.keepValue||(T(i,a),T(o,a)),!l.keepError&&T(r.errors,a),!l.keepDirty&&T(r.dirtyFields,a),!l.keepTouched&&T(r.touchedFields,a),!t.shouldUnregister&&!l.keepDefaultValue&&T(n,a));y.watch.next({}),y.state.next({...r,...l.keepDirty?{isDirty:v()}:{}}),!l.keepIsValid&&E()},Ve=(s,l={})=>{let a=f(i,s);const c=ye(l.disabled);return k(i,s,{_f:{...a&&a._f?a._f:{ref:{name:s}},name:s,mount:!0,...l}}),g.mount.add(s),a?c&&k(o,s,l.disabled?void 0:f(o,s,ke(a._f))):j(s,!0,l.value),{...c?{disabled:l.disabled}:{},...t.shouldUseNativeValidation?{required:!!l.required,min:te(l.min),max:te(l.max),minLength:te(l.minLength),maxLength:te(l.maxLength),pattern:te(l.pattern)}:{},name:s,onChange:Pe,onBlur:Pe,ref:h=>{if(h){Ve(s,l),a=f(i,s);const u=D(h.value)&&h.querySelectorAll&&h.querySelectorAll("input,select,textarea")[0]||h,m=xr(u),w=a._f.refs||[];if(m?w.find(z=>z===u):u===a._f.ref)return;k(i,s,{_f:{...a._f,...m?{refs:[...w.filter(we),u,...Array.isArray(f(n,s))?[{}]:[]],ref:{type:u.type,name:s}}:{ref:u}}}),j(s,!1,void 0,u)}else a=f(i,s,{}),a._f&&(a._f.mount=!1),(t.shouldUnregister||l.shouldUnregister)&&!(er(g.array,s)&&d.action)&&g.unMount.add(s)}}};return{control:{register:Ve,unregister:Fe,getFieldState:Be,_executeSchema:q,_getWatch:C,_getDirty:v,_updateValid:E,_removeUnmounted:A,_updateFieldArray:p,_getFieldArray:L,_subjects:y,_proxyFormState:b,get _fields(){return i},get _formValues(){return o},get _stateFlags(){return d},set _stateFlags(s){d=s},get _defaultValues(){return n},get _names(){return g},set _names(s){g=s},get _formState(){return r},set _formState(s){r=s},get _options(){return t},set _options(s){t={...t,...s}}},trigger:_e,register:Ve,handleSubmit:(s,l)=>async a=>{a&&(a.preventDefault&&a.preventDefault(),a.persist&&a.persist());let c=!0,h=Q(o);y.state.next({isSubmitting:!0});try{if(t.resolver){const{errors:u,values:m}=await q();r.errors=u,h=m}else await G(i);M(r.errors)?(y.state.next({errors:{},isSubmitting:!0}),await s(h,a)):(l&&await l({...r.errors},a),t.shouldFocusError&&De(i,u=>f(r.errors,u),g.mount))}catch(u){throw c=!1,u}finally{r.isSubmitted=!0,y.state.next({isSubmitted:!0,isSubmitting:!1,isSubmitSuccessful:M(r.errors)&&c,submitCount:r.submitCount+1,errors:r.errors})}},watch:hr,setValue:le,getValues:Me,reset:(s,l={})=>{const a=s||n,c=Q(a),h=s&&!M(s)?c:n;if(l.keepDefaultValues||(n=a),!l.keepValues){if(l.keepDirtyValues)for(const u of g.mount)f(r.dirtyFields,u)?k(h,u,f(o,u)):le(u,f(h,u));else{if(Ee&&D(s))for(const u of g.mount){const m=f(i,u);if(m&&m._f){const w=Array.isArray(m._f.refs)?m._f.refs[0]:m._f.ref;try{Ce(w)&&w.closest("form").reset();break}catch{}}}i={}}o=e.shouldUnregister?l.keepDefaultValues?Q(n):{}:c,y.array.next({values:h}),y.watch.next({values:h})}g={mount:new Set,unMount:new Set,array:new Set,watch:new Set,watchAll:!1,focus:""},d.mount=!b.isValid||!!l.keepIsValid,d.watch=!!e.shouldUnregister,y.state.next({submitCount:l.keepSubmitCount?r.submitCount:0,isDirty:l.keepDirty||l.keepDirtyValues?r.isDirty:!!(l.keepDefaultValues&&!ee(s,n)),isSubmitted:l.keepIsSubmitted?r.isSubmitted:!1,dirtyFields:l.keepDirty||l.keepDirtyValues?r.dirtyFields:l.keepDefaultValues&&s?Se(n,s):{},touchedFields:l.keepTouched?r.touchedFields:{},errors:l.keepErrors?r.errors:{},isSubmitting:!1,isSubmitSuccessful:!1})},resetField:(s,l={})=>{f(i,s)&&(D(l.defaultValue)?le(s,f(n,s)):(le(s,l.defaultValue),k(n,s,l.defaultValue)),l.keepTouched||T(r.touchedFields,s),l.keepDirty||(T(r.dirtyFields,s),r.isDirty=l.defaultValue?v(s,f(n,s)):v()),l.keepError||(T(r.errors,s),b.isValid&&E()),y.state.next({...r}))},clearErrors:dr,unregister:Fe,setError:yr,setFocus:(s,l={})=>{const a=f(i,s)._f,c=a.refs?a.refs[0]:a.ref;l.shouldSelect?c.select():c.focus()},getFieldState:Be}}function pr(e={}){const t=S.useRef(),[r,i]=S.useState({isDirty:!1,isValidating:!1,dirtyFields:{},isSubmitted:!1,submitCount:0,touchedFields:{},isSubmitting:!1,isSubmitSuccessful:!1,isValid:!1,errors:{}});t.current?t.current.control._options=e:t.current={...Cr(e),formState:r};const n=t.current.control,o=S.useCallback(d=>{sr(d,n._proxyFormState,!0)&&(n._formState={...n._formState,...d},i({...n._formState}))},[n]);return Re({subject:n._subjects.state,callback:o}),S.useEffect(()=>{n._stateFlags.mount||(n._proxyFormState.isValid&&n._updateValid(),n._stateFlags.mount=!0),n._stateFlags.watch&&(n._stateFlags.watch=!1,n._subjects.state.next({})),n._removeUnmounted()}),t.current.formState=tr(r,n._proxyFormState),t.current}const se=()=>{},Rr=B.createContext({setErrors:se,setValues:se,reset:se,clear:se,submit:se});function Qe(e){const{context:t,children:r,setErrors:i,setValues:n,reset:o,clear:d,submit:g}=e,V=B.useMemo(()=>({setErrors:i,setValues:n,reset:o,clear:d,submit:g}),[]);return Ie(vr,{...t,children:Ie(Rr.Provider,{value:V,children:r})})}try{Qe.displayName="FormProvider",Qe.__docgenInfo={description:"",displayName:"FormProvider",props:{context:{defaultValue:null,description:"React hook form context",name:"context",required:!0,type:{name:"UseFormReturn<FormValues, any>"}},handleSubmit:{defaultValue:null,description:"",name:"handleSubmit",required:!0,type:{name:"(e?: BaseSyntheticEvent<object, any, any> | undefined) => void | Promise<void>"}},handleReset:{defaultValue:null,description:"",name:"handleReset",required:!0,type:{name:"() => void"}},setErrors:{defaultValue:null,description:"",name:"setErrors",required:!0,type:{name:"FormActionSetErrors<FormValues>"}},setValues:{defaultValue:null,description:"",name:"setValues",required:!0,type:{name:"FormActionSetValues<FormValues>"}},reset:{defaultValue:null,description:"",name:"reset",required:!0,type:{name:"FormActionResetForm<FormValues>"}},clear:{defaultValue:null,description:"",name:"clear",required:!0,type:{name:"FormActionClearForm<FormValues>"}},submit:{defaultValue:null,description:"",name:"submit",required:!0,type:{name:"FormActionSubmitForm<FormValues>"}}}}}catch{}function ce(e){var t,r,i;if(Array.isArray(e)){for(r=Array(t=e.length);t--;)r[t]=(i=e[t])&&typeof i=="object"?ce(i):i;return r}if(Object.prototype.toString.call(e)==="[object Object]"){r={};for(t in e)t==="__proto__"?Object.defineProperty(r,t,{value:ce(e[t]),configurable:!0,enumerable:!0,writable:!0}):r[t]=(i=e[t])&&typeof i=="object"?ce(i):i;return r}return e}const ie=()=>{};function Xe(e){const{initialValues:t,onSubmit:r}=e,i=B.useRef(t!=null?ce(t):void 0),n=pr({defaultValues:i.current,mode:"onTouched",reValidateMode:"onChange",criteriaMode:"firstError",shouldUnregister:!1}),{handleSubmit:o,reset:d,trigger:g,setValue:V,setError:_,setFocus:x}=n,b=B.useRef({setErrors:ie,setValues:ie,reset:ie,clear:ie,submit:ie}),y=B.useCallback((p,F)=>{p.length>0&&(p.forEach(({name:j,message:H})=>{_(j,{type:"external-error",message:H},{shouldFocus:!1})}),F!=null&&F.shouldFocus&&x(p[0].name))},[_,x]),O=B.useCallback((p,F)=>{p.forEach(({name:j,value:H})=>{V(j,H,{shouldValidate:(F==null?void 0:F.shouldValidate)??!1,shouldDirty:(F==null?void 0:F.shouldDirty)??!1,shouldTouch:F==null?void 0:F.shouldTouch})})},[V]),$=B.useCallback(()=>{i.current!=null?d(i.current):d()},[d]),K=B.useCallback(()=>{d({})},[d]),X=B.useCallback(async p=>{if(await g())return r(p,b.current)},[g,r]),E=B.useMemo(()=>o(X),[o,X]);return B.useEffect(()=>{b.current={setErrors:y,setValues:O,reset:$,clear:K,submit:E}},[y,O,$,K,E]),{context:n,handleReset:$,handleSubmit:E,setErrors:y,setValues:O,reset:$,clear:K,submit:E}}try{Xe.displayName="useFormController",Xe.__docgenInfo={description:"",displayName:"useFormController",props:{initialValues:{defaultValue:null,description:"",name:"initialValues",required:!1,type:{name:"{}"}},onSubmit:{defaultValue:null,description:"",name:"onSubmit",required:!0,type:{name:"FormSubmitHandler<FormValues>"}}}}}catch{}export{Qe as F,Br as a,pe as b,Fr as c,_r as d,Rr as e,Xe as u};
//# sourceMappingURL=useFormController-QYTj16FN.js.map
