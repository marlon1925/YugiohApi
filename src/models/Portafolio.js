const { Schema, model } = require("mongoose");

const portfolioSchema = new Schema(
  {
    title: {
      type: String,
      require: true,
    },
    desc: {
      type: String,
      require: true,
    },
    img: {
      type: String,
      require: true,
    },
    user: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

//Creamos la coleccion
module.exports = model("portfolio", portfolioSchema);
