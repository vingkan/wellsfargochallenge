function Sample(textLine, topicOverride){
	var values = textLine.split("|");
	this.id = values[0];
	this.date = values[1];
	this.year = values[2];
	this.month = values[3];
	this.source = values[4];
	var sampleText = preParseText(values[5]);
	if(this.source === 'twitter'){
		this.text = parseTwitterText(sampleText);
	}
	else{
		this.text = sampleText;
	}
	this.topic = topicOverride || 'NO-TOPIC';
}

Sample.prototype.toHTML = function(targetID){
	var div = document.createElement('div');
	var text = document.createTextNode(this.text);
	div.appendChild(text);
	div.classList.add('social-media-sample');
	if(targetID){
		var output = document.getElementById(targetID);
		output.appendChild(div);
	}
	else{
		return div;
	}
}

Sample.prototype.toComparableHTML = function(targetID, bonus){
	var div = document.createElement('div');
	var span = document.createElement('span');
	var score = document.createTextNode(bonus.score);
	span.appendChild(score);
	div.appendChild(span);
	var text = document.createTextNode(this.text);
	div.appendChild(text);
	var matches = document.createElement('div');
	var list = document.createTextNode(bonus.matches);
	matches.appendChild(list);
	div.appendChild(matches);
	div.classList.add('social-media-sample');
	div.classList.add('sample-comparison');
	div.style.opacity = bonus.opacity;
	if(targetID){
		var output = document.getElementById(targetID);
		output.appendChild(div);
	}
	else{
		return div;
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