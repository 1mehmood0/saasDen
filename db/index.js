const { CosmosClient } = require("@azure/cosmos");
const config = require("../config")
//console.log(config);
const endpoint = config["AZURE-DB-ENDPOINT"];
const key = config["AZURE-MASTERKEY"];

async function main() {
    try {
        const client = new CosmosClient({ endpoint, key });
        const { database } = await client.databases.createIfNotExists({ id: "saasDen" });
        console.log(database.id);
        const { container } = await database.containers.createIfNotExists({ id: "users" });
        console.log(container.id);
        return container;
    } catch (error) {
        console.log(error);
    }

}

module.exports = { main };

