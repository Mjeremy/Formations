angular.module("Webmail", ["ngSanitize"])

.controller("WebmailCtrl", function($scope, $location){
    
    $scope.dossiers = [
        { value: "RECEPTION", label: 'Boite de Réception', emails: [
            {id: 1, from: "Lisa", to: "Jérémy", subject: "Je reviens", date: new Date(2012,2,20,15,30,), content: "Coucou bibou j'apprends à utiliser AngularJS"},
            {id: 2, from: "Laura", to: "Jérémy", subject: "Kediss", date: new Date(2013,2,28,15,30,), content: "Coucou bibou j'apprends à utiliser AngularJS"},
            {id: 3, from: "Jaja", to: "Jérémy", subject: "Coucou", date: new Date(2012,5,20,15,30,), content: "Coucou bibou j'apprends à utiliser AngularJS"}
        ]   },
        { value: "ARCHIVES", label: 'Archives', emails: [
            {id: 4, from: "Arnaud", to: "Jérémy", subject: "Je reviens", date: new Date(2012,2,20,15,30,), content: "Coucou bibou j'apprends à utiliser AngularJS"},
            {id: 5, from: "Frani", to: "Jérémy", subject: "Kediss", date: new Date(2012,2,20,15,30,), content: "Coucou bibou j'apprends à utiliser AngularJS"},
            {id: 6, from: "Alex", to: "Jérémy", subject: "Coucou", date: new Date(2012,2,20,15,30,), content: "Coucou bibou j'apprends à utiliser AngularJS"}
        ]   },
        { value: "ENVOYES", label: 'Envoyés', emails: [
            {id: 7, from: "Jérémy", to: "Lisa", subject: "Je reviens", date: new Date(2012,7,20,15,30,), content: "Coucou bibou j'apprends à utiliser AngularJS"},
            {id: 8, from: "Jérémy", to: "Lisa", subject: "Kediss", date: new Date(2012,8,9,15,30,), content: "Coucou bibou j'apprends à utiliser AngularJS"},
            {id: 9, from: "Jérémy", to: "Lisa", subject: "Coucou", date: new Date(2012,6,10,15,30,), content: "Coucou bibou j'apprends à utiliser AngularJS"}
        ]   },
        { value: "SPAMS", label: 'Courriers Indésirables', emails: [
            {id: 10, from: "Groupon", to: "Jérémy", subject: "Je reviens", date: new Date(2015,9,13,15,30,), content: "Coucou bibou j'apprends à utiliser AngularJS <a>coucou</a>"},
            {id: 11, from: "Qassa", to: "Jérémy", subject: "Kediss", date: new Date(2016,10,21,15,30,), content: "Coucou bibou j'apprends à utiliser AngularJS"},
            {id: 12, from: "MediaMarkt", to: "Jérémy", subject: "Coucou", date: new Date(2013,2,22,15,30,), content: "Coucou bibou j'apprends à utiliser AngularJS"},
            {id: 13, from: "Qassa", to: "Jérémy", subject: "Coucou", date: new Date(2017,2,15,15,30,), content: "Coucou bibou j'apprends à utiliser AngularJS"}
        ]   },
        
    ];
    
    $scope.dossierCourant = null;
    $scope.emailSelectionne = null;
    
    $scope.versEmail = function(dossier, email){
        $location.path("/" + dossier.value + "/" + email.id);;  
    };
    
    $scope.selectionDossier = function(dossier){
        $scope.dossierCourant=dossier;
        $scope.emailSelectionne = null;
    };
    
    $scope.selectionEmail = function(email){
        $scope.emailSelectionne = email;
    };
    
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
    
    
    $scope.recherche = null;
    $scope.razRecherche = function(){
        $scope.recherche = null;
    };
    
    
    $scope.$watch(function() {
        return $location.path();
    }, function(newPath) {
        var tabPath = newPath.split("/");
        if(tabPath.length > 1) {
            var valDossier = tabPath[1];
            $scope.dossiers.forEach(function(item){
                if(item.value == valDossier){
                    $scope.selectionDossier(item);
                }
            });
            
            if(tabPath.length > 2){
                var idMail = tabPath[2];
                $scope.dossierCourant.emails.forEach(function(item){
                    if(item.id == idMail){
                        $scope.selectionEmail(item);
                    }
                });
            }
        }
    });
    
    
});