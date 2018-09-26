var servicePath = "https://identify.biodiversityanalysis.nl/alpha/observation/";
var modelname = "benlall";
var apiUrl = servicePath + "identify/" + modelname;
var taxonIdentUrl = servicePath + "taxa/" + modelname;

var maxFileUploads = { mobile: 1, desktop: 4 };
var maxResults = 3;

var currentLanguage = "nl";

var texts = {
  "nl" : {
    "mainTitle" : "Soortherkenning",
    "subTitle" : "Demonstratie-site van de service voor herkenning van in het wild voorkomende Nederlandse en Belgische soorten op basis van veldfoto's",
    "resultsPlaceholder" : "resultaten", 
    "dropzoneStartMessage": `<br /><br />Voor identificatie, <i>drag & drop</i> hier afbeelding(en),<br/>klik op de upload-knop om afbeelding(en) te selecteren<br/>
      of plak een afbeelding uit het klembord (ctrl+v).<br /><br />
      Voor nog betere resultaten: voeg meerdere afbeeldingen <b>tegelijk</b> toe van dezelfde waarneming (maximaal 4).`,
    "dropzoneStartMessageMobile": `<br /><br /><br />Klik op de upload-knop om een foto te maken of te selecteren.`,
    "sourceLine1" : "Herkenningen zijn gebaseerd op beelden van Waarneming.nl",
    "sourceLine2" : "Draag bij aan het verbeteren van de herkenning door je waarnemingen op te slaan op Waarneming.nl",
    "guiDocItem" : "Documentatie",
    "apiDocItem" : "API documentatie",
    "loginItem" : "Login",
    "taxonDocItem" : "Soorten in database",
    "contactItem" : "Contact",
    "initiativeHeader" : "Een initiatief van",
    "cooperationHeader" : "In samenwerking met",
    "moreInfo" : "meer info:",
    "httpError429": "Het maximum aantal herkenningen per dag is bereikt. Wilt u meer beelden herkennen neem dan contact met ons op.",
    "httpError400": "Upload minimaal &eacute;&eacute;n foto.",
    "httpError405": "De API accepteert alleen met POST-requests.",
    "httpError415": "U kunt alleen bestanden van het type JPG en PNG uploaden.",
    "httpError500": "Er is een fout opgetreden. Probeer het opnieuw."
  }
}
