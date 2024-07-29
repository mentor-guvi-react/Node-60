const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const { connectDb } = require("./db");
const { RegistrationModel, BookingModel } = require("./Schema");

const app = express();

app.use(cors());
app.use(bodyParser.json());

connectDb();

app.get("/health", (req, res) => {
    res.send("Server is Healthly");
});


app.post("/registeruser", async (req, res) => {
    const { username, password, address, phonenumber, email } = req.body;
    try {
        const dbResponse = await RegistrationModel.create({
            username,
            password,
            address,
            phonenumber,
            email,
        });
        console.log(dbResponse, "dbResponse");
        if (dbResponse._id) {
            res.send(username);
        }
    } catch (error) {
        console.log(error);
        res.send("error");
    }
});

app.post("/validateuser", async (req, res) => {
    const { username, password } = req.body;
    try {
        const dbResponse = await RegistrationModel.findOne({
            username,
            password,
        });
        console.log(dbResponse, "dbResponse");
        if (dbResponse._id) {
            res.send(username);
        }
    } catch (error) {
        console.log(error);
        res.send("error");
    }
});

app.post("/createBooking", async (req, res) => {
    const { selectedTime, selectedSeats, selectedDate, hotelId, username } = req.body;
    try {
        const dbResponse = await BookingModel.create({
            selectedTime, selectedSeats, selectedDate, hotelId, username, isCancelled: false
        });
        console.log(dbResponse, ';dbResponse');
        if (dbResponse._id) {
            res.send('Booking Created success')
        }
    }
    catch (error) {
        console.log(error, 'error');
        res.send('Failed')
    }
});


app.post("/getBookedSlots", async (req, res) => {
    const { hotelId, selectedDate } = req.body;

    try {
        const dbResponse = await BookingModel.find({
            hotelId, selectedDate
        });

        if (dbResponse?.length) {
            const timeSlots = dbResponse.map(e => e.selectedTime)
            res.send(timeSlots)
        }
        else {
            res.send([])
        }
    }
    catch (error) {
        console.log(error, 'error');
        res.send('Failed')
    }
})


app.get("/mybooking/:username", async (req, res) => {
    const username = req.params.username;
    try {
        const dbResponse = await BookingModel.find({
            username
        })
        res.send(dbResponse)
    } catch (error) {
        res.send('failed')
    }
})

app.put('/cancelBooking', async (req, res) => {
    const { bookingId } = req.body;
    const condition = { _id: bookingId };
    const update = { isCancelled: true };

    try {
        const dbResponse = await BookingModel.findOneAndUpdate(condition, update)
        res.send(dbResponse)
    } catch (error) {
        console.log(error, 'errror');
        res.send('failed')
    }
});




app.listen(4001, () => {
    console.log("server started at 4001");
});
