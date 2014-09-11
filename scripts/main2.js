
var socket = io.connect('http://54.68.129.229:8080');
var x2js = new X2JS();


var app = app || {} ;

// app.sketchGallery = (function(){

	'use strict';

	// listen to returnGml
	// append gallery

	var containerId = 'cards';
	var lastId = ''
	socket.on('returnGml', function(msg){
		'use strict';
		var msgs = msg.split('~');
		lastId = msgs[1];
		msg = msgs[0];
		app.renderer.render(msg);
	});

socket.emit('get', '');

$(window).scroll(function() {
	'use strict';
	if($(window).scrollTop() + $(window).height()=== $(document).height()) {
		socket.emit('get', {'lastDate' : lastId});
	}
});

