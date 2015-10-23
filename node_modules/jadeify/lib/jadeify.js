"use strict";

var through = require("through");
var jade = require("jade");

module.exports = function (fileName, options) {
    if (!/\.jade$/i.test(fileName)) {
        return through();
    }

    options.runtimePath = options.runtimePath === undefined ? "jade/runtime" : options.runtimePath;

    var inputString = "";
    return through(
        function (chunk) {
            inputString += chunk;
        },
        function () {
            var self = this;

            options.filename = fileName;

            var result;
            try {
                result = jade.compileClientWithDependenciesTracked(inputString, options);
            } catch (e) {
                self.emit("error", e);
                return;
            }

            result.dependencies.forEach(function (dep) {
                self.emit("file", dep);
            });

            var moduleBody = "var jade = require(\"" + options.runtimePath + "\");\n\n" +
                             "module.exports = " + result.body + ";";

            self.queue(moduleBody);
            self.queue(null);
        }
    );
};
