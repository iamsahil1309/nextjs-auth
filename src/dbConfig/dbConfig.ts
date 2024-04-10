//database connection//

import mongoose from "mongoose";

export async function connect() {

    try {
    mongoose.connect(process.env.MONGO_URI!);
    const connection = mongoose.connection;

    //why hold in connection? coz may be there is an connection db issue pr error etc, so you can fire event listeners to connection

    connection.on("connected", () => {
        console.log("MongoDB connectded");
    });

    connection.on("error", (err) => {
        console.log("MongoDB connection error: " + err);

      //exit

        process.exit();
    });
    } 
    
    catch (error) {
    console.log("Something went wrong in connecting to DB");
    console.log(error);
    }
}
