import{j as a}from"./useIsomorphicLayoutEffect-xRq3KBKR.js";import{r as t}from"./index-9BFB80ap.js";import{N as c,B as p}from"./NumberContext-DQE6BGmH.js";const u=t.forwardRef((n,i)=>{const{currency:o,showCurrency:l,style:s={},...d}=n,e=t.useContext(c),r=o||e.currency;if(!r)throw Error("Currency must be provided to CurrencyInput!");const m=n.hasOwnProperty("showCurrency")?l:e.hasOwnProperty("showCurrency")?e.showCurrency:!0;return a(p,{icon:m?a("span",{children:r}):void 0,...e,...d,currency:r,style:{textAlign:"right",...s},ref:i})});try{u.displayName="CurrencyInput",u.__docgenInfo={description:"",displayName:"CurrencyInput",props:{currency:{defaultValue:null,description:"Three letter ISO code of currency, e.g. EUR or USD",name:"currency",required:!1,type:{name:"string"}},showCurrency:{defaultValue:null,description:"",name:"showCurrency",required:!1,type:{name:"boolean"}},value:{defaultValue:null,description:`The initial value, if any.
Can also be used to modify the value of the number field.`,name:"value",required:!1,type:{name:"number"}},onChange:{defaultValue:null,description:"Modified onChange method, which also supplies the consumer with the parsed number value.",name:"onChange",required:!1,type:{name:"((event: Ui5CustomEvent<InputDomRef, never>, value: number) => void)"}},onValue:{defaultValue:null,description:`Convenience method which behaves like onChange, but only provides the current value as number.
Fired when the value has changed and the user leaves the input field.`,name:"onValue",required:!1,type:{name:"((value?: number) => void)"}},onKeyUp:{defaultValue:null,description:"Modified onKeyUp method, which also supplies the consumer with the parsed number value.",name:"onKeyUp",required:!1,type:{name:"((event: KeyboardEvent<HTMLInputElement>, value: number) => void)"}},locale:{defaultValue:null,description:`Locale to use for currency formatting style.
Might have been provided by NumberI18nProvider, otherwise must be set manually via this attribute.
This attribute takes precedence, if also provided by NumberI18nProvider.`,name:"locale",required:!1,type:{name:"string"}},showNumberWarningMessages:{defaultValue:null,description:`Warning messages are shown by default, when user input has been blocked, modified, or reset.
Disable or enable that those messages are shown.`,name:"showNumberWarningMessages",required:!1,type:{name:"boolean"}},getNumberWarningMessage:{defaultValue:null,description:`Provide the content of shown warning messages.
Required for proper internationalization.`,name:"getNumberWarningMessage",required:!1,type:{name:"GetNumberWarningMessage"}},minimumValue:{defaultValue:null,description:`Min number allowed for input.
If user enters a lower value it will automatically be set to this min value.

Must be between (including) MAX_NEGATIVE_INTEGER and 1:
any other restriction on input would be impractical.

Min = 0 wouldn't allow any negative numbers.`,name:"minimumValue",required:!1,type:{name:"number"}},maximumValue:{defaultValue:null,description:`Max number allowed for input.
If user enters a higher value it will automatically be set to this max value.

Must be between (including) -1 and MAX_POSITIVE_INTEGER:
any other restriction on input would be impractical.

Max = 0 would only allow for negative numbers
Max = 999 would allow any number up to three digits`,name:"maximumValue",required:!1,type:{name:"number"}}}}}catch{}export{u as C};
//# sourceMappingURL=CurrencyInput-B9oUy5LL.js.map
