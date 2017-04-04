import { existsSync, lstatSync, readdirSync, rmdirSync, unlinkSync } from "fs";
import { ncp } from "ncp";
// tslint:disable:line no-var-requires
const realNcp: typeof ncp = require("./ncp").ncp;

function deleteFolderRecursive(path: string) {
    if (existsSync(path)) {
        readdirSync(path).forEach((file, index) => {
            const curPath = path + "/" + file;
            if (lstatSync(curPath).isDirectory()) { // recurse
                deleteFolderRecursive(curPath);
            } else { // delete file
                unlinkSync(curPath);
            }
        });
        rmdirSync(path);
    }
}
deleteFolderRecursive(__dirname + "/__fixtures__/app1/node_modules");
realNcp(__dirname + "/__fixtures__/app1/node_modules_", __dirname + "/__fixtures__/app1/node_modules", (err) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
});
