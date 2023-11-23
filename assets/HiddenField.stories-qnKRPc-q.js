import{a as S,j as e}from"./useIsomorphicLayoutEffect-xRq3KBKR.js";import{a as g}from"./FormController-a24Yjre7.js";import{u as x,F as f}from"./FormViewer-T_trOpy-.js";import{H as l}from"./HiddenField-vpRv3F_m.js";import"./index-9BFB80ap.js";import"./useFormController-QYTj16FN.js";import"./useLatestRef-8OPiqaso.js";import"./Button-NwTvRcXl.js";import"./util-5JWwSdnm.js";import"./index-iYocmi5m.js";import"./Button-Kg1wKD-C.js";import"./withWebComponent-uMO5mAaX.js";import"./index-j_UY7yy0.js";import"./Title-siMC53XU.js";import"./WrappingType-avPrqc94.js";import"./clsx-2Jv0kmJG.js";import"./react-jss.esm-1qNMITJJ.js";import"./css-vendor.esm-6cc1E2ZA.js";import"./index-8BDAWP4G.js";import"./Popover-5NcXG5Re.js";import"./class-map-VCtLKyDB.js";import"./index-2q9JMl2_.js";import"./ToggleButton-tLhZtSzP.js";import"./CustomVariables-Ms22ARR_.js";import"./debounce-F9irgL9Y.js";import"./index-tPOYiQGZ.js";const p=u=>{const{initialValues:d,onSubmit:b,...c}=u,{submittedValues:F,handleSubmit:V}=x({onSubmit:b});return S(g,{initialValues:d,onSubmit:V,children:[e(l,{...c,name:"text"}),e(f,{submittedValues:F})]})},r=p.bind({});r.args={};const t=p.bind({});t.args={initialValues:{text:"hello world"}};const R={title:"Form/Field/HiddenField",component:l,argTypes:{onSubmit:{action:"submit"}}};var o,i,n;r.parameters={...r.parameters,docs:{...(o=r.parameters)==null?void 0:o.docs,source:{originalSource:`args => {
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
  return <FormController {...{
    initialValues,
    onSubmit: handleSubmit
  }}>
      <HiddenField {...props} name={"text"} />
      <FormViewer submittedValues={submittedValues} />
    </FormController>;
}`,...(n=(i=r.parameters)==null?void 0:i.docs)==null?void 0:n.source}}};var m,s,a;t.parameters={...t.parameters,docs:{...(m=t.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
  return <FormController {...{
    initialValues,
    onSubmit: handleSubmit
  }}>
      <HiddenField {...props} name={"text"} />
      <FormViewer submittedValues={submittedValues} />
    </FormController>;
}`,...(a=(s=t.parameters)==null?void 0:s.docs)==null?void 0:a.source}}};const U=["Empty","Prefilled"];export{r as Empty,t as Prefilled,U as __namedExportsOrder,R as default};
//# sourceMappingURL=HiddenField.stories-qnKRPc-q.js.map
