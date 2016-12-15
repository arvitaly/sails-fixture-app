import { resolve as resolvePath } from "path";
import start from "./start";
import Sails = require("sails");
export default async (config: {
    port?: number;
    modules?: { [index: string]: string };
    path?: string; isLift?: boolean;
} = {}) => {
    config.isLift = true;
    return start(config);
};
