import mongoose from "mongoose"


const db = () => {
    try {
        mongoose.connect("mongodb+srv://utkuaksy99:123@cluster0.vc0z0td.mongodb.net/?retryWrites=true&w=majority")
        console.log("database connected");
    } catch (error) {
        console.log("database connection failed");
    }


}

export default db