"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var geocodeByAddress = exports.geocodeByAddress = function geocodeByAddress(address, callback) {
  var geocoder = new google.maps.Geocoder();
  var OK = google.maps.GeocoderStatus.OK;

  geocoder.geocode({ address: address }, function (results, status) {
    if (status !== OK) {
      callback({ status: status }, null, results);
      return;
    }

    var latLng = {
      lat: results[0].geometry.location.lat(),
      lng: results[0].geometry.location.lng()
    };

    callback(null, latLng, results);
  });
};

var geocodeByPlaceId = exports.geocodeByPlaceId = function geocodeByPlaceId(placeId, callback) {
  var geocoder = new google.maps.Geocoder();
  var OK = google.maps.GeocoderStatus.OK;

  geocoder.geocode({ placeId: placeId }, function (results, status) {
    if (status !== OK) {
      callback({ status: status }, null, null);
      return;
    }

    var latLng = {
      lat: results[0].geometry.location.lat(),
      lng: results[0].geometry.location.lng()
    };

    callback(null, latLng, results);
  });
};