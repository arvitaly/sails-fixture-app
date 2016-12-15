"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const __1 = require("./..");
describe("start tests", () => {
    let app;
    beforeEach(() => __awaiter(this, void 0, void 0, function* () {
        app = yield __1.start();
    }));
    afterEach(() => __awaiter(this, void 0, void 0, function* () {
        yield app.kill();
    }));
    it("create", () => __awaiter(this, void 0, void 0, function* () {
        const created = yield app.create(__1.model1Id, __1.createModel1());
        delete created.createdAt;
        delete created.updatedAt;
        expect(created).toMatchSnapshot();
    }));
    it("update", () => __awaiter(this, void 0, void 0, function* () {
        const created = yield app.create(__1.model1Id, __1.createModel1());
        const updated = (yield app.update(__1.model1Id, created.id, { name: "test1" }))[0];
        delete updated.createdAt;
        delete updated.updatedAt;
        expect(updated).toMatchSnapshot();
    }));
});
