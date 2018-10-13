require('dotenv').config({ silent: true });

const Express           = require('express');
const Router            = Express.Router();
const youtubeSearch     = require('youtube-api-v3-search');

Router.get('/', (req, res) => {
    res.send("GET songs route is working")

})

Router.get('/suggest', (req, res) => {
    youtubeSearch(process.env.YOUTUBE_API_KEY,{q:"honey kehlani"})
    .then(videos => {
        // res.send(videos);
        res.render('queue/suggest',{videos});
    })
})

module.exports = Router;