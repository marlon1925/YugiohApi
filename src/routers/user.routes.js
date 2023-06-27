
const {Router} = require('express')
const { renderRegisterForm, registerNewUser, renderLoginForm, loginUser, logoutUser,confirmEmail,resetPassword,renderResetPasswordForm,renderPerfile} = require('../controllers/user.controller')
const router = Router()



router.get('/user/register',renderRegisterForm)
router.post('/user/register',registerNewUser)

router.get('/user/reset',renderResetPasswordForm)
router.post('/user/reset', resetPassword)



router.get('/user/login',renderLoginForm)
router.post('/user/login',loginUser)


router.post('/user/logout',logoutUser)
router.get('/user/confirmar/:token',confirmEmail)

module.exports =router