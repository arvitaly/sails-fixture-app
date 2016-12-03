import lift from "./../lift";
describe("Lift tests", () => {
    it("lift", async () => {
        const app = await lift({ path: __dirname + "/../__fixtures__/app1" });
    });
});
