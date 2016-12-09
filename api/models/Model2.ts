export = {
    attributes: {
        name: "string",
        key: {
            type: "string",
            primaryKey: true,
        },
        model3s: {
            collection: "model3",
        },
        model4s: {
            // one to many
            collection: "model4",
            via: "owner",
        },
    },
};
