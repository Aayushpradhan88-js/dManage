import app from "./src/app";
import { SERVER_PORT } from "./src/config/env"
import "./src/database/connection"
import { config } from "dotenv"
config();

// console.log("✅ step 1: SERVER STARTED!!!");
function startServer() {
    const port:number = SERVER_PORT;
    app.listen(port,() => {
        console.log(`Server is running on port: ${port}`);
    });
};

startServer();