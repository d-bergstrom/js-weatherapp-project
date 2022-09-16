/* 
    Author:         David Bergstrom
    Description:    This file handles all API requests from the AccuWeather website 
*/


const apiKey = "XXvZPsPGcbAOTCJlwAG0QBHnyNI1S2RO";

// Async function to make a promise in order to fetch API city location key
const cityLocation = async (city) => {

    const apiEndpoint = "http://dataservice.accuweather.com/locations/v1/cities/search";
    const query = `?apikey=${apiKey}&q=${city}`;

    const response = await fetch(apiEndpoint + query);

    //API Request Error Checking
    if (response.status !== 200) {
        throw new Error('Cannot fetch the data');
    }

    //Turn response JSON into a JavaScript object
    const data = await response.json();

    //Return the first data (best match)
    //Return City Inforation Object
    //console.log("Location Key", data[0]);
    return data[0];
};


// Async function that uses API location key from cityLocation function to get weather info
const cityWeather = async (id) => {

    const apiEndpoint = "http://dataservice.accuweather.com/currentconditions/v1/";
    const query = `${id}?apikey=${apiKey}`;

    const response = await fetch(apiEndpoint + query);

    //Request Error Checking
    if (response.status !== 200) {
        throw new Error('Cannot fetch the data');
    }

    //Turn response JSON into a JavaScript object
    const data = await response.json();

    //Return the first data (best match)
    //Return Weather Inforation Object
    //console.log("Weather Info", data[0]);
    return data[0];
};



// // Test Accuweather API
// cityLocation('chicago')
//     .then(data => {
//         return cityWeather(data.Key);
//     }).then(data => {
//         console.log(data);
//     }).catch(err => console.log('Error:', err.message));