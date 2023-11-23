import{a as X,j as f}from"./useIsomorphicLayoutEffect-xRq3KBKR.js";import{r as Y}from"./index-9BFB80ap.js";import{a as Z}from"./FormController-a24Yjre7.js";import{F as ee}from"./FormI18n-cauWpAAl.js";import{u as re,F as ne}from"./FormViewer-T_trOpy-.js";import{T as Q}from"./TextInputField-mcqueVzR.js";import"./useFormController-QYTj16FN.js";import"./useLatestRef-8OPiqaso.js";import"./Button-NwTvRcXl.js";import"./util-5JWwSdnm.js";import"./index-iYocmi5m.js";import"./Button-Kg1wKD-C.js";import"./withWebComponent-uMO5mAaX.js";import"./index-j_UY7yy0.js";import"./Title-siMC53XU.js";import"./WrappingType-avPrqc94.js";import"./clsx-2Jv0kmJG.js";import"./react-jss.esm-1qNMITJJ.js";import"./css-vendor.esm-6cc1E2ZA.js";import"./index-8BDAWP4G.js";import"./Popover-5NcXG5Re.js";import"./class-map-VCtLKyDB.js";import"./index-2q9JMl2_.js";import"./ToggleButton-tLhZtSzP.js";import"./CustomVariables-Ms22ARR_.js";import"./debounce-F9irgL9Y.js";import"./index-tPOYiQGZ.js";import"./formSupport-Tri1jE22.js";import"./InputElementsFormSupport-cwSAMczA.js";import"./TextInput-FRdb0Jpx.js";import"./index-DEsUDRQH.js";import"./Input-jvkg1AKt.js";import"./ValueState-Qqn7Ekme.js";import"./Suggestions.css-_W_4sSd4.js";import"./ValueStateMessage.css-NtFaRvah.js";import"./util-OqSjx520.js";const r=p=>{const{initialValues:g,onSubmit:c,...d}=p,{submittedValues:U,handleSubmit:W}=re({onSubmit:c}),F=Y.useRef(null);return X(Z,{initialValues:g,onSubmit:W,children:[f(Q,{...d,ref:F,name:"text"}),f(ne,{submittedValues:U,fieldRef:F})]})},b=(p,g)=>f(ee,{getValidationErrorMessage:({name:c},d)=>`Field '${c}' has Error '${d.type}'. Original error message: ${d.message||"---"}`,children:r(p)}),e=r.bind({});e.args={};const n=r.bind({});n.args={initialValues:{text:"hello world"}};const s=r.bind({});s.args={...n.args,disabled:!0};const a=r.bind({});a.args={...n.args,readonly:!0};const t=r.bind({});t.args={...e.args,required:!0};const o=r.bind({});o.args={...e.args,minLength:4};const i=r.bind({});i.args={...e.args,minLength:4,maxLength:10};const m=b.bind({});m.args={...t.args};const l=b.bind({});l.args={...o.args};const u=b.bind({});u.args={...i.args};const ke={title:"Form/Field/TextInputField",component:Q,argTypes:{onSubmit:{action:"submit"}}};var V,S,R;e.parameters={...e.parameters,docs:{...(V=e.parameters)==null?void 0:V.docs,source:{originalSource:`args => {
  const {
    initialValues,
    onSubmit,
    ...props
  } = args;
  const {
    submittedValues,
    handleSubmit
  } = useFormViewer({
    onSubmit: onSubmit
  });
  const fieldRef = useRef<FormFieldElement>(null);
  return <FormController {...{
    initialValues,
    onSubmit: handleSubmit
  }}>
      <TextInputField {...props} ref={fieldRef} name={"text"} />
      <FormViewer submittedValues={submittedValues} fieldRef={fieldRef} />
    </FormController>;
}`,...(R=(S=e.parameters)==null?void 0:S.docs)==null?void 0:R.source}}};var x,h,T;n.parameters={...n.parameters,docs:{...(x=n.parameters)==null?void 0:x.docs,source:{originalSource:`args => {
  const {
    initialValues,
    onSubmit,
    ...props
  } = args;
  const {
    submittedValues,
    handleSubmit
  } = useFormViewer({
    onSubmit: onSubmit
  });
  const fieldRef = useRef<FormFieldElement>(null);
  return <FormController {...{
    initialValues,
    onSubmit: handleSubmit
  }}>
      <TextInputField {...props} ref={fieldRef} name={"text"} />
      <FormViewer submittedValues={submittedValues} fieldRef={fieldRef} />
    </FormController>;
}`,...(T=(h=n.parameters)==null?void 0:h.docs)==null?void 0:T.source}}};var E,I,w;s.parameters={...s.parameters,docs:{...(E=s.parameters)==null?void 0:E.docs,source:{originalSource:`args => {
  const {
    initialValues,
    onSubmit,
    ...props
  } = args;
  const {
    submittedValues,
    handleSubmit
  } = useFormViewer({
    onSubmit: onSubmit
  });
  const fieldRef = useRef<FormFieldElement>(null);
  return <FormController {...{
    initialValues,
    onSubmit: handleSubmit
  }}>
      <TextInputField {...props} ref={fieldRef} name={"text"} />
      <FormViewer submittedValues={submittedValues} fieldRef={fieldRef} />
    </FormController>;
}`,...(w=(I=s.parameters)==null?void 0:I.docs)==null?void 0:w.source}}};var M,C,$;a.parameters={...a.parameters,docs:{...(M=a.parameters)==null?void 0:M.docs,source:{originalSource:`args => {
  const {
    initialValues,
    onSubmit,
    ...props
  } = args;
  const {
    submittedValues,
    handleSubmit
  } = useFormViewer({
    onSubmit: onSubmit
  });
  const fieldRef = useRef<FormFieldElement>(null);
  return <FormController {...{
    initialValues,
    onSubmit: handleSubmit
  }}>
      <TextInputField {...props} ref={fieldRef} name={"text"} />
      <FormViewer submittedValues={submittedValues} fieldRef={fieldRef} />
    </FormController>;
}`,...($=(C=a.parameters)==null?void 0:C.docs)==null?void 0:$.source}}};var L,y,P;t.parameters={...t.parameters,docs:{...(L=t.parameters)==null?void 0:L.docs,source:{originalSource:`args => {
  const {
    initialValues,
    onSubmit,
    ...props
  } = args;
  const {
    submittedValues,
    handleSubmit
  } = useFormViewer({
    onSubmit: onSubmit
  });
  const fieldRef = useRef<FormFieldElement>(null);
  return <FormController {...{
    initialValues,
    onSubmit: handleSubmit
  }}>
      <TextInputField {...props} ref={fieldRef} name={"text"} />
      <FormViewer submittedValues={submittedValues} fieldRef={fieldRef} />
    </FormController>;
}`,...(P=(y=t.parameters)==null?void 0:y.docs)==null?void 0:P.source}}};var v,q,O;o.parameters={...o.parameters,docs:{...(v=o.parameters)==null?void 0:v.docs,source:{originalSource:`args => {
  const {
    initialValues,
    onSubmit,
    ...props
  } = args;
  const {
    submittedValues,
    handleSubmit
  } = useFormViewer({
    onSubmit: onSubmit
  });
  const fieldRef = useRef<FormFieldElement>(null);
  return <FormController {...{
    initialValues,
    onSubmit: handleSubmit
  }}>
      <TextInputField {...props} ref={fieldRef} name={"text"} />
      <FormViewer submittedValues={submittedValues} fieldRef={fieldRef} />
    </FormController>;
}`,...(O=(q=o.parameters)==null?void 0:q.docs)==null?void 0:O.source}}};var j,_,D;i.parameters={...i.parameters,docs:{...(j=i.parameters)==null?void 0:j.docs,source:{originalSource:`args => {
  const {
    initialValues,
    onSubmit,
    ...props
  } = args;
  const {
    submittedValues,
    handleSubmit
  } = useFormViewer({
    onSubmit: onSubmit
  });
  const fieldRef = useRef<FormFieldElement>(null);
  return <FormController {...{
    initialValues,
    onSubmit: handleSubmit
  }}>
      <TextInputField {...props} ref={fieldRef} name={"text"} />
      <FormViewer submittedValues={submittedValues} fieldRef={fieldRef} />
    </FormController>;
}`,...(D=(_=i.parameters)==null?void 0:_.docs)==null?void 0:D.source}}};var k,z,A;m.parameters={...m.parameters,docs:{...(k=m.parameters)==null?void 0:k.docs,source:{originalSource:`(args, context) => {
  return <FormI18nProvider getValidationErrorMessage={({
    name
  }, error) => {
    return \`Field '\${name}' has Error '\${error.type}'. Original error message: \${error.message || "---"}\`;
  }}>
      {Template(args, context)}
    </FormI18nProvider>;
}`,...(A=(z=m.parameters)==null?void 0:z.docs)==null?void 0:A.source}}};var B,G,H;l.parameters={...l.parameters,docs:{...(B=l.parameters)==null?void 0:B.docs,source:{originalSource:`(args, context) => {
  return <FormI18nProvider getValidationErrorMessage={({
    name
  }, error) => {
    return \`Field '\${name}' has Error '\${error.type}'. Original error message: \${error.message || "---"}\`;
  }}>
      {Template(args, context)}
    </FormI18nProvider>;
}`,...(H=(G=l.parameters)==null?void 0:G.docs)==null?void 0:H.source}}};var J,K,N;u.parameters={...u.parameters,docs:{...(J=u.parameters)==null?void 0:J.docs,source:{originalSource:`(args, context) => {
  return <FormI18nProvider getValidationErrorMessage={({
    name
  }, error) => {
    return \`Field '\${name}' has Error '\${error.type}'. Original error message: \${error.message || "---"}\`;
  }}>
      {Template(args, context)}
    </FormI18nProvider>;
}`,...(N=(K=u.parameters)==null?void 0:K.docs)==null?void 0:N.source}}};const ze=["Empty","Prefilled","Disabled","Readonly","ValidationRequired","ValidationMinLength","ValidationMinMaxLength","ValidationTranslationRequired","ValidationTranslationMinLength","ValidationTranslationMinMaxLength"];export{s as Disabled,e as Empty,n as Prefilled,a as Readonly,o as ValidationMinLength,i as ValidationMinMaxLength,t as ValidationRequired,l as ValidationTranslationMinLength,u as ValidationTranslationMinMaxLength,m as ValidationTranslationRequired,ze as __namedExportsOrder,ke as default};
//# sourceMappingURL=TextInputField.stories-irPWC9dd.js.map
