angular.module("Webmail", ["ngSanitize", "ui.tinymce", "MailServiceHttp", "MesFiltres", "MesDirectives"])

.controller("WebmailCtrl", function($scope, $location, $filter, mailService){
    
    
    
    $scope.idProchainMail = 13;
    

    
    //tri
    
    $scope.champsTri = null;
    $scope.descendant = false;
    $scope.triEmails = function(champ){
        if($scope.champsTri == champ){
            $scope.descendant = !$scope.descendant;
        } else {
            $scope.champsTri = champ;
            $scope.descendant = false;
        }
        
    };
    
    $scope.cssChevronTri = function(champ){
      return {glyphicon: $scope.champsTri == champ, 
              'glyphicon-chevron-up': $scope.champsTri == champ && !$scope.descendant,
              'glyphicon-chevron-down': $scope.champsTri == champ && $scope.descendant}
    };
    
    //recherche
    
    $scope.recherche = null;
    $scope.razRecherche = function(){
        $scope.recherche = null;
    };
    
    //creation nouveau mail
    
    $scope.afficherNouveauMail = false;

    
    //envoie nouveau mail
    $scope.envoieMail = function(nouveauMail){

        mailService.envoieMail(nouveauMail);
        $location.path("/");  
        
    };
    
    //navigation
    
    $scope.vueCourante = null;
    $scope.dossierCourant = null;
    $scope.emailSelectionne = null;
    
    $scope.versEmail = function(dossier, email){
        $location.path("/" + dossier.value + "/" + email.id);;  
    };
    
    $scope.selectionDossier = function(valDossier){
        $scope.vueCourante = "vueDossier";
        $scope.dossierCourant = mailService.getDossier(valDossier);

    };
    
    $scope.selectionEmail = function(valDossier, idEmail){
        $scope.vueCourante = "vueContenuMail";
        $scope.emailSelectionne = mailService.getMail(valDossier, idEmail);
    };
    
    $scope.$watch(function() {
        return $location.path();
    }, function(newPath) {
        var tabPath = newPath.split("/");
        if(tabPath.length > 1 && tabPath[1]) {
            if(tabPath[1] == "nouveauMail"){
                $scope.vueCourante = "vueNouveauMail";
                $scope.$broadcast("initFormNouveauMail");
            } else {
                var valDossier = tabPath[1];
                if(tabPath.length > 2){
                    var idMail = tabPath[2];
                    $scope.selectionEmail(valDossier, idMail);
                } else {
                    $scope.selectionDossier(valDossier);
                }
            }
        } else {
            $scope.vueCourante = null;
        }
    });
    
    $scope.getDossiersFiltres = function(){
        console.log("getDossiersFiltres()");
        return $filter("filter")($scope.dossierCourant.emails, $scope.recherche);
    };
    
    
    
    
    $scope.dossiers = mailService.getDossiers();
    
})



