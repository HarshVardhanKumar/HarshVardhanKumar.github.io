var latitude ;
var longitude ;
var url = "" ;
var forecastw = {} ;
var temperature1 = 0 ;
var temperatureunit = "" ;

var weather = {"clearday" : "https://orangesandavocados.files.wordpress.com/2011/11/griffith8.jpg" ,
    "clearnight" : "https://davidkirschberg.files.wordpress.com/2013/04/stars_texture.jpg",
    "rain" : "http://wallpapercave.com/wp/lVcZVvt.jpg" ,
    "snow" : "https://vignette4.wikia.nocookie.net/phobia/images/a/aa/Snow.jpg/revision/latest?cb=20161109045734" ,
    "sleet" : "http://severeweatherwiki.wikispaces.com/file/view/sleet.jpg/293148362/sleet.jpg" ,
    "wind" : "https://c1cleantechnicacom-wpengine.netdna-ssl.com/files/2014/04/wind-turbines17.jpg" ,
    "thunderstorm" : "http://www.homeadvisor.com/r/wp-content/uploads/2015/03/Dollarphotoclub_43826198-1024x680.jpg" ,
    "hail" : "https://cdn.thinglink.me/api/image/880204325165465602/1240/10/scaletowidth" ,
    "partlycloudynight" : "http://www.blueridgemuse.com/wp-content/uploads/2013/02/020413night-620x298.jpg" ,
    "partlycloudyday" : "http://newmail-ng.com/wp-content/uploads/2017/03/partly-cloudy-e1494955271328.jpg" ,
    "cloudy" : "http://www.skiescollection.com/wp-content/Downloads/Large_3000_jpg_Free/Overcast/SC_Overcast_007.jpg" ,
    "fog" : "https://static.pexels.com/photos/17579/pexels-photo.jpg" ,
    "weather" : "http://assets1.smoothradio.com/2013/30/weather-1375260252-hero-wide-1.jpg",
    "overcast" : "http://www.skiescollection.com/wp-content/Downloads/Large_3000_jpg_Free/Overcast/SC_Overcast_007.jpg"

  };

  var month = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'] ;
  function returnDate(varn) {
    var d = new Date(varn*1000) ;
    return d.getDate()+" "+month[d.getMonth()]+" "+d.getFullYear() ;
  }
  function testKey(e) {
    if(e.keyCode===13) {
      findlocation() ;
    }
  }
  function getString(vars) {
    var returs = vars.split("-") ;
    var r = "" ;
    for(var i = 0 ; i<returs.length; i++) {
      r+=returs[i] ;
    }
    return r.replace(" ", "") ;
  }
var latlong = "" ;
var addressl = 0 ;
  function findlocation() {
    $('#opac').css('opacity', 0.2) ;
    addressl = 1 ;
    var address = document.getElementById('textaddress').value+"" ;
    $.ajax({url: 'https://maps.googleapis.com/maps/api/geocode/json?address='+address+'&key=AIzaSyBoCRRbEs84If1UsBGQyzStE9b9njaxoAo',
            dataType: "JSON"  ,
            success: function(forecast1) {
                        console.log(forecast1) ;
                        //document.getElementById('demo').innerHTML = forecast["latitude"] ;
                        if(forecast1.status == "OK") {
                          var addres = forecast1.results[0].geometry.location.lat+","+forecast1.results[0].geometry.location.lng ;
                        $.ajax({url: 'https://api.darksky.net/forecast/02070c17b194daaa722994608c979bae/'+addres,
                                dataType: "jsonp",
                                success: function(forecast) {
                                  // change the loader and show the weather details 
                                   $('#opac').css('opacity', 1.0) ;
                                  console.log(forecast) ;
                                document.getElementById('textaddress').value = "" ;
          //document.getElementById('demo').innerHTML = forecast["latitude"] ;
                                setValue(forecast) ;
                                console.log('forecast') ;
                                document.getElementById('location').innerHTML="Location: "+forecast1.results[0].formatted_address ;
                                setValueForecast(forecast.daily.data) ;
                                },
                                error: function() {
                                  document.getElementById('textaddress').value = "Some error occurred" ;
                                }
                               });
                        }
                       } 
           });
    
  }

