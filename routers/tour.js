const express = require('express')
const Tour = require('../models/tour')
const router = new express.Router()


/* Create */
router.post('/tours', (req, res) => {
    const tour = new Tour(req.body)
    tour.save().then(tour => {
        console.log("in then - save");
        res.status(201).send(tour)
    }).catch(e => {
        res.status(400).send(e)
    });
  
});

/* Read  */

router.get('/tours', (req, res) => {
    Tour.find().then(tours =>
        res.send(tours)
    ).catch(e => res.status(500).send())
})

/* Update */
router.put('/tours/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name','cost', 'duration', 'start_date','guide']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    Tour.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).then(tour => {
        if (!tour) {
            return res.status(404).send()
        }
        else {
            res.send(tour)
        }
    }).catch(e => res.status(400).send(e))
})

router.delete('/tours/:id/:pid', async (req, res) => {
    console.log(req)
        const tripId = req.params["id"];
        const siteId = req.params["pid"];
        if(siteId == null|| tripId == null) return res.status(400).send('id or site name is missing!');
        Tour.updateOne({_id:tripId},  { $pull: {path: {_id: siteId} }}, { new: true, runValidators: false }).then(tour => {//disabled runValidators
            if (!tour) {
                return res.status(404).send()
            }
            else {
                tour.n == 0 ? res.send("ID does not exist"):
                res.send(tour)
            }
        }).catch(e => res.status(400).send(e))
    })
    
    
    router.delete('/tours/:id', async (req, res) => {
        console.log(req)
            const tripId = req.params["id"];
            if(tripId == null) return res.status(400).send('id is missing!');
            Tour.remove({_id:tripId}).then(tour => {
                if (!tour) {
                    return res.status(404).send()
                }
                else {
                    tour.n == 0 ? res.send("ID does not exist"):
                    res.send(tour)
                }
            }).catch(e => res.status(400).send(e))
        })

module.exports = router