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
    console.log("userProfile to search->", userProfile);
    const query = "SELECT * from users where id = ? AND provider = ? "
    let container = await db.main();
    try {
        const userData = await container.item(userProfile.id, userProfile.id).read();
        // console.log(userData.resource, "<-userData");
        return userData.resource;
    } catch (error) {
        console.log("Error while fetching the User");
    }
}

module.exports = {
    insertUser,
    getUser
}
