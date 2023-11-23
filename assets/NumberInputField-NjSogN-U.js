import{j as p}from"./useIsomorphicLayoutEffect-xRq3KBKR.js";import"./formSupport-Tri1jE22.js";import{r as a}from"./index-9BFB80ap.js";import{a as V,b as M}from"./useFormController-QYTj16FN.js";import{N as I}from"./NumberInput-c0IrYTrX.js";import{u as N}from"./FormI18n-cauWpAAl.js";import{h as i}from"./util-OqSjx520.js";import{V as c}from"./ValueState-Qqn7Ekme.js";const f=a.forwardRef(({name:t,required:o,min:e,max:n,...b},h)=>{const s=a.useMemo(()=>({required:o,min:e,max:n}),[o,e,n]),v=N(t,s),{field:r,fieldState:l}=V({name:t,rules:s}),{clearErrors:d}=M(),u=a.useRef(null);a.useImperativeHandle(h,()=>({focus(){u.current!=null&&u.current.focus()}})),a.useImperativeHandle(r.ref,()=>u.current);const y=r.value,m=i(l.error)?v(l.error,r.value):void 0,g=a.useCallback(()=>{d(t)},[d,t]);return p(I,{...b,ref:u,name:r.name,value:y,onChange:(E,w)=>{r.onChange(w)},onBlur:r.onBlur,required:o,valueState:i(l.error)?c.Error:c.None,valueStateMessage:m!=null&&p("div",{slot:"valueStateMessage",children:m}),"aria-valuemin":e!=null?typeof e=="number"?e:e.value:void 0,"aria-valuemax":n!=null?typeof n=="number"?n:n.value:void 0,onKeyUp:i(l.error)?g:void 0})});try{f.displayName="NumberInputField",f.__docgenInfo={description:"",displayName:"NumberInputField",props:{onKeyUp:{defaultValue:null,description:"Modified onKeyUp method, which also supplies the consumer with the parsed number value.",name:"onKeyUp",required:!1,type:{name:"((event: KeyboardEvent<HTMLInputElement>, value: number) => void)"}},currency:{defaultValue:null,description:"Three letter ISO code of currency, e.g. EUR or USD",name:"currency",required:!1,type:{name:"string"}},showCurrency:{defaultValue:null,description:"",name:"showCurrency",required:!1,type:{name:"boolean"}},onValue:{defaultValue:null,description:`Convenience method which behaves like onChange, but only provides the current value as number.
Fired when the value has changed and the user leaves the input field.`,name:"onValue",required:!1,type:{name:"((value?: number) => void)"}},locale:{defaultValue:null,description:`Locale to use for currency formatting style.
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
Max = 999 would allow any number up to three digits`,name:"maximumValue",required:!1,type:{name:"number"}},min:{defaultValue:null,description:"",name:"min",required:!1,type:{name:"FormFieldValidationRule<number>"}},max:{defaultValue:null,description:"",name:"max",required:!1,type:{name:"FormFieldValidationRule<number>"}},name:{defaultValue:null,description:"",name:"name",required:!0,type:{name:"string"}}}}}catch{}export{f as N};
//# sourceMappingURL=NumberInputField-NjSogN-U.js.map
