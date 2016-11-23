 /* Adam Mertel|UNIVIE */

!function(e,t){!function(e,t){L.RegularGridClusterCell=L.Polygon.extend({options:{weight:1,fillOpacity:.6,clickable:!1,color:"grey",lineJoin:"miter",fillRule:"evenodd",strokeLocation:"inside"},initialize:function(e,t){this.options=L.extend(this.options,t),L.Util.setOptions(this,this.options),L.Polygon.prototype.initialize.call(this,e,this.options)}}),L.regularGridClusterCell=function(e,t){return new L.RegularGridClusterCell(e,t)},L.RegularGridClusterGrid=L.FeatureGroup.extend({options:{},initialize:function(e){this.controller=e.controller,this.options=L.extend(this.options,e),L.Util.setOptions(this,e),L.FeatureGroup.prototype.initialize.call(this,{features:[]},e)},render:function(e,t){},addLayer:function(e){L.FeatureGroup.prototype.addLayer.call(this,e)},truncate:function(){this.clearLayers()}}),L.regularGridClusterGrid=function(e){return new L.RegularGridClusterGrid(e)},L.RegularGridClusterMarker=L.CircleMarker.extend({options:{radius:10},initialize:function(e,t){this.options=L.extend(this.options,t),L.Util.setOptions(this,t),L.CircleMarker.prototype.initialize.call(this,e,t)}}),L.regularGridClusterMarker=function(e,t){return new L.RegularGridClusterMarker(e,t)},L.RegularGridClusterMarkersGroup=L.FeatureGroup.extend({options:{},initialize:function(e){this.controller=e.controller,this.options=L.extend(this.options,e),L.Util.setOptions(this,e),L.FeatureGroup.prototype.initialize.call(this,{features:[]},e)},render:function(e,t){},addLayer:function(e){L.FeatureGroup.prototype.addLayer.call(this,e)},truncate:function(){this.clearLayers()}}),L.regularGridClusterMarkersGroup=function(e){return new L.RegularGridClusterMarkersGroup(e)},L.RegularGridClusterText=L.Marker.extend({options:{style:{border:"0px !important"}},initialize:function(e,t){this.options=L.extend(this.options,t),L.Util.setOptions(this,t);var i=JSON.stringify(t).substring(1,JSON.stringify(t).length-2).replace(/,/g,";").replace(/\"/g,"");t.icon=L.divIcon({html:'<span style="'+i+' ; text-align: center">'+this.options.text+"</span>",iconSize:[0,0],iconAnchor:[t.anchorOffsetX||-10,t.anchorOffsetY||-30]}),t.border="3px solid black",L.Marker.prototype.initialize.call(this,e,t)}}),L.regularGridClusterText=function(e,t){return new L.RegularGridClusterText(e,t)},L.RegularGridClusterTextsGroup=L.FeatureGroup.extend({options:{},initialize:function(e){this.controller=e.controller,this.options=L.extend(this.options,e),L.Util.setOptions(this,e),L.FeatureGroup.prototype.initialize.call(this,{features:[]},e)},render:function(e,t){},addLayer:function(e){L.FeatureGroup.prototype.addLayer.call(this,e)},truncate:function(){this.clearLayers()}}),L.regularGridClusterTextsGroup=function(e){return new L.RegularGridClusterTextsGroup(e)},L.RegularGridCluster=L.GeoJSON.extend({options:{gridBoundsPadding:.1,gridMode:"square",cellSize:1e4,showGrid:!0,showMarkers:!0,showTexts:!0,showElementsZoom:19,indexSize:12,rules:{}},initialize:function(e){this.options=L.extend(this.options,e),this.lastelmid=0,L.Util.setOptions(this,e),this._elements={},this._cells=[],this._grid=new L.regularGridClusterGrid({controller:this}),this._markers=new L.regularGridClusterMarkersGroup({controller:this}),this._texts=new L.regularGridClusterTextsGroup({controller:this}),L.FeatureGroup.prototype.initialize.call(this,{features:[]},e)},onAdd:function(e){var t=this;this._map=e,this._grid.addTo(this._map),this._markers.addTo(this._map),this._texts.addTo(this._map),this._map.on("zoomend",function(){t.refresh()}),this._index(),this.refresh()},addElement:function(e){this._elements[this.lastelmid]={id:this.lastelmid,geometry:e.geometry.coordinates,properties:e.properties},this.lastelmid++,this._map&&(this._index(),this.refresh())},_index:function(){var e=new Date;this._indexCells();var t=new Date;this._indexElements();var i=new Date;console.log("//////////////////////////////////"),console.log("cells indexed in "+(t.valueOf()-e.valueOf())+"ms"),console.log("elements indexed in "+(i.valueOf()-t.valueOf())+"ms"),console.log("indexing took "+(i.valueOf()-e.valueOf())+"ms"),console.log("//////////////////////////////////")},addData:function(e){},refresh:function(){this._truncateLayers();var e=new Date;this._prepareCells();var t=new Date;this._findElements();var i=new Date;this._buildGrid();var r=new Date;this._buildMarkers();var n=new Date;this._buildTexts();var s=new Date;console.log("********************"),console.log("cells prepared in "+(t.valueOf()-e.valueOf())+"ms"),console.log("elements found in "+(i.valueOf()-t.valueOf())+"ms"),console.log("grid built in "+(r.valueOf()-i.valueOf())+"ms"),console.log("markers built in "+(n.valueOf()-r.valueOf())+"ms"),console.log("texts built in "+(s.valueOf()-n.valueOf())+"ms"),console.log(this._cells.length+" cells refreshed in "+(s.valueOf()-e.valueOf())+"ms"),console.log("********************")},_truncateLayers:function(){this._grid.truncate(),this._markers.truncate(),this._texts.truncate()},_buildGrid:function(){this.options.rules.grid&&this.options.showGrid&&(this._visualise("grid"),this._cells.forEach(function(e){if(this._cellIsNotEmpty(e)){var t=new L.regularGridClusterCell(e.path,e.options.grid);this._grid.addLayer(t)}}.bind(this)),this._grid.addTo(this._map))},_buildMarkers:function(){this.options.rules.markers&&this.options.showMarkers&&(this._visualise("markers"),this._cells.forEach(function(e){if(this._cellIsNotEmpty(e)){var t=[e.y+e.h/2,e.x+e.w/2],i=new L.regularGridClusterMarker(t,e.options.markers);this._markers.addLayer(i)}}.bind(this)),this._markers.addTo(this._map))},_buildTexts:function(){this.options.rules.texts&&this.options.showTexts&&(this._visualise("texts"),this._cells.forEach(function(e){if(this._cellIsNotEmpty(e)){var t=[e.y+e.h/2,e.x+e.w/2],i=new L.regularGridClusterText(t,e.options.texts);this._texts.addLayer(i)}}.bind(this)),this._texts.addTo(this._map))},_indexCells:function(){var e=this._gridOrigin(),t=this._gridExtent().getNorthEast(),i=t.lng,r=t.lat,n=e.lng,s=e.lat,l=this.options.indexSize,a=(i-n)/l,o=(r-s)/l;this._indexedCells={};for(var u=0,f=n;f<i;f+=a)for(var d=s;d<r;d+=o){var h=L.latLngBounds([d,f],[d+o,f+a]);this._indexedCells[u]={b:h,cs:[]},u+=1}},_indexElements:function(){var e=this._getElementsCollection();e.forEach(function(e){for(var t in this._indexedCells){var i=this._indexedCells[t];if(i.b.contains(e.g)){this._elements[e.id].index=t;break}}}.bind(this))},_indexedCellsCollection:function(){var e=this;return Object.keys(this._indexedCells).map(function(t){return e._indexedCells[t]})},_truncateIndexedCells:function(){var e=this._indexedCellsCollection();e.forEach(function(e){e.cs=[]})},_prepareCells:function(){this._cells=[],this._truncateIndexedCells();for(var e=1,t=this._cellSize(),i=this._gridOrigin(),r=this._gridExtent().getNorthEast(),n=r.lng,s=r.lat,l=i.lng,a=i.lat,o=t/111319,u=this._indexedCellsCollection();a<s;){for(var f=this._cellHeightAtY(a,t);l<n;){var d={id:e,x:l,y:a,h:f,w:o,options:{grid:{},markers:{},texts:{}},elms:[]},h=L.latLngBounds([a,l],[a+f,l+o]);d.path=this._cellPath(d),this._cells.push(d);for(var c in u)indexedCell=u[c],indexedCell.b.overlaps(h)&&indexedCell.cs.push(d);e++,l+=o}l=i.lng,a+=f}},_findElements:function(){var e=this._getElementsCollection();e.forEach(function(e){var t=e.id,i=e.g[1],r=e.g[0],n=this._indexedCells[e.i].cs;for(var s in n){var l=n[s];this._cellsInsideOperations[this.options.gridMode].call(this,i,r,l)&&l.elms.push(t)}}.bind(this))},_cellIsNotEmpty:function(e){return 0!==e.elms.length},_cellPath:function(e){var t=e;switch(this.options.gridMode){case"square":return[[t.y,t.x],[t.y,t.x+t.w],[t.y+t.h,t.x+t.w],[t.y+t.h,t.x],[t.y,t.x]];default:return[[t.y,t.x],[t.y,t.x+t.w],[t.y+t.h,t.x+t.w],[t.y+t.h,t.x],[t.y,t.x]]}},_elmInsideSquare:function(e,t,i){var r=i.x,n=i.x+i.w,s=i.y,l=i.y+i.h;return e>r&&t>s&&e<n&&t<l},_getElementsCollection:function(){var e=this;return Object.keys(this._elements).map(function(t){return{id:e._elements[t].id,g:e._elements[t].geometry,i:e._elements[t].index}})},_visualise:function(e){var t=this;this.options.rules[e]&&Object.keys(this.options.rules[e]).map(function(i){var r=t.options.rules[e][i];if(t._isDynamicalRule(r))t._cellsValues(r.method,r.attribute),t._applyOptions(e,r.scale,r.style,i);else for(var n in t._cells){var s=t._cells[n];t._cellIsNotEmpty(s)&&(s.options[e][i]=r)}})},_applyOptions:function(e,t,i,r){var n=this._cellValues(!0).sort(function(e,t){return e-t}),s=i.length;"continuous"===t&&(s-=1);var l=Math.max.apply(null,n),a=Math.min.apply(null,n),o=[];if("size"!=t)for(var u=Math.floor(n.length/s),f=1;f!=s;f++)o.push(n[u*f]);if(this._scaleOperations[t])for(var d in this._cells){var h=this._cells[d];this._isDefined(h.value)&&(h.options[e][r]=this._scaleOperations[t].call(this,h.value,a,l,s,o,i))}},_cellsValues:function(e,t){for(var i in this._cells){var r=this._cells[i];if(this._cellIsNotEmpty(r)){var n;"count"!==e&&(n=this._cellAttrValues(r,t)),r.value=this._methodOperations[e].call(this,r,n)}}},_cellValues:function(e){var t=[];for(var i in this._cells)e?"undefined"==typeof this._cells[i].value||isNaN(this._cells[i].value)||t.push(this._cells[i].value):t.push(this._cells[i].value);return t},_cellAttrValues:function(e,t){var i=[];for(var r in e.elms)i.push(this._elements[e.elms[r]].properties[t]);return i},_isDynamicalRule:function(e){return e.method&&e.scale&&e.style},_cellSize:function(){return this.options.cellSize*Math.pow(2,10-this._mapZoom())},_gridOrigin:function(){return this._gridExtent().getSouthWest()},_gridExtent:function(){return this._getBounds().pad(this.options.gridBoundsPadding)},_getBounds:function(){var e=this._getGeometries();return L.latLngBounds(e)},_getGeometries:function(){var e=[],t=this._getElementsCollection();for(var i in t)e.push(t[i].g);return e},_mapZoom:function(){return!!this._map&&this._map.getZoom()},_cellHeightAtY:function(e,t){return t/111319*this._deltaHeightAtY(e)},_deltaHeightAtY:function(e){return Math.abs(1/Math.cos(e*Math.PI/180))},_isDefined:function(e){return!(!e&&0!==e)},_isNumber:function(e){return!isNaN(parseFloat(e))&&isFinite(e)}}),L.regularGridCluster=function(e){return new L.RegularGridCluster(e)},L.RegularGridCluster.include({_colorNameToHex:function(e){var t={aliceblue:"#f0f8ff",antiquewhite:"#faebd7",aqua:"#00ffff",aquamarine:"#7fffd4",azure:"#f0ffff",beige:"#f5f5dc",bisque:"#ffe4c4",black:"#000000",blanchedalmond:"#ffebcd",blue:"#0000ff",blueviolet:"#8a2be2",brown:"#a52a2a",burlywood:"#deb887",cadetblue:"#5f9ea0",chartreuse:"#7fff00",chocolate:"#d2691e",coral:"#ff7f50",cornflowerblue:"#6495ed",cornsilk:"#fff8dc",crimson:"#dc143c",cyan:"#00ffff",darkblue:"#00008b",darkcyan:"#008b8b",darkgoldenrod:"#b8860b",darkgray:"#a9a9a9",darkgreen:"#006400",darkkhaki:"#bdb76b",darkmagenta:"#8b008b",darkolivegreen:"#556b2f",darkorange:"#ff8c00",darkorchid:"#9932cc",darkred:"#8b0000",darksalmon:"#e9967a",darkseagreen:"#8fbc8f",darkslateblue:"#483d8b",darkslategray:"#2f4f4f",darkturquoise:"#00ced1",darkviolet:"#9400d3",deeppink:"#ff1493",deepskyblue:"#00bfff",dimgray:"#696969",dodgerblue:"#1e90ff",firebrick:"#b22222",floralwhite:"#fffaf0",forestgreen:"#228b22",fuchsia:"#ff00ff",gainsboro:"#dcdcdc",ghostwhite:"#f8f8ff",gold:"#ffd700",goldenrod:"#daa520",gray:"#808080",green:"#008000",greenyellow:"#adff2f",honeydew:"#f0fff0",hotpink:"#ff69b4","indianred ":"#cd5c5c",indigo:"#4b0082",ivory:"#fffff0",khaki:"#f0e68c",lavender:"#e6e6fa",lavenderblush:"#fff0f5",lawngreen:"#7cfc00",lemonchiffon:"#fffacd",lightblue:"#add8e6",lightcoral:"#f08080",lightcyan:"#e0ffff",lightgoldenrodyellow:"#fafad2",lightgrey:"#d3d3d3",lightgreen:"#90ee90",lightpink:"#ffb6c1",lightsalmon:"#ffa07a",lightseagreen:"#20b2aa",lightskyblue:"#87cefa",lightslategray:"#778899",lightsteelblue:"#b0c4de",lightyellow:"#ffffe0",lime:"#00ff00",limegreen:"#32cd32",linen:"#faf0e6",magenta:"#ff00ff",maroon:"#800000",mediumaquamarine:"#66cdaa",mediumblue:"#0000cd",mediumorchid:"#ba55d3",mediumpurple:"#9370d8",mediumseagreen:"#3cb371",mediumslateblue:"#7b68ee",mediumspringgreen:"#00fa9a",mediumturquoise:"#48d1cc",mediumvioletred:"#c71585",midnightblue:"#191970",mintcream:"#f5fffa",mistyrose:"#ffe4e1",moccasin:"#ffe4b5",navajowhite:"#ffdead",navy:"#000080",oldlace:"#fdf5e6",olive:"#808000",olivedrab:"#6b8e23",orange:"#ffa500",orangered:"#ff4500",orchid:"#da70d6",palegoldenrod:"#eee8aa",palegreen:"#98fb98",paleturquoise:"#afeeee",palevioletred:"#d87093",papayawhip:"#ffefd5",peachpuff:"#ffdab9",peru:"#cd853f",pink:"#ffc0cb",plum:"#dda0dd",powderblue:"#b0e0e6",purple:"#800080",red:"#ff0000",rosybrown:"#bc8f8f",royalblue:"#4169e1",saddlebrown:"#8b4513",salmon:"#fa8072",sandybrown:"#f4a460",seagreen:"#2e8b57",seashell:"#fff5ee",sienna:"#a0522d",silver:"#c0c0c0",skyblue:"#87ceeb",slateblue:"#6a5acd",slategray:"#708090",snow:"#fffafa",springgreen:"#00ff7f",steelblue:"#4682b4",tan:"#d2b48c",teal:"#008080",thistle:"#d8bfd8",tomato:"#ff6347",turquoise:"#40e0d0",violet:"#ee82ee",wheat:"#f5deb3",white:"#ffffff",whitesmoke:"#f5f5f5",yellow:"#ffff00",yellowgreen:"#9acd32"};return"undefined"!=typeof t[e.toLowerCase()]&&t[e.toLowerCase()].substring(1)},_hex:function(e){return e=e.toString(16),1==e.length?"0"+e:e},_validateColor:function(e){return e.indexOf("#")==-1?this._colorNameToHex(e):e.substring(1)},_colorMix:function(e,t,i){e=this._validateColor(e),t=this._validateColor(t);var r=Math.floor(parseInt(e.substring(0,2),16)*i+parseInt(t.substring(0,2),16)*(1-i)),n=Math.floor(parseInt(e.substring(2,4),16)*i+parseInt(t.substring(2,4),16)*(1-i)),s=Math.floor(parseInt(e.substring(4,6),16)*i+parseInt(t.substring(4,6),16)*(1-i));return"#"+this._hex(r)+this._hex(n)+this._hex(s)}}),L.RegularGridCluster.include({_math_max:function(e){return e.length?Math.max.apply(null,e.map(function(e){return e?e:0})):void 0},_math_min:function(e){return e.length?Math.min.apply(null,e.map(function(e){return e?e:99999})):void 0},_math_mode:function(e){if(0===e.length)return null;for(var t={},i=e[0],r=1,n=0;n<e.length;n++){var s=e[n];s&&(null===t[s]?t[s]=1:t[s]++,t[s]>r&&(i=s,r=t[s]))}return i},_math_mean:function(e){var t=e.reduce(function(e,t){return t&&(e.sum+=t,e.count+=1),e},{sum:0,count:0});return t.sum/t.count},_math_sum:function(e){return 0===e.length?0:e.reduce(function(e,t){return t?e+t:0},0)},_math_median:function(e){e.sort(function(e,t){return e-t});var t=Math.floor(e.length/2);return e.length%2?e[t]:(e[t-1]+e[t])/2}}),L.RegularGridCluster.include({_scaleOperations:{size:function(e,t,i,r,n,s){var l=i-t;return interval=r-1,e<i&&(interval=Math.floor((e-t)/l*r)),s[interval]},quantile:function(e,t,i,r,n,s){interval=0;for(var l in n)e>n[l]&&(interval=parseInt(l)+1);return s[interval]},continuous:function(e,t,i,r,n,s){interval=0;for(var l in n)e>n[l]&&(interval=parseInt(l)+1);var a=n.slice(0);a.push(i),a.unshift(t);var o,u=(e-a[interval])/(a[interval+1]-a[interval]),f=s[interval],d=s[interval+1];return o=this._isNumber(f)?f+u*(d-f):this._colorMix(d,f,u)}},_methodOperations:{count:function(e,t){return e.elms.length},mean:function(e,t){return this._math_mean(t)},median:function(e,t){return this._math_median(t)},mode:function(e,t){return this._math_mode(t)},max:function(e,t){return this._math_max(t)},min:function(e,t){return this._math_min(t)},sum:function(e,t){return this._math_sum(t)}},_cellsInsideOperations:{square:function(e,t,i){return this._elmInsideSquare(e,t,i)}}}),t[""]=e}({},function(){return this}()),t[""]=e}({},function(){return this}());