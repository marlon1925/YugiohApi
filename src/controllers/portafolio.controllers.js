const Portfolio = require('../models/Portfolio')


const renderAllPortafolios = async(req,res)=>{
    const portfolios = await Portfolio.find().lean()
    res.render("portafolio/allPortfolios",{portfolios})
}

const renderPortafolio = (req,res)=>{
    res.send('Mostrar el detalle de un portafolio')
}
const renderPortafolioForm = (req,res)=>{
    res.render('portafolio/newFormPortafolio')
}

const createNewPortafolio =async (req,res)=>{
    const {title, category,description} = req.body
    const newPortfolio = new Portfolio({title,category,description})
    newPortfolio.user = req.user._id
    await newPortfolio.save()
    res.redirect('/portafolios')
}

const renderEditPortafolioForm =async(req,res)=>{
    //a partir del modelo llamara al método findById
    const portfolio = await Portfolio.findById(req.params.id).lean()
    //Con la variable portafolio pintar en la vista del formulario
    res.render('portafolio/editPortfolio',{portfolio})
}

const updatePortafolio = async(req,res)=>{
    // Capturamos los datos del formulario
    const {title,category,description}= req.body
    // A partir del modelo llamar al método gindByIdAndUpdate 
    //Pasando a la funcion el id del portafolio y los datos a modificar
    await Portfolio.findByIdAndUpdate(req.params.id,{title,category,description})
    //Redirect
    res.redirect('/portafolios')
}
const deletePortafolio = async(req,res)=>{
    await Portfolio.findByIdAndDelete(req.params.id)
    res.redirect('/portafolios')
}


module.exports ={
    renderAllPortafolios,
    renderPortafolio,
    renderPortafolioForm,
    createNewPortafolio,
    renderEditPortafolioForm,
    updatePortafolio,
    deletePortafolio
}