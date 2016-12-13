import { createModel1, model1Id, RemoteApp, start } from "./..";
describe("start tests", () => {
    let app: RemoteApp;
    beforeEach(async () => {
        app = await start();
    });
    afterEach(async () => {
        await app.kill();
    });
    it("create", async () => {
        const created = await app.create(model1Id, createModel1());
        delete created.createdAt;
        delete created.updatedAt;
        expect(created).toMatchSnapshot();
    });
    it("update", async () => {
        const created = await app.create(model1Id, createModel1());
        const updated = (await app.update(model1Id, created.id, { name: "test1" }))[0];
        delete updated.createdAt;
        delete updated.updatedAt;
        expect(updated).toMatchSnapshot();
    });
});
