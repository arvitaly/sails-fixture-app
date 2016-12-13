import Sails = require("sails");
import { resolve as resolvePath } from "path";
declare var global: any;
export default async (config: { port?: number; path?: string; isLift?: boolean; } = {}) => {
    global.$remote$ = {} as any;
    const modules = ["sails-memory", "sails-hook-graphql"];
    modules.map((m) => {
        try {
            global.$remote$[m] = require.resolve(m);
        } catch (e) {
            console.error(e);
        }
    });
    const path = config.path;
    const port = config.port || 14001;

    const Sails = require("sails");
    const SailsConstructor = Sails.constructor;
    const sailsConfig = {
        appPath: resolvePath(path || __dirname + "/__fixtures__/app1"),
        connections: {
            memory: {
                adapter: "sails-memory",
            },
        },
        log: {
            level: "error",
        },
        port,
        models: {
            connection: "memory",
            migrate: "drop",
        },
    };
    return new Promise<Sails.App>((resolve, reject) => {
        let app = new SailsConstructor();
        if (config.isLift) {
            app.lift(sailsConfig, (err: any, sailsNew: Sails.App) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(sailsNew);
            });
        } else {
            app.load(sailsConfig, (err: any, sailsNew: Sails.App) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(sailsNew);
            });
        }
    });
};
