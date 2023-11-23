import{a as N,j as f}from"./useIsomorphicLayoutEffect-xRq3KBKR.js";import{r as Q}from"./index-9BFB80ap.js";import{a as U}from"./FormController-a24Yjre7.js";import{F as W}from"./FormI18n-cauWpAAl.js";import{a as u}from"./useWaitForWebcomponent-XV0L5ua2.js";import{D as J}from"./DatePickerField-xwAD0aAO.js";import{u as X,F as Y}from"./FormViewer-T_trOpy-.js";import"./useFormController-QYTj16FN.js";import"./useLatestRef-8OPiqaso.js";import"./css-vendor.esm-6cc1E2ZA.js";import"./index-8BDAWP4G.js";import"./withWebComponent-uMO5mAaX.js";import"./LocaleData-4yX_1pYY.js";import"./ValueState-Qqn7Ekme.js";import"./Suggestions.css-_W_4sSd4.js";import"./Popover-5NcXG5Re.js";import"./class-map-VCtLKyDB.js";import"./slim-arrow-right-h-63TUj1.js";import"./ValueStateMessage.css-NtFaRvah.js";import"./Button-Kg1wKD-C.js";import"./Title-siMC53XU.js";import"./WrappingType-avPrqc94.js";import"./Input-jvkg1AKt.js";import"./formSupport-Tri1jE22.js";import"./InputElementsFormSupport-cwSAMczA.js";import"./DatePicker-KKAI-CxL.js";import"./util-5JWwSdnm.js";import"./util-OqSjx520.js";import"./Button-NwTvRcXl.js";import"./index-iYocmi5m.js";import"./index-j_UY7yy0.js";import"./clsx-2Jv0kmJG.js";import"./react-jss.esm-1qNMITJJ.js";import"./index-2q9JMl2_.js";import"./ToggleButton-tLhZtSzP.js";import"./CustomVariables-Ms22ARR_.js";import"./debounce-F9irgL9Y.js";import"./index-tPOYiQGZ.js";const e=p=>{const{initialValues:b,onSubmit:c,...d}=p,{submittedValues:K,handleSubmit:L}=X({onSubmit:c}),V=Q.useRef(null);return N(U,{initialValues:b,onSubmit:L,children:[f(J,{...d,ref:V,name:"date"}),f(Y,{submittedValues:K,fieldRef:V})]})},Z=(p,b)=>f(W,{getValidationErrorMessage:({name:c},d)=>`Field '${c}' has Error '${d.type}'. Original error message: ${d.message||"---"}`,children:e(p)}),t=e.bind({});t.args={};const r=e.bind({});r.args={initialValues:{date:u(new Date)}};const i=e.bind({});i.args={...r.args,disabled:!0};const o=e.bind({});o.args={...r.args,readonly:!0};const n=e.bind({});n.args={required:!0};const a=e.bind({});a.args={minDate:u(new Date)};const s=e.bind({});s.args={maxDate:u(new Date)};const m=e.bind({});m.args={required:!0,minDate:u(new Date),maxDate:u(new Date)};const l=Z.bind({});l.args={...n.args};const _e={title:"Form/Field/DatePickerField",component:J,argTypes:{onSubmit:{action:"submit"},minDate:{type:"string",control:"text"},maxDate:{type:"string",control:"text"}}};var F,S,g;t.parameters={...t.parameters,docs:{...(F=t.parameters)==null?void 0:F.docs,source:{originalSource:`args => {
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
        <DatePickerField {...props} ref={fieldRef} name={"date"} />
        <FormViewer submittedValues={submittedValues} fieldRef={fieldRef} />
      </FormController>;
}`,...(g=(S=t.parameters)==null?void 0:S.docs)==null?void 0:g.source}}};var R,D,w;r.parameters={...r.parameters,docs:{...(R=r.parameters)==null?void 0:R.docs,source:{originalSource:`args => {
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
        <DatePickerField {...props} ref={fieldRef} name={"date"} />
        <FormViewer submittedValues={submittedValues} fieldRef={fieldRef} />
      </FormController>;
}`,...(w=(D=r.parameters)==null?void 0:D.docs)==null?void 0:w.source}}};var h,y,C;i.parameters={...i.parameters,docs:{...(h=i.parameters)==null?void 0:h.docs,source:{originalSource:`args => {
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
        <DatePickerField {...props} ref={fieldRef} name={"date"} />
        <FormViewer submittedValues={submittedValues} fieldRef={fieldRef} />
      </FormController>;
}`,...(C=(y=i.parameters)==null?void 0:y.docs)==null?void 0:C.source}}};var E,P,x;o.parameters={...o.parameters,docs:{...(E=o.parameters)==null?void 0:E.docs,source:{originalSource:`args => {
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
        <DatePickerField {...props} ref={fieldRef} name={"date"} />
        <FormViewer submittedValues={submittedValues} fieldRef={fieldRef} />
      </FormController>;
}`,...(x=(P=o.parameters)==null?void 0:P.docs)==null?void 0:x.source}}};var T,k,q;n.parameters={...n.parameters,docs:{...(T=n.parameters)==null?void 0:T.docs,source:{originalSource:`args => {
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
        <DatePickerField {...props} ref={fieldRef} name={"date"} />
        <FormViewer submittedValues={submittedValues} fieldRef={fieldRef} />
      </FormController>;
}`,...(q=(k=n.parameters)==null?void 0:k.docs)==null?void 0:q.source}}};var M,O,$;a.parameters={...a.parameters,docs:{...(M=a.parameters)==null?void 0:M.docs,source:{originalSource:`args => {
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
        <DatePickerField {...props} ref={fieldRef} name={"date"} />
        <FormViewer submittedValues={submittedValues} fieldRef={fieldRef} />
      </FormController>;
}`,...($=(O=a.parameters)==null?void 0:O.docs)==null?void 0:$.source}}};var I,j,v;s.parameters={...s.parameters,docs:{...(I=s.parameters)==null?void 0:I.docs,source:{originalSource:`args => {
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
        <DatePickerField {...props} ref={fieldRef} name={"date"} />
        <FormViewer submittedValues={submittedValues} fieldRef={fieldRef} />
      </FormController>;
}`,...(v=(j=s.parameters)==null?void 0:j.docs)==null?void 0:v.source}}};var _,A,z;m.parameters={...m.parameters,docs:{...(_=m.parameters)==null?void 0:_.docs,source:{originalSource:`args => {
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
        <DatePickerField {...props} ref={fieldRef} name={"date"} />
        <FormViewer submittedValues={submittedValues} fieldRef={fieldRef} />
      </FormController>;
}`,...(z=(A=m.parameters)==null?void 0:A.docs)==null?void 0:z.source}}};var B,G,H;l.parameters={...l.parameters,docs:{...(B=l.parameters)==null?void 0:B.docs,source:{originalSource:`(args, context) => {
  return <FormI18nProvider getValidationErrorMessage={({
    name
  }, error) => {
    return \`Field '\${name}' has Error '\${error.type}'. Original error message: \${error.message || "---"}\`;
  }}>
      {Template(args, context)}
    </FormI18nProvider>;
}`,...(H=(G=l.parameters)==null?void 0:G.docs)==null?void 0:H.source}}};const Ae=["Empty","Prefilled","Disabled","Readonly","ValidationRequired","ValidationMinDateToday","ValidationMaxDateToday","ValidationRequiredAndOnlyToday","ValidationTranslationRequired"];export{i as Disabled,t as Empty,r as Prefilled,o as Readonly,s as ValidationMaxDateToday,a as ValidationMinDateToday,n as ValidationRequired,m as ValidationRequiredAndOnlyToday,l as ValidationTranslationRequired,Ae as __namedExportsOrder,_e as default};
//# sourceMappingURL=DatePickerField.stories-YPjonbnN.js.map
