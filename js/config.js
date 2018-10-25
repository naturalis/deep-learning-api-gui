var servicePath = "https://identify.biodiversityanalysis.nl/alpha/observation/";
var modelname = "benlall";
var apiUrl = servicePath + "identify/" + modelname;
var taxonIdentUrl = servicePath + "taxa/" + modelname;
var maxFileUploads = { mobile: 1, desktop: 4 };
var maxResults = 3;
var minProbability = 0.10;
var currentLanguage = "nl";

var texts = {
  "nl" : {
    "mainTitle" : "Soortherkenning",
    "subTitle" : "Demonstratie-site van de service voor herkenning van in het wild voorkomende Nederlandse en Belgische soorten op basis van veldfoto's",
    "resultsPlaceholder" : "resultaten", 
    "dropzoneStartMessage": `<br />Voor identificatie, <i>drag & drop</i> hier afbeelding(en)<br/>of klik op de upload-knop om afbeelding(en) te selecteren.<br /><br />
      Voor nog betere resultaten: voeg meerdere afbeeldingen <b>tegelijk</b> toe van dezelfde waarneming (maximaal 4).`,
    "dropzoneStartMessageMobile": `<br /><br /><br />Klik op de upload-knop om een foto te maken of te selecteren.`,
    "sourceLine1" : "Deze service raadpleegt het herkenningsmodel van <a href='https://waarneming.nl/' target='_blank'>Waarneming.nl</a>",
    "sourceLine2" : "<a href='https://waarneming.nl/registreer.php' target='_blank'>Draag bij</a> aan het verbeteren van de herkenning door je waarnemingen op te slaan op Waarneming.nl",
    "guiDocItem" : "Documentatie",
    "apiDocItem" : "API documentatie",
    "loginItem" : "Login",
    "taxonDocItem" : "Soorten in database (JSON)",
    "contactItem" : "Contact",
    "initiativeHeader" : "Een initiatief van",
    "cooperationHeader" : "In samenwerking met",
    "moreInfo" : "meer info:",
    "httpError429": "Het maximum aantal herkenningen per dag is bereikt. Wil je meer beelden herkennen neem dan contact met ons op.",
    "httpError400": "Upload minimaal &eacute;&eacute;n foto.",
    "httpError405": "De API accepteert alleen met POST-requests.",
    "httpError415": "Je kunt alleen bestanden van het type JPG en PNG uploaden.",
    "httpError500": "Er is een fout opgetreden. Probeer het opnieuw.",
    "serverResponse0" : "De server geeft geen antwoord. Probeer het later opnieuw.",
    "noResults" : "De service heeft geen soorten herkend op je foto('s).",
  }
}
