var app = app || {};

app.form = (function(){

	'use strict';

	var _el = $('#moon-form'),
		_socket;

	var init = function( socket){

		app.gmlEditor.init('draw-input', 600,600);
		// _socket = socket;
		_bindListeners();
	};


	var _submit = function(){
		var entry = _getEntry();
		var isValid = _validateEntry(entry, function(err){
		});
		isValid ? _uploadEntry(entry) : false;
	};

	var _bindListeners = function(){

		//listen to erase
		$('.erase').on('click', function(){
			app.gmlEditor.clear();
		});

		$('.anon').on('click', function(){
			console.log('click');
			_submit();
			app.gmlEditor.clear();
		});
	};

	var _getEntry = function(){

		var textInput = $('#m-textarea').val();
		var imgInput = app.gmlEditor.getPoints();

		var entry = {
			text : textInput  || '',
			pts : app.gmlEditor.getGML()
		};

		// optonal input
		var optionalFieldInputs = {
			'age' : '#m-age',
			'name' : '#m-name',
			'country' : '#m-country',
		};
		for (var key in optionalFieldInputs){
			entry[key] = $(optionalFieldInputs[key]).val();
		}
		return entry;
	};

	var _validateEntry = function(entry){

		console.log(entry);
		// get required input (text or drawing)
		if (!entry.text && app.gmlEditor.getPoints().length===0){
			return false;
		}
		return true;
	};

	var _uploadEntry = function(entry){
		console.log('uploading');
		if (entry){
			entry.time = Date.now(); //add timestamp
			// _socket.emit('saveGml', JSON.stringify(entry));
			console.log('saving ' + JSON.stringify(entry));
		}
	};

	return {
		'init' : init
	};


})();

// var socket = io.connect('http://54.68.129.229:80');

app.form.init(  );