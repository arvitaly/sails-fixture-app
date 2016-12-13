"use strict";
const fs_1 = require("fs");
const ncp_1 = require("ncp");
function deleteFolderRecursive(path) {
    if (fs_1.existsSync(path)) {
        fs_1.readdirSync(path).forEach((file, index) => {
            const curPath = path + "/" + file;
            if (fs_1.lstatSync(curPath).isDirectory()) {
                deleteFolderRecursive(curPath);
            }
            else {
                fs_1.unlinkSync(curPath);
            }
        });
        fs_1.rmdirSync(path);
    }
}
;
deleteFolderRecursive(__dirname + "/__fixtures__/app1/node_modules");
ncp_1.ncp(__dirname + "/__fixtures__/app1/node_modules_", __dirname + "/__fixtures__/app1/node_modules", (err) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
});
