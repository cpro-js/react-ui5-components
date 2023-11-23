import{a as l,l as r,z as T,s as h,c as $,d as S,p as d,A as C,f as K,h as j,D as b,U,g as te,_ as Z,ao as G,ap as oe,aq as ne,ar as ie,ab as z,as as D,at as se,au as re,av as I,aw as ae,ax as B,ay as le,az as M,o as ce,q as N,aA as de,aB as R,j as he,k as O,m as ue,n as P,aC as pe,aD as _e,aE as ve,aF as fe,aG as me,aH as ke,aI as ge,r as J,C as be,Y as Te,Z as ye,aJ as xe}from"./withWebComponent-uMO5mAaX.js";import{s as k,b as E,R as A}from"./Popover-5NcXG5Re.js";import{I as we}from"./ItemNavigation-SKlyB5ng.js";import{S as $e}from"./ScrollEnablement-Ha971trf.js";import{d as g,k as y,f as Y,i as Se,v as Ce}from"./useIsomorphicLayoutEffect-xRq3KBKR.js";import{a as m}from"./ValueState-Qqn7Ekme.js";import{R as Ee}from"./slim-arrow-right-h-63TUj1.js";import{L as ze,S as De}from"./GroupHeaderListItem-NSzFLVaM.js";import{a as Ie}from"./Title-siMC53XU.js";import{b as Be}from"./Button-Kg1wKD-C.js";import{o as w}from"./class-map-VCtLKyDB.js";import{s as Me,a as Ne}from"./Suggestions.css-_W_4sSd4.js";import{s as Re}from"./ValueStateMessage.css-NtFaRvah.js";function Oe(s,e,t){return l`<div class="${w(this.classes.wrapper)}"><span id="${r(this._id)}-hiddenText" class="ui5-hidden-text">${r(this.tokenizerLabel)}</span><div class="${w(this.classes.content)}" @ui5-delete="${r(this._delete)}" @click="${this._click}" @mousedown="${this._onmousedown}" @keydown="${this._onkeydown}" @ui5-select="${r(this.onTokenSelect)}" role="listbox" aria-labelledby="${r(this._id)}-hiddenText">${T(this.tokens,(o,n)=>o._id||n,(o,n)=>Pe.call(this,s,e,t,o,n))}</div>${this.showNMore?Ae.call(this,s,e,t):void 0}</div>`}function Pe(s,e,t,o,n){return l`<slot name="${r(o._individualSlot)}"></slot>`}function Ae(s,e,t){return l`<span @click="${this._openMorePopoverAndFireEvent}" class="ui5-tokenizer-more-text" part="n-more-text">${r(this._nMoreText)}</span>`}function qe(s,e,t){return t?l`<${h("ui5-responsive-popover",e,t)} tokenizer-popover="true" style=${k(this.styles.popover)} ?content-only-on-desktop="${this.hasValueState}" hide-arrow placement-type="Bottom" horizontal-align="Left" @before-close=${this.handleBeforeClose} @before-open="${this.handleBeforeOpen}"><div slot="header" class="ui5-responsive-popover-header" style="${k(this.styles.popoverHeader)}">${this._isPhone?q.call(this,s,e,t):void 0}${this.hasValueState?void 0:L.call(this,s,e,t)}</div><${h("ui5-list",e,t)} class="ui5-tokenizer-list" mode="Delete" @ui5-item-delete=${r(this.itemDelete)}>${T(this._tokens,(o,n)=>o._id||n,(o,n)=>V.call(this,s,e,t,o,n))}</${h("ui5-list",e,t)}>${this._isPhone?W.call(this,s,e,t):void 0}</${h("ui5-responsive-popover",e,t)}>`:l`<ui5-responsive-popover tokenizer-popover="true" style=${k(this.styles.popover)} ?content-only-on-desktop="${this.hasValueState}" hide-arrow placement-type="Bottom" horizontal-align="Left" @before-close=${this.handleBeforeClose} @before-open="${this.handleBeforeOpen}"><div slot="header" class="ui5-responsive-popover-header" style="${k(this.styles.popoverHeader)}">${this._isPhone?q.call(this,s,e,t):void 0}${this.hasValueState?void 0:L.call(this,s,e,t)}</div><ui5-list class="ui5-tokenizer-list" mode="Delete" @ui5-item-delete=${r(this.itemDelete)}>${T(this._tokens,(o,n)=>o._id||n,(o,n)=>V.call(this,s,e,t,o,n))}</ui5-list>${this._isPhone?W.call(this,s,e,t):void 0}</ui5-responsive-popover>`}function q(s,e,t){return t?l`<div class="row" style="${k(this.styles.popoverHeaderTitle)}"><${h("ui5-title",e,t)} level="H5" class="ui5-responsive-popover-header-text">${r(this.morePopoverTitle)}</${h("ui5-title",e,t)}><${h("ui5-button",e,t)} class="ui5-responsive-popover-close-btn" icon="decline" design="Transparent" @click="${this.closeMorePopover}"></${h("ui5-button",e,t)}></div>`:l`<div class="row" style="${k(this.styles.popoverHeaderTitle)}"><ui5-title level="H5" class="ui5-responsive-popover-header-text">${r(this.morePopoverTitle)}</ui5-title><ui5-button class="ui5-responsive-popover-close-btn" icon="decline" design="Transparent" @click="${this.closeMorePopover}"></ui5-button></div>`}function L(s,e,t){return t?l`<div class="${w(this.classes.popoverValueState)}" style="${k(this.styles.popoverValueStateMessage)}"><${h("ui5-icon",e,t)} class="ui5-input-value-state-message-icon" name="${r(this._valueStateMessageIcon)}"></${h("ui5-icon",e,t)}>${T(this.valueStateMessageText,(o,n)=>o._id||n,(o,n)=>H.call(this,s,e,t,o,n))}</div>`:l`<div class="${w(this.classes.popoverValueState)}" style="${k(this.styles.popoverValueStateMessage)}"><ui5-icon class="ui5-input-value-state-message-icon" name="${r(this._valueStateMessageIcon)}"></ui5-icon>${T(this.valueStateMessageText,(o,n)=>o._id||n,(o,n)=>H.call(this,s,e,t,o,n))}</div>`}function H(s,e,t,o,n){return l`${r(o)}`}function V(s,e,t,o,n){return t?l`<${h("ui5-li",e,t)} .tokenRef=${r(o)} wrapping-type="Normal">${r(o.text)}</${h("ui5-li",e,t)}>`:l`<ui5-li .tokenRef=${r(o)} wrapping-type="Normal">${r(o.text)}</ui5-li>`}function W(s,e,t){return t?l`<div slot="footer" class="ui5-responsive-popover-footer"><${h("ui5-button",e,t)} id="ui5-tokenizer-dialog-confirm-btn" design="Emphasized" @click="${this.closeMorePopover}">OK</${h("ui5-button",e,t)}></div>`:l`<div slot="footer" class="ui5-responsive-popover-footer"><ui5-button id="ui5-tokenizer-dialog-confirm-btn" design="Emphasized" @click="${this.closeMorePopover}">OK</ui5-button></div>`}g("@ui5/webcomponents-theming","sap_horizon",async()=>$);g("@ui5/webcomponents","sap_horizon",async()=>S);const Le={packageName:"@ui5/webcomponents",fileName:"themes/Tokenizer.css",content:'.ui5-hidden-text{clip:rect(1px,1px,1px,1px);font-size:0;left:-1000px;pointer-events:none;position:absolute;top:-1000px;user-select:none}:host{border:1px solid #000;box-sizing:border-box;display:inline-block;height:2.25rem}.ui5-tokenizer-root{align-items:center;box-sizing:border-box;display:flex;font-family:"72override",var(--sapFontFamily);height:100%;overflow-x:scroll}.ui5-tokenizer-no-padding{padding:0}.ui5-tokenizer-root.ui5-tokenizer-nmore--wrapper{overflow:hidden}.ui5-tokenizer--token--wrapper{align-items:center;box-sizing:border-box;display:inline-flex;height:100%}:host([expanded]) .ui5-tokenizer--content{display:inline-flex;overflow:hidden;white-space:nowrap}.ui5-tokenizer--content{align-items:center;box-sizing:border-box;display:flex;flex-wrap:nowrap;height:100%;overflow:hidden;padding-inline-start:var(--_ui5-v1-19-1_tokenizer_padding)}:host([_tokens-count="1"]) .ui5-tokenizer--content{box-sizing:border-box;flex:1;max-width:100%;padding-inline-end:4px}.ui5-tokenizer-more-text{color:var(--_ui5-v1-19-1_tokenizer_n_more_text_color);cursor:pointer;display:inline-block;font-size:var(--sapFontSize);font-weight:400;margin-inline-start:.25rem;white-space:nowrap}'};g("@ui5/webcomponents-theming","sap_horizon",async()=>$);g("@ui5/webcomponents","sap_horizon",async()=>S);const He={packageName:"@ui5/webcomponents",fileName:"themes/TokenizerPopover.css",content:"[ui5-responsive-popover]::part(content),[ui5-responsive-popover]::part(header){padding:0}#ui5-tokenizer-dialog-confirm-btn{height:100%;min-width:4rem}[ui5-responsive-popover]{margin-top:var(--_ui5-v1-19-1_tokenizer-popover_offset);margin-inline-start:calc(var(--_ui5-v1-19-1_tokenizer_padding)*-1)}"};var _=function(s,e,t,o){var n=arguments.length,i=n<3?e:o===null?o=Object.getOwnPropertyDescriptor(e,t):o,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(s,e,t,o);else for(var c=s.length-1;c>=0;c--)(a=s[c])&&(i=(n<3?a(i):n>3?a(e,t,i):a(e,t))||i);return n>3&&i&&Object.defineProperty(e,t,i),i},v,F;(function(s){s.cut="cut",s.copy="copy"})(F||(F={}));let u=v=class extends U{_handleResize(){this._nMoreCount=this.overflownTokens.length}constructor(){super(),this._resizeHandler=this._handleResize.bind(this),this._itemNav=new we(this,{currentIndex:-1,getItemsCallback:this._getVisibleTokens.bind(this)}),this._scrollEnablement=new $e(this)}onBeforeRendering(){this._nMoreCount=this.overflownTokens.length,this._tokensCount=this._getTokens().length,this._tokens.forEach(e=>{e.singleToken=this._tokens.length===1}),this._tokens.length||this.closeMorePopover()}onEnterDOM(){A.register(this.contentDom,this._resizeHandler)}onExitDOM(){A.deregister(this.contentDom,this._resizeHandler)}async _openMorePopoverAndFireEvent(){this.preventPopoverOpen||await this.openMorePopover(),this.fireEvent("show-more-items-press")}async openMorePopover(){(await this.getPopover()).showAt(this.morePopoverOpener||this)}_getTokens(){return this.getSlottedNodes("tokens")}get _tokens(){return this.getSlottedNodes("tokens")}_onmousedown(e){if(e.target.hasAttribute("ui5-token")){const t=e.target;t.toBeDeleted||this._itemNav.setCurrentItem(t)}}onTokenSelect(){const e=this._getTokens();e.length===1&&e[0].isTruncatable&&(e[0].selected?this.openMorePopover():this.closeMorePopover())}_getVisibleTokens(){return this.disabled?[]:this._tokens.filter((e,t)=>t<this._tokens.length-this._nMoreCount)}async onAfterRendering(){this._getTokens().length||(await this.getPopover()).close(),this._scrollEnablement.scrollContainer=this.expanded||!this.narrowContentDom?this.expandedContentDom:this.narrowContentDom,this.expanded&&(this._expandedScrollWidth=this.expandedContentDom.scrollWidth,this.scrollToEnd()),this.expanded||this.scrollToStart()}_delete(e){const t=e.target;if(!e.detail){this._tokenClickDelete(e,t),this._getTokens().length&&this.closeMorePopover();return}this._selectedTokens.length?this._selectedTokens.forEach(o=>this.deleteToken(o,e.detail.backSpace)):this.deleteToken(t,e.detail.backSpace)}_tokenClickDelete(e,t){const o=this._getVisibleTokens(),n=e.target,i=t?o.indexOf(t):o.indexOf(n),a=i===o.length-1?i-1:i+1,c=o[a];this._handleCurrentItemAfterDeletion(c),this.fireEvent("token-delete",{ref:t||n})}_handleCurrentItemAfterDeletion(e){e&&!y()&&(this._itemNav.setCurrentItem(e),setTimeout(()=>{e.focus()},0))}deleteToken(e,t){const o=this._getVisibleTokens(),n=o.indexOf(e);let i=n===o.length-1?n-1:n+1;const a=o.filter(ee=>!ee.selected);t?i=n===0?n+1:n-1:i=n===o.length-1?n-1:n+1;let c=o[i];if(a.length>1)for(;c&&c.selected;)c=t?o[--i]:o[++i];else c=a[0];this._handleCurrentItemAfterDeletion(c),this.fireEvent("token-delete",{ref:e})}async itemDelete(e){const t=e.detail.item.tokenRef;if(this._getTokens().length===1&&this._getTokens()[0].isTruncatable){const o=await this.getPopover();o.addEventListener("ui5-after-close",()=>{this.fireEvent("token-delete",{ref:t})},{once:!0}),o.close()}else this.fireEvent("token-delete",{ref:t})}handleBeforeClose(){y()&&this._getTokens().forEach(e=>{e.selected=!1})}handleBeforeOpen(){this.fireEvent("before-more-popover-open")}_onkeydown(e){if(te(e)&&e.preventDefault(),Z(e)||G(e))return e.preventDefault(),this._handleTokenSelection(e,!1);oe(e)&&this._handleHomeShift(e),ne(e)&&this._handleEndShift(e),this._handleItemNavigation(e,this._tokens)}_handleItemNavigation(e,t){const o=!!(e.metaKey||e.ctrlKey),n=e.target;if(ie(e)||z(e)||D(e)||se(e))return this._handleArrowCtrl(e,n,t,z(e)||D(e));if(re(e)||I(e)||ae(e)||B(e)||le(e)||M(e))return e.preventDefault(),this._handleArrowShift(n,t,I(e)||M(e)||B(e));if(ce(e)||N(e)||de(e)||R(e))return e.preventDefault(),this._handleHome(t,N(e)||R(e));if(o&&e.key.toLowerCase()==="a")return e.preventDefault(),this._toggleTokenSelection(t);if(he(e)||O(e)||ue(e)||P(e)){const i=this._calcNextTokenIndex(this._tokens.find(a=>a.focused),t,O(e)||P(e));this._scrollToToken(t[i])}}_handleHome(e,t){if(!e||!e.length)return-1;const o=t?e.length-1:0;e[o].focus(),this._itemNav.setCurrentItem(e[o])}_handleHomeShift(e){const t=this.tokens,o=e.target,n=t.indexOf(o);t.filter((i,a)=>a<=n).forEach(i=>{i.selected=!0}),t[0].focus(),this._itemNav.setCurrentItem(t[0])}_handleEndShift(e){const t=this.tokens,o=e.target,n=t.indexOf(o);t.filter((i,a)=>a>=n).forEach(i=>{i.selected=!0}),t[t.length-1].focus(),this._itemNav.setCurrentItem(t[t.length-1])}_calcNextTokenIndex(e,t,o){if(!t.length)return-1;const n=t.indexOf(e);let i=o?n+1:n-1;return i>=t.length&&(i=t.length-1),i<0&&(i=0),i}_handleArrowCtrl(e,t,o,n){const i=this._calcNextTokenIndex(t,o,n);e.preventDefault(),i!==-1&&(setTimeout(()=>{o[i].focus()},0),this._scrollToToken(o[i]),this._itemNav.setCurrentItem(o[i]))}_handleArrowShift(e,t,o){const n=t.indexOf(e),i=o?n+1:n-1;i===-1||i===t.length||(e.selected=!0,t[i].selected=!0,setTimeout(()=>{t[i].focus()},0),this._scrollToToken(t[i]),this._itemNav.setCurrentItem(t[i]))}_click(e){this._handleTokenSelection(e)}_toggleTokenSelection(e){if(!e||!e.length)return;const t=e.every(o=>o.selected);e.forEach(o=>{o.selected=!t})}_handleTokenSelection(e,t=!0){const o=e.target;o.hasAttribute("ui5-token")&&(t?this._tokens:[]).forEach(i=>{i!==o&&(i.selected=!1)})}_fillClipboard(e,t){const o=t.filter(i=>i.selected).map(i=>i.text).join(`\r
`),n=i=>{i.clipboardData&&i.clipboardData.setData("text/plain",o),i.preventDefault()};document.addEventListener(e,n),document.execCommand(e),document.removeEventListener(e,n)}scrollToStart(){this._scrollEnablement.scrollContainer&&this._scrollEnablement.scrollTo(0,0)}scrollToEnd(){const e=this.expandedContentDom&&(this.effectiveDir!=="rtl"?this.expandedContentDom.scrollWidth:-this.expandedContentDom.scrollWidth);this._scrollEnablement.scrollContainer&&this._scrollEnablement.scrollTo(e,0,5,10)}_scrollToToken(e){if(!this.expandedContentDom)return;const t=e.getBoundingClientRect(),o=this.expandedContentDom.getBoundingClientRect();t.left<o.left?this._scrollEnablement.scrollTo(this.expandedContentDom.scrollLeft-(o.left-t.left+5),0):t.right>o.right&&this._scrollEnablement.scrollTo(this.expandedContentDom.scrollLeft+(t.right-o.right+5),0)}async closeMorePopover(){(await this.getPopover()).close(!1,!1,!0)}get _nMoreText(){return this._getVisibleTokens().length?v.i18nBundle.getText(pe,this._nMoreCount):v.i18nBundle.getText(_e,this._nMoreCount)}get showNMore(){return!this.expanded&&this.showMore&&!!this.overflownTokens.length}get contentDom(){return this.shadowRoot.querySelector(".ui5-tokenizer--content")}get expandedContentDom(){return this.shadowRoot.querySelector(".ui5-tokenizer-expanded--content")}get narrowContentDom(){return this.shadowRoot.querySelector(".ui5-tokenizer-nmore--content")}get tokenizerLabel(){return v.i18nBundle.getText(ve)}get morePopoverTitle(){return v.i18nBundle.getText(fe)}get overflownTokens(){return this.contentDom?(this._getTokens().forEach(e=>{e.overflows=!1}),this._getTokens().filter(e=>{const t=this.contentDom.getBoundingClientRect(),o=e.getBoundingClientRect(),n=Number(o.right.toFixed(2)),i=Number(t.right.toFixed(2)),a=Number(o.left.toFixed(2)),c=Number(t.left.toFixed(2));return e.overflows=!this.expanded&&(a<c||n>i),e.overflows})):[]}get hasValueState(){return this.valueState===m.None||this.valueState===m.Success}get valueStateMessageText(){return this.getSlottedNodes("valueStateMessage").map(e=>e.cloneNode(!0))}get _valueStateMessageIcon(){const e={Error:"error",Warning:"alert",Success:"sys-enter-2",Information:"information"};return this.valueState!==m.None?e[this.valueState]:""}get _isPhone(){return y()}get _selectedTokens(){return this._getTokens().filter(e=>e.selected)}get classes(){return{wrapper:{"ui5-tokenizer-root":!0,"ui5-tokenizer-nmore--wrapper":this.showMore,"ui5-tokenizer-no-padding":!this._getTokens().length},content:{"ui5-tokenizer--content":!0,"ui5-tokenizer-expanded--content":!this.showNMore,"ui5-tokenizer-nmore--content":this.showNMore},popoverValueState:{"ui5-valuestatemessage-root":!0,"ui5-responsive-popover-header":!0,"ui5-valuestatemessage--success":this.valueState===m.Success,"ui5-valuestatemessage--error":this.valueState===m.Error,"ui5-valuestatemessage--warning":this.valueState===m.Warning,"ui5-valuestatemessage--information":this.valueState===m.Information}}}get styles(){return{popover:{"min-width":this.popoverMinWidth?`${this.popoverMinWidth}px`:""},popoverValueStateMessage:{width:this.popoverMinWidth&&!y()?`${this.popoverMinWidth}px`:"100%","min-height":"2rem"},popoverHeader:{"min-height":"2rem"},popoverHeaderTitle:{"justify-content":"left"}}}_tokensCountText(){const e=this._getTokens().length;return e===0?v.i18nBundle.getText(me):e===1?v.i18nBundle.getText(ke):v.i18nBundle.getText(ge,e)}_focusLastToken(){if(this.tokens.length===0)return;const e=this.tokens[this.tokens.length-1];e.focus(),this._itemNav.setCurrentItem(e)}static async onDefine(){v.i18nBundle=await Y("@ui5/webcomponents")}async getPopover(){return(await this.getStaticAreaItemDomRef()).querySelector("[ui5-responsive-popover]")}};_([d({type:Boolean})],u.prototype,"showMore",void 0);_([d({type:Boolean})],u.prototype,"disabled",void 0);_([d({type:Boolean})],u.prototype,"preventPopoverOpen",void 0);_([d({type:Boolean})],u.prototype,"expanded",void 0);_([d({type:Object})],u.prototype,"morePopoverOpener",void 0);_([d({validator:E})],u.prototype,"popoverMinWidth",void 0);_([d({type:m,defaultValue:m.None})],u.prototype,"valueState",void 0);_([d({validator:E})],u.prototype,"_nMoreCount",void 0);_([d({validator:E})],u.prototype,"_tokensCount",void 0);_([C({type:HTMLElement,default:!0,individualSlots:!0})],u.prototype,"tokens",void 0);_([C()],u.prototype,"valueStateMessage",void 0);u=v=_([K({tag:"ui5-tokenizer",languageAware:!0,renderer:j,template:Oe,styles:Le,staticAreaStyles:[Me,Re,Ne,He],staticAreaTemplate:qe,dependencies:[Ee,ze,De,Ie,Be]}),b("token-delete",{detail:{ref:{type:HTMLElement}}}),b("show-more-items-press",{detail:{ref:{type:HTMLElement}}}),b("before-more-popover-open",{detail:{}})],u);u.define();const vt=u,Ve="sys-cancel",Q="M512 256q0 54-20 100.5t-54.5 81T356 492t-100 20q-54 0-100.5-20t-81-55T20 355.5 0 256t20.5-100 55-81.5T157 20t99-20q53 0 100 20t81.5 54.5T492 156t20 100zm-32 0q0-47-17.5-87.5t-48-71-71.5-48T256 32t-87 18-71.5 48.5-48 71T32 256q0 47 17.5 88t48 71 71.5 47.5 87 17.5q47 0 88-17.5t71-47.5 47.5-71 17.5-88zm-186-7q-5 3-1 9l89 89q9 8 0 17l-16 17q-8 4-9 4t-9-4l-89-89q-1-2-4-2-4 0-5 2l-88 89q-6 4-9 4-1 0-9-4l-16-17q-8-9 0-17l88-89q5-5 0-9l-88-89q-8-9 0-17l16-17q4-4 9-4t9 4l88 89q2 2 5 2 2 0 4-2l89-89q4-4 9-4t9 4l16 17q9 8 0 17z",We=!1,Fe="SAP-icons-v4",Ke="@ui5/webcomponents-icons";J(Ve,{pathData:Q,ltr:We,collection:Fe,packageName:Ke});const je="sys-cancel",X="M256 0q53 0 99.5 20T437 75t55 81.5 20 99.5-20 99.5-55 81.5-81.5 55-99.5 20-99.5-20T75 437t-55-81.5T0 256t20-99.5T75 75t81.5-55T256 0zm0 461q42 0 79.5-16t65.5-44 44-65.5 16-79.5-16-79.5-44-65.5-65.5-44T256 51t-79.5 16-65.5 44-44 65.5T51 256t16 79.5 44 65.5 65.5 44 79.5 16zm70-301q11 0 18.5 7.5T352 186t-7 18l-53 52 53 52q7 7 7 18t-7.5 18.5T326 352q-10 0-18-8l-52-52-52 52q-8 8-18 8-11 0-18.5-7.5T160 326q0-10 8-18l52-52-52-52q-8-8-8-18 0-11 7.5-18.5T186 160t18 7l52 53 52-53q7-7 18-7z",Ue=!1,Ze="SAP-icons-v5",Ge="@ui5/webcomponents-icons";J(je,{pathData:X,ltr:Ue,collection:Ze,packageName:Ge});Se();function Je(s,e,t){return l`<div tabindex="${r(this._tabIndex)}" @click="${this._handleSelect}" @focusin="${this._focusin}" @focusout="${this._focusout}" @keydown="${this._keydown}" class="ui5-token--wrapper" role="option" aria-selected="${r(this.selected)}"><span class="ui5-token--text">${r(this.text)}</span>${this.readonly?void 0:Ye.call(this,s,e,t)}</div>`}function Ye(s,e,t){return l`<div class="ui5-token--icon">${this.closeIcon.length?Qe.call(this,s,e,t):Xe.call(this,s,e,t)}</div>`}function Qe(s,e,t){return l`<slot name="closeIcon" @click="${this._delete}"></slot>`}function Xe(s,e,t){return t?l`<${h("ui5-icon",e,t)} name="${r(this.iconURI)}" accessible-name="${r(this.tokenDeletableText)}" show-tooltip @click="${this._delete}"></${h("ui5-icon",e,t)}>`:l`<ui5-icon name="${r(this.iconURI)}" accessible-name="${r(this.tokenDeletableText)}" show-tooltip @click="${this._delete}"></ui5-icon>`}g("@ui5/webcomponents-theming","sap_horizon",async()=>$);g("@ui5/webcomponents","sap_horizon",async()=>S);const et={packageName:"@ui5/webcomponents",fileName:"themes/Token.css",content:':host{background:var(--_ui5-v1-19-1_token_background);border:var(--sapButton_BorderWidth) solid var(--sapButton_TokenBorderColor);border-radius:var(--_ui5-v1-19-1_token_border_radius);box-sizing:border-box;color:var(--_ui5-v1-19-1_token_text_color);display:inline-block;height:var(--_ui5-v1-19-1_token_height)}:host(:not([single-token])){margin-inline-end:var(--_ui5-v1-19-1_token_right_margin)}:host([overflows]){display:none}:host(:not([readonly]):hover){background:var(--sapButton_Hover_Background);border-color:var(--_ui5-v1-19-1_token_hover_border_color)}:host([selected]:not([readonly])){color:var(--sapButton_Selected_TextColor)}:host([selected]:not([readonly])){background:var(--sapButton_Selected_Background);border:var(--sapButton_BorderWidth) solid var(--sapButton_Selected_BorderColor)}:host([selected]:not([readonly])) .ui5-token--wrapper{border-bottom:var(--_ui5-v1-19-1_token_selected_internal_border_bottom);border-bottom-left-radius:var(--_ui5-v1-19-1_token_selected_internal_border_bottom_radius);border-bottom-right-radius:var(--_ui5-v1-19-1_token_selected_internal_border_bottom_radius)}:host([selected]:not([readonly]):hover){background:var(--sapButton_Selected_Hover_Background);border-color:var(--_ui5-v1-19-1_token_selected_hover_border_color)}:host([readonly]){background:var(--_ui5-v1-19-1_token_readonly_background);border-color:var(--sapField_ReadOnly_BorderColor);color:var(--_ui5-v1-19-1_token_readonly_color)}:host([readonly]) .ui5-token--wrapper{padding:var(--_ui5-v1-19-1_token_readonly_padding)}:host([selected]) .ui5-token--wrapper:focus{outline:var(--_ui5-v1-19-1_token_selected_focus_outline)}:host([selected]:not([readonly])) .ui5-token--icon,:host([selected]:not([readonly])) .ui5-token--text{position:relative;top:var(--_ui5-v1-19-1_token_text_icon_top)}:host([focused][selected]:not([readonly]):not(:hover)){background:var(--sapButton_Selected_Background);border:var(--_ui5-v1-19-1_token_focused_selected_border);color:var(--sapButton_Selected_TextColor)}.ui5-token--wrapper{align-items:center;box-sizing:border-box;cursor:default;display:flex;font-family:"72override",var(--sapFontFamily);font-size:var(--sapFontSize);height:100%;padding-inline-start:var(--_ui5-v1-19-1_token_left_padding);user-select:none;width:100%}.ui5-token--wrapper{position:relative}:host([selected]) .ui5-token--wrapper{font-family:var(--_ui5-v1-19-1_token_selected_text_font_family)}.ui5-token--wrapper:focus{outline:var(--_ui5-v1-19-1_token_focus_outline);outline-offset:var(--_ui5-v1-19-1_token_outline_offset)}.ui5-token--wrapper:focus:after{border:var(--sapContent_FocusWidth) var(--sapContent_FocusStyle) var(--sapContent_FocusColor);border-radius:var(--_ui5-v1-19-1_token_focus_outline_border_radius);bottom:var(--_ui5-v1-19-1_token_focus_offset);content:var(--ui5-v1-19-1_token_focus_pseudo_element_content);left:var(--_ui5-v1-19-1_token_focus_offset);pointer-events:none;position:absolute;right:var(--_ui5-v1-19-1_token_focus_offset);top:var(--_ui5-v1-19-1_token_focus_offset);z-index:2}:host([focused][selected]:not([readonly])) .ui5-token--wrapper:focus:after{bottom:var(--_ui5-v1-19-1_token_selected_focused_offset_bottom)}.ui5-token--text{white-space:nowrap}.ui5-token--icon{display:flex}:host([selected]) .ui5-token--icon>[ui5-icon],:host([selected]) ::slotted([ui5-icon]){color:var(--sapButton_Selected_TextColor)}.ui5-token--icon>[ui5-icon],::slotted([ui5-icon]){color:inherit;color:var(--sapContent_IconColor);cursor:pointer;height:var(--_ui5-v1-19-1_token_icon_size);padding:var(--_ui5-v1-19-1_token_icon_padding);width:var(--_ui5-v1-19-1_token_icon_size)}:host([single-token]){max-width:100%}:host([single-token]) .ui5-token--wrapper{max-width:100%}:host([single-token]) .ui5-token--text{max-width:100%;overflow:hidden;text-overflow:ellipsis}'};var f=function(s,e,t,o){var n=arguments.length,i=n<3?e:o===null?o=Object.getOwnPropertyDescriptor(e,t):o,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(s,e,t,o);else for(var c=s.length-1;c>=0;c--)(a=s[c])&&(i=(n<3?a(i):n>3?a(e,t,i):a(e,t))||i);return n>3&&i&&Object.defineProperty(e,t,i),i},x;let p=x=class extends U{_handleSelect(){this.toBeDeleted||(this.selected=!this.selected,this.fireEvent("select"))}_focusin(){this.focused=!0}_focusout(){this.focused=!this.focused}_delete(){this.toBeDeleted=!0,this.fireEvent("delete")}_keydown(e){const t=Te(e),o=ye(e);!this.readonly&&(t||o)&&(e.preventDefault(),this.fireEvent("delete",{backSpace:t,delete:o})),(Z(e)||G(e))&&(e.preventDefault(),this._handleSelect())}onBeforeRendering(){this.toBeDeleted=!1}get tokenDeletableText(){return x.i18nBundle.getText(xe)}get iconURI(){return Ce().includes("sap_belize")?"sys-cancel":"decline"}get textDom(){var e;return(e=this.getDomRef())==null?void 0:e.querySelector(".ui5-token--text")}get isTruncatable(){return this.textDom?Math.ceil(this.textDom.getBoundingClientRect().width)<Math.ceil(this.textDom.scrollWidth):!1}static async onDefine(){x.i18nBundle=await Y("@ui5/webcomponents")}};f([d()],p.prototype,"text",void 0);f([d({type:Boolean})],p.prototype,"readonly",void 0);f([d({type:Boolean})],p.prototype,"selected",void 0);f([d({type:Boolean})],p.prototype,"overflows",void 0);f([d({type:Boolean})],p.prototype,"singleToken",void 0);f([d({type:Boolean})],p.prototype,"focused",void 0);f([d({type:Boolean})],p.prototype,"toBeDeleted",void 0);f([d({defaultValue:"-1",noAttribute:!0})],p.prototype,"_tabIndex",void 0);f([C()],p.prototype,"closeIcon",void 0);p=x=f([K({tag:"ui5-token",languageAware:!0,renderer:j,template:Je,styles:et,dependencies:[be]}),b("select"),b("delete",{detail:{backSpace:{type:Boolean},delete:{type:Boolean}}})],p);p.define();const mt=p,kt=s=>(s.length&&s.endsWith(`\r
`)?s.substring(0,s.lastIndexOf(`\r
`)):s).split(/\r\n|\r|\n|\t/g);export{F as C,vt as T,mt as a,kt as h};
//# sourceMappingURL=PasteHandler-M9lQqGah.js.map
