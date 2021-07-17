const request = require("postman-request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoiYm91bmRraW14OSIsImEiOiJja3I1NHNucG0zMjNxMnBvOG4xbmRxcmhnIn0.m2kO8JcsIPNk3IaxQx2MbA&limit=1";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to location services!", undefined);
    } else if (body.features.length === 0) {
      callback("Unable to find location. Try another search");
    } else {
      const [y, x] = body.features[0].center;
      callback(undefined, {
        latitude: x,
        longitude: y,
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
