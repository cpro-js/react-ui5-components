import{j as t,a as S}from"./useIsomorphicLayoutEffect-xRq3KBKR.js";import"./search-Srqkuups.js";import{r as F}from"./index-9BFB80ap.js";import{B as h}from"./Button-NwTvRcXl.js";import{u as v,F as f}from"./FormViewer-T_trOpy-.js";import{T as n}from"./TextInputField-mcqueVzR.js";import{u as w,F as x}from"./useFormController-QYTj16FN.js";import"./withWebComponent-uMO5mAaX.js";import"./Popover-5NcXG5Re.js";import"./class-map-VCtLKyDB.js";import"./util-5JWwSdnm.js";import"./index-iYocmi5m.js";import"./Button-Kg1wKD-C.js";import"./index-j_UY7yy0.js";import"./Title-siMC53XU.js";import"./WrappingType-avPrqc94.js";import"./clsx-2Jv0kmJG.js";import"./react-jss.esm-1qNMITJJ.js";import"./css-vendor.esm-6cc1E2ZA.js";import"./index-8BDAWP4G.js";import"./index-2q9JMl2_.js";import"./ToggleButton-tLhZtSzP.js";import"./CustomVariables-Ms22ARR_.js";import"./debounce-F9irgL9Y.js";import"./index-tPOYiQGZ.js";import"./formSupport-Tri1jE22.js";import"./InputElementsFormSupport-cwSAMczA.js";import"./TextInput-FRdb0Jpx.js";import"./index-DEsUDRQH.js";import"./Input-jvkg1AKt.js";import"./ValueState-Qqn7Ekme.js";import"./Suggestions.css-_W_4sSd4.js";import"./ValueStateMessage.css-NtFaRvah.js";import"./FormI18n-cauWpAAl.js";import"./util-OqSjx520.js";const D=u=>{const{onSubmit:a,initialValues:l}=u,{submittedValues:p,handleSubmit:d}=v({onSubmit:a}),o=w({onSubmit:d,initialValues:l}),{handleSubmit:c,handleReset:V,setValues:r}=o,b=F.useCallback(()=>{r([{name:"value1",value:Date.now().toString()},{name:"value2",value:Date.now().toString()}],{shouldDirty:!0,shouldValidate:!0,shouldTouch:!0})},[r]);return t("form",{onSubmit:c,onReset:V,children:S(x,{...o,children:[t("div",{children:t(h,{type:"button",onClick:b,children:"Set Values"})}),t(n,{name:"value1"}),t(n,{name:"value2"}),"s",t(f,{submittedValues:p})]})})},e=D.bind({});e.args={};const it={title:"Form/useFormActions",argTypes:{onSubmit:{action:"submit"}}};var i,m,s;e.parameters={...e.parameters,docs:{...(i=e.parameters)==null?void 0:i.docs,source:{originalSource:`props => {
  const {
    onSubmit,
    initialValues
  } = props;
  const {
    submittedValues,
    handleSubmit: onFormViewerSubmit
  } = useFormViewer({
    onSubmit: onSubmit
  });
  const form = useFormController({
    onSubmit: onFormViewerSubmit,
    initialValues: initialValues
  });
  const {
    handleSubmit,
    handleReset,
    setValues
  } = form;
  const updateValues = useCallback(() => {
    setValues([{
      name: "value1",
      value: Date.now().toString()
    }, {
      name: "value2",
      value: Date.now().toString()
    }], {
      shouldDirty: true,
      shouldValidate: true,
      shouldTouch: true
    });
  }, [setValues]);
  return <form onSubmit={handleSubmit} onReset={handleReset}>
      <FormProvider {...form}>
        <div>
          <Button type={"button"} onClick={updateValues}>
            Set Values
          </Button>
        </div>
        <TextInputField name={"value1"} />
        <TextInputField name={"value2"} />s
        <FormViewer submittedValues={submittedValues} />
      </FormProvider>
    </form>;
}`,...(s=(m=e.parameters)==null?void 0:m.docs)==null?void 0:s.source}}};const mt=["SetValuesAsDirty"];export{e as SetValuesAsDirty,mt as __namedExportsOrder,it as default};
//# sourceMappingURL=useFormActions.stories-RS9n1RAk.js.map
