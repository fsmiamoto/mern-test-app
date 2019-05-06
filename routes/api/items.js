const express = require("express");
const router = express.Router();

// Item Model
const Item = require("../../models/Item");

// @route GET api/items
// @desc Get All Items
// @access Public
router.get("/", async (req, res) => {
    const items = await Item.find().sort({ date: -1 });
    res.status(200).json(items);
});

// @route POST api/items
// @desc Create a new item
// @access Public
router.post("/", async (req, res) => {
    const newItem = new Item({
        name: req.body.name
    });

    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
});

// @route DELETE api/items
// @desc  Delete a item
// @access Public
router.delete("/:id", async (req, res) => {
    Item.findById(req.params.id)
        .then(item => item.remove().then(() => res.json({ sucess: true })))
        .catch(err => res.status(404).json({ sucess: false }));
});

module.exports = router;
