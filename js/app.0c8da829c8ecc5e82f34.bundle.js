(self.webpackChunk=self.webpackChunk||[]).push([[524],{44:(e,t,s)=>{const a=s(89),{lightningChart:i,AxisTickStrategies:o,ColorRGBA:n,ImageFill:l,PalettedFill:r,emptyLine:d,LUT:c,AutoCursorModes:g,UIElementBuilders:h,UIOrigins:u,LegendBoxBuilders:m,Themes:y}=a,w=i().ChartXY({theme:y[new URLSearchParams(window.location.search).get("theme")||"darkGold"]||void 0}).setMouseInteractions(!1).setTitle("Office layout data visualization layer").setAutoCursor((e=>e.setTickMarkerXVisible(!1).setTickMarkerYVisible(!1))).setSeriesBackgroundStrokeStyle(d);w.forEachAxis((e=>e.setTickStrategy(o.Empty).setStrokeStyle(d).setInterval({start:0,end:1})));const x=w.addLegendBox(m.VerticalLegendBox).setAutoDispose({type:"max-width",maxHeight:.3}),k=new Image;k.crossOrigin="",k.src=document.head.baseURI+"examples/assets/0025/office.png",k.onload=()=>{w.setSeriesBackgroundFillStyle(new l({source:k}));const e=k.height/k.width,t=()=>{const t=w.engine.container.getBoundingClientRect(),s=Math.ceil(t.width-20),a=Math.ceil(t.height-20),i=a/s;if(i<e){const t=a/e,i=Math.max(s-t,0);w.setPadding({left:i/2,right:i/2,top:10,bottom:10})}else if(i>e){const t=s*e,i=Math.max(a-t,0);w.setPadding({top:i/2,bottom:i/2,left:10,right:10})}};t(),window.addEventListener("resize",t),fetch(document.head.baseURI+"examples/assets/0025/office-wifi-strength.json").then((e=>e.json())).then((e=>{const t=e.data,s=w.addHeatmapGridSeries({columns:t.length,rows:t[0].length,start:{x:0,y:0},end:{x:1,y:1}}).setName("Wi-Fi Strength").invalidateIntensityValues(t).setWireframeStyle(d).setFillStyle(new r({lookUpProperty:"value",lut:new c({interpolate:!1,steps:[{value:0,color:n(0,0,0,0),label:""},{value:.9,color:n(255,0,0,50),label:"Weak"},{value:1.9,color:n(255,255,0,50),label:"Medium"},{value:2.9,color:n(0,255,0,50),label:"Good"}]})})).setCursorResultTableFormatter(((e,t,s)=>e.addRow(t.getName()).addRow(0===s.intensity?"No measurement":1===s.intensity?"Weak":2===s.intensity?"Medium":3===s.intensity?"Good":"?")));x.add(s)}));const s=new Image;s.crossOrigin="",s.src=document.head.baseURI+"examples/assets/0025/router.png",s.onload=()=>{const e=s.height/s.width;w.addUIElement(h.TextBox,{x:w.getDefaultAxisX(),y:w.getDefaultAxisY()}).setText("").setPadding({left:48,top:48*e}).setBackground((e=>e.setStrokeStyle(d).setFillStyle(new l({source:s})))).setPosition({x:.322,y:.09}).setOrigin(u.Center)}}}},e=>{e.O(0,[502],(()=>(44,e(e.s=44)))),e.O()}]);