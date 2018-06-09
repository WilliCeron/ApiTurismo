const express = require('express')
const bodyParser = require('body-parser');
const http = require('http')
const app = express()

const hostname = '127.0.0.1';
const PORT = process.env.PORT || 5000

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ***************************************************************
// ***************************************************************

let users = [
    {id: 0, username: 'admin', password: '123456', name: 'Willian Ceron', email: 'williamceron62@gmail.com', image: 'xxx.png'}
];

let sites = [
    {id: 0, name: 'Las Lajas', description: 'El Santuario de Nuestra Señora del Rosario de las Lajas es un templo y basílica para el culto cristiano y veneración de Nuestra Señora de las Lajas el edificio principal mide 27.50 metros la altura hasta la torre es de 100 metros y el puente mide a 50 metros de alto por 17 metros de ancho y 20 de largo este santuario se ubica en Ipiales, Departamento de Nariño, sur de la República de Colombia y es destino de peregrinación y turismo desde el siglo XVIII.', food: 'Indudablemente, uno de los platos típicos y representativos de la gastronomía nariñense es el Cuy. Su nombre proviene del habla quechua, debido a los sonido que este emite (cuy, cuy). Sin embargo, en otros países se lo conoce como Conejillo de IndiasTortillas de papa, Lapingachos. Una gastronomía propia elaborada con productos propios de la tierra. Las tortillas de papa, uno de los platos mas deliciosos' , image: 'http://www.radioipiales.co/wp-content/uploads/2017/09/santuario-de-las-lajas.jpg'},
    {id: 1, name: 'Buesaco', description: 'Debe su nombre a los «buisacos», grupo étnico que formó parte de los quillasingas, que habitaban el territorio a la llegada de los conquistadores españoles.', food: 'Los productos típicos de la gastronomía local en la que los alimentos tradicionales derivados del maíz, como los Choclos, los envueltos, la chicha y la mazamorra combinados con el frito, son los platos principales de el municipio de Buesaco Nariño' , image: 'http://tecnicoindustrialpasto.edu.co/documen/paginitas/TODO%20PROYECTO-CASTRO-GELPUD/proyecto%20final%20Gelpud-Castro/imagenes/buesaco.jpg'},
	{id: 2, name: 'El Encano', description: 'El Santuario de Nuestra Señora del Rosario de las Lajas es un templo y basílica para el culto cristiano y veneración de Nuestra Señora de las Lajas el edificio principal mide 27.50 metros la altura hasta la torre es de 100 metros y el puente mide a 50 metros de alto por 17 metros de ancho y 20 de largo este santuario se ubica en Ipiales, Departamento de Nariño, sur de la República de Colombia y es destino de peregrinación y turismo desde el siglo XVIII.', food: 'Indudablemente, uno de los platos típicos y representativos de la gastronomía nariñense es el Cuy. Su nombre proviene del habla quechua, debido a los sonido que este emite (cuy, cuy). Sin embargo, en otros países se lo conoce como Conejillo de IndiasTortillas de papa, Lapingachos. Una gastronomía propia elaborada con productos propios de la tierra. Las tortillas de papa, uno de los platos mas deliciosos' , image: 'http://www.radioipiales.co/wp-content/uploads/2017/09/santuario-de-las-lajas.jpg'},
    {id: 3, name: 'Cumbal', description: 'Debe su nombre a los «buisacos», grupo étnico que formó parte de los quillasingas, que habitaban el territorio a la llegada de los conquistadores españoles.', food: 'Los productos típicos de la gastronomía local en la que los alimentos tradicionales derivados del maíz, como los Choclos, los envueltos, la chicha y la mazamorra combinados con el frito, son los platos principales de el municipio de Buesaco Nariño' , image: 'http://tecnicoindustrialpasto.edu.co/documen/paginitas/TODO%20PROYECTO-CASTRO-GELPUD/proyecto%20final%20Gelpud-Castro/imagenes/buesaco.jpg'},
	{id: 4, name: 'Sandona', description: 'El Santuario de Nuestra Señora del Rosario de las Lajas es un templo y basílica para el culto cristiano y veneración de Nuestra Señora de las Lajas el edificio principal mide 27.50 metros la altura hasta la torre es de 100 metros y el puente mide a 50 metros de alto por 17 metros de ancho y 20 de largo este santuario se ubica en Ipiales, Departamento de Nariño, sur de la República de Colombia y es destino de peregrinación y turismo desde el siglo XVIII.', food: 'Indudablemente, uno de los platos típicos y representativos de la gastronomía nariñense es el Cuy. Su nombre proviene del habla quechua, debido a los sonido que este emite (cuy, cuy). Sin embargo, en otros países se lo conoce como Conejillo de IndiasTortillas de papa, Lapingachos. Una gastronomía propia elaborada con productos propios de la tierra. Las tortillas de papa, uno de los platos mas deliciosos' , image: 'http://www.radioipiales.co/wp-content/uploads/2017/09/santuario-de-las-lajas.jpg'},
    {id: 5, name: 'Pasto', description: 'En la ciudad de Pasto', food: 'Los productos típicos de la gastronomía local en la que los alimentos tradicionales derivados del maíz, como los Choclos, los envueltos, la chicha y la mazamorra combinados con el frito, son los platos principales de el municipio de Buesaco Nariño' , image: 'http://tecnicoindustrialpasto.edu.co/documen/paginitas/TODO%20PROYECTO-CASTRO-GELPUD/proyecto%20final%20Gelpud-Castro/imagenes/buesaco.jpg'},
	{id: 6, name: 'Tumaco', description: 'Tumaco', food: 'Indudablemente, uno de los platos típicos y representativos de la gastronomía nariñense es el Cuy. Su nombre proviene del habla quechua, debido a los sonido que este emite (cuy, cuy). Sin embargo, en otros países se lo conoce como Conejillo de IndiasTortillas de papa, Lapingachos. Una gastronomía propia elaborada con productos propios de la tierra. Las tortillas de papa, uno de los platos mas deliciosos' , image: 'http://www.radioipiales.co/wp-content/uploads/2017/09/santuario-de-las-lajas.jpg'},

];

