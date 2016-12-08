import Sails = require("sails");
export { default as start } from "./start";
export { default as lift } from "./lift";
let id = 0;
export const model1Id = "modelname1";
const dt1 = new Date("Fri Nov 18 2016 18:25:11 GMT+0700 (SE Asia Standard Time)");
export function createModel1(sails: Sails.App) {
    ++id;
    const name = "na" + (id);
    return {
        firstActive: dt1, id, isActive: false, name, num: 15,
        updatedAt: dt1,
        createdAt: dt1,
    };
}
export function lower(sails: Sails.App) {
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
