"use strict";var e=require("postcss"),n=require("postcss-8.2"),s=require("path"),o=require("fs"),t=require("assert");function r(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var c=r(e),l=r(n),i=r(s),a=r(o);function p(e,n="error",s={}){let o="::"+n;const t=Object.keys(s).map((e=>{let n=String(s[e]);return"file"===e&&process.env.GITHUB_WORKSPACE&&(n=i.default.relative(process.env.GITHUB_WORKSPACE,i.default.resolve(n))),`${e}=${o=n,o.replace(/\r/g,"%0D").replace(/\n/g,"%0A").replace(/]/g,"%5D").replace(/;/g,"%3B")}`;var o})).join(",");return t&&(o+=` ${t}`),`${o}::${r=e||"",r.replace(/\r/g,"%0D").replace(/\n/g,"%0A")}`;var r}const u="----------------------------------------";function g(e,n,s,o=!1){let t="";if(t+=`\n${e}\n\n`,n.message&&(t+=`message :\n  ${n.message}\n\n`),n.options)try{t+=`options :\n${JSON.stringify(n.options,null,2)}\n\n`}catch(e){}return t+=`output changed :\n${function(e){return e.replace(/[^\\](\\n)/gm,((e,n)=>e.replace(n," "))).replace(/(\\t)/gm,((e,n)=>e.replace(n," "))).replace(/\+$/gm,"").replace(/^Expected values to be strictly equal:\n/,"")}(s.message)}\n`,o||(t+="\n"+u),t}function d(e,n,s,o,t=!1){let r="";if(r+=`\n${e}\n\n`,n.message&&(r+=`message :\n  ${n.message}\n\n`),n.options)try{r+=`options :\n${JSON.stringify(n.options,null,2)}\n\n`}catch(e){}return r+=`unexpected or missing warnings :\n+ actual ${s.length}\n- expected ${o}\n`,t||(s.forEach((e=>{r+=`\n[${e.plugin}]: ${e.text}`})),s.length&&(r+="\n"),r+="\n"+u),r}const f=()=>({postcssPlugin:"noop-plugin",Rule(){}});f.postcss=!0;const m=process.env.GITHUB_ACTIONS&&"true"===process.env.ENABLE_ANNOTATIONS_FOR_NODE&&"true"===process.env.ENABLE_ANNOTATIONS_FOR_OS;module.exports=function(e){let n=!1;{!0!==e.postcss&&(n=!0,m?console.log(p('postcss flag not set to "true" on exported plugin object',"error",{file:"./package.json",line:1,col:1})):console.error(`\npostcss flag not set to "true"\n\n${u}`));const s=e();s.postcssPlugin&&"string"==typeof s.postcssPlugin||(n=!0,m?console.log(p('plugin name not set via "postcssPlugin"',"error",{file:"./package.json",line:1,col:1})):console.error(`\nplugin name not set via "postcssPlugin"\n\n${u}`));const o=JSON.parse(a.default.readFileSync("./package.json").toString()),t=["css-has-pseudo","css-blank-pseudo","css-prefers-color-scheme","@csstools/css-has-pseudo-experimental"].includes(o.name);o.name.startsWith("postcss-")||o.name.startsWith("@csstools/postcss-")||t||(n=!0,m?console.log(p('plugin name in package.json does not start with "postcss-"',"error",{file:"./package.json",line:1,col:1})):console.error(`\nplugin name in package.json does not start with "postcss-"\n\n${u}`)),Object.keys(Object(o.dependencies)).includes("postcss")&&!("postcssTapeSelfTest"in e)&&(n=!0,m?console.log(p("postcss should only be a peer and/or dev dependency","error",{file:"./package.json",line:1,col:1})):console.error(`\npostcss should only be a peer and/or dev dependency\n\n${u}`))}return async s=>{const r=new Set;for(const $ in s){var a;const w=s[$];w.before&&await w.before();const h=i.default.join(".","test",$.split(":")[0]),S=i.default.join(".","test",$.replace(/:/g,".")),y=`${h}.css`;let b=`${S}.expect.css`,v=`${S}.result.css`;w.expect&&(b=i.default.join(".","test",w.expect)),w.result&&(v=i.default.join(".","test",w.result));const x=null!=(a=w.plugins)?a:[e(w.options)],O=await o.promises.readFile(y,"utf8");let N,E="";try{E=await o.promises.readFile(b,"utf8")}catch(e){n=!0,E=!1,m?console.log(p(`${$}\n\nmissing or broken "expect" file: "${i.default.parse(b).base}"`,"error",{file:y,line:1,col:1})):(r.add($),console.error(`\n${$}\n\nmissing or broken "expect" file: "${i.default.parse(b).base}"\n\n${u}`))}let j=!1;try{N=await c.default(x).process(O,{from:y,to:v,map:{inline:!1,annotation:!1}})}catch(e){if(j=!0,w.exception&&w.exception.test(e.message))continue;throw e}!j&&w.exception&&(n=!0,m?console.log(p(`${$}\n\nexpected an exception but got none`,"error",{file:y,line:1,col:1})):(r.add($),console.error(`\n${$}\n\nexpected an exception but got none\n\n${u}`)));const k=N.css.toString();if(await o.promises.writeFile(v,k,"utf8"),process.env.REWRITE_EXPECTS&&o.promises.writeFile(b,k,"utf8"),!1!==E){try{t.strict.strictEqual(k,E)}catch(e){n=!0,m?console.log(p(g($,w,e,!0),"error",{file:b,line:1,col:1})):(r.add($),console.error(g($,w,e)))}try{if(N.map.toJSON().sources.includes("<no source>"))throw new Error("Sourcemap is broken")}catch(e){n=!0;const s='\nThis is most likely a newly created PostCSS AST Node without a value for "source".\nsee :\n- https://github.com/postcss/postcss/blob/main/docs/guidelines/plugin.md#24-set-nodesource-for-new-nodes\n- https://postcss.org/api/#node-source';m?console.log(p(`${$}\n\nbroken source map: ${JSON.stringify(N.map.toJSON().sources)}\n${s}`,"error",{file:y,line:1,col:1})):(r.add($),console.error(`\n${$}\n\nbroken source map: ${JSON.stringify(N.map.toJSON().sources)}\n${s}\n\n${u}`))}w.after&&await w.after();try{const e=await o.promises.readFile(v,"utf8");if((await c.default([f()]).process(e,{from:v,to:v,map:{inline:!1,annotation:!1}})).warnings().length)throw new Error("Unexpected warnings on second pass")}catch(e){n=!0,m?console.log(p(`${$}\n\nresult was not parsable with PostCSS.`,"error",{file:b,line:1,col:1})):(r.add($),console.error(`\n${$}\n\nresult was not parsable with PostCSS.\n\n${u}`))}if(c.default([f()]).version!==l.default([f()]).version){const e=await l.default(x).process(O,{from:y,to:v,map:{inline:!1,annotation:!1}});try{t.strict.strictEqual(e.css.toString(),k)}catch(e){n=!0,m?console.log(p("testing older PostCSS:\n"+g($,w,e,!0),"error",{file:b,line:1,col:1})):(r.add($),console.error("testing older PostCSS:\n"+g($,w,e)))}}try{(N.warnings().length||w.warnings)&&t.strict.strictEqual(N.warnings().length,w.warnings)}catch(e){n=!0,m?console.log(p(d($,w,N.warnings(),w.warnings,!0),"error",{file:b,line:1,col:1})):(r.add($),console.error(d($,w,N.warnings(),w.warnings)))}}}if(r.size){console.error("\nunexpected failures:");for(const e of r.values())console.error("  - "+e)}n&&process.exit(1),console.warn("pass "+e().postcssPlugin)}};