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
const mZero = document.querySelector("#m-0")
const mOne = document.querySelector("#m-1")
const mTwo = document.querySelector("#m-2")
const mThree = document.querySelector("#m-3")


weatherForm.addEventListener('submit', async (event) => {
    event.preventDefault()
    const location = search.value

    messageZero.textContent = 'Loading....'
    messageOne.textContent = ''
    messageTwo.textContent = ''
    messagethree.textContent = ''
    messagefour.textContent = ''
    messagefive.textContent = ''
    var val = ""
    mZero.textContent = 'Loading....'
    mOne.textContent = ''
    mTwo.textContent = ''
    mThree.textContent = ''
    // mfour.textContent = ''
    // mfive.textContent = ''

    func = function () {
        var type = document.getElementsByName("type");
        if (type[0].checked) {
            return type[0].value;
        }

        else {
            return type[1].value;
        }
    }

    await fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            val = func()
            messageZero.textContent = ''
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                getLocMap(data.latitude, data.longitude);
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast.daily_summary

                if (val === "si") {
                    data.forecast.temperature = (data.forecast.temperature - 32) * (5 / 9)
                    messagethree.textContent = data.forecast.temperature.toFixed(2) + "° C"
                }
                else {
                    messagethree.textContent = data.forecast.temperature + "° F"

                }
                messagefour.textContent = data.forecast.humidity
                messagefive.textContent = data.forecast.precipitation

            }
        })
    })

    await fetch('/aqi?address=' + location).then((response) => {
        response.json().then((data) => {
            mZero.textContent = ''
            if (data.error) {
                mOne.textContent = data.error
            } else {
                if (!data.forecast.results) {
                    console.log("No Results Found")
                }
                else {
                    const mesurements = data.forecast.results[0].measurements

                    mOne.textContent = data.forecast.results[0].location
                    for (i = 0; i < mesurements.length; i++) {
                        if (mesurements[i].parameter == "no2") {
                            mTwo.textContent = mesurements[i].value + " " + mesurements[i].unit
                        }
                        if (mesurements[i].parameter == "pm25") {
                            mThree.textContent = mesurements[i].value + " " + mesurements[i].unit
                        }
                    }
                }



            }
        })
    })

})




