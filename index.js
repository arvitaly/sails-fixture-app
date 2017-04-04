"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./remote"));
let id = 0;
exports.model1Id = "modelname1";
exports.model2Id = "model2";
const dt1 = new Date("Fri Nov 18 2016 18:25:11 GMT+0700 (SE Asia Standard Time)");
function createModel1(realId) {
    realId = realId || ++id;
    const name = "na" + (id);
    return {
        firstActive: dt1, id: realId, isActive: false, name, num: 15,
        updatedAt: dt1,
        createdAt: dt1,
    };
}
exports.createModel1 = createModel1;
