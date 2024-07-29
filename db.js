const mongoose = require('mongoose');


const dburl = process.env.NODE_ENV_DB_URL;

const connectDb = async () => {

    if (mongoose.connection.readyState === 1) {
        console.log(' MongoDb instance already connected ');
        return
    }

    await mongoose.connect(dburl);
    console.log(mongoose.connection.readyState, ' Connection State');
}



module.exports = {
    connectDb,
    mongoose
}

