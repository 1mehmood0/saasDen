const db = require("../index");

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
        const userData = await container.items.read(userProfile);
        console.log(userData, "<-userData");
    } catch (error) {
        console.log("Error while fetching the User");
    }
}

module.exports = {
    insertUser,
    getUser
}
