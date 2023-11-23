import{a as n,j as o}from"./useIsomorphicLayoutEffect-xRq3KBKR.js";import{a as e}from"./chunk-AY7I2SME-4UylTnhF.js";import{T as l}from"./TextInputField-mcqueVzR.js";import{F as a,a as c}from"./FormController-a24Yjre7.js";import"./index-9BFB80ap.js";import"./formSupport-Tri1jE22.js";import"./InputElementsFormSupport-cwSAMczA.js";import"./useFormController-QYTj16FN.js";import"./TextInput-FRdb0Jpx.js";import"./util-5JWwSdnm.js";import"./index-DEsUDRQH.js";import"./Input-jvkg1AKt.js";import"./withWebComponent-uMO5mAaX.js";import"./Popover-5NcXG5Re.js";import"./class-map-VCtLKyDB.js";import"./ValueState-Qqn7Ekme.js";import"./Suggestions.css-_W_4sSd4.js";import"./ValueStateMessage.css-NtFaRvah.js";import"./FormI18n-cauWpAAl.js";import"./util-OqSjx520.js";import"./useLatestRef-8OPiqaso.js";const d=t=>{const{initialValues:p,onSubmit:u}=t;return n(c,{initialValues:p,onSubmit:u,children:[o(l,{name:"text"}),n("div",{children:[o("button",{type:"submit",children:"Submit"}),o("button",{type:"reset",children:"Reset"})]}),o(a,{...t})]})},r=d.bind({});r.args={onSubmit:async(...t)=>{e("submit")(...t)},onChange:(...t)=>{e("change")(...t)}};const q={title:"Form/FormListener",component:a};var i,m,s;r.parameters={...r.parameters,docs:{...(i=r.parameters)==null?void 0:i.docs,source:{originalSource:`args => {
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
      <FormListener {...args} />
    </FormController>;
}`,...(s=(m=r.parameters)==null?void 0:m.docs)==null?void 0:s.source}}};const w=["Standard"];export{r as Standard,w as __namedExportsOrder,q as default};
//# sourceMappingURL=FormListener.stories-2Cb5--wF.js.map
