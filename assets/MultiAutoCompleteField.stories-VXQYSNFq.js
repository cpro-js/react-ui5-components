import{a as N,j as p}from"./useIsomorphicLayoutEffect-xRq3KBKR.js";import{r as U}from"./index-9BFB80ap.js";import{S as H,C as l}from"./AutoComplete-storyData-ahnPkInH.js";import{a as k}from"./FormController-a24Yjre7.js";import{F as z}from"./FormI18n-cauWpAAl.js";import{u as B,F as G}from"./FormViewer-T_trOpy-.js";import{M as D}from"./MultiAutoCompleteField--7CcbLkc.js";import"./chunk-AY7I2SME-4UylTnhF.js";import"./useFormController-QYTj16FN.js";import"./useLatestRef-8OPiqaso.js";import"./Button-NwTvRcXl.js";import"./util-5JWwSdnm.js";import"./index-iYocmi5m.js";import"./Button-Kg1wKD-C.js";import"./withWebComponent-uMO5mAaX.js";import"./index-j_UY7yy0.js";import"./Title-siMC53XU.js";import"./WrappingType-avPrqc94.js";import"./clsx-2Jv0kmJG.js";import"./react-jss.esm-1qNMITJJ.js";import"./css-vendor.esm-6cc1E2ZA.js";import"./index-8BDAWP4G.js";import"./Popover-5NcXG5Re.js";import"./class-map-VCtLKyDB.js";import"./index-2q9JMl2_.js";import"./ToggleButton-tLhZtSzP.js";import"./CustomVariables-Ms22ARR_.js";import"./debounce-F9irgL9Y.js";import"./index-tPOYiQGZ.js";import"./formSupport-Tri1jE22.js";import"./InputElementsFormSupport-cwSAMczA.js";import"./MultiAutoComplete-KzFup3ln.js";import"./CommonSelection-w2tAztTJ.js";import"./ValueState-Qqn7Ekme.js";import"./GroupHeaderListItem-NSzFLVaM.js";import"./ItemNavigation-SKlyB5ng.js";import"./BusyIndicator-LnPMRz3m.js";import"./Label-QZ2nubHh.js";import"./Suggestions.css-_W_4sSd4.js";import"./CheckBox-3JGrWoLD.js";import"./slim-arrow-right-h-63TUj1.js";import"./ValueStateMessage.css-NtFaRvah.js";import"./PasteHandler-M9lQqGah.js";import"./ScrollEnablement-Ha971trf.js";import"./Input-jvkg1AKt.js";import"./value-help-yHR1Fcmv.js";import"./util-OqSjx520.js";const t=u=>{const{initialValues:c,onSubmit:d,...m}=u,{submittedValues:_,handleSubmit:j}=B({onSubmit:d}),f=U.useRef();return N(k,{initialValues:c,onSubmit:j,children:[p(D,{...m,ref:f,name:"items"}),p(G,{submittedValues:_,fieldRef:f})]})},J=(u,c)=>p(z,{getValidationErrorMessage:({name:d},m)=>`Field '${d}' has Error '${m.type}'. Original error message: ${m.message||"---"}`,children:t(u)}),e=t.bind({});e.args={values:void 0,onSearch:H};const o=t.bind({});o.args={disabled:!0};const r=t.bind({});r.args={...e.args,initialSuggestions:[l[1],l[3]],initialValues:{items:[l[1].value,l[3].value]}};const i=t.bind({});i.args={...r.args,disabled:!0};const s=t.bind({});s.args={...r.args,readonly:!0};const n=t.bind({});n.args={...e.args,required:!0};const a=J.bind({});a.args={...n.args};const Ue={title:"Form/Field/MultiAutoCompleteField",component:D,argTypes:{onSubmit:{action:"submit"}}};var b,F,S;e.parameters={...e.parameters,docs:{...(b=e.parameters)==null?void 0:b.docs,source:{originalSource:`args => {
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
  const fieldRef = useRef<FormFieldElement>();
  return <FormController {...{
    initialValues,
    onSubmit: handleSubmit
  }}>
      <MultiAutoCompleteField {...props} ref={fieldRef} name={"items"} />
      <FormViewer submittedValues={submittedValues} fieldRef={fieldRef} />
    </FormController>;
}`,...(S=(F=e.parameters)==null?void 0:F.docs)==null?void 0:S.source}}};var V,g,R;o.parameters={...o.parameters,docs:{...(V=o.parameters)==null?void 0:V.docs,source:{originalSource:`args => {
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
  const fieldRef = useRef<FormFieldElement>();
  return <FormController {...{
    initialValues,
    onSubmit: handleSubmit
  }}>
      <MultiAutoCompleteField {...props} ref={fieldRef} name={"items"} />
      <FormViewer submittedValues={submittedValues} fieldRef={fieldRef} />
    </FormController>;
}`,...(R=(g=o.parameters)==null?void 0:g.docs)==null?void 0:R.source}}};var C,h,E;r.parameters={...r.parameters,docs:{...(C=r.parameters)==null?void 0:C.docs,source:{originalSource:`args => {
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
  const fieldRef = useRef<FormFieldElement>();
  return <FormController {...{
    initialValues,
    onSubmit: handleSubmit
  }}>
      <MultiAutoCompleteField {...props} ref={fieldRef} name={"items"} />
      <FormViewer submittedValues={submittedValues} fieldRef={fieldRef} />
    </FormController>;
}`,...(E=(h=r.parameters)==null?void 0:h.docs)==null?void 0:E.source}}};var w,A,M;i.parameters={...i.parameters,docs:{...(w=i.parameters)==null?void 0:w.docs,source:{originalSource:`args => {
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
  const fieldRef = useRef<FormFieldElement>();
  return <FormController {...{
    initialValues,
    onSubmit: handleSubmit
  }}>
      <MultiAutoCompleteField {...props} ref={fieldRef} name={"items"} />
      <FormViewer submittedValues={submittedValues} fieldRef={fieldRef} />
    </FormController>;
}`,...(M=(A=i.parameters)==null?void 0:A.docs)==null?void 0:M.source}}};var x,T,v;s.parameters={...s.parameters,docs:{...(x=s.parameters)==null?void 0:x.docs,source:{originalSource:`args => {
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
  const fieldRef = useRef<FormFieldElement>();
  return <FormController {...{
    initialValues,
    onSubmit: handleSubmit
  }}>
      <MultiAutoCompleteField {...props} ref={fieldRef} name={"items"} />
      <FormViewer submittedValues={submittedValues} fieldRef={fieldRef} />
    </FormController>;
}`,...(v=(T=s.parameters)==null?void 0:T.docs)==null?void 0:v.source}}};var P,y,I;n.parameters={...n.parameters,docs:{...(P=n.parameters)==null?void 0:P.docs,source:{originalSource:`args => {
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
  const fieldRef = useRef<FormFieldElement>();
  return <FormController {...{
    initialValues,
    onSubmit: handleSubmit
  }}>
      <MultiAutoCompleteField {...props} ref={fieldRef} name={"items"} />
      <FormViewer submittedValues={submittedValues} fieldRef={fieldRef} />
    </FormController>;
}`,...(I=(y=n.parameters)==null?void 0:y.docs)==null?void 0:I.source}}};var $,q,O;a.parameters={...a.parameters,docs:{...($=a.parameters)==null?void 0:$.docs,source:{originalSource:`(args, context) => {
  return <FormI18nProvider getValidationErrorMessage={({
    name
  }, error) => {
    return \`Field '\${name}' has Error '\${error.type}'. Original error message: \${error.message || "---"}\`;
  }}>
      {Template(args, context)}
    </FormI18nProvider>;
}`,...(O=(q=a.parameters)==null?void 0:q.docs)==null?void 0:O.source}}};const He=["Standard","Disabled","Prefilled","PrefilledAndDisabled","Readonly","ValidationRequired","ValidationTranslationRequired"];export{o as Disabled,r as Prefilled,i as PrefilledAndDisabled,s as Readonly,e as Standard,n as ValidationRequired,a as ValidationTranslationRequired,He as __namedExportsOrder,Ue as default};
//# sourceMappingURL=MultiAutoCompleteField.stories-VXQYSNFq.js.map
