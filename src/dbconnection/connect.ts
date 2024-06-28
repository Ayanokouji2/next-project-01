import mongoose from 'mongoose';

const MONGO_URI: string = process.env.MONG_URI!
const connectDB = async (): Promise<void> => {
    try {
        mongoose.connect(`${MONGO_URI}/local`)
        const connection = mongoose.connection;
        connection.on('connected', () => {
            console.log(`Connected to database ${mongoose.connection.name}`);
        })

        connection.on('error', (error: Error) => {
            console.log(`Error connecting to database : ${error.message}`);
            process.exit(1);
        })
    } catch (error: unknown) {
        throw new Error(`Error connecting to database : $${(error as Error).message}`);
    }
}

export default connectDB;