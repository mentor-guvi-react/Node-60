const { mongoose } = require('./db');

const Schema = mongoose.Schema;

const RegistrationSchema = new Schema({
    username: { type: String, require: true },
    password: { type: String, require: true },
    address: { type: String, require: false },
    email: { type: String, require: true },
    phonenumber: { type: Number, require: true },
});


const BookingSchema = new Schema({
    selectedTime: { type: String, require: true },
    selectedSeats: { type: String, require: true },
    selectedDate: { type: String, require: true },
    hotelId: { type: String, require: true },
    username: { type: String, require: true },
    isCancelled: { type: Boolean, require: true },
})


const RegistrationModel = mongoose.model('register', RegistrationSchema);
const BookingModel = mongoose.model('booking', BookingSchema);


module.exports = {
    RegistrationModel,
    BookingModel
}
