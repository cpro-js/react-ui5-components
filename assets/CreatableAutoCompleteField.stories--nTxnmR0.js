import{a as j,j as u}from"./useIsomorphicLayoutEffect-xRq3KBKR.js";import{r as D}from"./index-9BFB80ap.js";import{S as M,C as p}from"./AutoComplete-storyData-ahnPkInH.js";import{a as N}from"./FormController-a24Yjre7.js";import{F as U}from"./FormI18n-cauWpAAl.js";import{u as H,F as k}from"./FormViewer-T_trOpy-.js";import{C as q}from"./CreatableAutoCompleteField-si3WeQjF.js";import"./chunk-AY7I2SME-4UylTnhF.js";import"./useFormController-QYTj16FN.js";import"./useLatestRef-8OPiqaso.js";import"./Button-NwTvRcXl.js";import"./util-5JWwSdnm.js";import"./index-iYocmi5m.js";import"./Button-Kg1wKD-C.js";import"./withWebComponent-uMO5mAaX.js";import"./index-j_UY7yy0.js";import"./Title-siMC53XU.js";import"./WrappingType-avPrqc94.js";import"./clsx-2Jv0kmJG.js";import"./react-jss.esm-1qNMITJJ.js";import"./css-vendor.esm-6cc1E2ZA.js";import"./index-8BDAWP4G.js";import"./Popover-5NcXG5Re.js";import"./class-map-VCtLKyDB.js";import"./index-2q9JMl2_.js";import"./ToggleButton-tLhZtSzP.js";import"./CustomVariables-Ms22ARR_.js";import"./debounce-F9irgL9Y.js";import"./index-tPOYiQGZ.js";import"./formSupport-Tri1jE22.js";import"./InputElementsFormSupport-cwSAMczA.js";import"./CreatableAutoComplete-j1f5z003.js";import"./useAsync-T4TD-_JE.js";import"./CommonSelection-w2tAztTJ.js";import"./ValueState-Qqn7Ekme.js";import"./GroupHeaderListItem-NSzFLVaM.js";import"./ItemNavigation-SKlyB5ng.js";import"./BusyIndicator-LnPMRz3m.js";import"./Label-QZ2nubHh.js";import"./Suggestions.css-_W_4sSd4.js";import"./CheckBox-3JGrWoLD.js";import"./slim-arrow-right-h-63TUj1.js";import"./ValueStateMessage.css-NtFaRvah.js";import"./useCreatable-oCBfdz5P.js";import"./CoreAutocomplete-GmrZHgqm.js";import"./search-Srqkuups.js";import"./index-DEsUDRQH.js";import"./Input-jvkg1AKt.js";import"./util-OqSjx520.js";const o=(m,O)=>{const{initialValues:l,onSubmit:s,...P}=m,{submittedValues:v,handleSubmit:_}=H({onSubmit:s}),d=D.useRef();return j(N,{initialValues:l,onSubmit:_,children:[u(q,{...P,ref:d,name:"item"}),u(k,{submittedValues:v,fieldRef:d})]})},z=(m,O)=>u(U,{getValidationErrorMessage:({name:l},s)=>`Field '${l}' has Error '${s.type}'. Original error message: ${s.message||"---"}`,children:o(m)}),e=o.bind({});e.args={loadItems:M};const r=o.bind({});r.args={...e.args,initialItems:[p[1]],initialValues:{item:p[1].value}};const n=o.bind({});n.args={...r.args,disabled:!0};const i=o.bind({});i.args={...r.args,readonly:!0};const t=o.bind({});t.args={...e.args,required:!0};const a=z.bind({});a.args={...t.args};const Ne={title:"Form/Field/Autocomplete/CreatableAutoCompleteField",component:q,argTypes:{onSubmit:{action:"submit"},onValueCreate:{action:"onValueCreate"}}};var c,b,f;e.parameters={...e.parameters,docs:{...(c=e.parameters)==null?void 0:c.docs,source:{originalSource:`(args, context) => {
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
      <CreatableAutoCompleteField {...props} ref={fieldRef} name="item" />
      <FormViewer submittedValues={submittedValues} fieldRef={fieldRef} />
    </FormController>;
}`,...(f=(b=e.parameters)==null?void 0:b.docs)==null?void 0:f.source}}};var F,V,S;r.parameters={...r.parameters,docs:{...(F=r.parameters)==null?void 0:F.docs,source:{originalSource:`(args, context) => {
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
      <CreatableAutoCompleteField {...props} ref={fieldRef} name="item" />
      <FormViewer submittedValues={submittedValues} fieldRef={fieldRef} />
    </FormController>;
}`,...(S=(V=r.parameters)==null?void 0:V.docs)==null?void 0:S.source}}};var g,R,C;n.parameters={...n.parameters,docs:{...(g=n.parameters)==null?void 0:g.docs,source:{originalSource:`(args, context) => {
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
      <CreatableAutoCompleteField {...props} ref={fieldRef} name="item" />
      <FormViewer submittedValues={submittedValues} fieldRef={fieldRef} />
    </FormController>;
}`,...(C=(R=n.parameters)==null?void 0:R.docs)==null?void 0:C.source}}};var h,x,E;i.parameters={...i.parameters,docs:{...(h=i.parameters)==null?void 0:h.docs,source:{originalSource:`(args, context) => {
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
      <CreatableAutoCompleteField {...props} ref={fieldRef} name="item" />
      <FormViewer submittedValues={submittedValues} fieldRef={fieldRef} />
    </FormController>;
}`,...(E=(x=i.parameters)==null?void 0:x.docs)==null?void 0:E.source}}};var w,A,I;t.parameters={...t.parameters,docs:{...(w=t.parameters)==null?void 0:w.docs,source:{originalSource:`(args, context) => {
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
      <CreatableAutoCompleteField {...props} ref={fieldRef} name="item" />
      <FormViewer submittedValues={submittedValues} fieldRef={fieldRef} />
    </FormController>;
}`,...(I=(A=t.parameters)==null?void 0:A.docs)==null?void 0:I.source}}};var T,y,$;a.parameters={...a.parameters,docs:{...(T=a.parameters)==null?void 0:T.docs,source:{originalSource:`(args, context) => {
  return <FormI18nProvider getValidationErrorMessage={({
    name
  }, error) => {
    return \`Field '\${name}' has Error '\${error.type}'. Original error message: \${error.message || "---"}\`;
  }}>
      {Template(args, context)}
    </FormI18nProvider>;
}`,...($=(y=a.parameters)==null?void 0:y.docs)==null?void 0:$.source}}};const Ue=["Standard","Prefilled","Disabled","Readonly","ValidationRequired","ValidationTranslationRequired"];export{n as Disabled,r as Prefilled,i as Readonly,e as Standard,t as ValidationRequired,a as ValidationTranslationRequired,Ue as __namedExportsOrder,Ne as default};
//# sourceMappingURL=CreatableAutoCompleteField.stories--nTxnmR0.js.map
