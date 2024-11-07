const Track = require('../models/track.js')
const express = require('express')
const router = express.Router()

// CREATE - POST - /track
router.post('/', async (req, res) => {
    // Add a message to test the route
    try {
        //create a new track
        const createTrack = await Track.create(req.body)
        res.status(201).json(createTrack)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
  })


// READ - GET - /tracks
router.get('/', async (req, res) => {
    try {
      const foundTracks = await Track.find();
      res.status(200).json(foundTracks);
    } catch (error) {
      res.status(500).json({ error: error.message }); // 500 Internal Server Error
    }
  });
  

// READ - GET - /track/:trackId
router.get('/:trackId', async (req, res) => {
    try {
      const foundTrack = await Track.findById(req.params.trackId);
      if (!foundTrack) {
        res.status(404);
        throw new Error('Track not found.');
      }
      res.status(200).json(foundTrack);
    } catch (error) {
      if (res.statusCode === 404) {
        res.json({ error: error.message });
      } else {
        // Add else statement to handle all other errors
        res.status(500).json({ error: error.message });
      }
    }
  });
  

  //Delete - Delete = /tracks/:trackId
  router.delete('/:trackId', async (req, res) => {
    try {
      const deleteTrack = await Track.findByIdAndDelete(req.params.trackId)
     

      if(!deleteTrack) {
        res.send(404)
        throw new Error(`Track not found`)
      } 

      res.status(200).json(`${deleteTrack.name} was deleted`);
    } catch (error) {
      res.status(500).json({ error: error.message }); // 500 Internal Server Error
    }
  });
  

// UPDATE - PUT - /tracks/:trackId
router.put('/:trackId', async (req, res) => {
  try {
    const updatedTrack = await Track.findByIdAndUpdate(req.params.trackId, req.body, {
      new: true,
    });
    if (!updatedTrack) {
      res.status(404);
      throw new Error('Track not found.');
    }
    res.status(200).json(updatedTrack);
  } catch (error) {
    // Add code for errors
    if (res.statusCode === 404) {
      res.json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});


module.exports = router