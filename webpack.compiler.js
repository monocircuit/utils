/** @format */

const childProcess = require("child_process");
const readline = require("readline");
const webpack = require("webpack");
const webpackConfigs = require("./webpack.config");
const path = require("path");
const chalk = require("chalk");

const webpackConfig = webpackConfigs.filter(c => c.name === "utils/development")[0];
const webpackCompilerCache = { webpackProcesses: {}, listener: null, debug: false };

const readlineInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

webpack(webpackConfig, (error, stats) => {
    if (error) {
        console.log(error);
    }

    for (const webpackProcess in webpackCompilerCache.webpackProcesses) {
        if (
            Object.prototype.hasOwnProperty.call(
                webpackCompilerCache.webpackProcesses,
                webpackProcess,
            )
        ) {
            webpackCompilerCache.webpackProcesses[webpackProcess].kill("SIGKILL");
            delete webpackCompilerCache.webpackProcesses[webpackProcess];
        }
    }

    const webpackHandle = () => {
        if (!webpackCompilerCache.debug) {
            readline.cursorTo(process.stdout, 0, 0);
            readline.clearLine(process.stdout, 0);
            readline.clearScreenDown(process.stdout);

            const hasErrors = stats.hasErrors();
            const hasWarnings = stats.hasWarnings();

            let webpackHeaderFactory = chalk.bold;

            if (hasWarnings) {
                webpackHeaderFactory = webpackHeaderFactory.yellow;
            }

            if (hasErrors) {
                webpackHeaderFactory = webpackHeaderFactory.red;
            }

            if (process.argv[3] !== "--no-header") {
                readlineInterface.write(
                    `${stats.endTime - stats.startTime}ms • ${webpackHeaderFactory(
                        stats.hash,
                    )}\n\n`,
                );
            }

            if (!hasErrors) {
                const signals = ["close", "disconnect", "error", "exit"];
                const fileName = path.normalize(
                    `${webpackConfig.output.path}\\${webpackConfig.output.filename}`,
                );

                const iterationName = new Date().toISOString();
                webpackCompilerCache.webpackProcesses[iterationName] = childProcess.spawn(
                    "node",
                    [fileName],
                    { stdio: "inherit" },
                );
                webpackCompilerCache.webpackProcesses[iterationName].unref();

                signals.forEach(signal =>
                    webpackCompilerCache.webpackProcesses[iterationName].on(signal, () => {
                        if (
                            webpackCompilerCache.listener &&
                            !Object.keys(webpackCompilerCache.webpackProcesses).length
                        ) {
                            webpackCompilerCache.listener();
                            webpackCompilerCache.listener = null;
                        }
                    }),
                );
            } else {
                const statsJson = stats.toJson();
                statsJson.errors.forEach(error => readlineInterface.write(`${error.stack}\n\n`));
                statsJson.warnings.forEach(warning => readlineInterface.write(`${warning}\n`));
            }
        }
    };

    if (!Object.keys(webpackCompilerCache.webpackProcesses).length) {
        webpackHandle();
    } else {
        webpackCompilerCache.listener = webpackHandle;
    }
});
