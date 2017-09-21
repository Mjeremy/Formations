angular.module("MailServiceHttp", [])
.factory("mailService", function($http) {
    
    var URL_API = "http://localhost:8080/api/";
    
    return {
        getDossiers: function(){ //renvoie tableau
            var promesse = $http.get(URL_API + "dossiers");
            var resultat = [];
            
            promesse.then(function(reponse){
                angular.extend(resultat,reponse.data);
            }, function(erreur){
                alert("Erreur " + erreur.status + " dans la récupération des dossiers : " + erreur.data);
            });
            
            return resultat;
        },
        getDossier: function(valDossier){ //renvoie un objet
            var promesse = $http.get(URL_API + "dossiers/" + valDossier);
            var resultat = {};
            
            promesse.then(function(reponse){
                angular.extend(resultat, reponse.data); 
            }, function(erreur){
                alert("Erreur " + erreur.status + " dans la récupération d'un dossier : " + erreur.data);
            });
            
            return resultat;
        },
        getMail: function(valDossier, idMail){ //renvoie un objet
            var promesse = $http.get(URL_API + "dossiers/" + valDossier + "/" + idMail);
            var resultat = {};
            
            promesse.then(function(reponse){
                angular.extend(resultat, reponse.data);
            }, function(erreur){
                alert("Erreur " + erreur.status + " dans la récupération d'un mail : " + erreur.data);
            });
            
            return resultat;
            
        },
        envoieMail: function(mail) { //ne renvoie rien
            var promesse = $http.post(URL_API + "envoie", mail);
            
            promesse.then(function(reponse){
                
            }, function(erreur){
                alert("Erreur " + erreur.status + " lors de l'envoie du mail : " + erreur.data);
            });
        }
    }
})