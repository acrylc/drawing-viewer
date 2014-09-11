app.renderer = (function(){

	'use strict';

	var render = function(entry){

		var obj = JSON.parse(entry);
		var gml = (x2js.xml_str2json(obj.pts)).gml;

		if (gml.tag.drawing.stroke.pt.length===0){
			//if no points, render text
			console.log('text : '+obj.text);
			var template = _.template($('#text-card-template').html());
			console.log(template);
			$('#cards').append(template({'text':obj.text}));

		} else {
			var g = new GmlCanvas(containerId, {
				'width' : Math.floor(screen.width/4)-1-30,
				'height' : screen.width/4-30,
				'drawingFun' : utils.d1,
				'backgroundColor' : [240,240,240],
				'strokeColor' : [3]
			});
			g.render(gml, 5000);
		}
	};

	return {
		'render' : render
	};

})();