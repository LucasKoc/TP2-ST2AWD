const express = require('express');  //npm install express
const path = require('path');
const cors = require('cors');        //npm install cors

const app = express();
const port = 3000;

// Middleware pour afficher les requêtes
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
})

// Pour faire autoriser le "Cross-Origin Resource Sharing (CORS)" d'un client spécifique
const allowedOrigins = ['http://127.0.0.1:8080', 'http://localhost:8080'];
app.use(cors({
    origin: verifyOrigin = (origin, callback) => {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}));

// Chemin vers le fichier JSON de apple
const apple = path.join(__dirname, './Data/AAPL-rates-5y.json');
const facebook = path.join(__dirname, './Data/FB-rates-5y.json');
const google = path.join(__dirname, './Data/GOOG-rates-5y.json');
const microsoft = path.join(__dirname, './Data/MSFT-rates-5y.json');

// Route pour servir le fichier json de Apple
app.get('/AAPL-rates-5y.json', (req, res) => {
    res.sendFile(apple);
});

// Route pour servir le fichier json de Facebook
app.get('/FB-rates-5y.json', (req, res) => {
  res.sendFile(facebook);
})

// Route pour servir le fichier json de Google
app.get('/GOOG-rates-5y.json', (req, res) => {
    res.sendFile(google);
})

// Route pour servir le fichier json de Microsoft
app.get('/MSFT-rates-5y.json', (req, res) => {
    res.sendFile(microsoft);
})

// Démarrage du serveur !!
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
})