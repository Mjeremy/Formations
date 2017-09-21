var http = require("http");
var fs = require("fs");
var mime = require('mime');
//var connect = require("connect");
var express = require("express");

var PORT = 8080;

var serviceMails = require(__dirname + "/get-mails.js");

//middleware

var logger = require("morgan");
var serveStatic = require("serve-static");
var favicon = require("serve-favicon");
var bodyParser = require("body-parser");

serviceMails.genererMails();

//var app = connect();
var app = express();

app.use(logger(":method :url"));
app.use(favicon(__dirname + "/app/favicon.ico"))
app.use(serveStatic(__dirname + "/app")); //serveStatic fait toute le boulot de envoieFichier


//API

var api = express();

//-- post : envoyer -- get : récupérer -- put : modifier -- delete : supprimer

//Récupérer la liste des dossiers
// GET /api/dossiers
api.get("/dossiers", serviceMails.getDossiers);

//Récupérer un dossier
// GET /api/dossiers/idDossier
api.get("/dossiers/:idDossier", serviceMails.getDossier);

//Récupérer un mail
// GET /api/dossiers/idDossier/idMail
api.get("/dossiers/:idDossier/:idMail", serviceMails.getMail);

app.use(bodyParser.json());

//Envoyer un mail
// POST /api/envoi
api.post("/envoie", serviceMails.envoieMail);

app.use("/api", api);

http.createServer(app).listen(PORT);

console.log("Serveur démarré sur le port " + PORT);

/*var envoieFichier = function(res, url){
    console.log("envoie fichier :" + url);
    
    var path = __dirname + "/app/" + url;
    
    fs.stat(path, function(err, stats) {
        if(!err && stats.isFile()) {
            var flux = fs.createReadStream(path, {
                flags: "r",
                autoClose: "true"
            });
            
            var typeMime = mime.getType(path);
            
            res.writeHead(200, {"Content-Type": typeMime});
            flux.pipe(res);
        
        
        } else {
            envoie404(res);
        }
    })
    
}

var envoie404 = function(res){
    res.writeHead(404, {"Content-Type": "text/html"});
    res.end("<h1> Page introuvable </h1>");
}*/

/*var envoieFichier = function(res, path, mimeType){
    res.writeHead(200, {"Content-Type": mimeType});
    
    var flux = fs.createReadStream(path, {
                       flags: "r",
                       autoClose: "true"
    });
    
    flux.on("data", function(chunk) {
        res.write(chunk);
    })
    
    flux.on("end", function() {
        res.end();
    })
    
    flux.pipe(res);
}*/

/*app.use(function (req,res, next){
    if(req.url == "/"){
        res.writeHead(301, {"Location": "/index.html"});
        res.end();
    }else{
        next(); //passer la main au prochain middleware
    }
});

app.use(function(req,res) {
    envoieFichier(res, req.url);
});*/

/*http.createServer(function(req,res) {
    //Réponse au client en fonction de sa requête
    
    //console.log(req.url);
    //console.log(req.method);
    //console.log(req.headers);
    
    if(req.url == "/"){
        res.writeHead(301, {"Location": "/index.html"});
        res.end();
    } else {
        envoieFichier(res, req.url);
    }*/
    
/*    if(req.url == "/"){
        //Fournir redirection
        res.writeHead(301, {"Location": "/index.html"});
        res.end();
    } else if(req.url == "/index.html"){
        //Fournir un fichier, ressource
        envoieFichier(res, __dirname + "/app/index.html", "text/html");
    } else if(req.url == "/style.css"){
        //Idem
        envoieFichier(res, __dirname + "/app/style.css", "text/css");
    } else {
        //Fichier inexistant
        res.writeHead(404, {"Content-Type": "text/html"});
        res.end("<h1> Page introuvable </h1>");
    }*/
       
//}).listen(PORT);