/* 
    Author:         David Bergstrom
    Description:    This file handles DOM Manipulation 
*/



/* ============== Get user input from Form text field ============== */
const userInput = document.querySelector('.user-input');
userInput.addEventListener('submit', event => {
    //Prevent default refresh submit action
    event.preventDefault();

    //Grab the value in the text form field
    const city = userInput.city.value;
    console.log(city);

    //Clear text entry after submission
    // userInput.reset();

    //Update the UI with the City and Weather Information
    getCity(city)
        .then(data => updateUI(data))
        .catch(err => console.log("Error:", err));

});

const getCity = async (city) => {
    //Wait until API calls are finished
    const cityInfo = await cityLocation(city);
    const weatherInfo = await cityWeather(cityInfo.Key);

    //Return the city info and weather info as objects within an object
    return { cityInfo, weatherInfo };
};

/* ================================================================= */





/* ===================== Update the UI Details ===================== */
const container = document.querySelector('.container');
const card = document.querySelector('.card');
const displayedInfo = document.querySelector('.displayed-info');

const updateUI = data => {



    console.log("City Info:", data.cityInfo);
    console.log("Weather Info:", data.weatherInfo);

    const cityName = data.cityInfo.LocalizedName;
    const stateName = data.cityInfo.AdministrativeArea.LocalizedName;
    const countryName = data.cityInfo.Country.LocalizedName;

    const temp = data.weatherInfo.Temperature.Imperial.Value;
    const weatherCondition = data.weatherInfo.WeatherText;

    displayedInfo.innerHTML =
        `
        <h3 class="mt-3 mb-0">${cityName}, ${stateName}</h5>
        <h5 class= "mt-0">${countryName}</h5>
        <h2 class="my-3">${weatherCondition}</h1>
        <h1 class="my-3">${temp} &deg;F</h2>
    `;

    if (card.classList.contains('d-none')) {
        card.classList.remove('d-none');
    }

    if (!container.classList.contains('d-flex')) {
        container.classList.add('d-flex');
        document.querySelector('.app-title').classList.remove('mt-5');
    }
}

/* ================================================================= */