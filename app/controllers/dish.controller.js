const db = require("../models");
const Dish = db.dishes;

// Insert many dishes at once
exports.insertManyDishes = async (req, res) => {
  try {

    await Dish.deleteMany({});

    // Insertar todos los platos
    const result = await Dish.insertMany(dishesitos);

    res.status(201).send({
      message: `${result.length} dishes inserted successfully!`,
      data: result
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      message: err.message || "An error occurred while inserting multiple dishes."
    });
  }
};


// Create and Save a new Dish
exports.create = (req, res) => {
    if (!req.body.name || !req.body.id) {
        res.status(400).send({ message: "Content can not be empty! 'id' and 'name' are required." });
        return;
    }

    const dish = new Dish({
        id: req.body.id, // usamos la columna personalizada
        name: req.body.name,
        description: req.body.description,
        servings: req.body.servings,
        image: req.body.image,
        ingredients: req.body.ingredients,
        utensils: req.body.utensils,
        recipe: req.body.recipe
    });

    dish
        .save()
        .then(data => res.send(data))
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Dish."
            });
        });
};

// Retrieve all Dishes from the database
exports.findAll = (req, res) => {
    const name = req.query.name;
    const condition = name
        ? { name: { $regex: new RegExp(name), $options: "i" } }
        : {};

    Dish.find(condition)
        .then(data => res.send(data))
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving dishes."
            });
        });
};

// Find a single Dish with the custom id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Dish.findOne({ name: id }) // 👈 usamos findOne con el campo "id"
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Not found Dish with id ${id}` });
            } else {
                res.send(data);
            }
        })
        .catch(err => {
            res.status(500).send({ message: `Error retrieving Dish with id=${id}` });
        });
};

// Update a Dish by the custom id
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({ message: "Data to update can not be empty!" });
    }

    const id = req.params.id;
    console.log(id)
    Dish.findOneAndUpdate({ name: id }, req.body, { new: true }) // 👈 usamos findOneAndUpdate
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Cannot update Dish with id=${id}. Dish not found.` });
            } else {
                res.send({ message: "Dish was updated successfully."+ id, data });
            }
        })
        .catch(err => {
            res.status(500).send({ message: `Error updating Dish with id=${id}` });
        });
};

// Delete a Dish with the custom id
exports.delete = (req, res) => {
    const id = req.params.id;

    Dish.findOneAndDelete({ id: id }) // 👈 usamos findOneAndDelete
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Dish with id=${id}. Maybe Dish was not found!`
                });
            } else {
                res.send({ message: "Dish was deleted successfully!" });
            }
        })
        .catch(err => {
            res.status(500).send({ message: `Could not delete Dish with id=${id}` });
        });
};

// Delete all Dishes from the database
exports.deleteAll = (req, res) => {
    Dish.deleteMany({})
        .then(data => {
            res.send({ message: `${data.deletedCount} Dishes were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all dishes."
            });
        });
};

