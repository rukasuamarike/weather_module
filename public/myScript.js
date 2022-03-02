
var localbtn= document.querySelector("#local");
var button = document.querySelector("#submit");
var townField = document.querySelector("#town");
var pos;
button.addEventListener('click', getTown);
localbtn.addEventListener('click', getLocal);

function getTown(){
  if(townField.value!=''){
  window.location.replace('/forecast?'+townField.value);//redirect to rendered response
  }
  else(
    window.alert("enter a valid town name please")
  )
}
function getLocal() {

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        pos = [position.coords.latitude,position.coords.longitude];
        console.log(pos);
        window.location.replace('/localforecast?'+pos);
      },
      (err) => {
        console.log(err.message,"err");
      },
      {
        enableHighAccuracy: true
      }
    );
  }
  
    
}

function sendReq() {
  fetch('/someroute')
    .then(function(response){
      return response.json();
    })
    .then(function(data){
      // console.log(data.message);
      console.log(data);
    })
    .catch(function (err){
      console.log(err);
    })
}
