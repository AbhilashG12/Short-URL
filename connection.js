const mongoose = require("mongoose");
mongoose.set("strictQuery",true);
async function connectDb(url) {
    return  mongoose.connect(url);

}

module.exports =  {
    connectDb,
};
