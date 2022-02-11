import mongoose from 'mongoose';

const db = process.env.MONGO_DB;

async function connectDB() {
    try {
        if (mongoose.connections[0].readyState) {
            console.log('Conexão já estabelecida');
        } else {
            await mongoose.connect(db);
            console.log('Banco de Dados conectado');
        };
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    };
};

export default connectDB;