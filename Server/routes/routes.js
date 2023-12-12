const express = require('express');

const router = express.Router()
const Model = require('../model/model');
module.exports = router;

router.use(express.json());


//Post Method --> This will post infomration to the MongoDB database
router.post('/post', async (req, res) => {
  const { name, email } = req.body;
  const data = new Model({
    name: req.body.name,
    email: req.body.email
  })

  try {

    const existingUser = await Model.findOne({ email });

    if (existingUser) {
      // Handle the case where the email already exists (e.g., return an error)
      return res.status(409).json({ message: 'Email already exists' });
    }

    const dataToSave = await data.save();
    res.status(200).json(dataToSave)
  }
  catch (error) {
    res.status(400).json({ message: error.message })
  }
})

//Get all Method
router.get('/getAll', (req, res) => {
  res.send('Get All API')
})

//Get by email Method (Retrieve information regarding a single person)
router.get('/getOne/:email', async (req, res) => {
  try {
    const data = await Model.findOne({ email: req.params.email });
    res.json(data)
  }
  catch (error) {
    res.status(500).json({ message: error.message })
  }
})

//Update by ID Method
//id = Specific id to each document/person
router.patch('/update/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };

    const result = await Model.findByIdAndUpdate(
      id, updatedData, options
    )

    res.send(result)
  }
  catch (error) {
    res.status(400).json({ message: error.message })
  }
})

//Delete by ID Method
router.delete('/delete/:id', (req, res) => {
  res.send('Delete by ID API')
})
//Send Data
