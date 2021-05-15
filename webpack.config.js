/** @format */

const path = require("path");
const webpackNodeExternals = require("webpack-node-externals");

/* eslint-disable */

const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

/* eslint-enable */

module.exports = [
    {
        name: "utils/development",
        mode: "development",
        target: "node",
        devtool: "source-map",
        entry: {
            utils: path.resolve(__dirname, "./src/main.ts"),
        },
        output: {
            path: path.resolve(__dirname, "dist"),
            filename: "utils.js",
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: "babel-loader",
                            options: {
                                presets: ["@babel/preset-env", "@babel/preset-typescript"],
                                plugins: [
                                    "@babel/plugin-transform-typescript",
                                    "@babel/plugin-transform-runtime",
                                    "@babel/plugin-proposal-class-properties",
                                    "babel-plugin-transform-typescript-metadata",
                                    ["@babel/plugin-proposal-decorators", { legacy: true }],
                                ],
                            },
                        },
                        {
                            loader: "ts-loader",
                            options: {
                                configFile: path.resolve(__dirname, "./dev.tsconfig.json"),
                            },
                        },
                    ],
                },
            ],
        },
        resolve: {
            extensions: [".ts", ".tsx", ".js"],
        },
        externals: [webpackNodeExternals()],
        watch: true,
        watchOptions: {
            aggregateTimeout: 200,
            poll: 1000,
        },
    },
    {
        name: "utils/production",
        mode: "production",
        target: "node",
        devtool: "source-map",
        entry: {
            utils: path.resolve(__dirname, "./src/main.ts"),
            "utils.min": path.resolve(__dirname, "./src/main.ts"),
        },
        output: {
            path: path.resolve(__dirname, "lib"),
            filename: "[name].js",
            libraryTarget: "umd",
            library: "utils",
            umdNamedDefine: true,
        },
        plugins: [
            new UglifyJsPlugin({
                uglifyOptions: {
                    minimize: true,
                    sourceMap: true,
                },
                include: /\.min\.js$/,
            }),
        ],
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: "awesome-typescript-loader",
                        },
                    ],
                },
            ],
        },
        resolve: {
            extensions: [".ts", ".tsx", ".js"],
        },
    },
];
