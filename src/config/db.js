import mongoose from 'mongoose';

const DBConnection = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/oicl');
        console.log('DataBase connected successfully');
    } catch (err) {
        console.log(err.message);
    }
}
export default DBConnection