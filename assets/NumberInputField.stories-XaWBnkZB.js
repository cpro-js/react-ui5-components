import{a as re,j as V}from"./useIsomorphicLayoutEffect-xRq3KBKR.js";import{r as ne}from"./index-9BFB80ap.js";import{a as oe}from"./FormController-a24Yjre7.js";import{F as te}from"./FormI18n-cauWpAAl.js";import{u as ae,F as ie}from"./FormViewer-T_trOpy-.js";import{N as Z}from"./NumberInputField-NjSogN-U.js";import"./useFormController-QYTj16FN.js";import"./useLatestRef-8OPiqaso.js";import"./Button-NwTvRcXl.js";import"./util-5JWwSdnm.js";import"./index-iYocmi5m.js";import"./Button-Kg1wKD-C.js";import"./withWebComponent-uMO5mAaX.js";import"./index-j_UY7yy0.js";import"./Title-siMC53XU.js";import"./WrappingType-avPrqc94.js";import"./clsx-2Jv0kmJG.js";import"./react-jss.esm-1qNMITJJ.js";import"./css-vendor.esm-6cc1E2ZA.js";import"./index-8BDAWP4G.js";import"./Popover-5NcXG5Re.js";import"./class-map-VCtLKyDB.js";import"./index-2q9JMl2_.js";import"./ToggleButton-tLhZtSzP.js";import"./CustomVariables-Ms22ARR_.js";import"./debounce-F9irgL9Y.js";import"./index-tPOYiQGZ.js";import"./formSupport-Tri1jE22.js";import"./InputElementsFormSupport-cwSAMczA.js";import"./NumberInput-c0IrYTrX.js";import"./NumberContext-DQE6BGmH.js";import"./ValueState-Qqn7Ekme.js";import"./index-DEsUDRQH.js";import"./Input-jvkg1AKt.js";import"./Suggestions.css-_W_4sSd4.js";import"./ValueStateMessage.css-NtFaRvah.js";import"./util-OqSjx520.js";const n=b=>{const{initialValues:F,onSubmit:f,...g}=b,{submittedValues:p,handleSubmit:ee}=ae({onSubmit:f}),S=ne.useRef(null);return re(oe,{initialValues:F,onSubmit:ee,children:[V(Z,{...g,ref:S,name:"theNumber"}),V(ie,{submittedValues:p,fieldRef:S})]})},c=(b,F)=>V(te,{getValidationErrorMessage:({name:f,value:g},p)=>`Field '${f}' has Error '${p.type}'. Offending value: '${g}'. Original error message: ${p.message||"---"}`,children:n(b)}),e=n.bind({});e.args={useGrouping:!0};const o=n.bind({});o.args={initialValues:{theNumber:123456.789}};const l=n.bind({});l.args={...o.args,disabled:!0};const u=n.bind({});u.args={...o.args,readonly:!0};const a=n.bind({});a.args={...e.args,required:!0};const t=n.bind({});t.storyName="Validation Min (4)";t.args={...e.args,min:4};const r=n.bind({});r.storyName="Validation MinMax (4-10)";r.args={...e.args,min:4,max:10};const d=c.bind({});d.args={...a.args};const i=c.bind({});i.storyName="Validation Translation Min (4)";i.args={...t.args};const s=c.bind({});s.storyName="Validation Translation MinMax (4-10)";s.args={...r.args};const m=c.bind({});m.storyName="Localized DE MinMax (4-10)";m.args={...r.args};const Be={title:"Form/Field/NumberInputField",component:Z,argTypes:{onSubmit:{action:"submit"}}};var R,h,M;e.parameters={...e.parameters,docs:{...(R=e.parameters)==null?void 0:R.docs,source:{originalSource:`args => {
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
        <NumberInputField {...props} ref={fieldRef} name={"theNumber"} />
        <FormViewer submittedValues={submittedValues} fieldRef={fieldRef} />
      </FormController>;
}`,...(M=(h=e.parameters)==null?void 0:h.docs)==null?void 0:M.source}}};var N,v,x;o.parameters={...o.parameters,docs:{...(N=o.parameters)==null?void 0:N.docs,source:{originalSource:`args => {
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
        <NumberInputField {...props} ref={fieldRef} name={"theNumber"} />
        <FormViewer submittedValues={submittedValues} fieldRef={fieldRef} />
      </FormController>;
}`,...(x=(v=o.parameters)==null?void 0:v.docs)==null?void 0:x.source}}};var E,I,$;l.parameters={...l.parameters,docs:{...(E=l.parameters)==null?void 0:E.docs,source:{originalSource:`args => {
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
        <NumberInputField {...props} ref={fieldRef} name={"theNumber"} />
        <FormViewer submittedValues={submittedValues} fieldRef={fieldRef} />
      </FormController>;
}`,...($=(I=l.parameters)==null?void 0:I.docs)==null?void 0:$.source}}};var w,y,C;u.parameters={...u.parameters,docs:{...(w=u.parameters)==null?void 0:w.docs,source:{originalSource:`args => {
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
        <NumberInputField {...props} ref={fieldRef} name={"theNumber"} />
        <FormViewer submittedValues={submittedValues} fieldRef={fieldRef} />
      </FormController>;
}`,...(C=(y=u.parameters)==null?void 0:y.docs)==null?void 0:C.source}}};var T,O,P;a.parameters={...a.parameters,docs:{...(T=a.parameters)==null?void 0:T.docs,source:{originalSource:`args => {
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
        <NumberInputField {...props} ref={fieldRef} name={"theNumber"} />
        <FormViewer submittedValues={submittedValues} fieldRef={fieldRef} />
      </FormController>;
}`,...(P=(O=a.parameters)==null?void 0:O.docs)==null?void 0:P.source}}};var q,D,j;t.parameters={...t.parameters,docs:{...(q=t.parameters)==null?void 0:q.docs,source:{originalSource:`args => {
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
        <NumberInputField {...props} ref={fieldRef} name={"theNumber"} />
        <FormViewer submittedValues={submittedValues} fieldRef={fieldRef} />
      </FormController>;
}`,...(j=(D=t.parameters)==null?void 0:D.docs)==null?void 0:j.source}}};var z,L,_;r.parameters={...r.parameters,docs:{...(z=r.parameters)==null?void 0:z.docs,source:{originalSource:`args => {
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
        <NumberInputField {...props} ref={fieldRef} name={"theNumber"} />
        <FormViewer submittedValues={submittedValues} fieldRef={fieldRef} />
      </FormController>;
}`,...(_=(L=r.parameters)==null?void 0:L.docs)==null?void 0:_.source}}};var G,k,A;d.parameters={...d.parameters,docs:{...(G=d.parameters)==null?void 0:G.docs,source:{originalSource:`(args, context) => {
  return <FormI18nProvider getValidationErrorMessage={({
    name,
    value
  }, error) => {
    return \`Field '\${name}' has Error '\${error.type}'. Offending value: '\${value}'. Original error message: \${error.message || "---"}\`;
  }}>
      {Template(args, context)}
    </FormI18nProvider>;
}`,...(A=(k=d.parameters)==null?void 0:k.docs)==null?void 0:A.source}}};var B,H,J;i.parameters={...i.parameters,docs:{...(B=i.parameters)==null?void 0:B.docs,source:{originalSource:`(args, context) => {
  return <FormI18nProvider getValidationErrorMessage={({
    name,
    value
  }, error) => {
    return \`Field '\${name}' has Error '\${error.type}'. Offending value: '\${value}'. Original error message: \${error.message || "---"}\`;
  }}>
      {Template(args, context)}
    </FormI18nProvider>;
}`,...(J=(H=i.parameters)==null?void 0:H.docs)==null?void 0:J.source}}};var K,Q,U;s.parameters={...s.parameters,docs:{...(K=s.parameters)==null?void 0:K.docs,source:{originalSource:`(args, context) => {
  return <FormI18nProvider getValidationErrorMessage={({
    name,
    value
  }, error) => {
    return \`Field '\${name}' has Error '\${error.type}'. Offending value: '\${value}'. Original error message: \${error.message || "---"}\`;
  }}>
      {Template(args, context)}
    </FormI18nProvider>;
}`,...(U=(Q=s.parameters)==null?void 0:Q.docs)==null?void 0:U.source}}};var W,X,Y;m.parameters={...m.parameters,docs:{...(W=m.parameters)==null?void 0:W.docs,source:{originalSource:`(args, context) => {
  return <FormI18nProvider getValidationErrorMessage={({
    name,
    value
  }, error) => {
    return \`Field '\${name}' has Error '\${error.type}'. Offending value: '\${value}'. Original error message: \${error.message || "---"}\`;
  }}>
      {Template(args, context)}
    </FormI18nProvider>;
}`,...(Y=(X=m.parameters)==null?void 0:X.docs)==null?void 0:Y.source}}};const He=["Empty","Prefilled","Disabled","Readonly","ValidationRequired","ValidationMin","ValidationMinMax","ValidationTranslationRequired","ValidationTranslationMin","ValidationTranslationMinMax","LocalizedDe"];export{l as Disabled,e as Empty,m as LocalizedDe,o as Prefilled,u as Readonly,t as ValidationMin,r as ValidationMinMax,a as ValidationRequired,i as ValidationTranslationMin,s as ValidationTranslationMinMax,d as ValidationTranslationRequired,He as __namedExportsOrder,Be as default};
//# sourceMappingURL=NumberInputField.stories-XaWBnkZB.js.map
