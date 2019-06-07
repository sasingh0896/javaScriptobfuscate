var fs = require("fs");
var hide = require("javascript-obfuscator");
var path = require("path");

var dir = "YOUR PROJECT FOLDER PATH";

function ofscate(file) {
    fs.readFile(file, (err, data) => {
        if (err) throw err;
        else var ofscate_result = hide.obfuscate(data);
        fs.writeFile(file, ofscate_result, (err, res) => {
            if (err) throw err;
        });
    });
}
let jsPath = [];

function filewalker(dir, done) {
    fs.readdir(dir, function (err, list) {
        if (err) 
        return done(err);

        var pending = list.length;
        
        if (!pending)
        return done(null);

        list.forEach(function (file) {
            file = path.resolve(dir, file);
            let extensions = file.substring(file.lastIndexOf(".") + 1, file.length);
            if (extensions == "js" && !file.includes("node_modules")) {
                ofscate(file);
                jsPath.push(file);
            }
            fs.stat(file, function (err, stat) {
                if (stat && stat.isDirectory()) {
                    filewalker(file, function (err, res) {
                        if (!--pending) done(null);
                    });
                } else {
                    if (!--pending) done(null);
                }
            });
        });
    });
}
filewalker(dir, function (err, data) {
    if (err) {
        throw err;
    }
    console.log(jsPath);
});
