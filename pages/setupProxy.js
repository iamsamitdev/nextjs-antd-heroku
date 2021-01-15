const proxy = require("http-proxy-middleware");

module.exports = app => {
  app.use(
    "/api",
    proxy({
      target: "https://www.itgenius.co.th/sandbox_api/cpallstockapi/public",
      changeOrigin: true
    })
  );
};