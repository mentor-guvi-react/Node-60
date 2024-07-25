const express = require('express');
const app = express();



app.get('/health', (req, res) => {
    res.send("Server is Healthly")
});



app.listen(4001, () => {
    console.log('server started at 4001');
})