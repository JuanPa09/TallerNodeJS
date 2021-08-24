const express = require('express')
const router = express.Router()
const usuarioController = require('../controllers/usuario.controller')

/* localhost:3000/usuario
    /login
    /saludo
     */

router.get('/',usuarioController.raiz)
router.get('/getUsuarios',usuarioController.getUsuarios)

router.post('/registrar',usuarioController.registrarUsuario)
router.put('/actualizar/:id',usuarioController.actualizarUsuario)
router.delete('/eliminar/:id',usuarioController.eliminarUsuario)

module.exports = router