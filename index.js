"use strict";
var start_1 = require("./start");
exports.start = start_1.default;
var lift_1 = require("./lift");
exports.lift = lift_1.default;
let id = 0;
exports.model1Id = "modelname1";
const dt1 = new Date("Fri Nov 18 2016 18:25:11 GMT+0700 (SE Asia Standard Time)");
function createModel1() {
    ++id;
    const name = "na" + (id);
    return {
        firstActive: dt1, id, isActive: false, name, num: 15,
        updatedAt: dt1,
        createdAt: dt1,
    };
}
exports.createModel1 = createModel1;
function lower(sails) {
    return new Promise((resolve, reject) => {
        sails.lower((err) => {
            if (err) {
                reject(err);
                return;
            }
            setTimeout(resolve, 1000);
        });
    });
}
exports.lower = lower;
