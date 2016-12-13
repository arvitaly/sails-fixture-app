import { existsSync, lstatSync, readdirSync, rmdirSync, unlinkSync } from "fs";
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
};
deleteFolderRecursive(__dirname + "/__fixtures__/app1/node_modules");
