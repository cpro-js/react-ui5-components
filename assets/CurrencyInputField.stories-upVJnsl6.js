import{a as le,j as F}from"./useIsomorphicLayoutEffect-xRq3KBKR.js";import{r as ue}from"./index-9BFB80ap.js";import{a as de}from"./FormController-a24Yjre7.js";import{F as ce}from"./FormI18n-cauWpAAl.js";import{C as ie}from"./CurrencyInputField-Rf87MPT4.js";import{u as pe,F as be}from"./FormViewer-T_trOpy-.js";import"./useFormController-QYTj16FN.js";import"./useLatestRef-8OPiqaso.js";import"./formSupport-Tri1jE22.js";import"./InputElementsFormSupport-cwSAMczA.js";import"./CurrencyInput-B9oUy5LL.js";import"./NumberContext-DQE6BGmH.js";import"./util-5JWwSdnm.js";import"./ValueState-Qqn7Ekme.js";import"./index-DEsUDRQH.js";import"./Input-jvkg1AKt.js";import"./withWebComponent-uMO5mAaX.js";import"./Popover-5NcXG5Re.js";import"./class-map-VCtLKyDB.js";import"./Suggestions.css-_W_4sSd4.js";import"./ValueStateMessage.css-NtFaRvah.js";import"./util-OqSjx520.js";import"./Button-NwTvRcXl.js";import"./index-iYocmi5m.js";import"./Button-Kg1wKD-C.js";import"./index-j_UY7yy0.js";import"./Title-siMC53XU.js";import"./WrappingType-avPrqc94.js";import"./clsx-2Jv0kmJG.js";import"./react-jss.esm-1qNMITJJ.js";import"./css-vendor.esm-6cc1E2ZA.js";import"./index-8BDAWP4G.js";import"./index-2q9JMl2_.js";import"./ToggleButton-tLhZtSzP.js";import"./CustomVariables-Ms22ARR_.js";import"./debounce-F9irgL9Y.js";import"./index-tPOYiQGZ.js";const r=g=>{const{initialValues:S,onSubmit:V,...f}=g,{submittedValues:se,handleSubmit:me}=pe({onSubmit:V}),R=ue.useRef(null);return le(de,{initialValues:S,onSubmit:me,children:[F(ie,{...f,ref:R,name:"theNumber"})," ",F(be,{submittedValues:se,fieldRef:R})]})},b=(g,S)=>F(ce,{getValidationErrorMessage:({name:V},f)=>`Field '${V}' has Error '${f.type}'. Original error message: ${f.message||"---"}`,children:r(g)}),e=r.bind({});e.args={currency:"EUR"};const n=r.bind({});n.args={...e.args,initialValues:{theNumber:10.29}};const a=r.bind({});a.storyName="Prefilled (10.299) and Rounded";a.args={...e.args,initialValues:{theNumber:10.299}};const d=r.bind({});d.args={...n.args,disabled:!0};const c=r.bind({});c.args={...n.args,readonly:!0};const i=r.bind({});i.args={...e.args,required:!0};const t=r.bind({});t.storyName="Validation Min (> 4)";t.args={...e.args,min:4};const o=r.bind({});o.storyName="Validation MinMax (4 - 10)";o.args={...e.args,min:4,max:10};const p=b.bind({});p.args={...i.args};const s=b.bind({});s.storyName="Validation Translation Min (min: 4c)";s.args={...t.args};const m=b.bind({});m.storyName="Validation Translation (min: 4, max: 10)";m.args={...o.args};const l=b.bind({});l.storyName="Localized DE";l.args={...n.args,locale:"de"};const u=b.bind({});u.storyName="Localized Min Max DE (min: 4, max: 10)";u.args={...o.args,locale:"de"};const Ye={title:"Form/Field/CurrencyInputField",component:ie,argTypes:{onSubmit:{action:"submit"}}};var h,y,C;e.parameters={...e.parameters,docs:{...(h=e.parameters)==null?void 0:h.docs,source:{originalSource:`args => {
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
      <CurrencyInputField {...props} ref={fieldRef} name={"theNumber"} />{" "}
      <FormViewer submittedValues={submittedValues} fieldRef={fieldRef} />
    </FormController>;
}`,...(C=(y=e.parameters)==null?void 0:y.docs)==null?void 0:C.source}}};var M,x,E;n.parameters={...n.parameters,docs:{...(M=n.parameters)==null?void 0:M.docs,source:{originalSource:`args => {
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
      <CurrencyInputField {...props} ref={fieldRef} name={"theNumber"} />{" "}
      <FormViewer submittedValues={submittedValues} fieldRef={fieldRef} />
    </FormController>;
}`,...(E=(x=n.parameters)==null?void 0:x.docs)==null?void 0:E.source}}};var I,w,N;a.parameters={...a.parameters,docs:{...(I=a.parameters)==null?void 0:I.docs,source:{originalSource:`args => {
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
      <CurrencyInputField {...props} ref={fieldRef} name={"theNumber"} />{" "}
      <FormViewer submittedValues={submittedValues} fieldRef={fieldRef} />
    </FormController>;
}`,...(N=(w=a.parameters)==null?void 0:w.docs)==null?void 0:N.source}}};var $,P,T;d.parameters={...d.parameters,docs:{...($=d.parameters)==null?void 0:$.docs,source:{originalSource:`args => {
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
      <CurrencyInputField {...props} ref={fieldRef} name={"theNumber"} />{" "}
      <FormViewer submittedValues={submittedValues} fieldRef={fieldRef} />
    </FormController>;
}`,...(T=(P=d.parameters)==null?void 0:P.docs)==null?void 0:T.source}}};var v,D,O;c.parameters={...c.parameters,docs:{...(v=c.parameters)==null?void 0:v.docs,source:{originalSource:`args => {
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
      <CurrencyInputField {...props} ref={fieldRef} name={"theNumber"} />{" "}
      <FormViewer submittedValues={submittedValues} fieldRef={fieldRef} />
    </FormController>;
}`,...(O=(D=c.parameters)==null?void 0:D.docs)==null?void 0:O.source}}};var z,L,q;i.parameters={...i.parameters,docs:{...(z=i.parameters)==null?void 0:z.docs,source:{originalSource:`args => {
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
      <CurrencyInputField {...props} ref={fieldRef} name={"theNumber"} />{" "}
      <FormViewer submittedValues={submittedValues} fieldRef={fieldRef} />
    </FormController>;
}`,...(q=(L=i.parameters)==null?void 0:L.docs)==null?void 0:q.source}}};var j,_,A;t.parameters={...t.parameters,docs:{...(j=t.parameters)==null?void 0:j.docs,source:{originalSource:`args => {
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
      <CurrencyInputField {...props} ref={fieldRef} name={"theNumber"} />{" "}
      <FormViewer submittedValues={submittedValues} fieldRef={fieldRef} />
    </FormController>;
}`,...(A=(_=t.parameters)==null?void 0:_.docs)==null?void 0:A.source}}};var U,k,B;o.parameters={...o.parameters,docs:{...(U=o.parameters)==null?void 0:U.docs,source:{originalSource:`args => {
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
      <CurrencyInputField {...props} ref={fieldRef} name={"theNumber"} />{" "}
      <FormViewer submittedValues={submittedValues} fieldRef={fieldRef} />
    </FormController>;
}`,...(B=(k=o.parameters)==null?void 0:k.docs)==null?void 0:B.source}}};var G,H,J;p.parameters={...p.parameters,docs:{...(G=p.parameters)==null?void 0:G.docs,source:{originalSource:`(args, context) => {
  return <FormI18nProvider getValidationErrorMessage={({
    name
  }, error) => {
    return \`Field '\${name}' has Error '\${error.type}'. Original error message: \${error.message || "---"}\`;
  }}>
      {Template(args, context)}
    </FormI18nProvider>;
}`,...(J=(H=p.parameters)==null?void 0:H.docs)==null?void 0:J.source}}};var K,Q,W;s.parameters={...s.parameters,docs:{...(K=s.parameters)==null?void 0:K.docs,source:{originalSource:`(args, context) => {
  return <FormI18nProvider getValidationErrorMessage={({
    name
  }, error) => {
    return \`Field '\${name}' has Error '\${error.type}'. Original error message: \${error.message || "---"}\`;
  }}>
      {Template(args, context)}
    </FormI18nProvider>;
}`,...(W=(Q=s.parameters)==null?void 0:Q.docs)==null?void 0:W.source}}};var X,Y,Z;m.parameters={...m.parameters,docs:{...(X=m.parameters)==null?void 0:X.docs,source:{originalSource:`(args, context) => {
  return <FormI18nProvider getValidationErrorMessage={({
    name
  }, error) => {
    return \`Field '\${name}' has Error '\${error.type}'. Original error message: \${error.message || "---"}\`;
  }}>
      {Template(args, context)}
    </FormI18nProvider>;
}`,...(Z=(Y=m.parameters)==null?void 0:Y.docs)==null?void 0:Z.source}}};var ee,re,ne;l.parameters={...l.parameters,docs:{...(ee=l.parameters)==null?void 0:ee.docs,source:{originalSource:`(args, context) => {
  return <FormI18nProvider getValidationErrorMessage={({
    name
  }, error) => {
    return \`Field '\${name}' has Error '\${error.type}'. Original error message: \${error.message || "---"}\`;
  }}>
      {Template(args, context)}
    </FormI18nProvider>;
}`,...(ne=(re=l.parameters)==null?void 0:re.docs)==null?void 0:ne.source}}};var oe,te,ae;u.parameters={...u.parameters,docs:{...(oe=u.parameters)==null?void 0:oe.docs,source:{originalSource:`(args, context) => {
  return <FormI18nProvider getValidationErrorMessage={({
    name
  }, error) => {
    return \`Field '\${name}' has Error '\${error.type}'. Original error message: \${error.message || "---"}\`;
  }}>
      {Template(args, context)}
    </FormI18nProvider>;
}`,...(ae=(te=u.parameters)==null?void 0:te.docs)==null?void 0:ae.source}}};const Ze=["Empty","Prefilled","PrefilledAndRounded","Disabled","Readonly","ValidationRequired","ValidationMin","ValidationMinMax","ValidationTranslationRequired","ValidationTranslationMin","ValidationTranslationMinMax","LocalizedDe","LocalizedDeMinMax"];export{d as Disabled,e as Empty,l as LocalizedDe,u as LocalizedDeMinMax,n as Prefilled,a as PrefilledAndRounded,c as Readonly,t as ValidationMin,o as ValidationMinMax,i as ValidationRequired,s as ValidationTranslationMin,m as ValidationTranslationMinMax,p as ValidationTranslationRequired,Ze as __namedExportsOrder,Ye as default};
//# sourceMappingURL=CurrencyInputField.stories-upVJnsl6.js.map
