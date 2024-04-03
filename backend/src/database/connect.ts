import { connect, disconnect } from "mongoose";

async function connectToDatabase() {
    try {
        await connect(process.env.MONGODB_URL);
    } catch (err) {
        console.log(err);
        console.log('Could not connect to DB')
    }

}

async function disconnectToDatabase() {
    try {
        await disconnect();
    } catch (err) {
        console.log(err);
        console.log('Could not connect to DB')
    }
}

export { connectToDatabase, disconnectToDatabase };