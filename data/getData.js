var fileURL = 'https://c7bc5a3a1eec525091f717ca9c0611b2d48ebf9f-www.googledrive.com/host/0B5EZCXdq2crRbG94TGhuNk1tcU0';
//var fileURL = 'http://localhost:8000/data/sample-data.txt';
//var fileURL = 'http://localhost:8000/data/social-media-data.txt';

$.get(fileURL, function(data){
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
});

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