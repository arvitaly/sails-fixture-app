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
const lift_1 = require("./lift");
const start_1 = require("./start");
let app;
process.on("message", (message) => __awaiter(this, void 0, void 0, function* () {
    try {
        switch (message.command) {
            case "lift":
                app = yield lift_1.default(message.data);
                send("0", "resolve", {});
                break;
            case "start":
                app = yield start_1.default(message.data);
                send("0", "resolve", {});
                break;
            case "create":
                const created = yield app.models[message.data.modelId].create(message.data.created);
                send(message.id, "resolve", created);
                break;
            case "update":
                const updated = yield app.models[message.data.modelId].update(message.data.params, message.data.updated);
                send(message.id, "resolve", updated);
                break;
            default:
        }
    }
    catch (e) {
        send(message.id, "reject", "Error on message: " + JSON.stringify(message) + "\n Error: " + e.toString());
    }
}));
function send(id, type, data) {
    if (!process.send) {
        throw new Error("This is not forked process");
    }
    process.send({
        id,
        type,
        data,
    });
}
;
