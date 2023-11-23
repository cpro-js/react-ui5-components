import{j as s}from"./useIsomorphicLayoutEffect-xRq3KBKR.js";import"./formSupport-Tri1jE22.js";import{r as t}from"./index-9BFB80ap.js";import{a as h}from"./useFormController-QYTj16FN.js";import{C as g}from"./CreatableAutoComplete-j1f5z003.js";import{u as v}from"./FormI18n-cauWpAAl.js";import{h as u}from"./util-OqSjx520.js";import{V as d}from"./ValueState-Qqn7Ekme.js";const m=t.forwardRef(({name:r,required:n,...p},c)=>{const o=t.useMemo(()=>({required:n}),[n]),f=v(r,o),{field:e,fieldState:i}=h({name:r,rules:o}),a=t.useRef();t.useImperativeHandle(c,()=>({focus(){a.current!=null&&a.current.focus()}})),t.useImperativeHandle(e.ref,()=>a.current);const l=u(i.error)?f(i.error,e.value):void 0;return s(g,{...p,ref:a,name:e.name,value:e.value,onValueChange:e.onChange,valueState:u(i.error)?d.Error:d.None,valueStateMessage:l!=null&&s("div",{slot:"valueStateMessage",children:l}),onBlur:e.onBlur,required:n})});try{m.displayName="CreatableAutoCompleteField",m.__docgenInfo={description:"",displayName:"CreatableAutoCompleteField",props:{itemValue:{defaultValue:null,description:`Controls which value / key is used to identify an option.
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
@returns Promise of the items to use for showing items`,name:"loadItems",required:!0,type:{name:"(searchTerm: string) => Promise<T[]>"}},initialItems:{defaultValue:null,description:"Initial items matching the initial value",name:"initialItems",required:!1,type:{name:"T[]"}},formatCreateLabel:{defaultValue:null,description:`Gets the label for the "create new ..." option in the menu. Is given the current input value.
@param inputValue current input value`,name:"formatCreateLabel",required:!1,type:{name:"((inputValue: string) => string)"}},getNewItem:{defaultValue:null,description:`Returns the data for the new option when it is created.
@param inputValue
@param labelValue`,name:"getNewItem",required:!1,type:{name:"((inputValue: string, labelValue: string) => T)"}},onValueCreate:{defaultValue:null,description:`If provided, this will be called with the input value when a new option is created. Use this when you need more control over what happens when new options are created.
@param item item to create`,name:"onValueCreate",required:!1,type:{name:"((value: string, item: T) => void)"}},name:{defaultValue:null,description:"",name:"name",required:!0,type:{name:"string"}},ref:{defaultValue:null,description:"",name:"ref",required:!1,type:{name:"Ref<FormFieldElement>"}}}}}catch{}export{m as C};
//# sourceMappingURL=CreatableAutoCompleteField-si3WeQjF.js.map
