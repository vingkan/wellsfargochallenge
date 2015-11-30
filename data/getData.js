function getRandomDataArray(storage, size, id, dataCallback){
	
	var fileURL = 'https://c7bc5a3a1eec525091f717ca9c0611b2d48ebf9f-www.googledrive.com/host/0B5EZCXdq2crRbG94TGhuNk1tcU0';
	var response = [];
	
	$.get(fileURL, function(data){
		
		var textData = data;
		var lines = data.split("\n");
		var fileSize = lines.length;
		var randomIndex;
		var usedIndexes = [];

		//console.log('started');
		for(var i = 0; i < size; i++){

			//Ensures that each new data sample is unique
			var newIndex = false;
			while(!newIndex){
				var found = false;
				randomIndex = Math.floor(Math.random() * (fileSize - 1));
				var numUsed = usedIndexes.length;
				for(var u = 0; u < numUsed; u++){
					if(usedIndexes[u] === randomIndex){
						found = true;
						//console.log('already used ' + randomIndex)
						break;
					}
				}
				if(!found){
					newIndex = true;
				}
			}
			usedIndexes.push(randomIndex);

			//OLD JSON CONSTRUCTION
			/*var values = lines[randomIndex].split("|");
			var json = {
				id: values[0],
				date: values[1],
				year: values[2],
				month: values[3],
				source: values[4],
				text: values[5]
			}
			response.push(json);*/

			//NEW OBJECT CONSTRUCTION
			response.push(new Sample(lines[randomIndex]));

			//console.log(i);

		}
		//console.log('ended');

		var toStorage = {
			id: id,
			data: response
		}
		storage.add(toStorage);
		console.log('Added to storage with ID: ' + id);
		//Runs callback function with data;
		if(dataCallback){
			dataCallback(storage.get(id));
		}

	});

}

function getDataByIds(storage, idList, id, dataCallback){
	
	var fileURL = 'https://c7bc5a3a1eec525091f717ca9c0611b2d48ebf9f-www.googledrive.com/host/0B5EZCXdq2crRbG94TGhuNk1tcU0';
	var response = [];
	
	$.get(fileURL, function(data){
		
		var lines = data.split("\n");
		var fileSize = lines.length;
		var requestSize = idList.length;
		
		for(var i = 0; i < requestSize; i++){
			response.push(new Sample(lines[idList[i]]));
		}

		var toStorage = {
			id: id,
			data: response
		}
		storage.add(toStorage);
		console.log('Added to storage with ID: ' + id);
		//Runs callback function with data;
		if(dataCallback){
			dataCallback(storage.get(id));
		}

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