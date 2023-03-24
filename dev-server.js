import liveServer from "live-server";
import cors from "cors";

const params = {
    port: 4278, // change to your preferred port
    root: "./dist", // change to your output directory
    open: false,
    file: "index.html",
    wait: 100,
    logLevel: 2,
};

// add CORS headers to live-server
const corsMiddleware = cors({ origin: "*" });
params.middleware = [corsMiddleware];

liveServer.start(params);
