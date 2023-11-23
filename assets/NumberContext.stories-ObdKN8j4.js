import{a as n,j as e,F as b}from"./useIsomorphicLayoutEffect-xRq3KBKR.js";import{C as u}from"./CurrencyInput-B9oUy5LL.js";import{N as a}from"./NumberInput-c0IrYTrX.js";import{a as c}from"./NumberContext-DQE6BGmH.js";import"./index-9BFB80ap.js";import"./util-5JWwSdnm.js";import"./ValueState-Qqn7Ekme.js";import"./index-DEsUDRQH.js";import"./Input-jvkg1AKt.js";import"./withWebComponent-uMO5mAaX.js";import"./Popover-5NcXG5Re.js";import"./class-map-VCtLKyDB.js";import"./Suggestions.css-_W_4sSd4.js";import"./ValueStateMessage.css-NtFaRvah.js";const $={title:"Form/Component/NumberContextProvider",component:c},g=i=>{const r=1000555482e-3;return n(b,{children:[n("h2",{children:["Locale Provider with Locale [",i.locale,"]"]}),n(c,{...i,children:[e("h3",{children:"Number Input via Provider"}),e(a,{value:r}),e("h3",{children:"Currency Input via Provider"}),e(u,{value:r}),e("h3",{children:"Explicit IN"}),e(a,{value:r,locale:"en-IN"}),e(u,{value:r,locale:"en-IN",currency:"INR"}),e("h3",{children:"Explicit JA (without fraction digits for currency)"}),e(a,{value:r,locale:"ja-JP"}),e(u,{value:r,locale:"ja-JP",currency:"JPY"})]})]})},t=g.bind({});t.args={locale:"en",currency:"USD",useGrouping:!0};const o=g.bind({});o.args={locale:"de",currency:"EUR",useGrouping:!0};const l=i=>{const r=1000555482e-3;return n(c,{locale:"en-IN",currency:"USD",useGrouping:!0,children:[e("h2",{children:"Outer Part (en-IN)"}),e(a,{value:r}),e(u,{value:r,currency:"INR"}),n("div",{children:[e("h2",{children:"Inner Part (de)"}),n(c,{locale:"de",currency:"EUR",children:[e(a,{value:r}),e(u,{value:r}),e(u,{value:r,showCurrency:!1})]})]}),n("div",{children:[e("h2",{children:"No Grouping, special warning message, 1 maxFractionDigits"}),n(c,{useGrouping:!1,maximumFractionDigits:1,showCurrency:!1,getNumberWarningMessage:(C,P)=>`${C}: ${P}`,children:[e(a,{value:r}),e(u,{value:r}),e(u,{value:r,showCurrency:!0})]})]})]})};var s,v,p;t.parameters={...t.parameters,docs:{...(s=t.parameters)==null?void 0:s.docs,source:{originalSource:`args => {
  const value = 1000555.482;
  return <>
      <h2>Locale Provider with Locale [{args.locale}]</h2>
      <NumberContextProvider {...args}>
        <h3>Number Input via Provider</h3>
        <NumberInput value={value} />
        <h3>Currency Input via Provider</h3>
        <CurrencyInput value={value} />
        <h3>Explicit IN</h3>
        <NumberInput value={value} locale="en-IN" />
        <CurrencyInput value={value} locale="en-IN" currency="INR" />
        <h3>Explicit JA (without fraction digits for currency)</h3>
        <NumberInput value={value} locale="ja-JP" />
        <CurrencyInput value={value} locale="ja-JP" currency="JPY" />
      </NumberContextProvider>
    </>;
}`,...(p=(v=t.parameters)==null?void 0:v.docs)==null?void 0:p.source}}};var d,m,h;o.parameters={...o.parameters,docs:{...(d=o.parameters)==null?void 0:d.docs,source:{originalSource:`args => {
  const value = 1000555.482;
  return <>
      <h2>Locale Provider with Locale [{args.locale}]</h2>
      <NumberContextProvider {...args}>
        <h3>Number Input via Provider</h3>
        <NumberInput value={value} />
        <h3>Currency Input via Provider</h3>
        <CurrencyInput value={value} />
        <h3>Explicit IN</h3>
        <NumberInput value={value} locale="en-IN" />
        <CurrencyInput value={value} locale="en-IN" currency="INR" />
        <h3>Explicit JA (without fraction digits for currency)</h3>
        <NumberInput value={value} locale="ja-JP" />
        <CurrencyInput value={value} locale="ja-JP" currency="JPY" />
      </NumberContextProvider>
    </>;
}`,...(h=(m=o.parameters)==null?void 0:m.docs)==null?void 0:h.source}}};var N,I,y;l.parameters={...l.parameters,docs:{...(N=l.parameters)==null?void 0:N.docs,source:{originalSource:`args => {
  const value = 1000555.482;
  return <NumberContextProvider locale="en-IN" currency="USD" useGrouping>
      <h2>Outer Part (en-IN)</h2>
      <NumberInput value={value} />
      <CurrencyInput value={value} currency="INR" />

      <div>
        <h2>Inner Part (de)</h2>
        <NumberContextProvider locale="de" currency="EUR">
          <NumberInput value={value} />
          <CurrencyInput value={value} />
          <CurrencyInput value={value} showCurrency={false} />
        </NumberContextProvider>
      </div>

      <div>
        <h2>No Grouping, special warning message, 1 maxFractionDigits</h2>
        <NumberContextProvider useGrouping={false} maximumFractionDigits={1} showCurrency={false} getNumberWarningMessage={(type, discardedValue) => \`\${type}: \${discardedValue}\`}>
          <NumberInput value={value} />
          <CurrencyInput value={value} />
          <CurrencyInput value={value} showCurrency />
        </NumberContextProvider>
      </div>
    </NumberContextProvider>;
}`,...(y=(I=l.parameters)==null?void 0:I.docs)==null?void 0:y.source}}};const A=["Standard","Locale_DE","Nested"];export{o as Locale_DE,l as Nested,t as Standard,A as __namedExportsOrder,$ as default};
//# sourceMappingURL=NumberContext.stories-ObdKN8j4.js.map