// ***************************************************************
// ***************************************************************

app.get('/', (req, res) => {
    res.status(200).send("Welcome to API REST")
})

app.get('/users', (req, res) => {
    res.send(users)
})

// Validar usuarios al momento de hacer login
app.post('/validateUser', (req, res) => {
    let data = req.body;
    let usersTmp = [{success: false, id: 0, username: '', password: '', name: '', email: '', image: ''}];

    users.some(function (value, index, _arr) {
        if( (value.username == data.Username) && (value.password == data.Password) ){
            usersTmp[0]['success'] = true;
            usersTmp[0]['id'] = value.id;
            usersTmp[0]['username'] = value.username;
            usersTmp[0]['password'] = value.password;
            usersTmp[0]['name'] = value.name;
            usersTmp[0]['email'] = value.email;
            usersTmp[0]['image'] = value.image;
            return true;
        }else{
            return false;
        }
    });

    res.send(usersTmp)
})

// Crear usuarios para una nueva cuenta
app.post('/createUser', (req, res) => {
    let data = req.body;
    let consecutive = users.length;
    let usersTmp = [{
        success: true,
        id: consecutive,
        username: data.Username,
        password: data.Password,
        name: data.Name,
        email: data.Email,
        image: 'xxx.png'
    }];
    users.push(usersTmp[0])

    res.send(usersTmp)
})

// Listar todos los contactos
app.get('/sites', (req, res) => {
    let pos = 0;
    sites.forEach(function(entry) {
        entry.id = pos;
        pos++;
    });
    res.send(sites)
})

// Eliminar un contacto
app.delete('/sites/:id',(req, res) => {
    let params = req.params;
    sites.splice(params.id, 1);
    res.send('sites delete')
})

// Actualizar un contacto
app.put('/sites/:id',(req, res) => {
    let params = req.params;
    let data = req.body;
    sites[params.id]['name'] = data.Name;
    sites[params.id]['description'] = data.Description;
    sites[params.id]['food'] = data.Food;
    res.send("Site update")
})

// Crear contactos
app.post('/sites', (req, res) => {
    let data = req.body;
    let consecutive = sites.length;
    let contactTmp = [{
        id: consecutive,
        name: data.Name,
        description: data.Description,
        food: data.Food,
        image: 'http://1.bp.blogspot.com/_FKgwIIqwhSU/SMFMAs6jK7I/AAAAAAAAABw/UKjjKBrIwfY/s320/nari%C3%B1o.jpg'
    }];
    sites.push(contactTmp[0])

    res.send("Site create")
})

// *************************************************************
// *************************************************************
 
http.createServer(app).listen(PORT, () => {
  console.log(`Server running at http://${hostname}:${PORT}/`);
})