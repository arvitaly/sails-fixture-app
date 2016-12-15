"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const httpRequest = require("request");
const _1 = require("./../");
describe("Lift tests", () => {
    let app;
    beforeEach(() => __awaiter(this, void 0, void 0, function* () {
        app = yield _1.lift({
            modules: {
                "sails-memory": require.resolve("sails-memory"),
            },
        });
    }));
    afterEach(() => __awaiter(this, void 0, void 0, function* () {
        yield app.kill();
    }));
    it("http create and get model", () => __awaiter(this, void 0, void 0, function* () {
        let result = yield postRequest("http://127.0.0.1:14001/modelName1", _1.createModel1());
        result = yield getRequest("http://127.0.0.1:14001/modelName1");
        delete result[0].createdAt;
        delete result[0].updatedAt;
        expect(result).toMatchSnapshot();
    }));
});
function postRequest(url, params) {
    const options = {
        method: "POST",
        url,
        headers: {
            "Content-Type": "application/json",
        },
        json: params,
    };
    return new Promise((done, reject) => {
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
function getRequest(url, params) {
    return new Promise((done, reject) => {
        httpRequest(url, params, (error, response, body) => {
            if (error) {
                reject(error);
                return;
            }
            if (response.statusCode !== 200) {
                reject("Invalid status code: " + response.statusCode);
                return;
            }
            done(JSON.parse(body));
        });
    });
}
;
