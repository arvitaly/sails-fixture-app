import Sails = require("sails");
import { resolve as resolvePath } from "path";

export default async (path?: string) => {
    const Sails = require("sails");
    const SailsConstructor = Sails.constructor;
    return new Promise<Sails.App>((resolve, reject) => {
        let app = new SailsConstructor();
        app.load({
            appPath: resolvePath(path || __dirname + "/__fixtures__/app1"),
            connections: {
                memory: {
                    adapter: "sails-memory",
                },
            },
            log: {
                level: "error",
            },
            models: {
                connection: "memory",
                migrate: "drop",
            },
        }, (err: any, sailsNew: Sails.App) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(sailsNew);
        });
    });
};
