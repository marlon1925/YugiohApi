const Portfolio = require("../models/Portfolio");

const renderAllPortafolios = async (req, res) => {
  const portfolios = await Portfolio.find().lean();
  res.render("portafolio/allPortfolios", { portfolios });
};

const renderPortafolio = (req, res) => {
  res.send("Mostrar el detalle de un portafolio");
};
const renderPortafolioForm = (req, res) => {
  res.render("portafolio/newFormPortafolio");
};
const consultarCartaName = async (name) => {
  console.log("=======", name);
  try {
    const response = await fetch(
      `https://db.ygoprodeck.com/api/v7/cardinfo.php?name=${name}`
    );
    if (!response.ok) {
      throw new Error("Ocurrió un error al realizar la petición");
    }
    const data = await response.json();
    const title = data.data[0].name;
    const desc = data.data[0].desc;
    const img = data.data[0].card_images[0].image_url;

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
  console.log(title);

  try {
    const cartaData = await consultarCartaName(title);

    // Se obtienen los valores retornados por la función consultarCartaName
    const newPortfolio = new Portfolio(cartaData);
    newPortfolio.user = req.user._id;
    await newPortfolio.save();

    res.redirect("/portafolios");
  } catch (error) {
    console.log(error);
    // Manejo del error en caso de que ocurra durante la consulta o el guardado
    res.status(500).json({ error: "Ocurrió un error al crear el portafolio" });
  }
};

const renderEditPortafolioForm = async (req, res) => {
  //a partir del modelo llamara al método findById
  const portfolios = await Portfolio.find({ user: req.user._id }).lean(); //Con la variable portafolio pintar en la vista del formulario
  res.render("portafolio/editPortfolio", { portfolio });
};

const updatePortafolio = async (req, res) => {
  const portfolio = await Portfolio.findById(req.params.id).lean();
  if (portfolio.user.toString() !== req.user._id.toString())
    return res.redirect("/portafolios");
  const { title } = req.body;
  await Portfolio.findByIdAndUpdate(req.params.id, {
    title,
    category,
    description,
  });
  res.redirect("/portafolios");
};
const deletePortafolio = async (req, res) => {
  await Portfolio.findByIdAndDelete(req.params.id);
  res.redirect("/portafolios");
};

module.exports = {
  renderAllPortafolios,
  renderPortafolio,
  renderPortafolioForm,
  createNewPortafolio,
  renderEditPortafolioForm,
  updatePortafolio,
  deletePortafolio,
};
