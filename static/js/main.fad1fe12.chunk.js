(this["webpackJsonpfin-statement-finder"]=this["webpackJsonpfin-statement-finder"]||[]).push([[0],{26:function(e,t,n){},27:function(e,t,n){},31:function(e,t,n){},50:function(e,t,n){"use strict";n.r(t);var a=n(0),s=n.n(a),r=n(18),c=n.n(r),i=(n(25),n(26),n(2)),o=(n(27),n(5)),l=n.p+"static/media/cik_ticker.5c555605.csv",u=n(1);var d=function(e){var t=Object(a.useState)([]),n=Object(i.a)(t,2),s=n[0],r=n[1],c=Object(a.useState)([]),d=Object(i.a)(c,2),b=d[0],j=d[1],h=Object(a.useState)([]),p=Object(i.a)(h,2),O=p[0],v=p[1],m=Object(a.useState)({}),f=Object(i.a)(m,2),x=f[0],S=f[1],g=Object(a.useState)({}),C=Object(i.a)(g,2),N=C[0],E=C[1],I=Object(a.useState)({}),A=Object(i.a)(I,2),y=A[0],k=A[1],L=Object(a.useState)(""),P=Object(i.a)(L,2),U=P[0],D=P[1];return Object(a.useEffect)((function(){fetch(l).then((function(e){return e.text()})).then((function(e){var t={},n={},a={};e.split("\n").map((function(e){var s=e.split("|");t[Object(o.toUpper)(s[1])]=s[0],n[s[2]]=Object(o.toUpper)(s[1]),a[Object(o.toUpper)(s[1])]=s[2]}));var s=Object.keys(t).sort(),r=Object.keys(n).sort();j(s),v(r),S(t),E(n),k(a)}))}),[]),Object(u.jsx)("div",{children:Object(u.jsxs)("form",{className:"input-group mb-3",onSubmit:function(t){if(Object(o.toUpper)(U)in x){for(var n=x[Object(o.toUpper)(U)].toString();n.length<10;)n="0"+n;e.parentSetName(y[Object(o.toUpper)(U)]),e.parentSetCik(n)}else if(U in N){for(var a=x[N[U]].toString();a.length<10;)a="0"+a;e.parentSetName(U),e.parentSetCik(a)}else{var r=U;s.length>0&&(r=s[0]);var c=/\(([^)]+)\)/.exec(r);if(null!==c&&Object(o.toUpper)(c[1])in x){for(var i=x[Object(o.toUpper)(c[1])].toString();i.length<10;)i="0"+i;e.parentSetName(y[Object(o.toUpper)(c[1])]),e.parentSetCik(i)}else console.log("invalid input")}t.preventDefault()},children:[Object(u.jsx)("input",{type:"text",list:"tickers",value:U,className:"form-control",placeholder:"Ticker",onChange:function(e){r([]);var t=e.target.value;D(t);var n=[],a=[],s=[];if(t.length>0){var c=new RegExp("^".concat(t),"i");a=b.filter((function(e){return c.test(e)})),s=(s=O.filter((function(e){return c.test(e)}))).map((function(e){if(!a.includes(N[e]))return"(".concat(N[e],") ").concat(e)})),n=(n=(a=a.map((function(e){return"(".concat(e,") ").concat(y[e])}))).concat(s)).slice(0,10)}r(n)},"aria-label":"Ticker","aria-describedby":"button-addon2"}),Object(u.jsx)("datalist",{id:"tickers",children:s.map((function(e,t){return Object(u.jsx)("option",{value:e},t)}))}),Object(u.jsx)("input",{className:"btn btn-outline-secondary",type:"submit",value:"Go",id:"button-addon2"})]})})},b=n(51),j={is:["RevenueFromContractWithCustomerExcludingAssessedTax","CostOfGoodsAndServicesSold","GrossProfit","MarketingExpense","ResearchAndDevelopmentExpense","SellingGeneralAndAdministrativeExpense","GeneralAndAdministrativeExpense","OtherOperatingIncomeExpenseNet","CostsAndExpenses","OperatingExpenses","OperatingIncomeLoss","InvestmentIncomeInterest","InterestExpense","OtherNonoperatingIncomeExpense","NonoperatingIncomeExpense","IncomeLossFromContinuingOperationsBeforeIncomeTaxesMinorityInterestAndIncomeLossFromEquityMethodInvestments","IncomeTaxExpenseBenefit","IncomeLossFromEquityMethodInvestments","NetIncomeLoss","EarningsPerShareBasic","EarningsPerShareDiluted"],cfs:["CashCashEquivalentsRestrictedCashAndRestrictedCashEquivalents","NetIncomeLoss","DepreciationDepletionAndAmortization","ShareBasedCompensation","OtherOperatingActivitiesCashFlowStatement","OtherNoncashIncomeExpense","DeferredIncomeTaxExpenseBenefit","NetCashProvidedByUsedInOperatingActivities","NetCashProvidedByUsedInInvestingActivities","NetCashProvidedByUsedInFinancingActivities","CashCashEquivalentsRestrictedCashAndRestrictedCashEquivalentsPeriodIncreaseDecreaseIncludingExchangeRateEffect","CashCashEquivalentsRestrictedCashAndRestrictedCashEquivalents"],bs:["CashAndCashEquivalentsAtCarryingValue","MarketableSecuritiesCurrent","AccountsReceivableNetCurrent","InventoryNet","NontradeReceivablesCurrent","OtherAssetsCurrent","AssetsCurrent","MarketableSecuritiesNoncurrent","PropertyPlantAndEquipmentNet","OtherAssetsNoncurrent","AssetsNoncurrent","Assets","AccountsPayableCurrent","OtherLiabilitiesCurrent","ContractWithCustomerLiabilityCurrent","CommercialPaper","LongTermDebtCurrent","LiabilitiesCurrent","LongTermDebtNoncurrent","OtherLiabilitiesNoncurrent","LiabilitiesNoncurrent","Liabilities","CommonStocksIncludingAdditionalPaidInCapital","RetainedEarningsAccumulatedDeficit","AccumulatedOtherComprehensiveIncomeLossNetOfTax","StockholdersEquity","LiabilitiesAndStockholdersEquity"]};n(31);var h=function(e){var t=function(){return"is"===e.sheet?j[e.sheet].map((function(t,n){var a=e.data.facts["us-gaap"][t];if(a){var s=a.units.USD,r=a.label,c=s[s.length-1].val;return t.includes("PerShare")||(c/=1e6),Object(u.jsxs)("tr",{children:[Object(u.jsx)("td",{className:"label",children:r}),Object(u.jsx)("td",{className:"data",children:c})]},n)}return null})):"cfs"===e.sheet?j[e.sheet].map((function(t,n){var a=e.data.facts["us-gaap"][t];if(a){var s=a.units.USD,r=a.label,c=s[s.length-1].val;return t.includes("PerShare")||(c/=1e6),Object(u.jsxs)("tr",{children:[Object(u.jsx)("td",{className:"label",children:r}),Object(u.jsx)("td",{className:"data",children:c})]},n)}return null})):"bs"===e.sheet?j[e.sheet].map((function(t,n){var a=e.data.facts["us-gaap"][t];if(a){var s=a.units.USD,r=a.label,c=s[s.length-1].val;return t.includes("PerShare")||(c/=1e6),Object(u.jsxs)("tr",{children:[Object(u.jsx)("td",{className:"label",children:r}),Object(u.jsx)("td",{className:"data",children:c})]},n)}return null})):void 0};return Object(u.jsx)("div",{children:function(){if(e.loaded)return Object(u.jsx)(b.a,{striped:!0,bordered:!0,hover:!0,size:"sm",children:Object(u.jsx)("tbody",{children:t()})})}()})},p=n(52),O=n(53);var v=function(e){var t=Object(a.useState)(!0),n=Object(i.a)(t,2),s=n[0],r=n[1];return Object(u.jsx)("div",{children:Object(u.jsxs)(p.a,{onClick:function(t){e.parentSetSheet(t.target.value),r(!1)},children:[Object(u.jsx)(O.a,{variant:"secondary",value:"is",active:s,selected:!0,children:"Income Statement"}),Object(u.jsx)(O.a,{variant:"secondary",value:"cfs",children:"Cash Flow Statement"}),Object(u.jsx)(O.a,{variant:"secondary",value:"bs",children:"Balance Sheet"})]})})},m=n(19),f=n.n(m);var x=function(){var e=Object(a.useState)(null),t=Object(i.a)(e,2),n=t[0],s=t[1],r=Object(a.useState)(null),c=Object(i.a)(r,2),o=c[0],l=c[1],b=Object(a.useState)("is"),j=Object(i.a)(b,2),p=j[0],O=j[1],m=Object(a.useState)({}),x=Object(i.a)(m,2),S=x[0],g=x[1],C=Object(a.useState)(!1),N=Object(i.a)(C,2),E=N[0],I=N[1],A=Object(a.useState)(!1),y=Object(i.a)(A,2),k=y[0],L=y[1];return Object(a.useEffect)((function(){o&&(I(!0),f()("https://data.sec.gov/api/xbrl/companyfacts/CIK".concat(o,".json")).then((function(e){console.log(e.data),g(e.data),L(!0),I(!1)}),(function(e){console.log(e),I(!1)})))}),[o]),Object(u.jsxs)("div",{className:"App",children:[Object(u.jsxs)("h1",{children:[n," ",o]}),Object(u.jsx)("div",{className:"search-bar",children:Object(u.jsx)(d,{parentSetCik:l,parentSetName:s})}),Object(u.jsx)("div",{className:"select-sheet",children:Object(u.jsx)(v,{parentSetSheet:O})}),Object(u.jsx)("div",{className:"statement-table",children:Object(u.jsx)(h,{sheet:p,data:S,loading:E,loaded:k})})]})},S=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,54)).then((function(t){var n=t.getCLS,a=t.getFID,s=t.getFCP,r=t.getLCP,c=t.getTTFB;n(e),a(e),s(e),r(e),c(e)}))};c.a.render(Object(u.jsx)(s.a.StrictMode,{children:Object(u.jsx)(x,{})}),document.getElementById("root")),S()}},[[50,1,2]]]);
//# sourceMappingURL=main.fad1fe12.chunk.js.map