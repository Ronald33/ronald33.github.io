/* Base Layers */
var base_layers =
{
	basemaps:
	{
		carto: 'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png'
	}, 
    stamen:
    { 
        toner:  'http://{s}.tile.stamen.com/toner/{z}/{x}/{y}.png',   
        terrain: 'http://{s}.tile.stamen.com/terrain/{z}/{x}/{y}.png',
        watercolor: 'http://{s}.tile.stamen.com/watercolor/{z}/{x}/{y}.png',
        attrib: 'Map data &copy;2013 OpenStreetMap contributors, Tiles &copy;2013 Stamen Design'
    },
    mapBox:
    {
        azavea:     'http://{s}.tiles.mapbox.com/v3/azavea.map-zbompf85/{z}/{x}/{y}.png',
        worldLight: 'http://c.tiles.mapbox.com/v3/mapbox.world-light/{z}/{x}/{y}.png',
        attrib: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="http://mapbox.com">MapBox</a>'
    }
};
/* End Base Layers */

/* Tunki Layers */
var server = "http://190.41.156.3";
var tunki_layers = 
{
	humedales:
	{
		1: server + ':7075/tunkiason/ndwi/{z}/{x}/{y}', 
		2: server + ':7075/tunki8/ndwi/{z}/{x}/{y}', 
		3: server + ':7075/tunki9/ndwi/{z}/{x}/{y}', 
		4: server + ':7075/tunki10/ndwi/{z}/{x}/{y}', 
		5: server + ':7075/tunki11/ndwi/{z}/{x}/{y}'
	}, 
	rgb:
	{
		1: server + ':7074/tunkiason/rgb/{z}/{x}/{y}', 
		2: server + ':7074/tunki8/rgb/{z}/{x}/{y}', 
		3: server + ':7074/tunki9/rgb/{z}/{x}/{y}', 
		4: server + ':7074/tunki10/rgb/{z}/{x}/{y}', 
		5: server + ':7074/tunki11/rgb/{z}/{x}/{y}'
	}, 
};
/* End Tunki Layers */

/* Map */
var map = L.map('map');
map.setView([-15.708471, -71.278902], 6);
/* End Map */

/* Values Map */
var base, humedales, mosaico, value_slider;
/* End Values Map */

/* jQuery */
$(document).ready(inicio);

function inicio()
{
	startLayersDefault();
	/* Events */
	$("#radio_base input:radio").on('change', changeBase);
	$("#mostrar_humedales").on("change", changeMostrarHumedales);
	$("#mostrar_mosaico").on("change", changeMostrarMosaico);
	$("#ex19").on("slideStart", changeStart);
	$("#ex19").on("slideStop", changeStop);
	/* End Events */
}

function startLayersDefault()
{
	base = getTileLayer(base_layers.stamen.terrain);
	showBase();
	value_slider = 1;
	humedales = getTileLayer(tunki_layers.humedales[value_slider]);
	showHumedales();
}

function changeBase()
{
	map.removeLayer(base); /* Removing old base */
	base = getTileLayer(base_layers.stamen[$(this).val()]); /* Update base */
	showBase();
}

function changeMostrarHumedales()
{
	if($(this).is(':checked'))
	{
		humedales = getTileLayer(tunki_layers.humedales[$("#ex19").val()]);
		showHumedales();
	}
	else { map.removeLayer(humedales); }
}
function changeMostrarMosaico()
{
	if($(this).is(':checked'))
	{
		mosaico = getTileLayer(tunki_layers.rgb[$("#ex19").val()]);
		showMosaico();
	}
	else { map.removeLayer(mosaico); }
}
function changeStart() { old_slider = $("#ex19").val(); }
function changeStop()
{
	if($("#ex19").val() != value_slider)
	{
		value_slider = $("#ex19").val();
		/* Humedales */
		$("#mostrar_humedales").prop('checked', true);
		map.removeLayer(humedales);
		humedales = getTileLayer(tunki_layers.humedales[$("#ex19").val()]);
		showHumedales();
		/* Mosaico */
		if($("#mostrar_mosaico").is(':checked'))
		{
			map.removeLayer(mosaico);
			mosaico = getTileLayer(tunki_layers.rgb[$("#ex19").val()]);
			showMosaico();
		}
	}
}
/* End jQuery */

/* My functions */
function getTileLayer(nameLayer) { return new L.tileLayer(nameLayer); }
function showBase() { base.addTo(map); base.setZIndex(0); } /* Adding Map Base */
function showHumedales() { humedales.addTo(map); humedales.setZIndex(3); } /* Adding Map humedales */
function showMosaico() { mosaico.addTo(map); mosaico.setZIndex(2); } /* Adding Map Mosaic */
/* End my functions */
