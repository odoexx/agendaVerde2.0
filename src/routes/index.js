const { Router } = require('express');
const router = Router();
const fs = require('fs');
const { send } = require('process');
const { v4: uuidv4 } = require('uuid');

const jsonEcoActividad = fs.readFileSync('src/ecoActividades.json', 'utf-8');
let ecoActividad = JSON.parse(jsonEcoActividad);

router.get('/', (req, res) => {
    res.render('index.ejs');
});

router.get('/calendario', (req, res) => {
    res.render('calendario', {
        ecoActividad
    });
});

router.get('/calculadora', (req,res) => {
    res.render('huellaCarbono');
})

router.get('/cuestionario', (req, res) => {
    res.render('cuestionario');
})

router.get('/desarrolladores', (req, res) => {
    res.render('desarrolladores');
});

router.get('/new-entry', (req, res) => {
    res.render('new-entry');
});

router.get('/admin-page', (req,res) => {
    res.render('admin-page', {
        ecoActividad
    })
});

router.get('/modificar/:id/:titulo/:autor/:imagen/:descripcion/:estado', (req, res) => {
    const {id, titulo, autor, imagen, descripcion, estado} = req.params;
    res.render('modificar.ejs',{
        id,
        titulo,
        autor,
        imagen,
        descripcion,
        estado
    })
});



//eliminar
router.get('/delete/:id', (req, res) => {
    ecoActividad = ecoActividad.filter(ecoActividad => ecoActividad.id != req.params.id);
    const jsonEcoActividad = JSON.stringify(ecoActividad);
    fs.writeFileSync('src/ecoActividades.json', jsonEcoActividad, 'utf-8');
    res.redirect('/');
});

//aceptar
router.get('/enable/:id/:titulo/:autor/:imagen/:descripcion/:estado', (req, res) => {
    //aca se tiene que cambiar el estado de la ecoActividad
    //tomo los datos de la ecoActividad
    const {titulo, autor, imagen, descripcion} = req.params;
    //creo un nuevo objeto con los datos viejo, y actualizo algunos
    let newEcoActividad = {
        id: uuidv4(),
        titulo: titulo,
        autor: autor,
        imagen: imagen,
        descripcion: descripcion,
        estado: 'aceptado'
    };
    ecoActividad.push(newEcoActividad);


    //elimino el dato viejo
    ecoActividad = ecoActividad.filter(ecoActividad => ecoActividad.id != req.params.id);
    const jsonEcoActividad = JSON.stringify(ecoActividad);
    fs.writeFileSync('src/ecoActividades.json', jsonEcoActividad, 'utf-8');

    res.redirect('/admin-page');
});

//rechasar
router.get('/desable/:id/:titulo/:autor/:imagen/:descripcion/:estado', (req, res) => {
    //aca se tiene que cambiar el estado de la ecoActividad
    //tomo los datos de la ecoActividad
    const {titulo, autor, imagen, descripcion} = req.params;
    //creo un nuevo objeto con los datos viejo, y actualizo algunos
    let newEcoActividad = {
        id: uuidv4(),
        titulo: titulo,
        autor: autor,
        imagen: imagen,
        descripcion: descripcion,
        estado: 'rechazado'
    };
    ecoActividad.push(newEcoActividad);


    //elimino el dato viejo
    ecoActividad = ecoActividad.filter(ecoActividad => ecoActividad.id != req.params.id);
    const jsonEcoActividad = JSON.stringify(ecoActividad);
    fs.writeFileSync('src/ecoActividades.json', jsonEcoActividad, 'utf-8');

    res.redirect('/admin-page');
});

//cargar nuevo dato
router.post('/new-entry', (req, res) => {
    const { titulo, autor, imagen, descripcion } = req.body;

    //valido que todos los campos esten cargados
    if(!titulo || !autor || !imagen || !descripcion){
        res.status(400).send('Escribe todos los campos');
        return;
    }

    let newEcoActividad = {
        id: uuidv4(),
        titulo: titulo,
        autor: autor,
        imagen: imagen,
        descripcion: descripcion,
        estado: 'pendiente'
    };

    ecoActividad.push(newEcoActividad);

    const jsonEcoActividad = JSON.stringify(ecoActividad);
    fs.writeFileSync('src/ecoActividades.json', jsonEcoActividad, 'utf-8');

    //luego de presionar en guardar lo envia al new-entry
    res.redirect('/new-entry');
});

//modificar datos
router.post('/modificar', (req, res) => {
    const {id, titulo, autor, imagen, descripcion } = req.body;

    //valido que todos los campos esten cargados
    if(!titulo || !autor || !imagen || !descripcion){
        res.status(400).send('Escribe todos los campos');
        return;
    }

    let newEcoActividad = {
        id: uuidv4(),
        titulo: titulo,
        autor: autor,
        imagen: imagen,
        descripcion: descripcion,
        estado: 'aceptado'
    };

    ecoActividad.push(newEcoActividad);

    
    ecoActividad = ecoActividad.filter(ecoActividad => ecoActividad.id != id);
    const jsonEcoActividad = JSON.stringify(ecoActividad);
    fs.writeFileSync('src/ecoActividades.json', jsonEcoActividad, 'utf-8');
    
    //luego de presionar en guardar lo envia al new-entry
    res.redirect('/admin-page');
});

//inicio de sesion
router.post('/admin-page', (req, res) => {
    const { usuario, password } = req.body;

    if( !usuario && !password){
        res.status(400).send('Escribe todos los campos');
        return;
    }

    if(usuario=="admin" && password=="1234"){
        res.redirect('/admin-page');
    }else{
        res.send('usuario incorrecto');
    }

});

module.exports = router;