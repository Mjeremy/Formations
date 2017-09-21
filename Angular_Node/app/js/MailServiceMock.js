angular.module("MailServiceMock", [])
.factory("mailService", function(){
  
    var dossiers = [
        { value: "RECEPTION", label: 'Boite de Réception', emails: [
            {id: 1, from: "Lisa", to: "Jérémy", subject: "Je reviens", date: new Date(2012,2,20,15,30), content: "Coucou bibou j'apprends à utiliser AngularJS"},
            {id: 2, from: "Laura", to: "Jérémy", subject: "Kediss", date: new Date(2013,2,28,15,30), content: "Coucou bibou j'apprends à utiliser AngularJS"},
            {id: 3, from: "Jaja", to: "Jérémy", subject: "Coucou", date: new Date(2012,5,20,15,30), content: "Coucou bibou j'apprends à utiliser AngularJS"}
        ]   },
        { value: "ARCHIVES", label: 'Archives', emails: [
            {id: 4, from: "Arnaud", to: "Jérémy", subject: "Je reviens", date: new Date(2012,2,20,15,30), content: "Coucou bibou j'apprends à utiliser AngularJS"},
            {id: 5, from: "Frani", to: "Jérémy", subject: "Kediss", date: new Date(2012,2,20,15,30), content: "Coucou bibou j'apprends à utiliser AngularJS"},
            {id: 6, from: "Alex", to: "Jérémy", subject: "Coucou", date: new Date(2012,2,20,15,30), content: "Coucou bibou j'apprends à utiliser AngularJS"}
        ]   },
        { value: "ENVOYES", label: 'Envoyés', emails: [
            {id: 7, from: "Jérémy", to: "Lisa", subject: "Je reviens", date: new Date(2012,7,20,15,30), content: "Coucou bibou j'apprends à utiliser AngularJS"},
            {id: 8, from: "Jérémy", to: "Lisa", subject: "Kediss", date: new Date(2012,8,9,15,30), content: "Coucou bibou j'apprends à utiliser AngularJS"},
            {id: 9, from: "Jérémy", to: "Lisa", subject: "Coucou", date: new Date(2012,6,10,15,30), content: "Coucou bibou j'apprends à utiliser AngularJS"}
        ]   },
        { value: "SPAMS", label: 'Courriers Indésirables', emails: [
            {id: 10, from: "Groupon", to: "Jérémy", subject: "Je reviens", date: new Date(2015,9,13,15,30), content: "Coucou bibou j'apprends à utiliser AngularJS <a>coucou</a>"},
            {id: 11, from: "Qassa", to: "Jérémy", subject: "Kediss", date: new Date(2016,10,21,15,30), content: "Coucou bibou j'apprends à utiliser AngularJS"},
            {id: 12, from: "MediaMarkt", to: "Jérémy", subject: "Coucou", date: new Date(2013,2,22,15,30), content: "Coucou bibou j'apprends à utiliser AngularJS"},
            {id: 13, from: "Qassa", to: "Jérémy", subject: "Coucou", date: new Date(2017,2,15,15,30), content: "Coucou bibou j'apprends à utiliser AngularJS"}
        ]   },
        
    ];
    
    return {
      getDossiers: function() {
          return dossiers;
      },
      
      getDossier: function(valDossier){
          for(var i = 0; i < dossiers.length; i++){
              var dossier = dossiers[i];
              if(dossier.value == valDossier){
                  return dossier;
              }
          }
          return null;
      },
      
      getMail: function(valDossier, idMail){
          var dossier = this.getDossier(valDossier);
          if(dossier){
              for(var i = 0; i < dossier.emails.length; i++){
                  var email = dossier.emails[i];
                  if(email.id == idMail){
                      return email;
                  }
              }
          }
          return null;
      },
      
      envoieMail: function(mail){
          var eltsEnvoyes = this.getDossier("ENVOYES");
          var idDernierMail = 0;
          eltsEnvoyes.emails.forEach(function(email){
              if(email.id > idDernierMail){
                  idDernierMail = email.id;
              }
          });
          mail.id = idDernierMail + 1;
          eltsEnvoyes.emails.push(mail);
      }
  }  
})