"use strict";

var categories = [];
var features = [];

var buttonClick = function (button, list) {
  $(button).click(function() {
    var item = $(this).attr('id');
    var index = jQuery.inArray('.' + item, list);
    if (index > -1) {
      list.splice(index, 1);
    } else {
      list.push('.' + item);
    }
    console.log(list);
    displayResources();
  });
};

var displayResources = function() {
  $('.resource').removeClass("active"); // hide all resources
  hideAllMapPoints();
  var areSelectedCategories = categories.length > 0;

  if (areSelectedCategories || features.length > 0) {
    var toDisplay = $('.resource' + features.join('')); //

    if (areSelectedCategories) {
      toDisplay = toDisplay.filter(categories.join(', '));
    }

    toDisplay.addClass("active"); // shows appropriate resources e.g., $('.resource.translation').filter('.dental-care, .hygiene')')
    displaySelectedMapPoints(toDisplay);
  }
}

var geocoder;
var map;
var markers = [];
var visibleMarkers = [];
var infoWindow;


var hideAllMapPoints = function() {
  infoWindow.close();
  for (var key in markers) {
    if (markers.hasOwnProperty(key)) {
      markers[key].setVisible(false);
    }
  }
}

var displaySelectedMapPoints = function(toDisplay) {
  toDisplay.find('.map-point').each(function() {
      var address = $(this).attr('address');
      markers[address].setVisible(true);
  });
}

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 47.608, lng: -122.335},
    zoom: 11
  });
  geocoder = new google.maps.Geocoder();
  infoWindow = new google.maps.InfoWindow({});

  // loop through and plot all map points
  $('.map-point').each(function() {
    var that = $(this);
    var address = that.attr('address');
    geocoder.geocode({'address' : address}, function(results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        var marker = new google.maps.Marker({
          map: map,
          position: results[0].geometry.location
        });

        google.maps.event.addListener(marker, 'click', function(){
          infoWindow.setContent(that.html());
          infoWindow.open(map, marker);
        });

        markers[address] = marker;
        markers[address].setVisible(false);
      }
    });
  });
}

$(document).ready(function(){
  $('.resource-header').click(function() {
    $(this).next('.resource-content').toggle();
  });

  buttonClick('.btn-filter', features);
  buttonClick('.btn-category', categories);
  buttonClick('input[type="checkbox"]', categories);

  $('.dropdown-menu').click(function(e) {
    e.stopPropagation();
  });

});
