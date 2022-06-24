/*!
 HTML5 export buttons for Buttons and DataTables.
 2016 SpryMedia Ltd - datatables.net/license

 FileSaver.js (1.3.3) - MIT license
 Copyright © 2016 Eli Grey - http://eligrey.com
*/
(function(n){"function"===typeof define&&define.amd?define(["jquery","datatables.net","datatables.net-buttons"],function(u){return n(u,window,document)}):"object"===typeof exports?module.exports=function(u,x,E,F){u||(u=window);x&&x.fn.dataTable||(x=require("datatables.net")(u,x).$);x.fn.dataTable.Buttons||require("datatables.net-buttons")(u,x);return n(x,u,u.document,E,F)}:n(jQuery,window,document)})(function(n,u,x,E,F,B){function I(a){for(var c="";0<=a;)c=String.fromCharCode(a%26+65)+c,a=Math.floor(a/
    26)-1;return c}function O(a,c){J===B&&(J=-1===M.serializeToString((new u.DOMParser).parseFromString(P["xl/worksheets/sheet1.xml"],"text/xml")).indexOf("xmlns:r"));n.each(c,function(d,b){if(n.isPlainObject(b))d=a.folder(d),O(d,b);else{if(J){var m=b.childNodes[0],e,f=[];for(e=m.attributes.length-1;0<=e;e--){var g=m.attributes[e].nodeName;var p=m.attributes[e].nodeValue;-1!==g.indexOf(":")&&(f.push({name:g,value:p}),m.removeAttribute(g))}e=0;for(g=f.length;e<g;e++)p=b.createAttribute(f[e].name.replace(":",
    "_dt_b_namespace_token_")),p.value=f[e].value,m.setAttributeNode(p)}b=M.serializeToString(b);J&&(-1===b.indexOf("<?xml")&&(b='<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'+b),b=b.replace(/_dt_b_namespace_token_/g,":"),b=b.replace(/xmlns:NS[\d]+="" NS[\d]+:/g,""));b=b.replace(/<([^<>]*?) xmlns=""([^<>]*?)>/g,"<$1 $2>");a.file(d,b)}})}function y(a,c,d){var b=a.createElement(c);d&&(d.attr&&n(b).attr(d.attr),d.children&&n.each(d.children,function(m,e){b.appendChild(e)}),null!==d.text&&d.text!==
    B&&b.appendChild(a.createTextNode(d.text)));return b}function V(a,c){var d=a.header[c].length;a.footer&&a.footer[c].length>d&&(d=a.footer[c].length);for(var b=0,m=a.body.length;b<m;b++){var e=a.body[b][c];e=null!==e&&e!==B?e.toString():"";-1!==e.indexOf("\n")?(e=e.split("\n"),e.sort(function(f,g){return g.length-f.length}),e=e[0].length):e=e.length;e>d&&(d=e);if(40<d)return 54}d*=1.35;return 6<d?d:6}var D=n.fn.dataTable;D.Buttons.pdfMake=function(a){if(!a)return F||u.pdfMake;F=a};D.Buttons.jszip=
    function(a){if(!a)return E||u.JSZip;E=a};var K=function(a){if(!("undefined"===typeof a||"undefined"!==typeof navigator&&/MSIE [1-9]\./.test(navigator.userAgent))){var c=a.document.createElementNS("http://www.w3.org/1999/xhtml","a"),d="download"in c,b=/constructor/i.test(a.HTMLElement)||a.safari,m=/CriOS\/[\d]+/.test(navigator.userAgent),e=function(h){(a.setImmediate||a.setTimeout)(function(){throw h;},0)},f=function(h){setTimeout(function(){"string"===typeof h?(a.URL||a.webkitURL||a).revokeObjectURL(h):
    h.remove()},4E4)},g=function(h){return/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(h.type)?new Blob([String.fromCharCode(65279),h],{type:h.type}):h},p=function(h,q,v){v||(h=g(h));var r=this,w="application/octet-stream"===h.type,C=function(){var l=["writestart","progress","write","writeend"];l=[].concat(l);for(var z=l.length;z--;){var G=r["on"+l[z]];if("function"===typeof G)try{G.call(r,r)}catch(A){e(A)}}};r.readyState=r.INIT;if(d){var k=(a.URL||a.webkitURL||a).createObjectURL(h);
    setTimeout(function(){c.href=k;c.download=q;var l=new MouseEvent("click");c.dispatchEvent(l);C();f(k);r.readyState=r.DONE})}else(function(){if((m||w&&b)&&a.FileReader){var l=new FileReader;l.onloadend=function(){var z=m?l.result:l.result.replace(/^data:[^;]*;/,"data:attachment/file;");a.open(z,"_blank")||(a.location.href=z);r.readyState=r.DONE;C()};l.readAsDataURL(h);r.readyState=r.INIT}else k||(k=(a.URL||a.webkitURL||a).createObjectURL(h)),w?a.location.href=k:a.open(k,"_blank")||(a.location.href=
    k),r.readyState=r.DONE,C(),f(k)})()},t=p.prototype;if("undefined"!==typeof navigator&&navigator.msSaveOrOpenBlob)return function(h,q,v){q=q||h.name||"download";v||(h=g(h));return navigator.msSaveOrOpenBlob(h,q)};t.abort=function(){};t.readyState=t.INIT=0;t.WRITING=1;t.DONE=2;t.error=t.onwritestart=t.onprogress=t.onwrite=t.onabort=t.onerror=t.onwriteend=null;return function(h,q,v){return new p(h,q||h.name||"download",v)}}}("undefined"!==typeof self&&self||"undefined"!==typeof u&&u||this.content);D.fileSave=
    K;var Q=function(a){var c="Sheet1";a.sheetName&&(c=a.sheetName.replace(/[\[\]\*\/\\\?:]/g,""));return c},R=function(a){return a.newline?a.newline:navigator.userAgent.match(/Windows/)?"\r\n":"\n"},S=function(a,c){var d=R(c);a=a.buttons.exportData(c.exportOptions);var b=c.fieldBoundary,m=c.fieldSeparator,e=new RegExp(b,"g"),f=c.escapeChar!==B?c.escapeChar:"\\",g=function(v){for(var r="",w=0,C=v.length;w<C;w++)0<w&&(r+=m),r+=b?b+(""+v[w]).replace(e,f+b)+b:v[w];return r},p=c.header?g(a.header)+d:"";c=
    c.footer&&a.footer?d+g(a.footer):"";for(var t=[],h=0,q=a.body.length;h<q;h++)t.push(g(a.body[h]));return{str:p+t.join(d)+c,rows:t.length}},T=function(){if(-1===navigator.userAgent.indexOf("Safari")||-1!==navigator.userAgent.indexOf("Chrome")||-1!==navigator.userAgent.indexOf("Opera"))return!1;var a=navigator.userAgent.match(/AppleWebKit\/(\d+\.\d+)/);return a&&1<a.length&&603.1>1*a[1]?!0:!1};try{var M=new XMLSerializer,J}catch(a){}var P={"_rels/.rels":'<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>',
    "xl/_rels/workbook.xml.rels":'<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>',"[Content_Types].xml":'<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="xml" ContentType="application/xml" /><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml" /><Default Extension="jpeg" ContentType="image/jpeg" /><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml" /><Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml" /><Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml" /></Types>',
    "xl/workbook.xml":'<?xml version="1.0" encoding="UTF-8" standalone="yes"?><workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><fileVersion appName="xl" lastEdited="5" lowestEdited="5" rupBuild="24816"/><workbookPr showInkAnnotation="0" autoCompressPictures="0"/><bookViews><workbookView xWindow="0" yWindow="0" windowWidth="25600" windowHeight="19020" tabRatio="500"/></bookViews><sheets><sheet name="Sheet1" sheetId="1" r:id="rId1"/></sheets><definedNames/></workbook>',
    "xl/worksheets/sheet1.xml":'<?xml version="1.0" encoding="UTF-8" standalone="yes"?><worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" mc:Ignorable="x14ac" xmlns:x14ac="http://schemas.microsoft.com/office/spreadsheetml/2009/9/ac"><sheetData/><mergeCells count="0"/></worksheet>',"xl/styles.xml":'<?xml version="1.0" encoding="UTF-8"?><styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" mc:Ignorable="x14ac" xmlns:x14ac="http://schemas.microsoft.com/office/spreadsheetml/2009/9/ac"><numFmts count="6"><numFmt numFmtId="164" formatCode="#,##0.00_- [$$-45C]"/><numFmt numFmtId="165" formatCode="&quot;£&quot;#,##0.00"/><numFmt numFmtId="166" formatCode="[$€-2] #,##0.00"/><numFmt numFmtId="167" formatCode="0.0%"/><numFmt numFmtId="168" formatCode="#,##0;(#,##0)"/><numFmt numFmtId="169" formatCode="#,##0.00;(#,##0.00)"/></numFmts><fonts count="5" x14ac:knownFonts="1"><font><sz val="11" /><name val="Calibri" /></font><font><sz val="11" /><name val="Calibri" /><color rgb="FFFFFFFF" /></font><font><sz val="11" /><name val="Calibri" /><b /></font><font><sz val="11" /><name val="Calibri" /><i /></font><font><sz val="11" /><name val="Calibri" /><u /></font></fonts><fills count="6"><fill><patternFill patternType="none" /></fill><fill><patternFill patternType="none" /></fill><fill><patternFill patternType="solid"><fgColor rgb="FFD9D9D9" /><bgColor indexed="64" /></patternFill></fill><fill><patternFill patternType="solid"><fgColor rgb="FFD99795" /><bgColor indexed="64" /></patternFill></fill><fill><patternFill patternType="solid"><fgColor rgb="ffc6efce" /><bgColor indexed="64" /></patternFill></fill><fill><patternFill patternType="solid"><fgColor rgb="ffc6cfef" /><bgColor indexed="64" /></patternFill></fill></fills><borders count="2"><border><left /><right /><top /><bottom /><diagonal /></border><border diagonalUp="false" diagonalDown="false"><left style="thin"><color auto="1" /></left><right style="thin"><color auto="1" /></right><top style="thin"><color auto="1" /></top><bottom style="thin"><color auto="1" /></bottom><diagonal /></border></borders><cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0" /></cellStyleXfs><cellXfs count="68"><xf numFmtId="0" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="1" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="2" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="3" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="4" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="0" fillId="2" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="1" fillId="2" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="2" fillId="2" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="3" fillId="2" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="4" fillId="2" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="0" fillId="3" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="1" fillId="3" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="2" fillId="3" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="3" fillId="3" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="4" fillId="3" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="0" fillId="4" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="1" fillId="4" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="2" fillId="4" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="3" fillId="4" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="4" fillId="4" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="0" fillId="5" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="1" fillId="5" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="2" fillId="5" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="3" fillId="5" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="4" fillId="5" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="0" fillId="0" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="1" fillId="0" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="2" fillId="0" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="3" fillId="0" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="4" fillId="0" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="0" fillId="2" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="1" fillId="2" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="2" fillId="2" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="3" fillId="2" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="4" fillId="2" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="0" fillId="3" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="1" fillId="3" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="2" fillId="3" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="3" fillId="3" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="4" fillId="3" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="0" fillId="4" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="1" fillId="4" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="2" fillId="4" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="3" fillId="4" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="4" fillId="4" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="0" fillId="5" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="1" fillId="5" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="2" fillId="5" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="3" fillId="5" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="4" fillId="5" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyAlignment="1"><alignment horizontal="left"/></xf><xf numFmtId="0" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyAlignment="1"><alignment horizontal="center"/></xf><xf numFmtId="0" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyAlignment="1"><alignment horizontal="right"/></xf><xf numFmtId="0" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyAlignment="1"><alignment horizontal="fill"/></xf><xf numFmtId="0" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyAlignment="1"><alignment textRotation="90"/></xf><xf numFmtId="0" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyAlignment="1"><alignment wrapText="1"/></xf><xf numFmtId="9"   fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/><xf numFmtId="164" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/><xf numFmtId="165" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/><xf numFmtId="166" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/><xf numFmtId="167" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/><xf numFmtId="168" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/><xf numFmtId="169" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/><xf numFmtId="3" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/><xf numFmtId="4" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/><xf numFmtId="1" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/><xf numFmtId="2" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/><xf numFmtId="14" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/></cellXfs><cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0" /></cellStyles><dxfs count="0" /><tableStyles count="0" defaultTableStyle="TableStyleMedium9" defaultPivotStyle="PivotStyleMedium4" /></styleSheet>'},
    U=[{match:/^\-?\d+\.\d%$/,style:60,fmt:function(a){return a/100}},{match:/^\-?\d+\.?\d*%$/,style:56,fmt:function(a){return a/100}},{match:/^\-?\$[\d,]+.?\d*$/,style:57},{match:/^\-?£[\d,]+.?\d*$/,style:58},{match:/^\-?€[\d,]+.?\d*$/,style:59},{match:/^\-?\d+$/,style:65},{match:/^\-?\d+\.\d{2}$/,style:66},{match:/^\([\d,]+\)$/,style:61,fmt:function(a){return-1*a.replace(/[\(\)]/g,"")}},{match:/^\([\d,]+\.\d{2}\)$/,style:62,fmt:function(a){return-1*a.replace(/[\(\)]/g,"")}},{match:/^\-?[\d,]+$/,style:63},
    {match:/^\-?[\d,]+\.\d{2}$/,style:64},{match:/^[\d]{4}\-[\d]{2}\-[\d]{2}$/,style:67,fmt:function(a){return Math.round(25569+Date.parse(a)/864E5)}}];D.ext.buttons.copyHtml5={className:"buttons-copy buttons-html5",text:function(a){return a.i18n("buttons.copy","Copy")},action:function(a,c,d,b){this.processing(!0);var m=this;a=S(c,b);var e=c.buttons.exportInfo(b),f=R(b),g=a.str;d=n("<div/>").css({height:1,width:1,overflow:"hidden",position:"fixed",top:0,left:0});e.title&&(g=e.title+f+f+g);e.messageTop&&
    (g=e.messageTop+f+f+g);e.messageBottom&&(g=g+f+f+e.messageBottom);b.customize&&(g=b.customize(g,b,c));b=n("<textarea readonly/>").val(g).appendTo(d);if(x.queryCommandSupported("copy")){d.appendTo(c.table().container());b[0].focus();b[0].select();try{var p=x.execCommand("copy");d.remove();if(p){c.buttons.info(c.i18n("buttons.copyTitle","Copy to clipboard"),c.i18n("buttons.copySuccess",{1:"Copied one row to clipboard",_:"Copied %d rows to clipboard"},a.rows),2E3);this.processing(!1);return}}catch(q){}}p=
    n("<span>"+c.i18n("buttons.copyKeys","Press <i>ctrl</i> or <i>⌘</i> + <i>C</i> to copy the table data<br>to your system clipboard.<br><br>To cancel, click this message or press escape.")+"</span>").append(d);c.buttons.info(c.i18n("buttons.copyTitle","Copy to clipboard"),p,0);b[0].focus();b[0].select();var t=n(p).closest(".dt-button-info"),h=function(){t.off("click.buttons-copy");n(x).off(".buttons-copy");c.buttons.info(!1)};t.on("click.buttons-copy",h);n(x).on("keydown.buttons-copy",function(q){27===
    q.keyCode&&(h(),m.processing(!1))}).on("copy.buttons-copy cut.buttons-copy",function(){h();m.processing(!1)})},exportOptions:{},fieldSeparator:"\t",fieldBoundary:"",header:!0,footer:!1,title:"*",messageTop:"*",messageBottom:"*"};D.ext.buttons.csvHtml5={bom:!1,className:"buttons-csv buttons-html5",available:function(){return u.FileReader!==B&&u.Blob},text:function(a){return a.i18n("buttons.csv","CSV")},action:function(a,c,d,b){this.processing(!0);a=S(c,b).str;d=c.buttons.exportInfo(b);var m=b.charset;
    b.customize&&(a=b.customize(a,b,c));!1!==m?(m||(m=x.characterSet||x.charset),m&&(m=";charset="+m)):m="";b.bom&&(a=String.fromCharCode(65279)+a);K(new Blob([a],{type:"text/csv"+m}),d.filename,!0);this.processing(!1)},filename:"*",extension:".csv",exportOptions:{},fieldSeparator:",",fieldBoundary:'"',escapeChar:'"',charset:null,header:!0,footer:!1};D.ext.buttons.excelHtml5={className:"buttons-excel buttons-html5",available:function(){return u.FileReader!==B&&(E||u.JSZip)!==B&&!T()&&M},text:function(a){return a.i18n("buttons.excel",
    "Excel")},action:function(a,c,d,b){this.processing(!0);var m=this,e=0;a=function(k){return n.parseXML(P[k])};var f=a("xl/worksheets/sheet1.xml"),g=f.getElementsByTagName("sheetData")[0];a={_rels:{".rels":a("_rels/.rels")},xl:{_rels:{"workbook.xml.rels":a("xl/_rels/workbook.xml.rels")},"workbook.xml":a("xl/workbook.xml"),"styles.xml":a("xl/styles.xml"),worksheets:{"sheet1.xml":f}},"[Content_Types].xml":a("[Content_Types].xml")};var p=c.buttons.exportData(b.exportOptions),t,h,q=function(k){t=e+1;h=
    y(f,"row",{attr:{r:t}});for(var l=0,z=k.length;l<z;l++){var G=I(l)+""+t,A=null;if(null===k[l]||k[l]===B||""===k[l])if(!0===b.createEmptyCells)k[l]="";else continue;var H=k[l];k[l]="function"===typeof k[l].trim?k[l].trim():k[l];for(var N=0,W=U.length;N<W;N++){var L=U[N];if(k[l].match&&!k[l].match(/^0\d+/)&&k[l].match(L.match)){A=k[l].replace(/[^\d\.\-]/g,"");L.fmt&&(A=L.fmt(A));A=y(f,"c",{attr:{r:G,s:L.style},children:[y(f,"v",{text:A})]});break}}A||("number"===typeof k[l]||k[l].match&&k[l].match(/^-?\d+(\.\d+)?([eE]\-?\d+)?$/)&&
    !k[l].match(/^0\d+/)?A=y(f,"c",{attr:{t:"n",r:G},children:[y(f,"v",{text:k[l]})]}):(H=H.replace?H.replace(/[\x00-\x09\x0B\x0C\x0E-\x1F\x7F-\x9F]/g,""):H,A=y(f,"c",{attr:{t:"inlineStr",r:G},children:{row:y(f,"is",{children:{row:y(f,"t",{text:H,attr:{"xml:space":"preserve"}})}})}})));h.appendChild(A)}g.appendChild(h);e++};b.customizeData&&b.customizeData(p);var v=function(k,l){var z=n("mergeCells",f);z[0].appendChild(y(f,"mergeCell",{attr:{ref:"A"+k+":"+I(l)+k}}));z.attr("count",parseFloat(z.attr("count"))+
    1);n("row:eq("+(k-1)+") c",f).attr("s","51")},r=c.buttons.exportInfo(b);r.title&&(q([r.title],e),v(e,p.header.length-1));r.messageTop&&(q([r.messageTop],e),v(e,p.header.length-1));b.header&&(q(p.header,e),n("row:last c",f).attr("s","2"));d=e;var w=0;for(var C=p.body.length;w<C;w++)q(p.body[w],e);w=e;b.footer&&p.footer&&(q(p.footer,e),n("row:last c",f).attr("s","2"));r.messageBottom&&(q([r.messageBottom],e),v(e,p.header.length-1));q=y(f,"cols");n("worksheet",f).prepend(q);v=0;for(C=p.header.length;v<
    C;v++)q.appendChild(y(f,"col",{attr:{min:v+1,max:v+1,width:V(p,v),customWidth:1}}));q=a.xl["workbook.xml"];n("sheets sheet",q).attr("name",Q(b));b.autoFilter&&(n("mergeCells",f).before(y(f,"autoFilter",{attr:{ref:"A"+d+":"+I(p.header.length-1)+w}})),n("definedNames",q).append(y(q,"definedName",{attr:{name:"_xlnm._FilterDatabase",localSheetId:"0",hidden:1},text:Q(b)+"!$A$"+d+":"+I(p.header.length-1)+w})));b.customize&&b.customize(a,b,c);0===n("mergeCells",f).children().length&&n("mergeCells",f).remove();
    c=new (E||u.JSZip);d={type:"blob",mimeType:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"};O(c,a);c.generateAsync?c.generateAsync(d).then(function(k){K(k,r.filename);m.processing(!1)}):(K(c.generate(d),r.filename),this.processing(!1))},filename:"*",extension:".xlsx",exportOptions:{},header:!0,footer:!1,title:"*",messageTop:"*",messageBottom:"*",createEmptyCells:!1,autoFilter:!1,sheetName:""};D.ext.buttons.pdfHtml5={className:"buttons-pdf buttons-html5",available:function(){return u.FileReader!==
    B&&(F||u.pdfMake)},text:function(a){return a.i18n("buttons.pdf","PDF")},action:function(a,c,d,b){this.processing(!0);d=c.buttons.exportData(b.exportOptions);a=c.buttons.exportInfo(b);var m=[];b.header&&m.push(n.map(d.header,function(g){return{text:"string"===typeof g?g:g+"",style:"tableHeader"}}));for(var e=0,f=d.body.length;e<f;e++)m.push(n.map(d.body[e],function(g){if(null===g||g===B)g="";return{text:"string"===typeof g?g:g+"",style:e%2?"tableBodyEven":"tableBodyOdd"}}));b.footer&&d.footer&&m.push(n.map(d.footer,
    function(g){return{text:"string"===typeof g?g:g+"",style:"tableFooter"}}));d={pageSize:b.pageSize,pageOrientation:b.orientation,content:[{table:{headerRows:1,body:m},layout:"noBorders"}],styles:{tableHeader:{bold:!0,fontSize:11,color:"white",fillColor:"#2d4154",alignment:"center"},tableBodyEven:{},tableBodyOdd:{fillColor:"#f3f3f3"},tableFooter:{bold:!0,fontSize:11,color:"white",fillColor:"#2d4154"},title:{alignment:"center",fontSize:15},message:{}},defaultStyle:{fontSize:10}};a.messageTop&&d.content.unshift({text:a.messageTop,
    style:"message",margin:[0,0,0,12]});a.messageBottom&&d.content.push({text:a.messageBottom,style:"message",margin:[0,0,0,12]});a.title&&d.content.unshift({text:a.title,style:"title",margin:[0,0,0,12]});b.customize&&b.customize(d,b,c);c=(F||u.pdfMake).createPdf(d);"open"!==b.download||T()?c.download(a.filename):c.open();this.processing(!1)},title:"*",filename:"*",extension:".pdf",exportOptions:{},orientation:"portrait",pageSize:"A4",header:!0,footer:!1,messageTop:"*",messageBottom:"*",customize:null,
    download:"download"};return D.Buttons});