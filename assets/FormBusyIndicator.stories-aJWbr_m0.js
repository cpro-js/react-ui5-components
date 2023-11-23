import{j as o,a}from"./useIsomorphicLayoutEffect-xRq3KBKR.js";import{a as s}from"./chunk-AY7I2SME-4UylTnhF.js";import{a as g}from"./FormController-a24Yjre7.js";import{F as v}from"./FormBusyIndicator-_9X9FsW7.js";import{T as x}from"./TextInputField-mcqueVzR.js";import"./index-9BFB80ap.js";import"./useFormController-QYTj16FN.js";import"./useLatestRef-8OPiqaso.js";import"./index-FQumAKek.js";import"./BusyIndicator-LnPMRz3m.js";import"./withWebComponent-uMO5mAaX.js";import"./Popover-5NcXG5Re.js";import"./class-map-VCtLKyDB.js";import"./Label-QZ2nubHh.js";import"./WrappingType-avPrqc94.js";import"./clsx-2Jv0kmJG.js";import"./react-jss.esm-1qNMITJJ.js";import"./css-vendor.esm-6cc1E2ZA.js";import"./index-8BDAWP4G.js";import"./formSupport-Tri1jE22.js";import"./InputElementsFormSupport-cwSAMczA.js";import"./TextInput-FRdb0Jpx.js";import"./util-5JWwSdnm.js";import"./index-DEsUDRQH.js";import"./Input-jvkg1AKt.js";import"./ValueState-Qqn7Ekme.js";import"./Suggestions.css-_W_4sSd4.js";import"./ValueStateMessage.css-NtFaRvah.js";import"./FormI18n-cauWpAAl.js";import"./util-OqSjx520.js";const m=t=>{const{initialValues:r,onSubmit:I,...B}=t;return o(g,{initialValues:r,onSubmit:I,children:a(v,{...B,children:[o(x,{name:"text"}),a("div",{children:[o("button",{type:"submit",children:"Submit"}),o("button",{type:"reset",children:"Reset"})]}),o("div",{children:"Submit to see busy state"})]})})},n=m.bind({});n.args={onSubmit:async(...t)=>{await new Promise(r=>setTimeout(r,2e3)),s("submit")(...t)}};const e=m.bind({});e.args={busy:!1,onSubmit:async(...t)=>{await new Promise(r=>setTimeout(r,2e3)),s("submit")(...t)}};const i=m.bind({});i.args={busy:!0,onSubmit:async(...t)=>{await new Promise(r=>setTimeout(r,1e3)),s("submit")(...t)}};const $={title:"Form/Field/FormBusyIndicator",component:v};var u,p,d;n.parameters={...n.parameters,docs:{...(u=n.parameters)==null?void 0:u.docs,source:{originalSource:`args => {
  const {
    initialValues,
    onSubmit,
    ...props
  } = args;
  return <FormController<FormData> {...{
    initialValues,
    onSubmit
  }}>
      <FormBusyIndicator {...props}>
        <TextInputField name={"text"} />
        <div>
          <button type="submit">Submit</button>
          <button type="reset">Reset</button>
        </div>
        <div>Submit to see busy state</div>
      </FormBusyIndicator>
    </FormController>;
}`,...(d=(p=n.parameters)==null?void 0:p.docs)==null?void 0:d.source}}};var c,b,l;e.parameters={...e.parameters,docs:{...(c=e.parameters)==null?void 0:c.docs,source:{originalSource:`args => {
  const {
    initialValues,
    onSubmit,
    ...props
  } = args;
  return <FormController<FormData> {...{
    initialValues,
    onSubmit
  }}>
      <FormBusyIndicator {...props}>
        <TextInputField name={"text"} />
        <div>
          <button type="submit">Submit</button>
          <button type="reset">Reset</button>
        </div>
        <div>Submit to see busy state</div>
      </FormBusyIndicator>
    </FormController>;
}`,...(l=(b=e.parameters)==null?void 0:b.docs)==null?void 0:l.source}}};var y,F,S;i.parameters={...i.parameters,docs:{...(y=i.parameters)==null?void 0:y.docs,source:{originalSource:`args => {
  const {
    initialValues,
    onSubmit,
    ...props
  } = args;
  return <FormController<FormData> {...{
    initialValues,
    onSubmit
  }}>
      <FormBusyIndicator {...props}>
        <TextInputField name={"text"} />
        <div>
          <button type="submit">Submit</button>
          <button type="reset">Reset</button>
        </div>
        <div>Submit to see busy state</div>
      </FormBusyIndicator>
    </FormController>;
}`,...(S=(F=i.parameters)==null?void 0:F.docs)==null?void 0:S.source}}};const tt=["Standard","ForcedBusyInactive","ForcedBusyActive"];export{i as ForcedBusyActive,e as ForcedBusyInactive,n as Standard,tt as __namedExportsOrder,$ as default};
//# sourceMappingURL=FormBusyIndicator.stories-aJWbr_m0.js.map
