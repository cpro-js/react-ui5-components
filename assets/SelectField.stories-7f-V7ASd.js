import{a as J,j as b}from"./useIsomorphicLayoutEffect-xRq3KBKR.js";import{r as K}from"./index-9BFB80ap.js";import{a as Q}from"./FormController-a24Yjre7.js";import{F as Y}from"./FormI18n-cauWpAAl.js";import{u as U,F as X}from"./FormViewer-T_trOpy-.js";import{S as V}from"./SelectField-TdYCce4l.js";import"./useFormController-QYTj16FN.js";import"./useLatestRef-8OPiqaso.js";import"./Button-NwTvRcXl.js";import"./util-5JWwSdnm.js";import"./index-iYocmi5m.js";import"./Button-Kg1wKD-C.js";import"./withWebComponent-uMO5mAaX.js";import"./index-j_UY7yy0.js";import"./Title-siMC53XU.js";import"./WrappingType-avPrqc94.js";import"./clsx-2Jv0kmJG.js";import"./react-jss.esm-1qNMITJJ.js";import"./css-vendor.esm-6cc1E2ZA.js";import"./index-8BDAWP4G.js";import"./Popover-5NcXG5Re.js";import"./class-map-VCtLKyDB.js";import"./index-2q9JMl2_.js";import"./ToggleButton-tLhZtSzP.js";import"./CustomVariables-Ms22ARR_.js";import"./debounce-F9irgL9Y.js";import"./index-tPOYiQGZ.js";import"./formSupport-Tri1jE22.js";import"./InputElementsFormSupport-cwSAMczA.js";import"./Select-dPQENXJo.js";import"./ValueState-Qqn7Ekme.js";import"./ComboBoxItem-tImCj2PR.js";import"./Suggestions.css-_W_4sSd4.js";import"./ValueStateMessage.css-NtFaRvah.js";import"./slim-arrow-right-h-63TUj1.js";import"./GroupHeaderListItem-NSzFLVaM.js";import"./ItemNavigation-SKlyB5ng.js";import"./BusyIndicator-LnPMRz3m.js";import"./Label-QZ2nubHh.js";import"./CheckBox-3JGrWoLD.js";import"./util-OqSjx520.js";const g=[{value:1,label:"Test 1 Number",alt:"Test 1 Number Alt"},{value:"1",label:"Test 1 String",alt:"Test 1 String Alt"},{value:"2",label:"Test 2",alt:"Test 2 Alt"},{value:"3",label:"Test 3",alt:"Test 3 Alt"},{value:"4",label:"Test 4",alt:"Test 4 Alt"}],e=s=>{const{initialValues:f,onSubmit:a,...i}=s,{submittedValues:S,handleSubmit:F}=U({onSubmit:a}),m=K.useRef();return J(Q,{initialValues:f,onSubmit:F,children:[b(V,{...i,ref:m,name:"item"}),b(X,{submittedValues:S,fieldRef:m})]})},Z=(s,f)=>b(Y,{getValidationErrorMessage:({name:a},i)=>`Field '${a}' has Error '${i.type}'. Original error message: ${i.message||"---"}`,children:e(s)}),l=e.bind({});l.args={};const r=e.bind({});r.args={items:g};const n=e.bind({});n.args={...r.args,addEmptyOption:!0};const t=e.bind({});t.args={...n.args,initialValues:{item:g[1].value}};const u=e.bind({});u.args={...t.args,disabled:!0};const d=e.bind({});d.args={...t.args,readonly:!0};const o=e.bind({});o.args={...n.args,required:!0};const p=Z.bind({});p.args={...o.args};const ee=s=>{const{initialValues:f,onSubmit:a,...i}=s,{submittedValues:S,handleSubmit:F}=U({onSubmit:a}),m=K.useRef();return J(Q,{initialValues:f,onSubmit:F,children:[b(V,{...i,ref:m,name:"item"}),b(X,{submittedValues:S,fieldRef:m})]})},c=ee.bind({});c.args={...r.args,items:g,itemLabel:"alt",itemValue:"label"};const ke={title:"Form/Field/SelectField",component:V,argTypes:{onSubmit:{action:"submit"}}};var R,h,C;l.parameters={...l.parameters,docs:{...(R=l.parameters)==null?void 0:R.docs,source:{originalSource:`args => {
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
      <SelectField {...props} ref={fieldRef} name={"item"} />
      <FormViewer submittedValues={submittedValues} fieldRef={fieldRef} />
    </FormController>;
}`,...(C=(h=l.parameters)==null?void 0:h.docs)==null?void 0:C.source}}};var E,w,T;r.parameters={...r.parameters,docs:{...(E=r.parameters)==null?void 0:E.docs,source:{originalSource:`args => {
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
      <SelectField {...props} ref={fieldRef} name={"item"} />
      <FormViewer submittedValues={submittedValues} fieldRef={fieldRef} />
    </FormController>;
}`,...(T=(w=r.parameters)==null?void 0:w.docs)==null?void 0:T.source}}};var y,v,x;n.parameters={...n.parameters,docs:{...(y=n.parameters)==null?void 0:y.docs,source:{originalSource:`args => {
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
      <SelectField {...props} ref={fieldRef} name={"item"} />
      <FormViewer submittedValues={submittedValues} fieldRef={fieldRef} />
    </FormController>;
}`,...(x=(v=n.parameters)==null?void 0:v.docs)==null?void 0:x.source}}};var A,I,O;t.parameters={...t.parameters,docs:{...(A=t.parameters)==null?void 0:A.docs,source:{originalSource:`args => {
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
      <SelectField {...props} ref={fieldRef} name={"item"} />
      <FormViewer submittedValues={submittedValues} fieldRef={fieldRef} />
    </FormController>;
}`,...(O=(I=t.parameters)==null?void 0:I.docs)==null?void 0:O.source}}};var $,q,P;u.parameters={...u.parameters,docs:{...($=u.parameters)==null?void 0:$.docs,source:{originalSource:`args => {
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
      <SelectField {...props} ref={fieldRef} name={"item"} />
      <FormViewer submittedValues={submittedValues} fieldRef={fieldRef} />
    </FormController>;
}`,...(P=(q=u.parameters)==null?void 0:q.docs)==null?void 0:P.source}}};var M,j,_;d.parameters={...d.parameters,docs:{...(M=d.parameters)==null?void 0:M.docs,source:{originalSource:`args => {
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
      <SelectField {...props} ref={fieldRef} name={"item"} />
      <FormViewer submittedValues={submittedValues} fieldRef={fieldRef} />
    </FormController>;
}`,...(_=(j=d.parameters)==null?void 0:j.docs)==null?void 0:_.source}}};var D,N,W;o.parameters={...o.parameters,docs:{...(D=o.parameters)==null?void 0:D.docs,source:{originalSource:`args => {
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
      <SelectField {...props} ref={fieldRef} name={"item"} />
      <FormViewer submittedValues={submittedValues} fieldRef={fieldRef} />
    </FormController>;
}`,...(W=(N=o.parameters)==null?void 0:N.docs)==null?void 0:W.source}}};var L,k,z;p.parameters={...p.parameters,docs:{...(L=p.parameters)==null?void 0:L.docs,source:{originalSource:`(args, context) => {
  return <FormI18nProvider getValidationErrorMessage={({
    name
  }, error) => {
    return \`Field '\${name}' has Error '\${error.type}'. Original error message: \${error.message || "---"}\`;
  }}>
        {Template(args, context)}
      </FormI18nProvider>;
}`,...(z=(k=p.parameters)==null?void 0:k.docs)==null?void 0:z.source}}};var B,G,H;c.parameters={...c.parameters,docs:{...(B=c.parameters)==null?void 0:B.docs,source:{originalSource:`args => {
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
      <SelectField<SelectItemAlt, string> {...props} ref={fieldRef} name="item" />
      <FormViewer submittedValues={submittedValues} fieldRef={fieldRef} />
    </FormController>;
}`,...(H=(G=c.parameters)==null?void 0:G.docs)==null?void 0:H.source}}};const ze=["Empty","Standard","WithEmptyOption","Prefilled","Disabled","Readonly","ValidationRequired","ValidationTranslationRequired","CustomItemModel"];export{c as CustomItemModel,u as Disabled,l as Empty,t as Prefilled,d as Readonly,r as Standard,o as ValidationRequired,p as ValidationTranslationRequired,n as WithEmptyOption,ze as __namedExportsOrder,ke as default};
//# sourceMappingURL=SelectField.stories-7f-V7ASd.js.map
