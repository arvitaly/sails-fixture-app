"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
function start(config = {}) {
    return __awaiter(this, void 0, void 0, function* () {
        const app = new RemoteApp(config);
        yield app.start();
        return app;
    });
}
exports.start = start;
function lift(config = {}) {
    return __awaiter(this, void 0, void 0, function* () {
        const app = new RemoteApp(config);
        yield app.lift();
        return app;
    });
}
exports.lift = lift;
class RemoteApp {
    constructor(config = {}) {
        this.config = config;
        this.commands = {};
        this.id = 0;
        this.child = child_process_1.fork(__dirname + "/remote-client");
        this.child.on("message", (data) => {
            switch (data.type) {
                case "log":
                    console.warn(data.data);
                    break;
                case "resolve":
                    this.commands[data.id].resolve(data.data);
                    break;
                case "reject":
                    this.commands[data.id].reject(data.data);
                    break;
                default:
            }
        });
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.send("start", this.config);
        });
    }
    lift() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.send("lift", this.config);
        });
    }
    send(command, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = this.getMessageId();
            const promise = new Promise((resolve, reject) => {
                this.commands[id] = {
                    resolve,
                    reject,
                };
            });
            this.child.send({
                id,
                command,
                data,
            });
            return promise;
        });
    }
    getMessageId() {
        return (this.id++).toString();
    }
    kill() {
        return __awaiter(this, void 0, void 0, function* () {
            this.child.kill();
            return Promise.resolve();
        });
    }
    create(modelId, created) {
        return this.send("create", {
            modelId,
            created,
        });
    }
    update(modelId, params, updated) {
        return this.send("update", {
            modelId,
            params,
            updated,
        });
    }
}
exports.RemoteApp = RemoteApp;
;
