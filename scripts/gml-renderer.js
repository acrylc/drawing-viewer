
// socket.emit('test', 'fadsfasfa');

var d1 = function(processing, x1,y1,x2,y2){
	'use strict';
	processing.line(x1,y1,x2,y2);
};

var d2 = function(processing, x1,y1,x2,y2){
	'use strict';
	processing.ellipse( x1,y1,2,2);
};

app.gmlRenderer = (function(){

	'use strict';

	var width,height, points=[], duration, canvas;
	var drawingFun; 
	var _sketch = function(processing, $constants) {
		function setup() {
			processing.size(width, height);
			processing.background(245,246,243);
			processing.stroke(0);
			console.log('setting up');
			processing.fill(0);

			points.forEach(function(pt,index){
				var _pt = pt;
				var _index = index;
				// processing.fill(0);
					// processing.line(_pt.x, _pt.y, 20,100);

			if (index !==0){
			(function(){
				setTimeout(function(){
				drawingFun( processing, (_pt.x*width)-1, (_pt.y*height)-1, (points[_index-1].x*width)-1 ,(points[_index-1].y*height)-1);
				}, _pt.t*duration);
			})();
			}
			});
		}
		processing.setup = setup;
	};

	var clear = function(){
        if (!canvas) 
        	return;
		var context = canvas.getContext('2d');
        context.fillStyle = 'rgb(245,246,243)';
        context.fillRect(0,0,width,height);
	};


	var init2 = function (containerId, gml, t, w, h){

		duration = t || 1000;
		var el = document.getElementById(containerId);
		if (!el)
			return;
		canvas = document.createElement('canvas');
		var template = _.template($('#drawing-card-template').html());
		var t = $(template).appendTo(el);

		t.appendChild(canvas);
		// $('#'+el).append('<canvas id="gml-canvas2"></canvas');
		width = w || 500;
		height = h || 500;
		points = gml.tag.drawing.stroke.pt;
		console.log(points);
		var processingInstance = new Processing( canvas, _sketch);
	};

	var count = 0;
	var init = function(containerId, foo, t, w, h){
	
		clear();
		drawingFun = foo || {};
		socket.emit('get', '');
		socket.on('returnGml', function(msg){

			var x2js = new X2JS();
			var obj = JSON.parse(msg);
			console.log(obj);
			console.log(obj);
			var gml = (x2js.xml_str2json(obj.gml)).gml;
			console.log(gml);
			console.log(gml);
			window.gml = gml;
			init2(containerId, gml, t,w, h);
		});

	};

	var render = function(gml, el, t){
		var width = $(el).width;
		var height = $(el).height;
		duration = t;
		gml.tag.drawing.stroke.pt.forEach(function(pt){
			setTimeout(function(){
				ctx.fillRect(pt.x*width,pt.y*height,1,1); // fill in the pixel at (10,10)
			}, pt.t*duration);
		});
	};
	return {
		'init':init,
		'clear' : clear
	}

})();