const mongoose = require("mongoose");
const Listing = require("../models/listing.js");
const { data } = require("./data.js");

async function initDB() {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/SelfProj");

        console.log("Connected to DB");

        for (const item of data) {
            const result = await Listing.updateOne(
                { title: item.title },
                {
                    $set: {
                        category: item.category
                    }
                }
            );

            if (result.matchedCount === 0) {
                console.log(`Not found: ${item.title}`);
            } else {
                console.log(`Updated: ${item.title}`);
            }
        }

        console.log("All matching categories updated!");
    } catch (err) {
        console.error(err);
    } finally {
        await mongoose.connection.close();
    }
}

initDB();