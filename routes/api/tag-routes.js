const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// find all tags
router.get("/", (req, res) => {
  Tag.findAll({
    attributes: ["id", "tag_name"],
    include: [
      {
        model: Product,
        through: ProductTag,
        attributes: ["id", "product_name", "price", "stock"],
      },
    ],
  })
    .then((dbTagData) => res.json(dbTagData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// find a single tag by its `id`
router.get("/:id", (req, res) => {
  Tag.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "tag_name"],
    include: [
      {
        model: Product,
        through: ProductTag,
        attributes: ["id", "product_name", "price", "stock"],
      },
    ],
  })
    .then((dbTagData) => {
      if (!dbTagData) {
        res.status(404).json({ message: "unable to find tag" });
        return;
      }
      res.json(dbTagData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// create a new tag
router.post("/", (req, res) => {
  Tag.create(req.body)
    .then((dbTagData) => {
      if (!req.body.tag_name) {
        res.status(400).json({ message: "bad request" });
        return;
      }
      res.json(dbTagData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// update a tag's name by its `id` value
router.put("/:id", (req, res) => {
  Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((dbTagData) => {
      if (!req.body.tag_name) {
        res.status(400).json({ message: "bad request" });
        return;
      }

      if (!dbTagData) {
        res.status(404).json({ message: "unable to find tag to update" });
        return;
      }
      res.json(dbTagData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// delete on tag by its `id` value
router.delete("/:id", (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbTagData) => {
      if (!dbTagData) {
        res.status(404).json({ message: "tag not found" });
        return;
      }
      res.json(dbTagData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
