const mongoose=require("mongoose")


const connect = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI,{
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true,
        });
        console.log(`Mongo Db Connected:${conn.connection.host}`)
    } catch (error) {
        console.error(`Error:${error}`);
        process.exit();
    }
}

module.exports = connect