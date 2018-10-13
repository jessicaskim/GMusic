require('dotenv').config({ silent: true });

const Express           = require('express');
const Router            = Express.Router();
const youtubeSearch     = require('youtube-api-v3-search');

Router.get('/', (req, res) => {
    // res.send("GET songs route is working")
    youtubeSearch(process.env.YOUTUBE_API_KEY,{q:"honey kehlani"})
        .then(data => {
            res.send(data);
        })
})

Router.get('/suggest', (req, res) => {
    res.render('queue/suggest');
})

module.exports = Router;