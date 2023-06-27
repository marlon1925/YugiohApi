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

const renderEditProfileForm =async(req,res)=>{
  const user = await User.findById(req.params.id).lean()
  res.render('portafolio/editPerfile',{user})
}
    


const updatePortafolio = async (req, res) => {
    const { title } = req.body;
    const cartaData = await consultarCartaName(title);
    await Portfolio.findByIdAndUpdate(req.params.id, cartaData);
    res.redirect("/portafolios");
  };

  const updateProfile = async(req,res)=>{
    // Cargar la informacion del portafolio
    // VERIFICAR EL id DEL PORTAFOLIO SEA EL MISMO
    const user = await User.findById(req.params.id).lean()
    // SI ES TRUE CONTINUAR CON LA EDICION Y SI ES FALSE ENVIAR A LA RUTA PORTAFOLIOS
    
    // if(!(portfolio._id != req.params.id) return res.redirect('/portafolios')
    if(user._id != req.params.id) return res.redirect('/portafolio/perfile')

    if(req.files?.image) 
    {
        // VAMOAS A REALIZAR LA ACTUALIZACION DE LA IMAGEN
        // VALIDAR QUE VNEGA UNA IMAGEN EN EL FORMULARIO
        if(!(req.files?.image)) return res.send("Se requiere una imagen")
        // ELIMINAR LA IMAGEN EN CLOUDINARY
        await deleteImage(portfolio.image.public_id)
        // CARGAR LA NUEVA IMAGEN
        const imageUpload = await uploadImage(req.files.image.tempFilePath)
        // CONSTRUIR LA DATA PARA ACTUALIZAR EN BDD
        const data ={
            image : {
            public_id:imageUpload.public_id,
            secure_url:imageUpload.secure_url
            }
        }
        // ELIMINA LA IMAGEN TEMPORAL
        await fs.unlink(req.files.image.tempFilePath)
        // Actualiza en BDD findByIdAndUpdate
        await Portfolio.findByIdAndUpdate(req.params.id,data)
    }
    else{

    }
    res.redirect('/portafolio/perfile')
}
  


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
    renderPerfileForm,
    renderEditProfileForm,
    updateProfile
    
}