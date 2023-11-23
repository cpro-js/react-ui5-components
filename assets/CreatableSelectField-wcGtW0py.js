import{j as s}from"./useIsomorphicLayoutEffect-xRq3KBKR.js";import"./formSupport-Tri1jE22.js";import{r as t}from"./index-9BFB80ap.js";import{a as h}from"./useFormController-QYTj16FN.js";import{C as g}from"./CreatableSelect--wfQMTIN.js";import{u as v}from"./FormI18n-cauWpAAl.js";import{h as u}from"./util-OqSjx520.js";import{V as d}from"./ValueState-Qqn7Ekme.js";const p=t.forwardRef(({name:n,required:r,...m},c)=>{const i=t.useMemo(()=>({required:r}),[r]),f=v(n,i),{field:e,fieldState:l}=h({name:n,rules:i}),a=t.useRef();t.useImperativeHandle(c,()=>({focus(){a.current!=null&&a.current.focus()}})),t.useImperativeHandle(e.ref,()=>a.current);const o=u(l.error)?f(l.error,e.value):void 0;return s(g,{...m,ref:a,name:e.name,value:e.value,onValueChange:e.onChange,valueState:u(l.error)?d.Error:d.None,valueStateMessage:o!=null&&s("div",{slot:"valueStateMessage",children:o}),onBlur:e.onBlur,required:r})});try{p.displayName="CreatableSelectField",p.__docgenInfo={description:"",displayName:"CreatableSelectField",props:{items:{defaultValue:null,description:"Suggestions to show",name:"items",required:!0,type:{name:"T[]"}},itemValue:{defaultValue:null,description:`Controls which value / key is used to identify an option.
This is used by suggestions, if not overridden
by <code>renderSuggestion</code>.

By default the prop <code>value</code> is used.
You can pass either a string, which represents a different prop or a render function.`,name:"itemValue",required:!1,type:{name:"string | ((value: T) => string)"}},itemLabel:{defaultValue:null,description:`Controls which text is used to display options.
Used by suggestions, if not overridden
by <code>renderSuggestion</code>

By default the prop <code>label</code> is used.
You can pass either a string, which represents a different prop or a render function.`,name:"itemLabel",required:!1,type:{name:"string | ((value: T) => string)"}},filterItem:{defaultValue:null,description:`Custom filter method to display only items matching the search term.

Note: provide null to disable filtering
@param suggestionValue`,name:"filterItem",required:!1,type:{name:"((inputValue: string, item: T) => boolean) | null"}},itemProps:{defaultValue:null,description:"Render <code>SuggestionItem</code>s from UI5.",name:"itemProps",required:!1,type:{name:"((item: T) => Partial<SuggestionItemPropTypes>)"}},onInputChange:{defaultValue:null,description:`Change handler that allows to access the new inputValue
@param inputValue updated input value
@param event event that lead to that change`,name:"onInputChange",required:!1,type:{name:"((inputValue: string, event: Ui5CustomEvent<InputDomRef, never>) => void)"}},forceSelection:{defaultValue:null,description:`If user doesn't select a suggested value, her input will be lost if this prop is set to true.
Default: true;`,name:"forceSelection",required:!1,type:{name:"boolean"}},formatCreateLabel:{defaultValue:null,description:`Gets the label for the "create new ..." option in the menu. Is given the current input value.
@param inputValue current input value`,name:"formatCreateLabel",required:!1,type:{name:"((inputValue: string) => string)"}},getNewItem:{defaultValue:null,description:`Returns the data for the new option when it is created.
@param inputValue
@param labelValue`,name:"getNewItem",required:!1,type:{name:"((inputValue: string, labelValue: string) => T)"}},onValueCreate:{defaultValue:null,description:`If provided, this will be called with the input value when a new option is created. Use this when you need more control over what happens when new options are created.
@param item item to create`,name:"onValueCreate",required:!1,type:{name:"((value: string, item: T) => void)"}},name:{defaultValue:null,description:"",name:"name",required:!0,type:{name:"string"}},ref:{defaultValue:null,description:"",name:"ref",required:!1,type:{name:"Ref<FormFieldElement>"}}}}}catch{}export{p as C};
//# sourceMappingURL=CreatableSelectField-wcGtW0py.js.map
