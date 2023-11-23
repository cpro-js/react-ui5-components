import{j as l}from"./useIsomorphicLayoutEffect-xRq3KBKR.js";import{r as u}from"./index-9BFB80ap.js";import{u as o}from"./useCreatable-oCBfdz5P.js";import{u as s,a as d,C as p}from"./CoreAutocomplete-GmrZHgqm.js";const t=u.forwardRef((e,a)=>{const n=s(e),r=d(n),i=o(r);return l(p,{ref:a,...i})});try{t.displayName="CreatableSelect",t.__docgenInfo={description:"",displayName:"CreatableSelect",props:{name:{defaultValue:null,description:"Name of the input.",name:"name",required:!1,type:{name:"string"}},value:{defaultValue:null,description:"Selected suggested item",name:"value",required:!1,type:{name:"string"}},items:{defaultValue:null,description:"Suggestions to show",name:"items",required:!0,type:{name:"T[]"}},filterItem:{defaultValue:null,description:`Custom filter method to display only items matching the search term.

Note: provide null to disable filtering
@param suggestionValue`,name:"filterItem",required:!1,type:{name:"((inputValue: string, item: T) => boolean) | null"}},itemProps:{defaultValue:null,description:"Render <code>SuggestionItem</code>s from UI5.",name:"itemProps",required:!1,type:{name:"((item: T) => Partial<SuggestionItemPropTypes>)"}},onInputChange:{defaultValue:null,description:`Change handler that allows to access the new inputValue
@param inputValue updated input value
@param event event that lead to that change`,name:"onInputChange",required:!1,type:{name:"((inputValue: string, event: Ui5CustomEvent<InputDomRef, never>) => void)"}},onValueChange:{defaultValue:null,description:`Change handler that allows to access the new suggested item
Note: will be called in the future without item to reset the value
@param suggestionValue`,name:"onValueChange",required:!1,type:{name:"((value?: string, item?: T) => void) | undefined"}},forceSelection:{defaultValue:null,description:`If user doesn't select a suggested value, her input will be lost if this prop is set to true.
Default: true;`,name:"forceSelection",required:!1,type:{name:"boolean"}},itemLabel:{defaultValue:null,description:`Controls which text is used to display options.
Used by suggestions, if not overridden
by <code>renderSuggestion</code>

By default the prop <code>label</code> is used.
You can pass either a string, which represents a different prop or a render function.`,name:"itemLabel",required:!1,type:{name:"string | ((value: T) => string)"}},itemValue:{defaultValue:null,description:`Controls which value / key is used to identify an option.
This is used by suggestions, if not overridden
by <code>renderSuggestion</code>.

By default the prop <code>value</code> is used.
You can pass either a string, which represents a different prop or a render function.`,name:"itemValue",required:!1,type:{name:"string | ((value: T) => string)"}},formatCreateLabel:{defaultValue:null,description:`Gets the label for the "create new ..." option in the menu. Is given the current input value.
@param inputValue current input value`,name:"formatCreateLabel",required:!1,type:{name:"((inputValue: string) => string)"}},getNewItem:{defaultValue:null,description:`Returns the data for the new option when it is created.
@param inputValue
@param labelValue`,name:"getNewItem",required:!1,type:{name:"((inputValue: string, labelValue: string) => T)"}},onValueCreate:{defaultValue:null,description:`If provided, this will be called with the input value when a new option is created. Use this when you need more control over what happens when new options are created.
@param item item to create`,name:"onValueCreate",required:!1,type:{name:"((value: string, item: T) => void)"}},ref:{defaultValue:null,description:"",name:"ref",required:!1,type:{name:"Ref<HTMLInputElement>"}}}}}catch{}export{t as C};
//# sourceMappingURL=CreatableSelect--wfQMTIN.js.map
