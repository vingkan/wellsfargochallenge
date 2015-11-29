function Sample(textLine, topicOverride){
	var values = textLine.split("|");
	this.id = values[0];
	this.date = values[1];
	this.year = values[2];
	this.month = values[3];
	this.source = values[4];
	if(this.source === 'twitter'){
		this.text = parseTwitterText(values[5]);
	}
	else{
		this.text = values[5];
	}
	this.topic = topicOverride || 'NO-TOPIC';
}

Sample.prototype.compare = function(otherSample){

}

Sample.prototype.toHTML = function(targetID){
	var html = '';
	html += '<div class="social-media-sample">';
	html += this.text;
	html += '</div>';
	if(targetID){
		var output = document.getElementById(targetID);
		output.innerHTML += html;
	}
	else{
		return html;
	}
}

function preParseText(input){
	var output = input;
	output = output.replace(/\(/g, ' ');
	output = output.replace(/\)/g, ' ');
	return output;
}

function parseTwitterText(input){
	var output = '';
	var words = input.split(' ');
	var size = words.length;
	var nextWord = '';
	var nextIsHashtag = false;
	for(var w = 0; w < size; w++){
		nextWord = words[w];
		var lastChar = words[w].charAt(words[w].length - 1);
		if(lastChar === '#'){
			nextIsHashtag = true;
			nextWord = words[w].substr(0, words[w].length - 1);
			//console.log('Parsed: ' + words[w] + ' --> ' + nextWord);
		}
		if(nextIsHashtag){
			nextWord = '#' + nextWord;
			nextIsHashtag = false;
			//console.log('Hashtagged: ' + nextWord);
		}
		output += nextWord + ' ';
	}
	return output;
}