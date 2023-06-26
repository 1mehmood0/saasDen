const { DefaultAzureCredential } = require("@azure/identity");
const { SecretClient } = require("@azure/keyvault-secrets");
const config = require("../../config")
const config1 = config;

const credential = new DefaultAzureCredential({ additionallyAllowedTenants: ['*'] });
/*
This need to be tackled
*/
const vaultName = process.env.VAULT_NAME;
const url = `https://${vaultName}.vault.azure.net`;

const client = new SecretClient(url, credential);


async function keyVaultSet() {
    for await (let secretProperties of client.listPropertiesOfSecrets()) {
        const secretData = await client.getSecret(secretProperties.name);
        config1[secretData.name] = secretData.value;
    }

}
module.exports = keyVaultSet;

