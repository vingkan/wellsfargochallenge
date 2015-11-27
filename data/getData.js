function getRandomDataArray(storage, size, id){
	
	var fileURL = 'https://c7bc5a3a1eec525091f717ca9c0611b2d48ebf9f-www.googledrive.com/host/0B5EZCXdq2crRbG94TGhuNk1tcU0';
	var response = [];
	
	$.get(fileURL, function(data){
		
		var textData = data;
		var lines = data.split("\n");
		var fileSize = lines.length;
		var randomIndex;

		//console.log('started');
		for(var i = 0; i < size; i++){
			randomIndex = Math.floor(Math.random() * (fileSize - 1));
			var values = lines[randomIndex].split("|");
			var json = {
				id: values[0],
				date: values[1],
				year: values[2],
				month: values[3],
				source: values[4],
				text: values[5]
			}
			//var stringified = JSON.stringify(json);
			response.push(json);
			//console.log(i);
		}
		//console.log('ended');

		var toStorage = {
			id: id,
			data: response
		}
		storage.add(toStorage);
		console.log('Added to storage with ID: ' + id);

	});

}

//PRIMARY APPROACH USING JQUERY REQUESTS
/*$.get(fileURL, function(data){
	var textData = data;
	console.log('started');
	var lines = data.split("\n");
	var fileSize = lines.length;
	//var fileSize = 100;
	document.write("[");
	for(var i = 0; i < 100; i++){
		var values = lines[i*100].split("|");
		var json = {
			id: values[0],
			date: values[1],
			year: values[2],
			month: values[3],
			source: values[4],
			text: values[5]
		}
		//console.log(json);
		var stringified = JSON.stringify(json);
		//console.log(stringified);
		document.write(stringified);
		document.write(",");
		console.log(i);
	}
	document.write("]");
	console.log('ended');
});*/

//ALTERNATE APPROACH USING XML REQUESTS
/*xhrDoc = new XMLHttpRequest();
xhrDoc.open('GET', fileURL, 'async');
if(xhrDoc.overrideMimeType){
	xhrDoc.overrideMimeType('text/plain; charset=x-user-defined');
}
xhrDoc.onreadystatechange = function(){
	if(this.readyState == 4){
		if(this.status == 200){
			var data = this.response;
			console.log(data);
		}
	}
}
xhrDoc.send();*/