import app from "./src/app.ts";
import { SERVER_PORT } from "./src/config/env.ts";
import "./src/db/connection.ts";
import { config } from "dotenv";
config();

// console.log("✅ step 1: SERVER STARTED!!!");
function startServer() {
    const port:number = SERVER_PORT;
    app.listen(port,() => {
        console.log(`Server is running on port: ${port}`);
    });
}

startServer();
