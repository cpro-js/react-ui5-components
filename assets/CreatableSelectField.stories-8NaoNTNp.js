import{a as D,j as u}from"./useIsomorphicLayoutEffect-xRq3KBKR.js";import{r as M}from"./index-9BFB80ap.js";import{C as I}from"./AutoComplete-storyData-ahnPkInH.js";import{a as A}from"./FormController-a24Yjre7.js";import{F as N}from"./FormI18n-cauWpAAl.js";import{u as U,F as k}from"./FormViewer-T_trOpy-.js";import{C as P}from"./CreatableSelectField-wcGtW0py.js";import"./chunk-AY7I2SME-4UylTnhF.js";import"./useFormController-QYTj16FN.js";import"./useLatestRef-8OPiqaso.js";import"./Button-NwTvRcXl.js";import"./util-5JWwSdnm.js";import"./index-iYocmi5m.js";import"./Button-Kg1wKD-C.js";import"./withWebComponent-uMO5mAaX.js";import"./index-j_UY7yy0.js";import"./Title-siMC53XU.js";import"./WrappingType-avPrqc94.js";import"./clsx-2Jv0kmJG.js";import"./react-jss.esm-1qNMITJJ.js";import"./css-vendor.esm-6cc1E2ZA.js";import"./index-8BDAWP4G.js";import"./Popover-5NcXG5Re.js";import"./class-map-VCtLKyDB.js";import"./index-2q9JMl2_.js";import"./ToggleButton-tLhZtSzP.js";import"./CustomVariables-Ms22ARR_.js";import"./debounce-F9irgL9Y.js";import"./index-tPOYiQGZ.js";import"./formSupport-Tri1jE22.js";import"./InputElementsFormSupport-cwSAMczA.js";import"./CreatableSelect--wfQMTIN.js";import"./useCreatable-oCBfdz5P.js";import"./CoreAutocomplete-GmrZHgqm.js";import"./CommonSelection-w2tAztTJ.js";import"./ValueState-Qqn7Ekme.js";import"./GroupHeaderListItem-NSzFLVaM.js";import"./ItemNavigation-SKlyB5ng.js";import"./BusyIndicator-LnPMRz3m.js";import"./Label-QZ2nubHh.js";import"./Suggestions.css-_W_4sSd4.js";import"./CheckBox-3JGrWoLD.js";import"./slim-arrow-right-h-63TUj1.js";import"./ValueStateMessage.css-NtFaRvah.js";import"./search-Srqkuups.js";import"./index-DEsUDRQH.js";import"./Input-jvkg1AKt.js";import"./util-OqSjx520.js";const n=(m,v)=>{const{initialValues:l,onSubmit:s,...O}=m,{submittedValues:j,handleSubmit:_}=U({onSubmit:s}),d=M.useRef();return D(A,{initialValues:l,onSubmit:_,children:[u(P,{...O,ref:d,name:"item"}),u(k,{submittedValues:j,fieldRef:d})]})},z=(m,v)=>u(N,{getValidationErrorMessage:({name:l},s)=>`Field '${l}' has Error '${s.type}'. Original error message: ${s.message||"---"}`,children:n(m)}),e=n.bind({});e.args={items:I};const r=n.bind({});r.args={...e.args,initialValues:{item:I[1].value}};const o=n.bind({});o.args={...r.args,disabled:!0};const i=n.bind({});i.args={...r.args,readonly:!0};const t=n.bind({});t.args={...e.args,required:!0};const a=z.bind({});a.args={...t.args};const Me={title:"Form/Field/Autocomplete/CreatableSelectField",component:P,argTypes:{onSubmit:{action:"submit"},onValueCreate:{action:"onValueCreate"}}};var p,c,b;e.parameters={...e.parameters,docs:{...(p=e.parameters)==null?void 0:p.docs,source:{originalSource:`(args, context) => {
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
      <CreatableSelectField {...props} ref={fieldRef} name="item" />
      <FormViewer submittedValues={submittedValues} fieldRef={fieldRef} />
    </FormController>;
}`,...(b=(c=e.parameters)==null?void 0:c.docs)==null?void 0:b.source}}};var f,S,F;r.parameters={...r.parameters,docs:{...(f=r.parameters)==null?void 0:f.docs,source:{originalSource:`(args, context) => {
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
      <CreatableSelectField {...props} ref={fieldRef} name="item" />
      <FormViewer submittedValues={submittedValues} fieldRef={fieldRef} />
    </FormController>;
}`,...(F=(S=r.parameters)==null?void 0:S.docs)==null?void 0:F.source}}};var V,g,R;o.parameters={...o.parameters,docs:{...(V=o.parameters)==null?void 0:V.docs,source:{originalSource:`(args, context) => {
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
      <CreatableSelectField {...props} ref={fieldRef} name="item" />
      <FormViewer submittedValues={submittedValues} fieldRef={fieldRef} />
    </FormController>;
}`,...(R=(g=o.parameters)==null?void 0:g.docs)==null?void 0:R.source}}};var C,h,x;i.parameters={...i.parameters,docs:{...(C=i.parameters)==null?void 0:C.docs,source:{originalSource:`(args, context) => {
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
      <CreatableSelectField {...props} ref={fieldRef} name="item" />
      <FormViewer submittedValues={submittedValues} fieldRef={fieldRef} />
    </FormController>;
}`,...(x=(h=i.parameters)==null?void 0:h.docs)==null?void 0:x.source}}};var w,E,T;t.parameters={...t.parameters,docs:{...(w=t.parameters)==null?void 0:w.docs,source:{originalSource:`(args, context) => {
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
      <CreatableSelectField {...props} ref={fieldRef} name="item" />
      <FormViewer submittedValues={submittedValues} fieldRef={fieldRef} />
    </FormController>;
}`,...(T=(E=t.parameters)==null?void 0:E.docs)==null?void 0:T.source}}};var y,$,q;a.parameters={...a.parameters,docs:{...(y=a.parameters)==null?void 0:y.docs,source:{originalSource:`(args, context) => {
  return <FormI18nProvider getValidationErrorMessage={({
    name
  }, error) => {
    return \`Field '\${name}' has Error '\${error.type}'. Original error message: \${error.message || "---"}\`;
  }}>
      {Template(args, context)}
    </FormI18nProvider>;
}`,...(q=($=a.parameters)==null?void 0:$.docs)==null?void 0:q.source}}};const Ae=["Standard","Prefilled","Disabled","Readonly","ValidationRequired","ValidationTranslationRequired"];export{o as Disabled,r as Prefilled,i as Readonly,e as Standard,t as ValidationRequired,a as ValidationTranslationRequired,Ae as __namedExportsOrder,Me as default};
//# sourceMappingURL=CreatableSelectField.stories-8NaoNTNp.js.map
