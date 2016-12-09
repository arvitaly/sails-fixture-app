"use strict";
module.exports = {
    attributes: {
        title: "string",
        model4s: {
            collection: "model4",
            via: "model3s",
            dominant: true,
        },
    },
};
