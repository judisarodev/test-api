module.exports = app => {
  const dishes = require("../controllers/dish.controller.js");
  const router = require("express").Router();

  // Create a new Dish
  router.post("/", dishes.create);

  // Retrieve all Dishes
  router.get("/", dishes.findAll);

  // Retrieve a single Dish with id
  router.get("/:id", dishes.findOne);

  // Update a Dish with id
  router.put("/:id", dishes.update);

  // Delete a Dish with id
  router.delete("/:id", dishes.delete);

  // Delete all Dishes
  router.delete("/", dishes.deleteAll);

  router.post("/bulk", dishes.insertManyDishes);

  app.use("/api/dishes", router);
};