window.onload =  getlocation();
function getlocation() {
  $.ajax({ url: "https://ipinfo.io?token=306659d4b7114e",
           dataType: "JSON",
           success: function(response) {
                      console.log(response) ;
                      $.ajax({url: 'https://api.darksky.net/forecast/02070c17b194daaa722994608c979bae/'+response.loc,
                              dataType: "jsonp",
                              success: function(forecast) {
                                console.log(forecast) ;
      //document.getElementById('demo').innerHTML = forecast["latitude"] ;
                                         setValue(forecast) ;
                                         document.getElementById('location').innerHTML = "Location: "+response.city ;
                                         if(response.city==="") {
                                            document.getElementById('location').innerHTML = "Location: "+response.loc ;
                                         }
                                         setValueForecast(forecast.daily.data) ;
                                       }
                             });
                    }
         });
};

var i = 4 ;
function moveleft() {

  if(i>4) {
    document.getElementById('for'+(i)).style.display = "none" ;
    i = i-1 ;
    document.getElementById('for'+(i-3)).style.display = "block" ;
    document.getElementById('goright').style.display = "block" ;
  }
  else {
    document.getElementById('goleft').style.display = "none" ;
  }
  checksize(i-3) ;
}

function moveright() {

  if(i<8) {
    document.getElementById('for'+(i-3)).style.display = "none" ;
    i = i+1 ;
    document.getElementById('for'+i).style.display = "block" ;
    document.getElementById('goleft').style.display = "block" ;
  }
  else {
    document.getElementById('goright').style.display = "none" ;
    console.log("right is removed");
  }
  checksize(i-3) ;
}


function checksize(ivalue) {
  if(document.documentElement.clientWidth<=800) {
    for(var j = 1 ; j<=8 ; j++) {
      document.getElementById('for'+j).style.display = "none" ;
    }
    document.getElementById('for'+ivalue).style.display = "block" ;
  }
  else {
    for(var k = 1 ; k<=8 ; k++) {
      document.getElementById('for'+k).style.display = "none" ;
    }
    for(var jj = (i-3); jj<=i ; jj++) {
      document.getElementById('for'+jj).style.display = "block" ;
    }
  }
}

function setValue(forecastw) {

  var humidity = document.getElementById('humidity') ;
  var cloudCover = document.getElementById('cloud-cover') ;
  var dewPoint = document.getElementById('dew-point') ;
  var ozone = document.getElementById('ozone') ;
  var precipitationIntensity = document.getElementById('precipitationIntensity') ;
  var precipitationProbability = document.getElementById('precipitationProbability') ;

  var pressure = document.getElementById('pressure') ;
  var visibility = document.getElementById('visibility') ;
  var windSpeed = document.getElementById('wind-speed') ;
  var windBearing = document.getElementById('wind-bearing') ;
  var summary = document.getElementById('summary') ;
  var time = document.getElementById('time') ;
  var uvIndex = document.getElementById('uvIndex') ;
  var details = document.getElementById('details') ;


  if(testC("humidity", forecastw.currently)) {
    humidity.innerHTML = "humidity: "+Math.floor(forecastw.currently.humidity*10000)/100+" %" ;
  }
  else humidity.style.display = "none" ;
  if(testC("cloudCover", forecastw.currently)) {
    cloudCover.innerHTML = "cloud-cover: "+Math.round(forecastw.currently.cloudCover*10000)/100+" %" ;
  }
  else cloudCover.style.display = "none" ;
  if(testC('dewPoint', forecastw.currently)) {
    dewPoint.innerHTML = "dew-point: "+forecastw.currently.dewPoint+" F" ;
  }
  else dewPoint.style.display = "none" ;
  if(testC('ozone', forecastw.currently)) {
    ozone.innerHTML = "ozone: "+Math.floor(forecastw.currently.ozone*100)/100+" mm" ;
  }
  else ozone.style.display = "none" ;
  if(testC('precipIntensity', forecastw.currently)) {
    precipitationIntensity.innerHTML = "precipitationIntensity: "+forecastw.currently.precipIntensity ;
  }
  else {
    precipitationIntensity.style.display = "none" ;
  }
  if(testC('precipProbability', forecastw.currently)) {
    precipitationProbability.innerHTML = "precipitationProbability: "+forecastw.currently.precipProbability ;
  }
  else {
    precipitationProbability.style.display = "none" ;
  }
  if(testC('temperature', forecastw.currently)) {
    var temperature = document.getElementById('temperature11') ;
    temperature.innerHTML = forecastw.currently.temperature+" F" ;
    temperature1 = (Math.floor(forecastw.currently.temperature*100))/100 ;
    temperatureunit = "F" ;
    changeTemperature() ;
  }
  else temperature.innerHTML = temperature1+" F" ;
  if(testC('pressure', forecastw.currently)) {
    pressure.innerHTML = "pressure : "+forecastw.currently.pressure +" pa";
  }
  else pressure.style.display = "none" ;
  if(testC('visibility', forecastw.currently)) {
    visibility.innerHTML = "visibility: "+Math.floor(forecastw.currently.visibility*1.60*100)/100+" km" ;
  }
  else {
    visibility.style.display = "none" ;
  }
  if(testC('windSpeed', forecastw.currently)) {
    windSpeed.innerHTML = "windSpeed: "+Math.round(forecastw.currently.windSpeed*1.60934*1000)/1000+" km/hr" ;
  }
  else {
    windSpeed.style.display = "none" ;
  }
  if(testC('windBearing', forecastw.currently)) {
    windBearing.innerHTML = "wind Bearing: "+forecastw.currently.windBearing+" &deg;" ;
  }
  else {
    windBearing.style.display = "none" ;
  }
  if(testC('summary', forecastw.currently)) {
    summary.innerHTML = forecastw.currently.summary ;
    summary.style.fontSize = "4em";
  }
  if(testC('uvIndex', forecastw.currently)) {
    uvIndex.innerHTML = "uv - index: "+forecastw.currently.uvIndex ;
  }
  else {
    uvIndex.style.display = "none" ;
  }

  if('icon', forecastw.currently) {
    document.getElementById('body').style.backgroundImage = "url("+weather[getString(forecastw.currently.icon)]+")" ;
    document.getElementById('body').style.backgroundSize = "cover" ;

  }
  else {
    document.getElementById('body').style.backgroundImage = "url("+weather[weather]+")" ;
    document.getElementById('body').style.backgroundSize = "cover" ;
  }
}

