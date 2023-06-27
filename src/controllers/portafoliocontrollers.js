// Hacer la importacion del modelo
const Portfolio = require('../models/Portafolio')
const axios = require("axios");
const User = require('../models/User')
const { uploadImage, deleteImage } = require("../config/clodinary");
const fs = require("fs-extra");




const renderAllPortafolios = async(req,res)=>{
    const portfolios = await Portfolio.find({user:req.user._id}).lean()
    res.render("portafolio/allPortfolios",{portfolios})
}


const renderPortafolio = (req,res)=>{
    res.send('Mostrar el detalle de un portafolio')
}
const renderPortafolioForm = (req,res)=>{
    res.render('portafolio/newFormPortafolio')
}
const renderPerfileForm = (req,res)=>{
    res.render('portafolio/perfileForm')
}

// Captura los daots del formulario para almacenar en la BBD
const consultarCartaName = async (name) => {
    console.log("=======", name);
    try {
      const response = await axios.get(
        `https://db.ygoprodeck.com/api/v7/cardinfo.php?name=${name}`
      );
      if (!response.status === 200) {
        throw new Error("Ocurrió un error al realizar la petición");
      }
      const data = response.data;
      console.log("LLEGA")
      const title = data.data[0].name;
      console.log("LLEGA")
      const desc = data.data[0].desc;
      console.log("LLEGA")
      const img = data.data[0].card_images[0].image_url;
      console.log("LLEGA")
  
      // Aquí se retorna el objeto con los datos obtenidos
      return { title, desc, img };

    } catch (error) {
      console.log(error);
      // Muestra la alerta con el mensaje de error
      throw error; // Vuelve a lanzar el error para que sea capturado por la función de llamada
    }
  };
  
  const createNewPortafolio = async (req, res) => {
    const { title } = req.body;
    const cartaData = await consultarCartaName(title);
    // Se obtienen los valores retornados por la función consultarCartaName
    const newPortfolio = new Portfolio(cartaData);
    newPortfolio.user = req.user._id;
    await newPortfolio.save();
    res.redirect("/portafolios");
  };


const renderEditPortafolioForm =async(req,res)=>{
    const portfolio = await Portfolio.findById(req.params.id).lean()
    res.render('portafolio/editPortfolio',{portfolio})
}


    


const updatePortafolio = async (req, res) => {
    const { title } = req.body;
    const cartaData = await consultarCartaName(title);
    await Portfolio.findByIdAndUpdate(req.params.id, cartaData);
    res.redirect("/portafolios");
  };


  


const deletePortafolio = async(req,res)=>{
    // A PATIR DEL MODELO USAR EL METODO findByIdAndDelete
    portafolio = await Portfolio.findByIdAndDelete(req.params.id)
    // INVOCAR AL METODO Y PASAR EL ID
    res.redirect('/portafolios')
}



module.exports ={
    renderAllPortafolios,
    renderPortafolio,
    renderPortafolioForm,
    createNewPortafolio,
    renderEditPortafolioForm,
    updatePortafolio,
    deletePortafolio,
    renderPerfileForm
    
}