export = {
    attributes: {
        name: "string",
        owner: {
            model: "model2",
        },
        model3s: {
            collection: "model3",
            via: "model4s",
        },
        model5Field: {
            model: "model5",
        },
    },
};
