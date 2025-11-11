module.exports = mongoose => {
  const IngredientSchema = new mongoose.Schema(
    {
      id: String,
      name: String,
      quantity: Number,
      unit: String,
      price: Number,
      origin: String,
      brand: String
    },
    { _id: false }
  );

  const RecipeSchema = new mongoose.Schema(
    {
      steps: [String],
      prepTime: Number,
      cookTime: Number,
      difficulty: String
    },
    { _id: false }
  );

  const schema = mongoose.Schema(
    {
      _id: String,
      name: String,
      description: String,
      servings: Number,
      image: String,
      ingredients: [IngredientSchema],
      utensils: [String],
      recipe: RecipeSchema
    },
    { timestamps: true }
  );

  // Para personalizar el JSON de salida
  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Dish = mongoose.model("dish", schema);
  return Dish;
};
