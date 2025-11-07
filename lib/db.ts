import mongoose from "mongoose";


let isConnected = false;

export default async function connectDB(){
    if(isConnected)return;

    try {
        await mongoose.connect(process.env.MONGODB as string , {dbName : "devdesk"});

        isConnected = true;
        console.log("DB Connected");
    }catch(error){
        console.log("Failed to connect DB : ", error);
    }
}