function testC(va, forecastw) {
  return forecastw.hasOwnProperty(va+"") ;
}

function setValueForecast(forecastw) {


  for(var i = 1 ; i<=8 ; i++) {
    if(testC('time', forecastw[i-1])) {
      document.getElementById('date'+i).innerHTML = returnDate(forecastw[i-1].time) ;
    }
    else {
      document.getElementById('date'+i).style.display = "none" ;
    }

    if(testC('summary', forecastw[i-1])) {
      document.getElementById('summaryF'+i).innerHTML = forecastw[i-1].summary ;
      document.getElementById('summaryF'+i).style.color = "#fffeff" ;
    }
    else {
      document.getElementById('summaryF'+i).style.display = "none" ;
    }

    if(testC('temperatureMax', forecastw[i-1])) {
      document.getElementById('MaxTempF'+i).innerHTML = "MaxTemperature: "+forecastw[i-1].temperatureMax +" F" ;
    }
    else {
      document.getElementById('MaxTempF'+i).style.display = "none" ;
    }
    if(testC('temperatureMin', forecastw[i-1])) {
      document.getElementById('MinTempF'+i).innerHTML = "MinTemperature: "+forecastw[i-1].temperatureMin+" F" ;
    }
    else {
      document.getElementById('MinTempF'+i).style.display = "none" ;
    }

    if(testC('humidity', forecastw[i-1])) {
      document.getElementById('humidityF'+i).innerHTML = "Humidity: "+Math.floor(forecastw[i-1].humidity*10000)/100+" %" ;
    }
    else {
      document.getElementById('humidityF'+i).style.display = "none" ;
    }
    if(testC('precipProbability', forecastw[i-1])) {
      document.getElementById('precipProbabilityF'+i).innerHTML = "precipitation Probability: "+Math.floor(forecastw[i-1].precipProbability*10000)/100+" %" ;
    }
    else {
      document.getElementById('precipProbabilityF'+i).style.display = "none" ;
    }
    document.getElementById('ul'+i).style.backgroundImage = "url("+weather[getString(forecastw[i-1].icon)]+")" ;
    document.getElementById('ul'+i).style.backgroundSize = "cover" ;
  }

}
function changeTemperature() {
  if(temperatureunit==="F") {
    document.getElementById('temperature11').innerHTML =Math.round((( temperature1-32)*0.56 )*100)/100+"&deg; C";
    temperatureunit = "C" ;
  }
  else {
    document.getElementById('temperature11').innerHTML = (temperature1)+" F" ;
    temperatureunit = "F" ;
  }
}
