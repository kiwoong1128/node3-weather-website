const request = require("postman-request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=6e67aa869a76184b03e4fc44f5e4f486&query=" +
    encodeURIComponent(latitude) +
    "," +
    encodeURIComponent(longitude) +
    "&units=f";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather services.", undefined);
    } else if (body.error) {
      callback("Unable to find location.", undefined);
    } else {
      const temp = body.current.temperature;
      const feelsLike = body.current.feelslike;

      const summary = `Today's weather is ${body.current.weather_descriptions[0].toLowerCase()}. It is currently ${temp} degrees out. It feel like ${feelsLike} degrees out.`;
      callback(undefined, summary);
    }
  });
};

module.exports = forecast;
