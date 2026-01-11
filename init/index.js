const mongoose = require("mongoose");
const initData = require("./sample.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/cozio";

async function main() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("MongoDB connection established. System is breathing.");
    await initDB();
    await mongoose.connection.close();
    console.log("Connection closed. Bye!");
  } catch (err) {
    console.error("Critical failure during DB bootstrap:", err);
  }
}

const initDB = async () => {
  try {
    await Listing.deleteMany({});
    console.log("Existing listings Deleted");
    const updatedInitData = initData.data.map((obj) => ({
      ...obj,
      owner: new mongoose.Types.ObjectId("695bd37340406b3879e1478b"),
    }));
    //  insert
    await Listing.insertMany(updatedInitData);
    console.log("Sample listings inserted successfully. Database is aligned.");
  } catch (err) {
    console.error("Database initialization failed:", err);
  }
};

main();
