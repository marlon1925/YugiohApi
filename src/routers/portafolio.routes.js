const{Router} = require('express')

const {isAuthenticated} = require('../helpers/validate-auth')

const router = Router()

const { renderAllPortafolios,
        renderPortafolio,
        renderPortafolioForm,
        createNewPortafolio,
        renderEditPortafolioForm,
        updatePortafolio,
        deletePortafolio,
        renderPerfileForm
    } = require('../controllers/portafoliocontrollers')

// Crear rutas y llamar a mis metodos del controlador
router.get('/portafolio/add',isAuthenticated,renderPortafolioForm)
router.post('/portafolio/add', isAuthenticated,createNewPortafolio)
router.get('/portafolio/perfile', isAuthenticated,renderPerfileForm)




router.get('/portafolios',isAuthenticated,renderAllPortafolios)
router.get('/portafolio/:id', isAuthenticated,renderPortafolio)
    
router.get('/portafolio/edit/:id', isAuthenticated,renderEditPortafolioForm)
router.put('/portafolio/edit/:id', isAuthenticated,updatePortafolio)

router.delete('/portafolio/delete/:id', isAuthenticated,deletePortafolio)



module.exports = router