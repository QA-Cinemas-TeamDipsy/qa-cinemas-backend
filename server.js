const express = require('express');
const app = express();

// const bodyParser = require("body-parser");
const cors = require("cors");
// const stripe = require("./routes/Stripe");
// app.use(cors());
// app.use(express.json());

// app.use("/api/", stripe);

const db = require('./models/index');
db.mongoose.connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to the database!");
}).catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
})

app.use(express.json());
app.use(cors());
require("./routes/Cinema.route")(app);
require("./routes/Movie.route")(app);
require("./routes/User.route")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})