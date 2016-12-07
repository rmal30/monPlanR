var defaultPrefs = {
  tooltips: true
}

//set up currentPrefences
var prefs = $.extend(defaultPrefs);

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

function updatePrefs(prefType){
  if(prefType === "tooltips"){
    return prefs.tooltips
  }
}

export default updatePrefs
