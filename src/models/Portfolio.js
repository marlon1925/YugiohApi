const { Schema, model } = require("mongoose");

const portfolioSchema = new Schema(
  {
    title: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

//Creamos la coleccion
module.exports = model("portfolio", portfolioSchema);
