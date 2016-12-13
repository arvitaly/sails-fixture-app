"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const path_1 = require("path");
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (config = {}) => __awaiter(this, void 0, void 0, function* () {
    const Sails = require("sails");
    const SailsConstructor = Sails.constructor;
    const path = config.path;
    const port = config.port || 14001;
    return new Promise((resolve, reject) => {
        let app = new SailsConstructor();
        app.lift({
            appPath: path_1.resolve(path || __dirname + "/__fixtures__/app1"),
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
});
