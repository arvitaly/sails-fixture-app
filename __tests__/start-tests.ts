import start from "./../start";
describe("start tests", () => {
    it("start", async () => {
        const app = await start(__dirname + "/../__fixtures__/app1");
    });
});
