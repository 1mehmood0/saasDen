require("dotenv").config();
const keyvault = require("./utils/keyVault/index")

async function server() {
    await keyvault();
    const app = require("./app");

    const http = require("http");
    const PORT = process.env.PORT;
    const server = http.createServer(app);
    const db = require("./db/index")

    server.listen(PORT, async () => {
        console.log(`SERVER started on port ${PORT}`)
        await db.main();
        console.log("DB connected")

    })
}
server();


