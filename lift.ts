import { resolve as resolvePath } from "path";
import Sails = require("sails");
export default async (config: { port?: number; path?: string; } = {}) => {
    const Sails = require("sails");
    const path = config.path;
    const port = config.port || 14001;
    return new Promise<Sails.App>((resolve, reject) => {
        const SailsConstructor = Sails.constructor;
        let app = new SailsConstructor();
        app.lift({
            appPath: resolvePath(path),
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
            port,
            sockets: {
                transports: ["websocket", "polling"],
            },
        }, (err, sailsNew) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(sailsNew);
        });
    });
};
