const express = require("express");
const path = require("path");
const app = express();
const URL = require("./models/url");
const staticRoute = require("./routes/static");
const urlRouter = require("./routes/url");
const { connectDb } = require("./connection");

connectDb("mongodb://127.0.0.1:27017/short")
    .then(() => { console.log("Connected..!"); })
    .catch(() => { console.log("Connection Error.."); });

app.use(express.json());
app.use(express.urlencoded({extended:false}))

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use("/url", urlRouter);
app.use('/', staticRoute);

app.get("/:shortId", async (req, res) => {
    try {
        const shortId = req.params.shortId;
        const entry = await URL.findOneAndUpdate(
            { shortId },
            {
                $push: {
                    visitHistory: {
                        timestamp: Date.now(),
                    }
                }
            }
        );
        res.redirect(entry.redirectUrl);
    } catch (error) {
        console.error("Error during redirection:", error);
        res.status(500).json({ error: "An internal server error occurred" });
    }
});

app.listen(8000, () => { console.log("Server Started..."); });
