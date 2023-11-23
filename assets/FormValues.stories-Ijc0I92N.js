import{a as i,j as e}from"./useIsomorphicLayoutEffect-xRq3KBKR.js";import{a as d}from"./chunk-AY7I2SME-4UylTnhF.js";import{a as F}from"./FormController-a24Yjre7.js";import{F as b}from"./FormValues-Il8LNLEt.js";import{T as S}from"./TextInputField-mcqueVzR.js";import"./index-9BFB80ap.js";import"./useFormController-QYTj16FN.js";import"./useLatestRef-8OPiqaso.js";import"./formSupport-Tri1jE22.js";import"./InputElementsFormSupport-cwSAMczA.js";import"./TextInput-FRdb0Jpx.js";import"./util-5JWwSdnm.js";import"./index-DEsUDRQH.js";import"./Input-jvkg1AKt.js";import"./withWebComponent-uMO5mAaX.js";import"./Popover-5NcXG5Re.js";import"./class-map-VCtLKyDB.js";import"./ValueState-Qqn7Ekme.js";import"./Suggestions.css-_W_4sSd4.js";import"./ValueStateMessage.css-NtFaRvah.js";import"./FormI18n-cauWpAAl.js";import"./util-OqSjx520.js";const V=t=>{const{initialValues:s,onSubmit:n}=t;return i(F,{initialValues:s,onSubmit:n,children:[e(S,{name:"text"}),i("div",{children:[e("button",{type:"submit",children:"Submit"}),e("button",{type:"reset",children:"Reset"})]}),e(b,{...t})]})},r=V.bind({});r.args={onSubmit:async(...t)=>{console.log("submit",...t),d("submit")(...t)},render:t=>i("div",{children:["Form Values ",JSON.stringify(t)]})};const o=r.bind({});o.args={...r.args,onSubmit:async(...t)=>{console.log("submit",...t),d("submit")(...t);const[s,n]=t;n.setValues([{name:"text",value:"1"}])}};const A={title:"Form/Field/FormValues",component:b};var m,a,u;r.parameters={...r.parameters,docs:{...(m=r.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
      <FormValues {...args} />
    </FormController>;
}`,...(u=(a=r.parameters)==null?void 0:a.docs)==null?void 0:u.source}}};var p,l,c;o.parameters={...o.parameters,docs:{...(p=o.parameters)==null?void 0:p.docs,source:{originalSource:"Template.bind({})",...(c=(l=o.parameters)==null?void 0:l.docs)==null?void 0:c.source}}};const B=["Standard","UpdateValuesOnSubmit"];export{r as Standard,o as UpdateValuesOnSubmit,B as __namedExportsOrder,A as default};
//# sourceMappingURL=FormValues.stories-Ijc0I92N.js.map
