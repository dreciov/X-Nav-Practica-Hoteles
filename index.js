// Show accomodations from a JSON file in a map.
// JSON file with accomodations is an adaption of the XML file
// with accomodations in Madrid from the open data portal of
// Ayuntamiento de Madrid (as of April 2016)
// Simple version. Doesn't work well if some of the fields are not defined.
// (for example, if there are no pictures)
//
function show_accomodation(){
  var accomodation = accomodations[$(this).attr('no')];
  var lat = accomodation.geoData.latitude;
  var lon = accomodation.geoData.longitude;
  var url = accomodation.basicData.web;
  var name = accomodation.basicData.name;
  var desc = accomodation.basicData.body;
  var img = accomodation.multimedia.media[0].url;
  var cat = accomodation.extradata.categorias.categoria.item[1]['#text'];
  var subcat = accomodation.extradata.categorias.categoria
   .subcategorias.subcategoria.item[1]['#text'];
   var marker = L.marker([lat, lon]).addTo(map)
	 .bindPopup('<a href="' + url + '">' + name + '</a><br/>')
	 .openPopup();
	marker.on("popupclose", function(){
		map.removeLayer(marker);
	})

  map.setView([lat, lon], 15);
  $('#info').html('<h2>' + name + '</h2>'
   + '<p>Type: ' + cat + ', subtype: ' + subcat + '</p>'
   + desc + '<img src="' + img + '"">');
};

function get_accomodations(){
  $.getJSON("alojamientos.json", function(data) {
    $('#get').html('');
    accomodations = data.serviceList.service
    //$('#list').after('<h1>' + accomodations.length + '</h1>');
    var list = '<p>Accomodations found: ' + accomodations.length
     + ' (click on any of them for details and location in the map)</p>'
    list = list + '<ul>'
    for (var i = 0; i < accomodations.length; i++) {
      list = list + '<li no=' + i + '>' + accomodations[i].basicData.title + '</li>';
    }
    list = list + '</ul>';
    $('#list').html(list);
    $("#listcolections").html(list);
    $('#list li').click(show_accomodation);
    $("#listcolections li").draggable({
    	revert: 'invalid	',
        helper: 'clone',   
        cursor: 'move'
    });
  });
};

$(document).ready(function() {
  map = L.map('map').setView([40.4175, -3.708], 11);
  L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);
   $(function() {
   		 $( "#general" ).tabs();
 	 });
   $(function() {
 	 	$("#button").button();
 	 });

  $("#get").click(get_accomodations);
  $("#botoncoleccion,#botonusers").click(function(){
	var val = $("#display").val();
	if(val!=""){
	var x = $("<div style=height: 800px;></div>");
	$("#colections").append("<h3>"+val+"</h3>");
	$("#colections").append(x);
	x.droppable({
		drop: function(ev, ui){
 			$(this).append($(ui.draggable).clone());  
 		}
	})
	$("#colections").accordion({collapsible: true, active:true, heightStyle: "content"})
	.accordion("refresh");
	}
})
  $("#botonusers").click(function(){
	var val = $("#display2").val();
	if(val!=""){
	var x = $("<div style=height: 800px;></div>");
	$("#users").append("<h3>"+val+"</h3>");
	$("#users").append(x);
	x.droppable({
		drop: function(ev, ui){
 			$(this).append($(ui.draggable).clone());  
 		}
	})
	$("#users").accordion({collapsible: true, active:true, heightStyle: "content"})
	.accordion("refresh");
	}
})


});
