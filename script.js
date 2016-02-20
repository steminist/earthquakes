$(document).ready(function(){
    var REQUEST_URL = 'http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_hour.geojson';
    var objectContainer = $('#container');
    var responses = {
    objects: [],
    firstLoad: false,
    hasError: false
  };
  var template = Handlebars.compile($('#objectTemplate').html());
  $('#button').click(getObject);
  renderObject();

  function getObject() {
    $.get(REQUEST_URL).then(function(resp) {
      responses.objects.push(resp);
      responses.hasError = false;
    }).catch(function() {
      responses.hasError = true;
    }).always(function() {
      responses.firstLoad = true;
      renderInsult();
    });
  }

  function renderObject() {
    var templateHtml = template(responses);
    objectContainer.empty()
    objectContainer.html(templateHtml);
  }
});