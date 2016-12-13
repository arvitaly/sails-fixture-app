import { ChildProcess, fork } from "child_process";

interface ICommand {
    resolve: (data?: any) => any;
    reject: (err?: any) => any;
}
export async function start(config: { port?: number; } = {}) {
    const app = new RemoteApp(config);
    await app.start();
    return app;
}
export async function lift(config: { port?: number; } = {}) {
    const app = new RemoteApp(config);
    await app.lift();
    return app;
}
export class RemoteApp {
    protected commands: { [index: string]: ICommand } = {};
    protected id = 0;
    protected child: ChildProcess;
    constructor(config: { port?: number; } = {}) {
        this.child = fork(__dirname + "/remote-client");
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
    public async start() {
        return this.send("start");
    }
    public async lift() {
        return this.send("lift");
    }
    public async send(command: string, data?: any) {
        const id = this.getMessageId();
        const promise = new Promise<any>((resolve, reject) => {
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
    }
    public getMessageId() {
        return (this.id++).toString();
    }
    public async kill() {
        this.child.kill("SIGTERM");
        return Promise.resolve();
    }
    public create(modelId: string, created: any) {
        return this.send("create", {
            modelId,
            created,
        });
    }
    public update(modelId: string, params: any, updated: any) {
        return this.send("update", {
            modelId,
            params,
            updated,
        });
    }
};