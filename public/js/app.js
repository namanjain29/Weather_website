console.log('client side javascript file is loaded')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector("#message-1")
const messageTwo = document.querySelector("#message-2")
const messagethree = document.querySelector("#message-3")
const messagefour = document.querySelector("#message-4")
const messagefive = document.querySelector("#message-5")


weatherForm.addEventListener('submit',(event)=>{
    event.preventDefault()
    const location = search.value

    messageOne.textContent = 'Loading....'
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

fetch('http://localhost:3000/weather?address='+ location).then((response)=>{
    response.json().then((data)=>{
        val = func()
        if (data.error){
            messageOne.textContent = data.error
        }else{
            messageOne.textContent = "Location : " + data.location
            messageTwo.textContent = "Daily Summary : " + data.forecast.daily_summary
            
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




