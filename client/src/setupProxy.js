const proxy = require("http-proxy-middleware");

module.exports = function (app) {
    app.use(
        proxy("/api", {
            target: "https://simsimhash.azurewebsites.net",
            changeOrigin: true
        })
    );
};
