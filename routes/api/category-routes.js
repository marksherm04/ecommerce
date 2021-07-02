const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  console.log("/api/categories");
  // find all categories
  Category.findAll({
    // Included associated Products
    // CHECK IF THIS NEEDS TO BE IN BRACKETS FOR ARRAY OR NOT ***
    include: [
      {
        model: Product
      }
    ]
  }).then(dbCategory =>
    res.json(dbCategory))
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  Category.findOne({
    where: {
      id: req.params.id
    },
    // Included associated Products
    include: [
      {
        model: Product
      }
    ]
  }).then(dbCategory => {
    if (!dbCategory) {
      res.status(404).json({ message: "No category found with this ID" });
      return;
    }
    res.json(dbCategory);
  })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    // NEED TO REVIEW LINES BELOW FOR CATEGORY ITEMS ***
    category_id: req.body.category_id,
    category_name: req.body.category_name,
    products: req.body.products
  })
    .then(dbCategory => res.json(dbCategory))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(
    {
      // NEED TO REVIEW THIS LINE BELOW FOR UPDATED CATEGORY ***
      category_id: req.body.category_id
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
    .then(dbCategory => {
      if (!dbCategory) {
        res.status(404).json({ message: "No category found with this ID" });
        return;
      }
      res.json(dbCategory);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbCategory => {
      if (!dbCategory) {
        res.status(404).json({ message: "No category found with this ID" });
        return;
      }
      res.json(dbCategory);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;