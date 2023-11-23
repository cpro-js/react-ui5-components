import{a as B,j as c}from"./useIsomorphicLayoutEffect-xRq3KBKR.js";import{r as G}from"./index-9BFB80ap.js";import{a as H}from"./FormController-a24Yjre7.js";import{F as Q}from"./FormI18n-cauWpAAl.js";import{u as J,F as K}from"./FormViewer-T_trOpy-.js";import{M as F}from"./MultiSelectField-c6R2S15U.js";import"./useFormController-QYTj16FN.js";import"./useLatestRef-8OPiqaso.js";import"./Button-NwTvRcXl.js";import"./util-5JWwSdnm.js";import"./index-iYocmi5m.js";import"./Button-Kg1wKD-C.js";import"./withWebComponent-uMO5mAaX.js";import"./index-j_UY7yy0.js";import"./Title-siMC53XU.js";import"./WrappingType-avPrqc94.js";import"./clsx-2Jv0kmJG.js";import"./react-jss.esm-1qNMITJJ.js";import"./css-vendor.esm-6cc1E2ZA.js";import"./index-8BDAWP4G.js";import"./Popover-5NcXG5Re.js";import"./class-map-VCtLKyDB.js";import"./index-2q9JMl2_.js";import"./ToggleButton-tLhZtSzP.js";import"./CustomVariables-Ms22ARR_.js";import"./debounce-F9irgL9Y.js";import"./index-tPOYiQGZ.js";import"./formSupport-Tri1jE22.js";import"./InputElementsFormSupport-cwSAMczA.js";import"./MultiSelect-Cjpy8Qw_.js";import"./PasteHandler-M9lQqGah.js";import"./ItemNavigation-SKlyB5ng.js";import"./ScrollEnablement-Ha971trf.js";import"./ValueState-Qqn7Ekme.js";import"./slim-arrow-right-h-63TUj1.js";import"./ValueStateMessage.css-NtFaRvah.js";import"./Suggestions.css-_W_4sSd4.js";import"./GroupHeaderListItem-NSzFLVaM.js";import"./BusyIndicator-LnPMRz3m.js";import"./Label-QZ2nubHh.js";import"./CheckBox-3JGrWoLD.js";import"./ComboBoxItem-tImCj2PR.js";import"./util-OqSjx520.js";const V=[{value:1,label:"Test 1 Number",alt:"Test 1 Number Alt"},{value:"1",label:"Test 1 String",alt:"Test 1 String Alt"},{value:"2",label:"Test 2",alt:"Test 2 Alt"},{value:"3",label:"Test 3",alt:"Test 3 Alt"},{value:"4",label:"Test 4",alt:"Test 4 Alt"}],t=o=>{const{initialValues:b,onSubmit:s,...n}=o,{submittedValues:f,handleSubmit:S}=J({onSubmit:s}),a=G.useRef();return B(H,{initialValues:b,onSubmit:S,children:[c(F,{...n,ref:a,name:"item"}),c(K,{submittedValues:f,fieldRef:a})]})},U=(o,b)=>c(Q,{getValidationErrorMessage:({name:s},n)=>`Field '${s}' has Error '${n.type}'. Original error message: ${n.message||"---"}`,children:t(o)}),l=t.bind({});l.args={};const e=t.bind({});e.args={items:V};const r=t.bind({});r.args={...e.args,initialValues:{item:[V[1].value]}};const m=t.bind({});m.args={...r.args,disabled:!0};const u=t.bind({});u.args={...r.args,readonly:!0};const i=t.bind({});i.args={...e.args,required:!0};const d=U.bind({});d.args={...i.args};const W=o=>{const{initialValues:b,onSubmit:s,...n}=o,{submittedValues:f,handleSubmit:S}=J({onSubmit:s}),a=G.useRef();return B(H,{initialValues:b,onSubmit:S,children:[c(F,{...n,ref:a,name:"item"}),c(K,{submittedValues:f,fieldRef:a})]})},p=W.bind({});p.args={...e.args,items:V,itemLabel:"alt",itemValue:"label"};const Le={title:"Form/Field/MultiSelectField",component:F,argTypes:{onSubmit:{action:"submit"}}};var g,R,h;l.parameters={...l.parameters,docs:{...(g=l.parameters)==null?void 0:g.docs,source:{originalSource:`args => {
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
        <MultiSelectField {...props} ref={fieldRef} name={"item"} />
        <FormViewer submittedValues={submittedValues} fieldRef={fieldRef} />
      </FormController>;
}`,...(h=(R=l.parameters)==null?void 0:R.docs)==null?void 0:h.source}}};var C,T,w;e.parameters={...e.parameters,docs:{...(C=e.parameters)==null?void 0:C.docs,source:{originalSource:`args => {
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
        <MultiSelectField {...props} ref={fieldRef} name={"item"} />
        <FormViewer submittedValues={submittedValues} fieldRef={fieldRef} />
      </FormController>;
}`,...(w=(T=e.parameters)==null?void 0:T.docs)==null?void 0:w.source}}};var E,M,v;r.parameters={...r.parameters,docs:{...(E=r.parameters)==null?void 0:E.docs,source:{originalSource:`args => {
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
        <MultiSelectField {...props} ref={fieldRef} name={"item"} />
        <FormViewer submittedValues={submittedValues} fieldRef={fieldRef} />
      </FormController>;
}`,...(v=(M=r.parameters)==null?void 0:M.docs)==null?void 0:v.source}}};var x,y,A;m.parameters={...m.parameters,docs:{...(x=m.parameters)==null?void 0:x.docs,source:{originalSource:`args => {
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
        <MultiSelectField {...props} ref={fieldRef} name={"item"} />
        <FormViewer submittedValues={submittedValues} fieldRef={fieldRef} />
      </FormController>;
}`,...(A=(y=m.parameters)==null?void 0:y.docs)==null?void 0:A.source}}};var I,$,q;u.parameters={...u.parameters,docs:{...(I=u.parameters)==null?void 0:I.docs,source:{originalSource:`args => {
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
        <MultiSelectField {...props} ref={fieldRef} name={"item"} />
        <FormViewer submittedValues={submittedValues} fieldRef={fieldRef} />
      </FormController>;
}`,...(q=($=u.parameters)==null?void 0:$.docs)==null?void 0:q.source}}};var P,j,O;i.parameters={...i.parameters,docs:{...(P=i.parameters)==null?void 0:P.docs,source:{originalSource:`args => {
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
        <MultiSelectField {...props} ref={fieldRef} name={"item"} />
        <FormViewer submittedValues={submittedValues} fieldRef={fieldRef} />
      </FormController>;
}`,...(O=(j=i.parameters)==null?void 0:j.docs)==null?void 0:O.source}}};var _,D,N;d.parameters={...d.parameters,docs:{...(_=d.parameters)==null?void 0:_.docs,source:{originalSource:`(args, context) => {
  return <FormI18nProvider getValidationErrorMessage={({
    name
  }, error) => {
    return \`Field '\${name}' has Error '\${error.type}'. Original error message: \${error.message || "---"}\`;
  }}>
      {Template(args, context)}
    </FormI18nProvider>;
}`,...(N=(D=d.parameters)==null?void 0:D.docs)==null?void 0:N.source}}};var L,k,z;p.parameters={...p.parameters,docs:{...(L=p.parameters)==null?void 0:L.docs,source:{originalSource:`args => {
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
      <MultiSelectField<SelectItemAlt, string> {...props} ref={fieldRef} name="item" />
      <FormViewer submittedValues={submittedValues} fieldRef={fieldRef} />
    </FormController>;
}`,...(z=(k=p.parameters)==null?void 0:k.docs)==null?void 0:z.source}}};const ke=["Empty","Standard","Prefilled","Disabled","Readonly","ValidationRequired","ValidationTranslationRequired","CustomItemModel"];export{p as CustomItemModel,m as Disabled,l as Empty,r as Prefilled,u as Readonly,e as Standard,i as ValidationRequired,d as ValidationTranslationRequired,ke as __namedExportsOrder,Le as default};
//# sourceMappingURL=MultiSelectField.stories-HUvtIJfE.js.map
