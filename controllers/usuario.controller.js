const sql = require("../config/mysqlConnection");

/* Prueba */
exports.raiz = async(req,res)=>{
    send('Raiz de usuario')
}

exports.saludar = async(req,res) => {
    res.send('Hola');
}

/* GET */
exports.getUsuarios = async(req,res) =>{
    sql.query("Select * from Usuario",(err,result)=>{
        if(!err){
            res.status(200).send(result);
        }else{
            res.status(400).json({error: err})
        }
    })
}
/* POST */
exports.registrarUsuario = async(req,res) => {
    const {
        correo,
        usuario,
        password,
        id_estado
        } = req.body
        
        
        sql.query(`Insert into Usuario(correo,usuario,password,id_estado) values('${correo}','${usuario}','${password}',${id_estado});`,(err,result)=>{
            if(!err){
                res.status(200).send(result)
                console.log(`Usuario: ${usuario} registrado con exito`)
            }else{
                console.log(err)
                res.status(400).json({error:err})
            }
        })
}
/* GET */
exports.login = async(req,res) => {
    const {
        usuario,
        password
    } = req.body

    sql.query(`Select id_usuario, usuario from Usuario where usuario = '${usuario}' and password = '${password}'`,function(err,result){
        if(!err){
            if(result.length != 0){
                res.status(200).json({id: result[0].id_usuario, usuario: result[0].usuario})
            }else{
                res.status(400).json({error: "Credenciales incorrectas"})
            }
        }else{
            res.status(400).json({error: err})
        }
    })
}
/* PUT */
exports.actualizarUsuario = async(req,res) => {
    
    const {
        correo,
        usuario,
        password,
        id_estado
        } = req.body
    
    const id_usuario = req.params.id

   sql.query(`Update Usuario Set correo = '${correo}', usuario = '${usuario}', password = '${password}', id_estado = ${id_estado}
            Where id_usuario = ${id_usuario};`,(err,result)=>{
                if(!err){
                    if(result.affectedRows == 0)
                        return  res.status(400).json({error: "Usuario no encontrado"})
                    return res.status(200).send({result})
                    //return result.affectedRows==0?res.status(400).json({error: "Usuario no encontrado"}):res.status(200).send(result)
                }else{
                    return  res.status(400).json({error: err})
                }
            })
}
/* DELETE */
exports.eliminarUsuario = async(req,res) => {
    const id = req.params.id
    sql.query(`Delete from Usuario where id_usuario = ${id};`,(err,result)=>{
        if(!err){
            if(result.affectedRows == 0){
                return res.status(400).json({error:"Usuario no encontrado"})
            }else{
                return res.status(200).send(result);
            }
            //res.json({status: 1})
        }else{
            return res.status(400).json({error:err});
            //res.json({status: 0})
        }
    })
    
}
