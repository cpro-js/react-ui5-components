import{j as u}from"./useIsomorphicLayoutEffect-xRq3KBKR.js";import{r as n}from"./index-9BFB80ap.js";import{N as i,B as l}from"./NumberContext-DQE6BGmH.js";const a=n.forwardRef((e,t)=>{const{currency:o,showCurrency:s,...r}=n.useContext(i);return u(l,{...r,...e,ref:t})});try{a.displayName="NumberInput",a.__docgenInfo={description:"",displayName:"NumberInput",props:{value:{defaultValue:null,description:`The initial value, if any.
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
Max = 999 would allow any number up to three digits`,name:"maximumValue",required:!1,type:{name:"number"}}}}}catch{}export{a as N};
//# sourceMappingURL=NumberInput-c0IrYTrX.js.map
