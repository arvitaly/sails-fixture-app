import httpRequest = require("request");
import { createModel1 } from "./../";
import { lift, RemoteApp } from "./../remote";
describe("Lift tests", () => {
    let app: RemoteApp;
    beforeEach(async () => {
        app = await lift();
    });
    afterEach(async () => {
        await app.kill();
    });
    it("http create and get model", async () => {
        let result = await postRequest("http://127.0.0.1:14001/modelName1", createModel1());
        result = await getRequest("http://127.0.0.1:14001/modelName1");
        delete result.createdAt;
        delete result.updatedAt;
        expect(result).toMatchSnapshot();
    });
});
function postRequest(url: string, params?: any) {
    const options = {
        method: "POST",
        url,
        headers: {
            "Content-Type": "application/json",
        },
        json: params,
    };
    return new Promise<any>((done, reject) => {
        httpRequest.post(options, (error, response, body) => {
            if (error) {
                reject(error);
                return;
            }
            if (response.statusCode !== 200 && response.statusCode !== 201) {
                reject("Invalid status code: " + response.statusCode);
                return;
            }
            done(body);
        });
    });
}
function getRequest(url: string, params?: any): Promise<any> {
    return new Promise<any>((done, reject) => {
        httpRequest(url, params, (error, response, body) => {
            if (error) {
                reject(error);
                return;
            }
            if (response.statusCode !== 200) {
                reject("Invalid status code: " + response.statusCode);
                return;
            }
            done(body);
        });
    });
};
