"use strict";
module.exports = {
    attributes: {
        name: "string",
        owner: {
            model: "model2",
        },
        model3s: {
            collection: "model3",
            via: "model4s",
        },
    },
};
