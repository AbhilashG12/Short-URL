const shortid = require('shortid');
const URL = require("../models/url")
async function generateUrl(req,res){

    const body = req.body;
    if(!body.url) return res.status(400).json({err:"URL is require"});
    const shortId = shortid();
    await URL.create({
        shortId:shortId,
        redirectUrl:body.url,
        visitHistory:[],
    })
    // return res.json({id:shortId});
    return res.render("home",{
        id:shortId,
    })

}


async function getAnalytics(req,res) {
    const shortId = req.params.shortId;
    const result = await URL.findOne({shortId})
    return res.json({totalClicks:result.visitHistory.length , analytics:result.visitHistory})
}



module.exports = {
    generateUrl,
    getAnalytics
}