const dishesitos = [
        {
            "name": "Pasta a la Carbonara",
            "description": "Clásica receta italiana con huevo, queso y panceta",
            "servings": 4,
            "image": "https://www.recetassinlactosa.com/wp-content/uploads/2015/06/Espaguetis-Carbonara-1.jpg",
            "ingredients": [
                {
                    "id": "pasta-400",
                    "name": "Pasta Spaghetti",
                    "quantity": 400,
                    "unit": "g",
                    "price": 1.5,
                    "origin": "Italia",
                    "brand": "De Cecco"
                },
                {
                    "id": "huevos-4",
                    "name": "Huevos",
                    "quantity": 4,
                    "unit": "unidades",
                    "price": 0.8,
                    "origin": "España",
                    "brand": "Campero"
                },
                {
                    "id": "queso-200",
                    "name": "Queso Parmesano",
                    "quantity": 200,
                    "unit": "g",
                    "price": 4.5,
                    "origin": "Italia",
                    "brand": "Parmigiano Reggiano"
                },
                {
                    "id": "panceta-150",
                    "name": "Panceta",
                    "quantity": 150,
                    "unit": "g",
                    "price": 3.2,
                    "origin": "España",
                    "brand": "Jamón Select"
                },
                {
                    "id": "pimienta",
                    "name": "Pimienta negra",
                    "quantity": 50,
                    "unit": "g",
                    "price": 0.95,
                    "origin": "Vietnam",
                    "brand": "McCormick"
                }
            ],
            "utensils": ["Olla grande", "Sartén", "Colador", "Cucharón", "Tenedor"],
            "recipe": {
                "steps": [
                    "Calienta agua en una olla grande y hierve la pasta según las instrucciones del empaque.",
                    "Mientras hierve la pasta, calienta la sartén a fuego medio y fríe la panceta hasta que esté crujiente.",
                    "En un tazón, bate los huevos con el queso parmesano rallado y pimienta negra.",
                    "Cuando la pasta esté al dente, reserva 1 taza de agua de cocción y escúrrela.",
                    "Agrega la pasta caliente a la sartén con la panceta.",
                    "Retira del fuego y vierte la mezcla de huevo, revolviendo constantemente para crear una salsa cremosa.",
                    "Si es necesario, agrega un poco de agua de cocción para lograr la consistencia deseada.",
                    "Sirve inmediatamente."
                ],
                "prepTime": 10,
                "cookTime": 20,
                "difficulty": "Fácil"
            }
        },
        {
            "name": "Pollo al Horno",
            "description": "Pollo jugoso con hierbas aromáticas y limón",
            "servings": 4,
            "image": "https://i.ytimg.com/vi/pGqUX5ROVKo/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBfDVGJ4MfowSs2EAkB6hkAauDZ0A",
            "ingredients": [
                { "id": "pollo-1500", "name": "Pollo", "quantity": 1500, "unit": "g", "price": 6.8, "origin": "España", "brand": "Pollo Selecto" },
                { "id": "ajo-6", "name": "Dientes de ajo", "quantity": 6, "unit": "unidades", "price": 0.4, "origin": "España", "brand": "Ajo fresco" },
                { "id": "limon-2", "name": "Limones", "quantity": 2, "unit": "unidades", "price": 0.6, "origin": "España", "brand": "Limón de Valencia" },
                { "id": "aceite-olive-100", "name": "Aceite de oliva", "quantity": 100, "unit": "ml", "price": 2.5, "origin": "España", "brand": "Hojiblanca" },
                { "id": "romero", "name": "Romero fresco", "quantity": 20, "unit": "g", "price": 0.75, "origin": "España", "brand": "Fresco local" },
                { "id": "sal", "name": "Sal marina", "quantity": 50, "unit": "g", "price": 0.5, "origin": "España", "brand": "Sal de Ibiza" }
            ],
            "utensils": ["Bandeja de horno", "Cuchillo de cocina", "Tabla de corte", "Pincel de cocina"],
            "recipe": {
                "steps": [
                    "Precalienta el horno a 200°C.",
                    "Lava bien el pollo y sécalo con papel absorbente.",
                    "Pica el ajo finamente y mezcla con aceite de oliva, sal y romero fresco.",
                    "Frotar el pollo por dentro y por fuera con la mezcla de aceite.",
                    "Coloca el pollo en la bandeja de horno con los limones dentro.",
                    "Hornea durante 1 hora y 30 minutos, regando ocasionalmente con los jugos.",
                    "El pollo está listo cuando alcanza una temperatura interna de 75°C.",
                    "Deja reposar 10 minutos antes de servir."
                ],
                "prepTime": 20,
                "cookTime": 90,
                "difficulty": "Fácil"
            }
        },
        {
            "name": "Ensalada Mediterránea",
            "description": "Fresca combinación de vegetales con tomate y aceitunas",
            "servings": 2,
            "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQaKsQMM3r0BDu25C-jv0JRNQXeAA92U4h1w&s",
            "ingredients": [
                { "id": "tomates-400", "name": "Tomates", "quantity": 400, "unit": "g", "price": 1.8, "origin": "España", "brand": "Tomate local" },
                { "id": "lechuga-200", "name": "Lechuga", "quantity": 200, "unit": "g", "price": 0.9, "origin": "España", "brand": "Lechuga fresca" },
                { "id": "cebollas-1", "name": "Cebolla morada", "quantity": 1, "unit": "unidad", "price": 0.5, "origin": "España", "brand": "Cebolla local" },
                { "id": "aceitunas-150", "name": "Aceitunas negras", "quantity": 150, "unit": "g", "price": 1.95, "origin": "España", "brand": "Aceituna Arbequina" },
                { "id": "queso-feta-150", "name": "Queso Feta", "quantity": 150, "unit": "g", "price": 3.4, "origin": "Grecia", "brand": "Feta Tradicional" }
            ],
            "utensils": ["Ensaladera", "Cuchillo", "Tabla de corte", "Cucharas de ensalada"],
            "recipe": {
                "steps": [
                    "Lava la lechuga y sécala bien.",
                    "Corta los tomates en cuartos.",
                    "Pica la cebolla morada en aros finos.",
                    "Coloca todos los vegetales en la ensaladera.",
                    "Agrega las aceitunas negras.",
                    "Corta el queso feta en cubos pequeños.",
                    "En un bol pequeño, mezcla aceite de oliva con vinagre balsámico, sal y pimienta.",
                    "Vierte el aliño sobre la ensalada justo antes de servir y mezcla bien."
                ],
                "prepTime": 15,
                "cookTime": 0,
                "difficulty": "Fácil"
            }
        },
        {
            "name": "Tacos al Pastor",
            "description": "Deliciosos tacos con carne marinada y piña",
            "servings": 4,
            "image": "https://www.seriouseats.com/thmb/4kbwN13BlZnZ3EywrtG2AzCKuYs=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/20210712-tacos-al-pastor-melissa-hom-seriouseats-37-f72cdd02c9574bceb1eef1c8a23b76ed.jpg",
            "ingredients": [
                { "id": "carne-res-800", "name": "Carne de res", "quantity": 800, "unit": "g", "price": 9.5, "origin": "España", "brand": "Vacuno Premium" },
                { "id": "tortillas-12", "name": "Tortillas de maíz", "quantity": 12, "unit": "unidades", "price": 2.1, "origin": "México", "brand": "Tortilla Fresh" },
                { "id": "pina-400", "name": "Piña", "quantity": 400, "unit": "g", "price": 2.8, "origin": "Costa Rica", "brand": "Piña natural" },
                { "id": "cebolla-2", "name": "Cebollas", "quantity": 2, "unit": "unidades", "price": 1.0, "origin": "España", "brand": "Cebolla local" },
                { "id": "cilantro-50", "name": "Cilantro fresco", "quantity": 50, "unit": "g", "price": 0.85, "origin": "España", "brand": "Cilantro fresco" },
                { "id": "limon-1", "name": "Limón", "quantity": 1, "unit": "unidad", "price": 0.3, "origin": "España", "brand": "Limón de Valencia" }
            ],
            "utensils": ["Sartén grande", "Tabla de corte", "Cuchillo", "Pinzas", "Tazón para marinade"],
            "recipe": {
                "steps": [
                    "Mezcla los chiles, vinagre, piña, ajo y especias en un bol.",
                    "Marina la carne de res en esta mezcla durante al menos 2 horas.",
                    "Calienta la sartén a fuego medio-alto.",
                    "Cocina la carne marinada en la sartén hasta que esté bien cocida, aproximadamente 15 minutos.",
                    "Corta la cebolla y el cilantro finamente.",
                    "Calienta las tortillas en la sartén durante 30 segundos por lado.",
                    "Coloca la carne en las tortillas calientes.",
                    "Agrega cebolla, cilantro, piña y un squeeze de limón fresco."
                ],
                "prepTime": 30,
                "cookTime": 25,
                "difficulty": "Medio"
            }
        },
        {
            "name": "Sopa de Verduras",
            "description": "Nutritiva y reconfortante sopa casera",
            "servings": 6,
            "image": "https://cocinaconcoqui.com/wp-content/uploads/2023/01/sopa-de-pollo-y-verduras.jpg",
            "ingredients": [
                { "id": "zanahoria-300", "name": "Zanahorias", "quantity": 300, "unit": "g", "price": 1.2, "origin": "España", "brand": "Zanahoria local" },
                { "id": "papa-400", "name": "Papas", "quantity": 400, "unit": "g", "price": 1.6, "origin": "España", "brand": "Papa blanca" },
                { "id": "cebolla-2-", "name": "Cebollas", "quantity": 2, "unit": "unidades", "price": 1.0, "origin": "España", "brand": "Cebolla local" },
                { "id": "puerro-2", "name": "Puerros", "quantity": 2, "unit": "unidades", "price": 1.8, "origin": "España", "brand": "Puerro fresco" },
                { "id": "caldo-veg-2000", "name": "Caldo de verdura", "quantity": 2000, "unit": "ml", "price": 2.5, "origin": "España", "brand": "Caldo Casero" },
                { "id": "sal-pimienta", "name": "Sal y pimienta", "quantity": 50, "unit": "g", "price": 0.8, "origin": "Varios", "brand": "Condimentos" }
            ],
            "utensils": ["Olla grande", "Cucharón", "Cuchillo", "Tabla de corte", "Colador"],
            "recipe": {
                "steps": [
                    "Pela y corta las zanahorias, papas y puerros en cubos pequeños.",
                    "Pica la cebolla finamente.",
                    "En una olla grande, calienta un poco de aceite a fuego medio.",
                    "Sofríe la cebolla y los puerros durante 5 minutos hasta que estén suaves.",
                    "Agrega las zanahorias y papas, remueve bien.",
                    "Vierte el caldo de verdura y lleva a ebullición.",
                    "Reduce el fuego y cocina a fuego lento durante 30 minutos.",
                    "Sazona con sal y pimienta al gusto. Sirve caliente."
                ],
                "prepTime": 20,
                "cookTime": 35,
                "difficulty": "Fácil"
            }
        },
        {
            "name": "Brownies Caseros",
            "description": "Brownies de chocolate oscuro y delicioso",
            "servings": 12,
            "image": "https://i.blogs.es/22b5c5/brownie/1200_900.jpg",
            "ingredients": [
                { "id": "chocolate-200", "name": "Chocolate oscuro", "quantity": 200, "unit": "g", "price": 3.8, "origin": "Ecuador", "brand": "Lindt Excellence" },
                { "id": "mantequilla-100", "name": "Mantequilla", "quantity": 100, "unit": "g", "price": 1.5, "origin": "Francia", "brand": "Mantequilla bretona" },
                { "id": "huevos-3", "name": "Huevos", "quantity": 3, "unit": "unidades", "price": 0.6, "origin": "España", "brand": "Campero" },
                { "id": "azucar-200", "name": "Azúcar", "quantity": 200, "unit": "g", "price": 0.7, "origin": "España", "brand": "Azúcar blanca" },
                { "id": "harina-100", "name": "Harina", "quantity": 100, "unit": "g", "price": 0.5, "origin": "España", "brand": "Harina de trigo" },
                { "id": "cacao-30", "name": "Cacao en polvo", "quantity": 30, "unit": "g", "price": 1.2, "origin": "Ghana", "brand": "Cacao puro" }
            ],
            "utensils": ["Molde de horno", "Tazones", "Batidora", "Espátula", "Tamizador"],
            "recipe": {
                "steps": [
                    "Precalienta el horno a 180°C.",
                    "Derrite el chocolate oscuro con la mantequilla en baño maría.",
                    "En un tazón, bate los huevos con el azúcar hasta que esté pálido.",
                    "Agrega el chocolate derretido a la mezcla de huevos.",
                    "Tamiza la harina y el cacao en polvo juntos.",
                    "Dobla suavemente la mezcla de harina en la mezcla de chocolate.",
                    "Vierte la masa en el molde engrasado.",
                    "Hornea durante 25-30 minutos hasta que un palillo inserido salga con algunas migas.",
                    "Deja enfriar completamente antes de cortar en cuadrados."
                ],
                "prepTime": 15,
                "cookTime": 30,
                "difficulty": "Medio"
            }
        }
    ];