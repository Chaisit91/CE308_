module.exports = function (api) {
    api.cache(true);
    return {
        presets: [
            ["babel-preset-expo", { jsxImportSoure: "nativewind" }],
            "nativewind/babel",
        ],
    };
};