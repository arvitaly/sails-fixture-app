"use strict";
module.exports = {
    attributes: {
        name: "string",
        key: {
            type: "string",
            primaryKey: true,
        },
        model3s: {
            collection: "model3",
        },
    },
};
