const express = require('express')
const Guide = require('../models/guide')
const router = new express.Router()


router.post('/guides', (req, res) => {
    const guide = new Guide(req.body);
    guide.save().then(guide=>
        res.status(201).send(guide)
    ).catch(e=>res.status(400).send(e))
})

router.get('/guides', (req, res) => {
    Guide.find().populate('guide').then(guides => res.send(guides)
    ).catch (e=> res.status(500).send())
})

/* Update */
router.put('/guides/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name','email', 'phone']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    Tour.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).then(guide => {
        if (!guide) {
            return res.status(404).send()
        }
        else {
            res.send(guide)
        }
    }).catch(e => res.status(400).send(e))
})


module.exports = router