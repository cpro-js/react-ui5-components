import{e as a,i as d,t as h,b as l}from"./withWebComponent-uMO5mAaX.js";/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const u=a(class extends d{constructor(s){var e;if(super(s),s.type!==h.ATTRIBUTE||s.name!=="class"||((e=s.strings)===null||e===void 0?void 0:e.length)>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(s){return" "+Object.keys(s).filter(e=>s[e]).join(" ")+" "}update(s,[e]){var i,r;if(this.et===void 0){this.et=new Set,s.strings!==void 0&&(this.st=new Set(s.strings.join(" ").split(/\s/).filter(t=>t!=="")));for(const t in e)e[t]&&!(!((i=this.st)===null||i===void 0)&&i.has(t))&&this.et.add(t);return this.render(e)}const n=s.element.classList;this.et.forEach(t=>{t in e||(n.remove(t),this.et.delete(t))});for(const t in e){const o=!!e[t];o===this.et.has(t)||!((r=this.st)===null||r===void 0)&&r.has(t)||(o?(n.add(t),this.et.add(t)):(n.remove(t),this.et.delete(t)))}return l}});export{u as o};
//# sourceMappingURL=class-map-VCtLKyDB.js.map
