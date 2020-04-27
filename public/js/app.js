console.log('client side javascript file is loaded')

// Making a map and tiles
// Setting a higher initial zoom to make effect more obvious
     
const mymap = L.map('issMap').setView([0, 0], 6);
const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(mymap);

let marker = L.marker([0, 0],).addTo(mymap);


async function getLocMap(latitude, longitude) {
    // Always set the view to current lat lon and zoom!
    mymap.setView([latitude, longitude], mymap.getZoom());
    marker.setLatLng([latitude, longitude]);
}


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageZero = document.querySelector("#message-0") 
const messageOne = document.querySelector("#message-1")
const messageTwo = document.querySelector("#message-2")
const messagethree = document.querySelector("#message-3")
const messagefour = document.querySelector("#message-4")
const messagefive = document.querySelector("#message-5")


weatherForm.addEventListener('submit',(event)=>{
    event.preventDefault()
    const location = search.value

    messageZero.textContent = 'Loading....'
    messageOne.textContent = ''
    messageTwo.textContent = ''
    messagethree.textContent = ''
    messagefour.textContent = ''
    messagefive.textContent = ''
    var val = ""

func = function() {
    var type = document.getElementsByName("type");
    if(type[0].checked)
    {
        return type[0].value;
    }
    
    else
    {
        return type[1].value;
    }
}

fetch('/weather?address='+ location).then((response)=>{
    response.json().then((data)=>{
        val = func()
        messageZero.textContent = '' 
        if (data.error){
            messageOne.textContent = data.error
        }else{
            getLocMap(data.latitude, data.longitude);
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast.daily_summary
            
            if (val === "si"){
                data.forecast.temperature = (data.forecast.temperature - 32)*(5/9)
                messagethree.textContent ="Temperature : " + data.forecast.temperature.toFixed(2) + "° C" 
            }
            else{
                messagethree.textContent ="Temperature : " + data.forecast.temperature + "° F" 
            
            }
            messagefour.textContent ="Humidity : " + data.forecast.humidity
            messagefive.textContent = "Precipitation : " + data.forecast.precipitation
            
        }
    })
})


})




