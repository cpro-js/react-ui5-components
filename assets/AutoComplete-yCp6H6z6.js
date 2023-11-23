import{j as s}from"./useIsomorphicLayoutEffect-xRq3KBKR.js";import{r as o}from"./index-9BFB80ap.js";import{u}from"./useAsync-T4TD-_JE.js";import{u as l,a as d,C as m}from"./CoreAutocomplete-GmrZHgqm.js";const t=o.forwardRef((e,n)=>{const a=l(e),r=u(a),i=d(r);return s(m,{ref:n,...i})});try{t.displayName="AutoComplete",t.__docgenInfo={description:"",displayName:"AutoComplete",props:{name:{defaultValue:null,description:"Name of the input.",name:"name",required:!1,type:{name:"string"}},value:{defaultValue:null,description:"Selected suggested item",name:"value",required:!1,type:{name:"string"}},itemProps:{defaultValue:null,description:"Render <code>SuggestionItem</code>s from UI5.",name:"itemProps",required:!1,type:{name:"((item: T) => Partial<SuggestionItemPropTypes>)"}},onInputChange:{defaultValue:null,description:`Change handler that allows to access the new inputValue
@param inputValue updated input value
@param event event that lead to that change`,name:"onInputChange",required:!1,type:{name:"((inputValue: string, event: Ui5CustomEvent<InputDomRef, never>) => void)"}},onValueChange:{defaultValue:null,description:`Change handler that allows to access the new suggested item
Note: will be called in the future without item to reset the value
@param suggestionValue`,name:"onValueChange",required:!1,type:{name:"((value?: string, item?: T) => void) | undefined"}},forceSelection:{defaultValue:null,description:`If user doesn't select a suggested value, her input will be lost if this prop is set to true.
Default: true;`,name:"forceSelection",required:!1,type:{name:"boolean"}},minCharsForSearch:{defaultValue:null,description:`Minimum number of characters before search is triggered.
Default: 1.`,name:"minCharsForSearch",required:!1,type:{name:"number"}},loadItems:{defaultValue:null,description:`The search method to use in order to generate items.
This method is fired on every key press.
@param searchTerm the entered value
@returns Promise of the items to use for showing items`,name:"loadItems",required:!0,type:{name:"(searchTerm: string) => Promise<T[]>"}},initialItems:{defaultValue:null,description:"Initial items matching the initial value",name:"initialItems",required:!1,type:{name:"T[]"}},itemLabel:{defaultValue:null,description:`Controls which text is used to display options.
Used by suggestions, if not overridden
by <code>renderSuggestion</code>

By default the prop <code>label</code> is used.
You can pass either a string, which represents a different prop or a render function.`,name:"itemLabel",required:!1,type:{name:"string | ((value: T) => string)"}},itemValue:{defaultValue:null,description:`Controls which value / key is used to identify an option.
This is used by suggestions, if not overridden
by <code>renderSuggestion</code>.

By default the prop <code>value</code> is used.
You can pass either a string, which represents a different prop or a render function.`,name:"itemValue",required:!1,type:{name:"string | ((value: T) => string)"}},ref:{defaultValue:null,description:"",name:"ref",required:!1,type:{name:"Ref<HTMLInputElement>"}}}}}catch{}export{t as A};
//# sourceMappingURL=AutoComplete-yCp6H6z6.js.map
