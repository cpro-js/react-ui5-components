import{j as u}from"./useIsomorphicLayoutEffect-xRq3KBKR.js";import"./formSupport-Tri1jE22.js";import{r}from"./index-9BFB80ap.js";import{a as y}from"./useFormController-QYTj16FN.js";import{M}from"./MultiSelect-Cjpy8Qw_.js";import{u as V}from"./FormI18n-cauWpAAl.js";import{h as m}from"./util-OqSjx520.js";import{V as d}from"./ValueState-Qqn7Ekme.js";const f=r.forwardRef(({name:a,required:l,...c},p)=>{const i=r.useMemo(()=>({required:l}),[l]),g=V(a,i),{field:e,fieldState:n}=y({name:a,rules:i}),t=r.useRef();r.useImperativeHandle(p,()=>({focus(){t.current!=null&&t.current.focus()}})),r.useImperativeHandle(e.ref,()=>t.current);const s=m(n.error)?g(n.error,e.value):void 0;return u(M,{...c,ref:t,name:e.name,value:e.value,onSelectionChange:(o,v)=>{e.onChange(v)},valueState:m(n.error)?d.Error:d.None,valueStateMessage:s!=null&&u("div",{slot:"valueStateMessage",children:s}),onBlur:o=>{o.target.open&&o.relatedTarget!=null||e.onBlur()},required:l})});try{f.displayName="MultiSelectField",f.__docgenInfo={description:"",displayName:"MultiSelectField",props:{items:{defaultValue:null,description:"",name:"items",required:!1,type:{name:"Item[]"}},itemValue:{defaultValue:null,description:"",name:"itemValue",required:!1,type:{name:"string | number | symbol | ((value: Item) => string)"}},itemLabel:{defaultValue:null,description:"",name:"itemLabel",required:!1,type:{name:"string | number | symbol | ((value: Item) => string)"}},name:{defaultValue:null,description:"",name:"name",required:!0,type:{name:"string"}},ref:{defaultValue:null,description:"",name:"ref",required:!1,type:{name:"Ref<FormFieldElement>"}}}}}catch{}export{f as M};
//# sourceMappingURL=MultiSelectField-c6R2S15U.js.map
