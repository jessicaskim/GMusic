require('dotenv').config({ silent: true });

const Express           = require('express');
const Router            = Express.Router();
const youtubeSearch     = require('youtube-api-v3-search');
const db                = require('../models');
const isLoggedIn        = require('../middleware/isLoggedIn');

Router.get('/', (req, res) => {
    db.songs.findAll({
        include: db.votes,
        logging:false
    })
    .then(songs => {
        res.render('queue/index', {songs});
        // res.json(songs);
    })
    // res.render('queue/index');
})
//http://localhost:3000/queue/suggest?songSearch=

Router.get('/suggest', (req, res) => {
    youtubeSearch(process.env.YOUTUBE_API_KEY,{
        q: "glass animals"
    })
    .then(videos => {
        // res.send(videos);
        res.render('queue/suggest',{videos});
    })
})

Router.get('/suggest/:song', (req, res) => {
    youtubeSearch(process.env.YOUTUBE_API_KEY,{
        q: req.params.song
    })
    .then(videos => {
        // res.send(videos);
        res.render('queue/suggest',{videos});
    })
})

Router.post('/', (req, res) => {
    db.songs.create(req.body,{logging:false})
        .then(suggestion => {
            res.redirect('/queue')
        })
        .catch(err => res.json(err))
})

module.exports = Router;