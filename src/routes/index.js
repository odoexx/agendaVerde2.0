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

router.get('/calendario2023Enero', (req, res) => {
    res.render('calendario2023Enero', {
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

router.get('/all-ecoActividades', (req,res) => {
    res.render('all-ecoActividades', {
        ecoActividad
    })
});

// cargar la pantalla de modificar
router.get('/modificar/:id/:nombreEcoActividad/:diaEcoActividad/:mesEcoActividad/:anoEcoActividad/:horaInicioEcoActividad/:horaFinEcoActividad/:ubicacionEcoActividad/:departamentoEcoActividad/:detallesEcoActividad/:nombreEncargado/:apellidoEncargado/:dniEncargado/:numeroEncargado/:gmaiEncargado/:estado', (req, res) => {
    const { id, nombreEcoActividad, diaEcoActividad, mesEcoActividad, anoEcoActividad,
        horaInicioEcoActividad, horaFinEcoActividad, ubicacionEcoActividad, 
        departamentoEcoActividad, detallesEcoActividad, nombreEncargado, apellidoEncargado, 
        dniEncargado, numeroEncargado, gmaiEncargado, estado
     } = req.params;
    res.render('modificar.ejs',{
        id, nombreEcoActividad, diaEcoActividad, mesEcoActividad, anoEcoActividad,
        horaInicioEcoActividad, horaFinEcoActividad, ubicacionEcoActividad, 
        departamentoEcoActividad, detallesEcoActividad, nombreEncargado, apellidoEncargado, 
        dniEncargado, numeroEncargado, gmaiEncargado, estado
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
router.get('/enable/:id/:nombreEcoActividad/:diaEcoActividad/:mesEcoActividad/:anoEcoActividad/:horaInicioEcoActividad/:horaFinEcoActividad/:ubicacionEcoActividad/:departamentoEcoActividad/:detallesEcoActividad/:nombreEncargado/:apellidoEncargado/:dniEncargado/:numeroEncargado/:gmaiEncargado', (req, res) => {
    //tomo los datos de la ecoActividad
    const { nombreEcoActividad, diaEcoActividad, mesEcoActividad, anoEcoActividad,
        horaInicioEcoActividad, horaFinEcoActividad, ubicacionEcoActividad, 
        departamentoEcoActividad, detallesEcoActividad, nombreEncargado, apellidoEncargado, 
        dniEncargado, numeroEncargado, gmaiEncargado
     } = req.params;

    //creo un nuevo objeto con los datos viejo, y actualizo algunos
    let newEcoActividad = {
        id: uuidv4(),
        nombreEcoActividad : nombreEcoActividad,
        diaEcoActividad : diaEcoActividad,
        mesEcoActividad : mesEcoActividad,
        anoEcoActividad : anoEcoActividad,
        horaInicioEcoActividad : horaInicioEcoActividad,
        horaFinEcoActividad : horaFinEcoActividad,
        ubicacionEcoActividad : ubicacionEcoActividad,
        departamentoEcoActividad : departamentoEcoActividad,
        detallesEcoActividad : detallesEcoActividad, 
        nombreEncargado : nombreEncargado, 
        apellidoEncargado : apellidoEncargado, 
        dniEncargado : dniEncargado, 
        numeroEncargado : numeroEncargado,
        gmaiEncargado : gmaiEncargado,
        estado: 'aceptado'
    };
    ecoActividad.push(newEcoActividad);


    //elimino el dato viejo
    ecoActividad = ecoActividad.filter(ecoActividad => ecoActividad.id != req.params.id);
    const jsonEcoActividad = JSON.stringify(ecoActividad);
    fs.writeFileSync('src/ecoActividades.json', jsonEcoActividad, 'utf-8');

    res.redirect('/admin-page');
});

//rechazar
router.get('/desable/:id/:nombreEcoActividad/:diaEcoActividad/:mesEcoActividad/:anoEcoActividad/:horaInicioEcoActividad/:horaFinEcoActividad/:ubicacionEcoActividad/:departamentoEcoActividad/:detallesEcoActividad/:nombreEncargado/:apellidoEncargado/:dniEncargado/:numeroEncargado/:gmaiEncargado', (req, res) => {
    //tomo los datos de la ecoActividad
    const { nombreEcoActividad, diaEcoActividad, mesEcoActividad, anoEcoActividad,
        horaInicioEcoActividad, horaFinEcoActividad, ubicacionEcoActividad, 
        departamentoEcoActividad, detallesEcoActividad, nombreEncargado, apellidoEncargado, 
        dniEncargado, numeroEncargado, gmaiEncargado
     } = req.params;
    //creo un nuevo objeto con los datos viejo, y actualizo algunos
    let newEcoActividad = {
        id: uuidv4(),
        nombreEcoActividad : nombreEcoActividad,
        diaEcoActividad : diaEcoActividad,
        mesEcoActividad : mesEcoActividad,
        anoEcoActividad : anoEcoActividad,
        horaInicioEcoActividad : horaInicioEcoActividad,
        horaFinEcoActividad : horaFinEcoActividad,
        ubicacionEcoActividad : ubicacionEcoActividad,
        departamentoEcoActividad : departamentoEcoActividad,
        detallesEcoActividad : detallesEcoActividad, 
        nombreEncargado : nombreEncargado, 
        apellidoEncargado : apellidoEncargado, 
        dniEncargado : dniEncargado, 
        numeroEncargado : numeroEncargado,
        gmaiEncargado : gmaiEncargado,
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
    const { nombreEcoActividad, diaEcoActividad, mesEcoActividad, anoEcoActividad,
        horaInicioEcoActividad, horaFinEcoActividad, ubicacionEcoActividad, 
        departamentoEcoActividad, detallesEcoActividad, nombreEncargado, apellidoEncargado, 
        dniEncargado, numeroEncargado, gmaiEncargado
     } = req.body;

    //valido que todos los campos esten cargados
    if(!nombreEcoActividad || !diaEcoActividad || !mesEcoActividad || !anoEcoActividad || !horaInicioEcoActividad || 
        !horaFinEcoActividad || !ubicacionEcoActividad || !departamentoEcoActividad || 
        !detallesEcoActividad || !nombreEncargado || !apellidoEncargado || !dniEncargado || 
        !numeroEncargado || !gmaiEncargado){
        res.status(400).send('Escribe todos los campos');
        return;
    }

    let newEcoActividad = {
        id: uuidv4(),
        nombreEcoActividad : nombreEcoActividad,
        diaEcoActividad : diaEcoActividad,
        mesEcoActividad : mesEcoActividad,
        anoEcoActividad : anoEcoActividad,
        horaInicioEcoActividad : horaInicioEcoActividad,
        horaFinEcoActividad : horaFinEcoActividad,
        ubicacionEcoActividad : ubicacionEcoActividad,
        departamentoEcoActividad : departamentoEcoActividad,
        detallesEcoActividad : detallesEcoActividad, 
        nombreEncargado : nombreEncargado, 
        apellidoEncargado : apellidoEncargado, 
        dniEncargado : dniEncargado, 
        numeroEncargado : numeroEncargado,
        gmaiEncargado : gmaiEncargado,
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
    const {id, nombreEcoActividad, diaEcoActividad, mesEcoActividad, anoEcoActividad,
        horaInicioEcoActividad, horaFinEcoActividad, ubicacionEcoActividad, 
        departamentoEcoActividad, detallesEcoActividad, nombreEncargado, apellidoEncargado, 
        dniEncargado, numeroEncargado, gmaiEncargado, estado
     } = req.body;

    //valido que todos los campos esten cargados
    if(!nombreEcoActividad || !diaEcoActividad || !mesEcoActividad || !anoEcoActividad || !horaInicioEcoActividad || 
        !horaFinEcoActividad || !ubicacionEcoActividad || !departamentoEcoActividad || 
        !detallesEcoActividad || !nombreEncargado || !apellidoEncargado || !dniEncargado || 
        !numeroEncargado || !gmaiEncargado || !estado){
        res.status(400).send('Escribe todos los campos');
        return;
    }

    let newEcoActividad = {
        id: uuidv4(),
        nombreEcoActividad : nombreEcoActividad,
        diaEcoActividad : diaEcoActividad,
        mesEcoActividad : mesEcoActividad,
        anoEcoActividad : anoEcoActividad,
        horaInicioEcoActividad : horaInicioEcoActividad,
        horaFinEcoActividad : horaFinEcoActividad,
        ubicacionEcoActividad : ubicacionEcoActividad,
        departamentoEcoActividad : departamentoEcoActividad,
        detallesEcoActividad : detallesEcoActividad, 
        nombreEncargado : nombreEncargado, 
        apellidoEncargado : apellidoEncargado, 
        dniEncargado : dniEncargado, 
        numeroEncargado : numeroEncargado,
        gmaiEncargado : gmaiEncargado,
        estado: estado
    };
    
    ecoActividad = ecoActividad.filter(ecoActividad => ecoActividad.id != id);
    
    ecoActividad.push(newEcoActividad);
    
    const jsonEcoActividad = JSON.stringify(ecoActividad);
    fs.writeFileSync('src/ecoActividades.json', jsonEcoActividad, 'utf-8');
    
    //luego de presionar en guardar lo envia al admin-page
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