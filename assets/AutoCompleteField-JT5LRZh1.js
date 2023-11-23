import{j as l}from"./useIsomorphicLayoutEffect-xRq3KBKR.js";import"./formSupport-Tri1jE22.js";import{r as t}from"./index-9BFB80ap.js";import{a as h}from"./useFormController-QYTj16FN.js";import{A as g}from"./AutoComplete-yCp6H6z6.js";import{u as v}from"./FormI18n-cauWpAAl.js";import{h as u}from"./util-OqSjx520.js";import{V as d}from"./ValueState-Qqn7Ekme.js";const m=t.forwardRef(({name:n,required:a,...p},c)=>{const i=t.useMemo(()=>({required:a}),[a]),f=v(n,i),{field:e,fieldState:o}=h({name:n,rules:i}),r=t.useRef();t.useImperativeHandle(c,()=>({focus(){r.current!=null&&r.current.focus()}})),t.useImperativeHandle(e.ref,()=>r.current);const s=u(o.error)?f(o.error,e.value):void 0;return l(g,{...p,ref:r,name:e.name,value:e.value,onValueChange:e.onChange,valueState:u(o.error)?d.Error:d.None,valueStateMessage:s!=null&&l("div",{slot:"valueStateMessage",children:s}),onBlur:e.onBlur,required:a})});try{m.displayName="AutoCompleteField",m.__docgenInfo={description:"",displayName:"AutoCompleteField",props:{itemValue:{defaultValue:null,description:`Controls which value / key is used to identify an option.
This is used by suggestions, if not overridden
by <code>renderSuggestion</code>.

By default the prop <code>value</code> is used.
You can pass either a string, which represents a different prop or a render function.`,name:"itemValue",required:!1,type:{name:"string | ((value: T) => string)"}},itemLabel:{defaultValue:null,description:`Controls which text is used to display options.
Used by suggestions, if not overridden
by <code>renderSuggestion</code>

By default the prop <code>label</code> is used.
You can pass either a string, which represents a different prop or a render function.`,name:"itemLabel",required:!1,type:{name:"string | ((value: T) => string)"}},minCharsForSearch:{defaultValue:null,description:`Minimum number of characters before search is triggered.
Default: 1.`,name:"minCharsForSearch",required:!1,type:{name:"number"}},itemProps:{defaultValue:null,description:"Render <code>SuggestionItem</code>s from UI5.",name:"itemProps",required:!1,type:{name:"((item: T) => Partial<SuggestionItemPropTypes>)"}},onInputChange:{defaultValue:null,description:`Change handler that allows to access the new inputValue
@param inputValue updated input value
@param event event that lead to that change`,name:"onInputChange",required:!1,type:{name:"((inputValue: string, event: Ui5CustomEvent<InputDomRef, never>) => void)"}},forceSelection:{defaultValue:null,description:`If user doesn't select a suggested value, her input will be lost if this prop is set to true.
Default: true;`,name:"forceSelection",required:!1,type:{name:"boolean"}},loadItems:{defaultValue:null,description:`The search method to use in order to generate items.
This method is fired on every key press.
@param searchTerm the entered value
@returns Promise of the items to use for showing items`,name:"loadItems",required:!0,type:{name:"(searchTerm: string) => Promise<T[]>"}},initialItems:{defaultValue:null,description:"Initial items matching the initial value",name:"initialItems",required:!1,type:{name:"T[]"}},name:{defaultValue:null,description:"",name:"name",required:!0,type:{name:"string"}},ref:{defaultValue:null,description:"",name:"ref",required:!1,type:{name:"Ref<FormFieldElement>"}}}}}catch{}export{m as A};
//# sourceMappingURL=AutoCompleteField-JT5LRZh1.js.map
