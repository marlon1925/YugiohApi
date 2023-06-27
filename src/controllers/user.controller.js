const {
  sendMailToUser,
  sendPasswordResetEmail,
} = require("../config/nodemailer");

// importar passport
const passport = require("passport");
const { uploadImage, deleteImage } = require("../config/clodinary");
const fs = require("fs-extra");

// Importa el modelo
const User = require("../models/User");

// Presentar el formulario para el regsitro
const renderRegisterForm = (req, res) => {
  res.render("user/registerForm");
};

// Captura los datos dek formukario y guadadr en BBDD
const registerNewUser = async (req, res) => {
  // DESESTRUCTURACION DE LOS DATOS
  const { name, email, password, confirmpassword } = req.body;
  // VALIDA SI TODOS LOS CAMPOS ESTAN COMPLETOS
  if (Object.values(req.body).includes(""))
    return res.send("Lo sentimos, debes llenar todos los campos");

  // VALIDACION DE LAS CONTRASEÑAS
  if (password != confirmpassword)
    return res.send("Lo sentimos, los passwords no coinciden");
  // TRAER EL USUARIO EM BASE AL EMAIL
  const userBDD = await User.findOne({ email });
  // VERIFICAR SI EXISTE EL USUARIO
  if (userBDD)
    return res.send("Lo sentimos, el email ya se encuentra registrado");
  // GUARDAR EL REGISTRO EN LA BBD
  const newUser = await new User({ name, email, password, confirmpassword });
  // ENCRIPTAR EL PASSWORD
  newUser.password = await newUser.encrypPassword(password);
  newUser.crearToken();
  const token = newUser.crearToken();
  sendMailToUser(email, token);

  // VALIDACION DE LA IMAGEN
  if (!req.files?.image) return res.send("Se requiere una imagen");
  // LA INVOCACION DEL METODO  Y LE PASO EL PATH DE LA IMAGEN
  const imageUpload = await uploadImage(req.files.image.tempFilePath);

  newUser.image = {
    public_id: imageUpload.public_id,
    secure_url: imageUpload.secure_url,
  };
  // ELIMINA EL ARCHIVO  TEMP DEL DIRECTORIO UPLOADS
  await fs.unlink(req.files.image.tempFilePath);
  newUser.save();
  res.redirect("/user/login");
};

const confirmEmail = async (req, res) => {
  if (!req.params.token)
    return res.send("Lo sentimos, no se puede validar la cuenta");
  const userBDD = await User.findOne({ token: req.params.token });
  userBDD.token = null;
  userBDD.confirmEmail = true;
  await userBDD.save();
  res.send("Token confirmado, ya puedes iniciar sesión");
};

const renderResetPasswordForm = (req, res) => {
  res.render("user/restPassword");
};

const resetPassword = async (req, res) => {
  try {
    const { title } = req.body;
    console.log(title);

    // Find the user by email
    const user = await User.findOne({ email: title });
    if (!user) {
      return res.status(400).send("No account with that email address exists.");
    }

    // Retrieve the user's password
    const password = user.response;

    console.log(password);

    // Send the password reset email
    sendPasswordResetEmail(title, password);
    console.log("//legaaaaaaaaaaa");

    res.redirect("/user/login");
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while processing your request.");
  }
};

// Presentar datos
const renderLoginForm = (req, res) => {
  res.render("user/loginForm");
};

// CAPTURA LOS DATOS DEL FORMULARIO Y HACER EL LOGIN EN BBD
const loginUser = passport.authenticate("local", {
  failureRedirect: "/user/login",
  successRedirect: "/portafolios",
});

// CAPTURA ...
const logoutUser = (req, res) => {
  req.logout((err) => {
    if (err) return res.send("Ocurrio un error");
    res.redirect("/");
  });
};

module.exports = {
  renderRegisterForm,
  registerNewUser,
  renderLoginForm,
  loginUser,
  logoutUser,
  confirmEmail,
  renderResetPasswordForm,
  resetPassword,
};
