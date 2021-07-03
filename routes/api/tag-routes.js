const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  console.log("/api/tags");
  // find all tags
  Tag.findAll({
    // Included its associated Product data
    // CHECK IF THIS NEEDS TO BE IN BRACKETS FOR ARRAY OR NOT ***
    include: [
      {
        // NEED TO CONFIRM THIS IS THE CORRECT TAG
        model: ProductTag
      }
    ]
  }).then(dbTag =>
    res.json(dbTag))
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  Tag.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        // NEED TO CONFIRM THIS IS THE CORRECT TAG
        // be sure to include its associated Product data
        model: ProductTag
      }
    ]
  }).then(dbTag => {
    if (!dbTag) {
      res.status(404).json({ message: "No product tag found with this ID" });
      return;
    }
    res.json(dbTag)
  })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    // NEED CORRECT TAGS .body to CREATE BELOW
    // .req.body HERE
  })
    .then(dbTag => res.json(dbTag))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  // NEED TO CHECK TO SEE IF req.body TAGS are CORRECT BELOW
  Tag.update(
    {
      product_tag: req.body.product_tag
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
    .then(dbTag => {
      if (!dbTag) {
        res.status(404).json({ message: "No tag found with this ID" });
        return;
      }
      res.json(dbTag);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(dbTag => {
    if (!dbTag) {
      res.status(404).json({ message: "No tag found with this ID" });
      return;
    }
    res.json(dbTag);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;