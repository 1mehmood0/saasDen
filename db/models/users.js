const db = require("../index");
const FB_URL = 'https://www.facebook.com'
const GOOGLE_URL = 'https://www.google.com'



async function insertUser(userData) {
    let container = await db.main();
    try {
        await container.items.create(userData);
        console.log("User Data Inserted")
    } catch (error) {
        console.log("Error while Inserting User")
    }
}

async function getUser(userProfile) {
    let container = await db.main();
    try {
        const userData = await container.item(userProfile.id, userProfile.id).read();
        // console.log(userData.resource, "<-userData");
        return userData.resource;
    } catch (error) {
        console.log("Error while fetching the User");
    }
}

async function getUserPerProvider() {
    console.log("in db layer");
    let container = await db.main();
    try {
        const querySpec = { query: `SELECT users.provider, COUNT(1) as user FROM users WHERE users.provider IN ('FACEBOOK', 'GOOGLE') GROUP BY users.provider` }
        const googleUserData = await container.items.query(querySpec).fetchAll();
        //console.log(JSON.stringify(googleUserData.resources), "<-userData For Each Provider");
        return googleUserData.resources;
    } catch (error) {
        console.log("Error while fetching the User Per Provider");
    }

}

module.exports = {
    insertUser,
    getUser,
    getUserPerProvider
}
