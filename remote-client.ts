import lift from "./lift";
import start from "./start";
import Sails = require("sails");
let app: Sails.App;
process.on("message", async (message: any) => {
    try {
        switch (message.command) {
            case "lift":
                init();
                app = await lift();
                send("0", "resolve", {});
                break;
            case "start":
                init();
                app = await start();
                send("0", "resolve", {});
                break;
            case "create":
                const created = await app.models[message.data.modelId].create(message.data.created);
                send(message.id, "resolve", created);
                break;
            case "update":
                const updated = await app.models[message.data.modelId].update(
                    message.data.params,
                    message.data.updated);
                send(message.id, "resolve", updated);
                break;
            default:
        }
    } catch (e) {
        send(message.id, "reject", "Error on message: " + JSON.stringify(message) + "\n Error: " + e.toString());
    }
});

function send(id: string, type: string, data: any) {
    if (!process.send) {
        throw new Error("This is not forked process");
    }
    process.send({
        id,
        type,
        data,
    });
};

declare var global: any;
global.$remote$ = {} as any;
function init() {
    const modules = ["sails-memory", "sails-hook-graphql"];
    modules.map((m) => {
        try {
            global.$remote$[m] = require.resolve(m);
        } catch (e) {
            console.error(e);
        }
    });
};
