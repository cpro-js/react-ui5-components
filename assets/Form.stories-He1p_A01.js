import{a as A,F as Ze,j as n}from"./useIsomorphicLayoutEffect-xRq3KBKR.js";import{a as W}from"./chunk-AY7I2SME-4UylTnhF.js";import{C as ae,S as be}from"./AutoComplete-storyData-ahnPkInH.js";import{B as Y}from"./Button-NwTvRcXl.js";import{a as et}from"./FormController-a24Yjre7.js";import{C as tt,a as M}from"./CheckboxField-XAtSop4l.js";import{D as nt}from"./DatePickerField-xwAD0aAO.js";import{H as rt}from"./HiddenField-vpRv3F_m.js";import{N as ot}from"./NumberInputField-NjSogN-U.js";import{T as at}from"./TextAreaField-ODL4BYfw.js";import{T as Fe}from"./TextInputField-mcqueVzR.js";import"./Checkbox-kdA6EdF0.js";import"./DatePicker-KKAI-CxL.js";import"./DateTimePicker-7xiaHF7L.js";import"./MultiSelect-Cjpy8Qw_.js";import"./Select-dPQENXJo.js";import"./TextArea-F-09dJiU.js";import"./TextInput-FRdb0Jpx.js";import"./NumberInput-c0IrYTrX.js";import"./CurrencyInput-B9oUy5LL.js";import"./AutoComplete-yCp6H6z6.js";import"./CreatableSelect--wfQMTIN.js";import"./CreatableAutoComplete-j1f5z003.js";import"./MultiAutoComplete-oLS-m4yK.js";import"./DateTimePickerField-SxRFHz3Y.js";import"./FormBusyIndicator-_9X9FsW7.js";import"./FormStatus-59e9x69Z.js";import"./FormValues-Il8LNLEt.js";import"./MultiSelectField-c6R2S15U.js";import"./CurrencyInputField-Rf87MPT4.js";import"./SelectField-TdYCce4l.js";import{A as it}from"./AutoCompleteField-JT5LRZh1.js";import"./CreatableSelectField-wcGtW0py.js";import"./CreatableAutoCompleteField-si3WeQjF.js";import{M as mt}from"./MultiAutoCompleteField-iW6K5N4p.js";import{a as Ue,r,R as I}from"./index-9BFB80ap.js";import"./useFormController-QYTj16FN.js";import{L as lt,T as st}from"./FormFilterBar-7VAiWqMJ.js";import"./FormI18n-cauWpAAl.js";import{a as ut}from"./useWaitForWebcomponent-XV0L5ua2.js";import"./NumberContext-DQE6BGmH.js";import{c as D}from"./clsx-2Jv0kmJG.js";import{c as Le}from"./react-jss.esm-1qNMITJJ.js";import{T as Ie}from"./CustomVariables-Ms22ARR_.js";import{ah as ct,ai as dt}from"./withWebComponent-uMO5mAaX.js";import{M as $e}from"./Popover-5NcXG5Re.js";import{a as pt,T as bt}from"./index-j_UY7yy0.js";import{T as Ft}from"./Title-siMC53XU.js";import{W as Ce}from"./WrappingType-avPrqc94.js";import{T as It}from"./index-tPOYiQGZ.js";import{F as Ct,a as gt,b as xt}from"./index-FQumAKek.js";import"./util-5JWwSdnm.js";import"./index-iYocmi5m.js";import"./Button-Kg1wKD-C.js";import"./useLatestRef-8OPiqaso.js";import"./formSupport-Tri1jE22.js";import"./InputElementsFormSupport-cwSAMczA.js";import"./util-OqSjx520.js";import"./ValueState-Qqn7Ekme.js";import"./CheckBox-3JGrWoLD.js";import"./Label-QZ2nubHh.js";import"./class-map-VCtLKyDB.js";import"./ToggleButton-tLhZtSzP.js";import"./SegmentedButton-wvVaDFrh.js";import"./ItemNavigation-SKlyB5ng.js";import"./LocaleData-4yX_1pYY.js";import"./ScrollEnablement-Ha971trf.js";import"./PasteHandler-M9lQqGah.js";import"./slim-arrow-right-h-63TUj1.js";import"./ValueStateMessage.css-NtFaRvah.js";import"./Suggestions.css-_W_4sSd4.js";import"./GroupHeaderListItem-NSzFLVaM.js";import"./BusyIndicator-LnPMRz3m.js";import"./ComboBoxItem-tImCj2PR.js";import"./index-DEsUDRQH.js";import"./Input-jvkg1AKt.js";import"./useAsync-T4TD-_JE.js";import"./CommonSelection-w2tAztTJ.js";import"./CoreAutocomplete-GmrZHgqm.js";import"./search-Srqkuups.js";import"./useCreatable-oCBfdz5P.js";import"./value-help-yHR1Fcmv.js";import"./debounce-F9irgL9Y.js";import"./index-d0M4ArFK.js";import"./index-2q9JMl2_.js";import"./css-vendor.esm-6cc1E2ZA.js";import"./index-8BDAWP4G.js";let ft=function(e){return e.Solid="Solid",e.Transparent="Transparent",e}({});const _t=$e.RANGESETS.RANGE_4STEPS,ie={S:[0,599],M:[600,1023],L:[1024,1439],XL:[1440,-1]},ht={S:"Phone",M:"Tablet",L:"Desktop",XL:"LargeDesktop"};function St(e){const t={from:ie[e][0],name:ht[e],unit:"px"};return ie[e][1]>0&&(t.to=ie[e][1]),t}const ge=e=>typeof window>"u"?{from:1024,to:1439,name:"Desktop",unit:"px"}:St($e.getCurrentRange(_t,isNaN(e)?void 0:e));function yt(){return"randomUUID"in crypto?crypto.randomUUID():window.crypto.getRandomValues(new Uint32Array(1))[0].toString(16)}const Tt="useId"in Ue;function kt(){return Tt?Reflect.get(Ue,"useId")():r.useRef(yt()).current}const Bt={formContainer:{containerType:"inline-size"},form:{display:"grid",alignItems:"center",rowGap:"0.25rem",columnGap:"0.5rem","--_ui5wcr_form_label_text_align":"end","@container (max-width: 599px)":{"--_ui5wcr_form_label_span":"var(--_ui5wcr_form_label_span_s)","--_ui5wcr_form_columns":"var(--_ui5wcr_form_columns_s)",gridTemplateColumns:"repeat(calc(12 * var(--_ui5wcr_form_columns)), 1fr)","--_ui5wcr_form_content_span":"calc(12 - var(--_ui5wcr_form_label_span))"},"@container (min-width: 600px) and (max-width: 1023px)":{"--_ui5wcr_form_label_span":"var(--_ui5wcr_form_label_span_m)","--_ui5wcr_form_columns":"var(--_ui5wcr_form_columns_m)",gridTemplateColumns:"repeat(calc(12 * var(--_ui5wcr_form_columns)), 1fr)","--_ui5wcr_form_content_span":"calc(12 - var(--_ui5wcr_form_label_span))"},"@container (min-width: 1024px) and (max-width: 1439px)":{"--_ui5wcr_form_label_span":"var(--_ui5wcr_form_label_span_l)","--_ui5wcr_form_columns":"var(--_ui5wcr_form_columns_l)",gridTemplateColumns:"repeat(calc(12 * var(--_ui5wcr_form_columns)), 1fr)","--_ui5wcr_form_content_span":"calc(12 - var(--_ui5wcr_form_label_span))"},"@container (min-width: 1440px)":{"--_ui5wcr_form_label_span":"var(--_ui5wcr_form_label_span_xl)","--_ui5wcr_form_columns":"var(--_ui5wcr_form_columns_xl)",gridTemplateColumns:"repeat(calc(12 * var(--_ui5wcr_form_columns)), 1fr)","--_ui5wcr_form_content_span":"calc(12 - var(--_ui5wcr_form_label_span))"}},solid:{backgroundColor:Ie.sapGroup_ContentBackground},transparent:{backgroundColor:"transparent"},formTitle:{borderBlockEnd:`1px solid ${Ie.sapGroup_TitleBorderColor}`,marginBlockEnd:"1.75rem",gridColumn:"1 / -1"},labelSpan12:{"--_ui5wcr_form_content_span":12,"--_ui5wcr_form_label_text_align":"start","--_ui5wcr_form_label_span":12,rowGap:0}},Pe=r.createContext({labelSpan:null,recalcTrigger:0});function je(){return r.useContext(Pe)}const wt=r.createContext({});function Rt(){return r.useContext(wt)}const Et=e=>e+1,vt=Le(Bt,{name:"Form"}),We=r.forwardRef((e,t)=>{var ue;const{as:x="form",backgroundDesign:p=ft.Transparent,children:m,columnsS:b=1,columnsM:F=1,columnsL:C=1,columnsXL:y=2,className:Z,labelSpanS:T=12,labelSpanM:k=2,labelSpanL:B=4,labelSpanXL:G=4,titleText:f,style:J,...V}=e,[z,w]=r.useState(()=>new Map),R=vt(),h=new Map;h.set("Phone",b),h.set("Tablet",F),h.set("Desktop",C),h.set("LargeDesktop",y);const i=new Map;i.set("Phone",T),i.set("Tablet",k),i.set("Desktop",B),i.set("LargeDesktop",G);const[H,E]=ct(t),[v,X]=r.useState(((ue=ge())==null?void 0:ue.name)??"Desktop"),me=r.useRef(v);r.useEffect(()=>{const o=new ResizeObserver(([s])=>{const a=ge(s.contentRect.width);a&&me.current!==a.name&&(me.current=a.name,X(a.name))});return E.current&&o.observe(E.current),()=>{o.disconnect()}},[E]);const ee=i.get(v),te=h.get(v),le=r.useCallback((o,s,a)=>{w(u=>{const l=new Map(u);if(a){const c=l.get(a);c?c.formItemIds=new Set(c.formItemIds).add(o):l.set(a,{type:"formGroup",formItemIds:new Set([o])})}else l.has(o)||l.set(o,{type:s,formItemIds:new Set});return l})},[]),se=r.useCallback((o,s)=>{w(a=>{const u=new Map(a);if(s){const l=u.get(s);l&&l.formItemIds.delete(o)}else u.delete(o);return u})},[]),_=r.useMemo(()=>{const o=[],s=[];let a=-1,u=0;const l=ee===12?2:1;let c=(f?2:1)+l-1,N=c;const ce={};return z.forEach(({type:Qe,formItemIds:de},ne)=>{const re=u%te;if(a++,Qe==="formGroup"){ce[c]=!0,s.push({id:ne,index:a,columnIndex:re,rowIndex:c});let Q=1,oe=1;de.size||N++,de.forEach((Ye,Gt,pe)=>{o.push({id:Ye,index:a,groupId:ne,columnIndex:re,rowIndex:c+Q,lastGroupItem:pe.size===oe}),pe.size===oe&&N<c+Q+l&&(N=c+Q+l),Q+=l,oe++})}else N<c+1&&(N+=l),o.push({id:ne,index:a,columnIndex:re,rowIndex:c});(u+1)%te===0&&(c=N),u++}),{formItems:o,formGroups:s,registerItem:le,unregisterItem:se,rowsWithGroup:ce}},[z,le,se,te,f,ee]),ze=D(R.form,R[p.toLowerCase()]),Xe=x,q=r.useRef(void 0),K=r.useRef(void 0),[qe,Ke]=r.useReducer(Et,0,void 0);return r.useEffect(()=>{if(q.current||K.current){let o=_.formItems.length!==q.current.length||_.formGroups.length!==K.current.length;o||(o=!_.formGroups.every((s,a)=>K.current.findIndex(u=>u.id===s.id)===a)),o||(o=!_.formItems.every((s,a)=>q.current.findIndex(u=>u.id===s.id)===a)),o&&Ke()}q.current=_.formItems,K.current=_.formGroups},[_.formItems,_.formGroups]),I.createElement(Pe.Provider,{value:{..._,labelSpan:ee,recalcTrigger:qe}},I.createElement(Xe,{className:D(R.formContainer,Z),suppressHydrationWarning:!0,ref:H,style:{...J,"--_ui5wcr_form_label_span_s":T,"--_ui5wcr_form_label_span_m":k,"--_ui5wcr_form_label_span_l":B,"--_ui5wcr_form_label_span_xl":G,"--_ui5wcr_form_columns_s":b,"--_ui5wcr_form_columns_m":F,"--_ui5wcr_form_columns_l":C,"--_ui5wcr_form_columns_xl":y},...V},I.createElement("div",{className:ze},f&&I.createElement(pt,{level:Ft.H3,className:R.formTitle,style:{gridColumn:"1 / -1"}},f),m)))});We.displayName="Form";const Nt=new Set(["CheckBox","RadioButton","Switch","RangeSlider","Slider"]),Je=Le({label:{gridColumnEnd:"span var(--_ui5wcr_form_label_span)",justifySelf:"var(--_ui5wcr_form_label_text_align)",textAlign:"var(--_ui5wcr_form_label_text_align)",'&[data-label-span="12"]':{justifySelf:"start",paddingBlockEnd:"0.25rem"},"&:has(+ $content > [ui5-checkbox])":{alignSelf:"center"},"&:has(+ $content > [ui5-radio-button])":{alignSelf:"center"},"&:has(+ $content > [ui5-switch])":{alignSelf:"center"},"&:has(+ $content > [ui5-range-slider])":{alignSelf:"center"},"&:has(+ $content > [ui5-slider])":{alignSelf:"center"}},content:{display:"flex",gridColumnEnd:"span var(--_ui5wcr_form_content_span)",'&[data-label-span="12"]':{gridColumnEnd:"span 12",paddingBlockEnd:"0.625rem"}},lastGroupItem:{marginBlockEnd:"1rem"}},{name:"FormItem"});function At({label:e,style:t,className:x}){const p=Je(),{labelSpan:m}=je();if(typeof e=="string")return I.createElement(lt,{className:D(p.label,x),style:t,wrappingType:Ce.Normal,"data-label-span":m},e?`${e}:`:"");if(r.isValidElement(e)){const{showColon:b,wrappingType:F,style:C,children:y}=e.props;return r.cloneElement(e,{showColon:b??!0,wrappingType:F??Ce.Normal,className:D(p.label,x,e.props.className),style:{...t,...C||{}},"data-label-span":m},y??"")}return null}const Dt=e=>{var t;return typeof e=="string"?e:r.isValidElement(e)&&typeof((t=e.props)==null?void 0:t.children)=="string"?e.props.children:""},d=e=>{var h;const t=kt(),{label:x,children:p}=e,{formItems:m,registerItem:b,unregisterItem:F,labelSpan:C,rowsWithGroup:y,recalcTrigger:Z}=je(),T=Rt(),k=Je();r.useEffect(()=>(b==null||b(t,"formItem",T.id),()=>{F==null||F(t,T.id)}),[t,b,F,T.id,Z]);const B=r.useMemo(()=>m==null?void 0:m.find(({id:i})=>t===i),[m,t]);if(m&&!B)return null;const{columnIndex:G,rowIndex:f,lastGroupItem:J}=B,V=(G??0)*12+1,z=G!=null?C===12?V:V+(C??0):void 0,w=!B.groupId&&y[f]?f+1:f??0,R=w??0;return I.createElement(I.Fragment,null,I.createElement(At,{label:x,style:{gridColumnStart:V,gridRowStart:C===12?w-1:w??void 0,alignSelf:Nt.has((h=p==null?void 0:p.type)==null?void 0:h.displayName)?"center":void 0},className:D(C!==12&&J&&k.lastGroupItem)}),I.createElement("div",{"data-id":t,className:D(k.content,J&&k.lastGroupItem),style:{gridColumnStart:z,gridRowStart:f!=null?R:void 0},"data-label-span":C},dt(p).map((i,H)=>{var E;if(r.isValidElement(i)&&i.type&&i.type.$$typeof!==Symbol.for("react.portal")){const v=Dt(x),X=(E=i==null?void 0:i.props)==null?void 0:E.id;return I.createElement(r.Fragment,{key:`${v}-${t}-${H}`},r.cloneElement(i,{id:X??`${t}-${H}`}),I.createElement("label",{htmlFor:X??`${t}-${H}`,style:{display:"none"},"aria-hidden":!0},v))}})))};d.displayName="FormItem";const S=e=>{const{initialValues:t,onSubmit:x,onChange:p,id:m,initialCurrentCountrySuggestions:b,initialCountriesSuggestions:F}=e;return A(Ze,{children:[A(et,{initialValues:t,onSubmit:x,onChange:p,id:m,children:[n(rt,{name:"id"}),A(We,{as:"div",children:[n(d,{label:"Text",children:n(It,{children:" Test"})}),n(d,{label:"Input",children:n(Fe,{name:"input1"})}),n(d,{label:"Input2",children:n(Fe,{name:"input2"})}),n(d,{label:"Date",children:n(nt,{name:"date"})}),n(d,{label:"Checkboxes",children:n(Ct,{direction:gt.Column,justifyContent:xt.Start,children:A(tt,{name:"dish",children:[n(M,{value:"cake",text:"Cake",style:{marginRight:"auto"}}),n(M,{value:"waffles",text:"Waffles",style:{marginRight:"auto"}}),n(M,{value:"burger",text:"Burger",style:{marginRight:"auto"}})]})})}),n(d,{label:"Current Country",children:n(it,{name:"country",loadItems:be,initialItems:b})}),n(d,{label:"Text Area",children:n(at,{name:"textarea"})}),n(d,{label:"Number Input",children:n(ot,{name:"numberinput"})}),n(d,{label:"Visitied Countries",children:n(mt,{name:"countries",onSearch:be,initialSuggestions:F})}),A(d,{label:"Hierarchical Checkboxes (via name)",children:[n(M,{name:"root.selected",boolean:!0}),n(M,{name:"root.test.selected",boolean:!0})]}),n(d,{children:A(bt,{children:[n(st,{}),n(Y,{type:"submit",children:"Inner submit button"}),n(Y,{type:"reset",children:"Inner reset button"})]})})]})]}),n(Y,{type:"submit",form:m,children:"External submit button"}),n(Y,{type:"reset",form:m,children:"External reset button"})]})},O=S.bind({});O.args={id:"my-form"};const g=S.bind({});g.args={id:"my-form",initialValues:{id:"my-id",input1:"Text 1",input2:"Text 2",textarea:"Text",numberinput:10,date:ut(new Date),dish:["burger"],country:"BG",countries:["FI","GB"]},initialCurrentCountrySuggestions:[ae[1]],initialCountriesSuggestions:[ae[2],ae[3]]};const U=S.bind({});U.args={...g.args,onSubmit:(e,t)=>{W("onsubmit")(e,t),t.setErrors([{name:"input1",message:"Custom error from submit: input1"},{name:"date",message:"Custom error from submit: date"},{name:"textarea",message:"Custome error from submit: textarea"},{name:"numberinput",message:"Custom error from submit: textarea"}])}};const L=S.bind({});L.args={...g.args,onSubmit:(e,t)=>{W("onsubmit")(e,t),t.setErrors([{name:"input1",message:"Custom error from submit: input1"},{name:"date",message:"Custom error from submit: date"},{name:"textarea",message:"Custome error from submit: textarea"},{name:"numberinput",message:"Custom error from submit: textarea"}],{shouldFocus:!0})}};const $=S.bind({});$.args={...g.args,onSubmit:(e,t)=>{W("onsubmit")(e,t),t.reset()}};const P=S.bind({});P.args={...g.args,onSubmit:(e,t)=>{W("onsubmit")(e,t),t.setValues([{name:"date",value:"1990-01-10"},{name:"input1",value:"New Value"},{name:"textarea",value:"New Value"},{name:"numberinput",value:25}])}};const j=S.bind({});j.args={...g.args,onChange:(e,t)=>{W("change")(e,t),e.input1!==e.input2&&t.setValues([{name:"input2",value:e.input1}])}};const Ir={title:"Form/Field/Form",argTypes:{onSubmit:{action:"submit"},onChange:{action:"change"}}};var xe,fe,_e;O.parameters={...O.parameters,docs:{...(xe=O.parameters)==null?void 0:xe.docs,source:{originalSource:`args => {
  const {
    initialValues,
    onSubmit,
    onChange,
    id,
    initialCurrentCountrySuggestions,
    initialCountriesSuggestions
  } = args;
  return <>
      <FormController<FormData> {...{
      initialValues,
      onSubmit,
      onChange,
      id
    }}>
        <HiddenField name="id" />
        <Form as="div">
          <FormItem label="Text">
            <Text> Test</Text>
          </FormItem>
          <FormItem label="Input">
            <TextInputField name="input1" />
          </FormItem>
          <FormItem label="Input2">
            <TextInputField name="input2" />
          </FormItem>
          <FormItem label="Date">
            <DatePickerField name="date" />
          </FormItem>
          <FormItem label="Checkboxes">
            <FlexBox direction={FlexBoxDirection.Column} justifyContent={FlexBoxJustifyContent.Start}>
              <CheckboxFieldGroup name="dish">
                <CheckboxField value="cake" text={"Cake"} style={{
                marginRight: "auto"
              }} />
                <CheckboxField value="waffles" text={"Waffles"} style={{
                marginRight: "auto"
              }} />
                <CheckboxField value="burger" text={"Burger"} style={{
                marginRight: "auto"
              }} />
              </CheckboxFieldGroup>
            </FlexBox>
          </FormItem>
          <FormItem label="Current Country">
            <AutoCompleteField name="country" loadItems={SEARCH_COUNTRIES} initialItems={initialCurrentCountrySuggestions} />
          </FormItem>
          <FormItem label="Text Area">
            <TextAreaField name="textarea" />
          </FormItem>
          <FormItem label="Number Input">
            <NumberInputField name="numberinput" />
          </FormItem>
          <FormItem label="Visitied Countries">
            <MultiAutoCompleteField name="countries" onSearch={SEARCH_COUNTRIES} initialSuggestions={initialCountriesSuggestions} />
          </FormItem>
          <FormItem label="Hierarchical Checkboxes (via name)">
            <CheckboxField name="root.selected" boolean />
            <CheckboxField name="root.test.selected" boolean />
          </FormItem>
          <FormItem>
            <Toolbar>
              <ToolbarSpacer />
              <Button type="submit">Inner submit button</Button>
              <Button type="reset">Inner reset button</Button>
            </Toolbar>
          </FormItem>
        </Form>
      </FormController>
      <Button type="submit" form={id}>
        External submit button
      </Button>
      <Button type="reset" form={id}>
        External reset button
      </Button>
    </>;
}`,...(_e=(fe=O.parameters)==null?void 0:fe.docs)==null?void 0:_e.source}}};var he,Se,ye;g.parameters={...g.parameters,docs:{...(he=g.parameters)==null?void 0:he.docs,source:{originalSource:`args => {
  const {
    initialValues,
    onSubmit,
    onChange,
    id,
    initialCurrentCountrySuggestions,
    initialCountriesSuggestions
  } = args;
  return <>
      <FormController<FormData> {...{
      initialValues,
      onSubmit,
      onChange,
      id
    }}>
        <HiddenField name="id" />
        <Form as="div">
          <FormItem label="Text">
            <Text> Test</Text>
          </FormItem>
          <FormItem label="Input">
            <TextInputField name="input1" />
          </FormItem>
          <FormItem label="Input2">
            <TextInputField name="input2" />
          </FormItem>
          <FormItem label="Date">
            <DatePickerField name="date" />
          </FormItem>
          <FormItem label="Checkboxes">
            <FlexBox direction={FlexBoxDirection.Column} justifyContent={FlexBoxJustifyContent.Start}>
              <CheckboxFieldGroup name="dish">
                <CheckboxField value="cake" text={"Cake"} style={{
                marginRight: "auto"
              }} />
                <CheckboxField value="waffles" text={"Waffles"} style={{
                marginRight: "auto"
              }} />
                <CheckboxField value="burger" text={"Burger"} style={{
                marginRight: "auto"
              }} />
              </CheckboxFieldGroup>
            </FlexBox>
          </FormItem>
          <FormItem label="Current Country">
            <AutoCompleteField name="country" loadItems={SEARCH_COUNTRIES} initialItems={initialCurrentCountrySuggestions} />
          </FormItem>
          <FormItem label="Text Area">
            <TextAreaField name="textarea" />
          </FormItem>
          <FormItem label="Number Input">
            <NumberInputField name="numberinput" />
          </FormItem>
          <FormItem label="Visitied Countries">
            <MultiAutoCompleteField name="countries" onSearch={SEARCH_COUNTRIES} initialSuggestions={initialCountriesSuggestions} />
          </FormItem>
          <FormItem label="Hierarchical Checkboxes (via name)">
            <CheckboxField name="root.selected" boolean />
            <CheckboxField name="root.test.selected" boolean />
          </FormItem>
          <FormItem>
            <Toolbar>
              <ToolbarSpacer />
              <Button type="submit">Inner submit button</Button>
              <Button type="reset">Inner reset button</Button>
            </Toolbar>
          </FormItem>
        </Form>
      </FormController>
      <Button type="submit" form={id}>
        External submit button
      </Button>
      <Button type="reset" form={id}>
        External reset button
      </Button>
    </>;
}`,...(ye=(Se=g.parameters)==null?void 0:Se.docs)==null?void 0:ye.source}}};var Te,ke,Be;U.parameters={...U.parameters,docs:{...(Te=U.parameters)==null?void 0:Te.docs,source:{originalSource:`args => {
  const {
    initialValues,
    onSubmit,
    onChange,
    id,
    initialCurrentCountrySuggestions,
    initialCountriesSuggestions
  } = args;
  return <>
      <FormController<FormData> {...{
      initialValues,
      onSubmit,
      onChange,
      id
    }}>
        <HiddenField name="id" />
        <Form as="div">
          <FormItem label="Text">
            <Text> Test</Text>
          </FormItem>
          <FormItem label="Input">
            <TextInputField name="input1" />
          </FormItem>
          <FormItem label="Input2">
            <TextInputField name="input2" />
          </FormItem>
          <FormItem label="Date">
            <DatePickerField name="date" />
          </FormItem>
          <FormItem label="Checkboxes">
            <FlexBox direction={FlexBoxDirection.Column} justifyContent={FlexBoxJustifyContent.Start}>
              <CheckboxFieldGroup name="dish">
                <CheckboxField value="cake" text={"Cake"} style={{
                marginRight: "auto"
              }} />
                <CheckboxField value="waffles" text={"Waffles"} style={{
                marginRight: "auto"
              }} />
                <CheckboxField value="burger" text={"Burger"} style={{
                marginRight: "auto"
              }} />
              </CheckboxFieldGroup>
            </FlexBox>
          </FormItem>
          <FormItem label="Current Country">
            <AutoCompleteField name="country" loadItems={SEARCH_COUNTRIES} initialItems={initialCurrentCountrySuggestions} />
          </FormItem>
          <FormItem label="Text Area">
            <TextAreaField name="textarea" />
          </FormItem>
          <FormItem label="Number Input">
            <NumberInputField name="numberinput" />
          </FormItem>
          <FormItem label="Visitied Countries">
            <MultiAutoCompleteField name="countries" onSearch={SEARCH_COUNTRIES} initialSuggestions={initialCountriesSuggestions} />
          </FormItem>
          <FormItem label="Hierarchical Checkboxes (via name)">
            <CheckboxField name="root.selected" boolean />
            <CheckboxField name="root.test.selected" boolean />
          </FormItem>
          <FormItem>
            <Toolbar>
              <ToolbarSpacer />
              <Button type="submit">Inner submit button</Button>
              <Button type="reset">Inner reset button</Button>
            </Toolbar>
          </FormItem>
        </Form>
      </FormController>
      <Button type="submit" form={id}>
        External submit button
      </Button>
      <Button type="reset" form={id}>
        External reset button
      </Button>
    </>;
}`,...(Be=(ke=U.parameters)==null?void 0:ke.docs)==null?void 0:Be.source}}};var we,Re,Ee;L.parameters={...L.parameters,docs:{...(we=L.parameters)==null?void 0:we.docs,source:{originalSource:`args => {
  const {
    initialValues,
    onSubmit,
    onChange,
    id,
    initialCurrentCountrySuggestions,
    initialCountriesSuggestions
  } = args;
  return <>
      <FormController<FormData> {...{
      initialValues,
      onSubmit,
      onChange,
      id
    }}>
        <HiddenField name="id" />
        <Form as="div">
          <FormItem label="Text">
            <Text> Test</Text>
          </FormItem>
          <FormItem label="Input">
            <TextInputField name="input1" />
          </FormItem>
          <FormItem label="Input2">
            <TextInputField name="input2" />
          </FormItem>
          <FormItem label="Date">
            <DatePickerField name="date" />
          </FormItem>
          <FormItem label="Checkboxes">
            <FlexBox direction={FlexBoxDirection.Column} justifyContent={FlexBoxJustifyContent.Start}>
              <CheckboxFieldGroup name="dish">
                <CheckboxField value="cake" text={"Cake"} style={{
                marginRight: "auto"
              }} />
                <CheckboxField value="waffles" text={"Waffles"} style={{
                marginRight: "auto"
              }} />
                <CheckboxField value="burger" text={"Burger"} style={{
                marginRight: "auto"
              }} />
              </CheckboxFieldGroup>
            </FlexBox>
          </FormItem>
          <FormItem label="Current Country">
            <AutoCompleteField name="country" loadItems={SEARCH_COUNTRIES} initialItems={initialCurrentCountrySuggestions} />
          </FormItem>
          <FormItem label="Text Area">
            <TextAreaField name="textarea" />
          </FormItem>
          <FormItem label="Number Input">
            <NumberInputField name="numberinput" />
          </FormItem>
          <FormItem label="Visitied Countries">
            <MultiAutoCompleteField name="countries" onSearch={SEARCH_COUNTRIES} initialSuggestions={initialCountriesSuggestions} />
          </FormItem>
          <FormItem label="Hierarchical Checkboxes (via name)">
            <CheckboxField name="root.selected" boolean />
            <CheckboxField name="root.test.selected" boolean />
          </FormItem>
          <FormItem>
            <Toolbar>
              <ToolbarSpacer />
              <Button type="submit">Inner submit button</Button>
              <Button type="reset">Inner reset button</Button>
            </Toolbar>
          </FormItem>
        </Form>
      </FormController>
      <Button type="submit" form={id}>
        External submit button
      </Button>
      <Button type="reset" form={id}>
        External reset button
      </Button>
    </>;
}`,...(Ee=(Re=L.parameters)==null?void 0:Re.docs)==null?void 0:Ee.source}}};var ve,Ne,Ae;$.parameters={...$.parameters,docs:{...(ve=$.parameters)==null?void 0:ve.docs,source:{originalSource:`args => {
  const {
    initialValues,
    onSubmit,
    onChange,
    id,
    initialCurrentCountrySuggestions,
    initialCountriesSuggestions
  } = args;
  return <>
      <FormController<FormData> {...{
      initialValues,
      onSubmit,
      onChange,
      id
    }}>
        <HiddenField name="id" />
        <Form as="div">
          <FormItem label="Text">
            <Text> Test</Text>
          </FormItem>
          <FormItem label="Input">
            <TextInputField name="input1" />
          </FormItem>
          <FormItem label="Input2">
            <TextInputField name="input2" />
          </FormItem>
          <FormItem label="Date">
            <DatePickerField name="date" />
          </FormItem>
          <FormItem label="Checkboxes">
            <FlexBox direction={FlexBoxDirection.Column} justifyContent={FlexBoxJustifyContent.Start}>
              <CheckboxFieldGroup name="dish">
                <CheckboxField value="cake" text={"Cake"} style={{
                marginRight: "auto"
              }} />
                <CheckboxField value="waffles" text={"Waffles"} style={{
                marginRight: "auto"
              }} />
                <CheckboxField value="burger" text={"Burger"} style={{
                marginRight: "auto"
              }} />
              </CheckboxFieldGroup>
            </FlexBox>
          </FormItem>
          <FormItem label="Current Country">
            <AutoCompleteField name="country" loadItems={SEARCH_COUNTRIES} initialItems={initialCurrentCountrySuggestions} />
          </FormItem>
          <FormItem label="Text Area">
            <TextAreaField name="textarea" />
          </FormItem>
          <FormItem label="Number Input">
            <NumberInputField name="numberinput" />
          </FormItem>
          <FormItem label="Visitied Countries">
            <MultiAutoCompleteField name="countries" onSearch={SEARCH_COUNTRIES} initialSuggestions={initialCountriesSuggestions} />
          </FormItem>
          <FormItem label="Hierarchical Checkboxes (via name)">
            <CheckboxField name="root.selected" boolean />
            <CheckboxField name="root.test.selected" boolean />
          </FormItem>
          <FormItem>
            <Toolbar>
              <ToolbarSpacer />
              <Button type="submit">Inner submit button</Button>
              <Button type="reset">Inner reset button</Button>
            </Toolbar>
          </FormItem>
        </Form>
      </FormController>
      <Button type="submit" form={id}>
        External submit button
      </Button>
      <Button type="reset" form={id}>
        External reset button
      </Button>
    </>;
}`,...(Ae=(Ne=$.parameters)==null?void 0:Ne.docs)==null?void 0:Ae.source}}};var De,Ge,Ve;P.parameters={...P.parameters,docs:{...(De=P.parameters)==null?void 0:De.docs,source:{originalSource:`args => {
  const {
    initialValues,
    onSubmit,
    onChange,
    id,
    initialCurrentCountrySuggestions,
    initialCountriesSuggestions
  } = args;
  return <>
      <FormController<FormData> {...{
      initialValues,
      onSubmit,
      onChange,
      id
    }}>
        <HiddenField name="id" />
        <Form as="div">
          <FormItem label="Text">
            <Text> Test</Text>
          </FormItem>
          <FormItem label="Input">
            <TextInputField name="input1" />
          </FormItem>
          <FormItem label="Input2">
            <TextInputField name="input2" />
          </FormItem>
          <FormItem label="Date">
            <DatePickerField name="date" />
          </FormItem>
          <FormItem label="Checkboxes">
            <FlexBox direction={FlexBoxDirection.Column} justifyContent={FlexBoxJustifyContent.Start}>
              <CheckboxFieldGroup name="dish">
                <CheckboxField value="cake" text={"Cake"} style={{
                marginRight: "auto"
              }} />
                <CheckboxField value="waffles" text={"Waffles"} style={{
                marginRight: "auto"
              }} />
                <CheckboxField value="burger" text={"Burger"} style={{
                marginRight: "auto"
              }} />
              </CheckboxFieldGroup>
            </FlexBox>
          </FormItem>
          <FormItem label="Current Country">
            <AutoCompleteField name="country" loadItems={SEARCH_COUNTRIES} initialItems={initialCurrentCountrySuggestions} />
          </FormItem>
          <FormItem label="Text Area">
            <TextAreaField name="textarea" />
          </FormItem>
          <FormItem label="Number Input">
            <NumberInputField name="numberinput" />
          </FormItem>
          <FormItem label="Visitied Countries">
            <MultiAutoCompleteField name="countries" onSearch={SEARCH_COUNTRIES} initialSuggestions={initialCountriesSuggestions} />
          </FormItem>
          <FormItem label="Hierarchical Checkboxes (via name)">
            <CheckboxField name="root.selected" boolean />
            <CheckboxField name="root.test.selected" boolean />
          </FormItem>
          <FormItem>
            <Toolbar>
              <ToolbarSpacer />
              <Button type="submit">Inner submit button</Button>
              <Button type="reset">Inner reset button</Button>
            </Toolbar>
          </FormItem>
        </Form>
      </FormController>
      <Button type="submit" form={id}>
        External submit button
      </Button>
      <Button type="reset" form={id}>
        External reset button
      </Button>
    </>;
}`,...(Ve=(Ge=P.parameters)==null?void 0:Ge.docs)==null?void 0:Ve.source}}};var He,Me,Oe;j.parameters={...j.parameters,docs:{...(He=j.parameters)==null?void 0:He.docs,source:{originalSource:`args => {
  const {
    initialValues,
    onSubmit,
    onChange,
    id,
    initialCurrentCountrySuggestions,
    initialCountriesSuggestions
  } = args;
  return <>
      <FormController<FormData> {...{
      initialValues,
      onSubmit,
      onChange,
      id
    }}>
        <HiddenField name="id" />
        <Form as="div">
          <FormItem label="Text">
            <Text> Test</Text>
          </FormItem>
          <FormItem label="Input">
            <TextInputField name="input1" />
          </FormItem>
          <FormItem label="Input2">
            <TextInputField name="input2" />
          </FormItem>
          <FormItem label="Date">
            <DatePickerField name="date" />
          </FormItem>
          <FormItem label="Checkboxes">
            <FlexBox direction={FlexBoxDirection.Column} justifyContent={FlexBoxJustifyContent.Start}>
              <CheckboxFieldGroup name="dish">
                <CheckboxField value="cake" text={"Cake"} style={{
                marginRight: "auto"
              }} />
                <CheckboxField value="waffles" text={"Waffles"} style={{
                marginRight: "auto"
              }} />
                <CheckboxField value="burger" text={"Burger"} style={{
                marginRight: "auto"
              }} />
              </CheckboxFieldGroup>
            </FlexBox>
          </FormItem>
          <FormItem label="Current Country">
            <AutoCompleteField name="country" loadItems={SEARCH_COUNTRIES} initialItems={initialCurrentCountrySuggestions} />
          </FormItem>
          <FormItem label="Text Area">
            <TextAreaField name="textarea" />
          </FormItem>
          <FormItem label="Number Input">
            <NumberInputField name="numberinput" />
          </FormItem>
          <FormItem label="Visitied Countries">
            <MultiAutoCompleteField name="countries" onSearch={SEARCH_COUNTRIES} initialSuggestions={initialCountriesSuggestions} />
          </FormItem>
          <FormItem label="Hierarchical Checkboxes (via name)">
            <CheckboxField name="root.selected" boolean />
            <CheckboxField name="root.test.selected" boolean />
          </FormItem>
          <FormItem>
            <Toolbar>
              <ToolbarSpacer />
              <Button type="submit">Inner submit button</Button>
              <Button type="reset">Inner reset button</Button>
            </Toolbar>
          </FormItem>
        </Form>
      </FormController>
      <Button type="submit" form={id}>
        External submit button
      </Button>
      <Button type="reset" form={id}>
        External reset button
      </Button>
    </>;
}`,...(Oe=(Me=j.parameters)==null?void 0:Me.docs)==null?void 0:Oe.source}}};const Cr=["Standard","Prefilled","SubmitErrors","SubmitErrorsFocus","ResetFormOnSubmit","SetValuesOnSubmit","SetValueOnChange"];export{g as Prefilled,$ as ResetFormOnSubmit,j as SetValueOnChange,P as SetValuesOnSubmit,O as Standard,U as SubmitErrors,L as SubmitErrorsFocus,Cr as __namedExportsOrder,Ir as default};
//# sourceMappingURL=Form.stories-He1p_A01.js.map
