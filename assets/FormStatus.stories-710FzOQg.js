import{a as n,j as r}from"./useIsomorphicLayoutEffect-xRq3KBKR.js";import{a as u}from"./chunk-AY7I2SME-4UylTnhF.js";import{a as d}from"./FormController-a24Yjre7.js";import{F as a}from"./FormStatus-59e9x69Z.js";import{T as l}from"./TextInputField-mcqueVzR.js";import"./index-9BFB80ap.js";import"./useFormController-QYTj16FN.js";import"./useLatestRef-8OPiqaso.js";import"./formSupport-Tri1jE22.js";import"./InputElementsFormSupport-cwSAMczA.js";import"./TextInput-FRdb0Jpx.js";import"./util-5JWwSdnm.js";import"./index-DEsUDRQH.js";import"./Input-jvkg1AKt.js";import"./withWebComponent-uMO5mAaX.js";import"./Popover-5NcXG5Re.js";import"./class-map-VCtLKyDB.js";import"./ValueState-Qqn7Ekme.js";import"./Suggestions.css-_W_4sSd4.js";import"./ValueStateMessage.css-NtFaRvah.js";import"./FormI18n-cauWpAAl.js";import"./util-OqSjx520.js";const c=t=>{const{initialValues:o,onSubmit:p}=t;return n(d,{initialValues:o,onSubmit:p,children:[r(l,{name:"text"}),n("div",{children:[r("button",{type:"submit",children:"Submit"}),r("button",{type:"reset",children:"Reset"})]}),r(a,{...t})]})},i=c.bind({});i.args={onSubmit:async(...t)=>{await new Promise(o=>setTimeout(o,2e3)),u("submit")(...t)},render:t=>n("div",{children:["Submitting ",JSON.stringify(t.isSubmitting),", Dirty"," ",JSON.stringify(t.isDirty),", Valid ",JSON.stringify(t.isValid),", Validating ",JSON.stringify(t.isValidating)]})};const P={title:"Form/Field/FormStatus",component:a};var e,m,s;i.parameters={...i.parameters,docs:{...(e=i.parameters)==null?void 0:e.docs,source:{originalSource:`args => {
  const {
    initialValues,
    onSubmit
  } = args;
  return <FormController<FormData> {...{
    initialValues,
    onSubmit
  }}>
      <TextInputField name={"text"} />
      <div>
        <button type="submit">Submit</button>
        <button type="reset">Reset</button>
      </div>
      <FormStatus {...args} />
    </FormController>;
}`,...(s=(m=i.parameters)==null?void 0:m.docs)==null?void 0:s.source}}};const k=["Standard"];export{i as Standard,k as __namedExportsOrder,P as default};
//# sourceMappingURL=FormStatus.stories-710FzOQg.js.map
