const router = require("express").Router();
let Inventory = require("../models/Inventory");

router.route("/add").post((req, res) => {
    const batchId = req.body.batchId;
    const collectionDate = new Date(req.body.collectionDate);
    const sourceLocation = req.body.sourceLocation;
    const totalWeight = Number(req.body.totalWeight);
    const wasteType = req.body.wasteType;
    const qualityGrade = req.body.qualityGrade; // Fixed typo
    const processingStatus = req.body.processingStatus;
    const processingMethod = req.body.processingMethod;
    const notes = req.body.notes; // Changed to lowercase

    const newInventory = new Inventory({
        batchId,
        collectionDate,
        sourceLocation,
        totalWeight,
        wasteType,
        qualityGrade, // Fixed typo
        processingStatus,
        processingMethod,
        notes // Changed to lowercase
    });

    newInventory.save()
        .then(() => res.json({ message: "Inventory Added" }))
        .catch((err) => res.status(500).json({ error: err.message }));
});

router.route("/").get((req, res) => {
    Inventory.find()
        .then((inventories) => res.json(inventories))
        .catch((err) => res.status(500).json({ error: err.message }));
});

router.route("/update/:id").put(async(req,res) => {
    let userId = req.params.id;
    const{batchId,collectionDate,sourceLocation,totalWeight,wasteType,qualityGrade,processingStatus,processingMethod,notes} = req.body;

    const updateInventory = {
        batchId,
        collectionDate,
        sourceLocation,
        totalWeight,
        wasteType,
        qualityGrade,
        processingStatus,
        processingMethod,
        notes
    }

    const update = await Inventory.findByIdAndUpdate(userId,updateInventory)
    .then(() => {
        res.status(200).send({status:"user updated"})
    }).catch((err) =>{
        console.log(err);
        res.status(500).send({status:"Error with updating data",error:err.message});
    })
})

router.route("/delete/:id").delete(async(req,res) =>{
    let userId = req.params.id;

    await Inventory.findByIdAndDelete(userId)
    .then(() => {
        res.status(200).send({status:"user deleted",});

    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status:"Error with delete user",error:err.message});

    })
})
router.route("/get/:id").get(async(req,res) =>{
    let userId = req.params.id;
    const user = await Inventory.findById(userId)
    .then((inventory) => {
        res.status(200).send({status:"user fetched",inventory});

    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status:"Error with get user",error:err.message});

    })
})

module.exports = router;
