//default Prefences
var defaultPrefs = {
  tooltips: true;
}

//set up currentPrefences
var currentPrefs = $.extend(defaultPrefs);

//this function gets user prefences
function getPrefs(){
  var usrTooltips = localStorage.getItem('tooltips');


  if(usrTooltips !== false){
    prefs.tooltips = usrTooltips === "true";
  }



}

//this function sets up prefences
function setPrefs(){
  localStorage.setItem("tooltips",prefs.tooltips);
}

function updatePrefs(){
  // this function is supposed to set the current prefences into the modal
}
