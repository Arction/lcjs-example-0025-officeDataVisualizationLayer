(self.webpackChunk=self.webpackChunk||[]).push([[524],{44:(e,t,s)=>{const i=s(89),{lightningChart:a,AxisTickStrategies:o,ColorRGBA:n,ImageFill:l,PalettedFill:r,emptyLine:d,LUT:c,AutoCursorModes:g,UIElementBuilders:u,UIOrigins:h,LegendBoxBuilders:m,Themes:y}=i,x=a().ChartXY({}).setMouseInteractions(!1).setTitle("Office layout data visualization layer").setAutoCursor((e=>e.setTickMarkerXVisible(!1).setTickMarkerYVisible(!1))).setSeriesBackgroundStrokeStyle(d);x.forEachAxis((e=>e.setTickStrategy(o.Empty).setStrokeStyle(d).setInterval({start:0,end:1})));const p=x.addLegendBox(m.VerticalLegendBox).setAutoDispose({type:"max-width",maxHeight:.3}),f=new Image;f.crossOrigin="",f.src=document.head.baseURI+"examples/assets/0025/office.png",f.onload=()=>{x.setSeriesBackgroundFillStyle(new l({source:f}));const e=f.height/f.width,t=()=>{const t=x.engine.container.getBoundingClientRect(),s=Math.ceil(t.width-20),i=Math.ceil(t.height-20),a=i/s;if(a<e){const t=i/e,a=Math.max(s-t,0);x.setPadding({left:a/2,right:a/2,top:10,bottom:10})}else if(a>e){const t=s*e,a=Math.max(i-t,0);x.setPadding({top:a/2,bottom:a/2,left:10,right:10})}};t(),window.addEventListener("resize",t),fetch(document.head.baseURI+"examples/assets/0025/office-wifi-strength.json").then((e=>e.json())).then((e=>{const t=e.data,s=x.addHeatmapGridSeries({columns:t.length,rows:t[0].length,start:{x:0,y:0},end:{x:1,y:1}}).setName("Wi-Fi Strength").invalidateIntensityValues(t).setWireframeStyle(d).setFillStyle(new r({lookUpProperty:"value",lut:new c({interpolate:!1,steps:[{value:0,color:n(0,0,0,0),label:""},{value:.9,color:n(255,0,0,50),label:"Weak"},{value:1.9,color:n(255,255,0,50),label:"Medium"},{value:2.9,color:n(0,255,0,50),label:"Good"}]})})).setCursorResultTableFormatter(((e,t,s)=>e.addRow(t.getName()).addRow(0===s.intensity?"No measurement":1===s.intensity?"Weak":2===s.intensity?"Medium":3===s.intensity?"Good":"?")));p.add(s)}));const s=new Image;s.crossOrigin="",s.src=document.head.baseURI+"examples/assets/0025/router.png",s.onload=()=>{const e=s.height/s.width;x.addUIElement(u.TextBox,{x:x.getDefaultAxisX(),y:x.getDefaultAxisY()}).setText("").setPadding({left:48,top:48*e}).setBackground((e=>e.setStrokeStyle(d).setFillStyle(new l({source:s})))).setPosition({x:.322,y:.09}).setOrigin(h.Center)}}}},e=>{e.O(0,[502],(()=>(44,e(e.s=44)))),e.O()}]);