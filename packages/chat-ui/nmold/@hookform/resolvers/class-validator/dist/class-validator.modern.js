import{toNestError as r,validateFieldsNatively as s}from"@hookform/resolvers";import{plainToClass as t}from"class-transformer";import{validateSync as e,validate as o}from"class-validator";const n=(r,s,t={},e="")=>r.reduce((r,t)=>{const o=e?`${e}.${t.property}`:t.property;if(t.constraints){const e=Object.keys(t.constraints)[0];r[o]={type:e,message:t.constraints[e]},s&&r[o]&&Object.assign(r[o],{types:t.constraints})}return t.children&&t.children.length&&n(t.children,s,r,o),r},t),a=(a,i={},c={})=>async(l,d,m)=>{const p=t(a,l),h=await("sync"===c.mode?e:o)(p,i);return h.length?{values:{},errors:r(n(h,!m.shouldUseNativeValidation&&"all"===m.criteriaMode),m)}:(m.shouldUseNativeValidation&&s({},m),{values:l,errors:{}})};export{a as classValidatorResolver};
//# sourceMappingURL=class-validator.modern.js.map
