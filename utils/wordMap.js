function WordMap(ignoredWords){
	this.map = [];
	this.totalWords = 0;
	//To Show Format of Entries
	/*this.map.push({
		word: 'sample',
		count: 0
	});*/
	this.ignored = ignoredWords || [];
	this.ignoredCatches = 0;
}

function cleanseWord(dirty){
	var clean = dirty.trim();
	clean = clean.toLowerCase();
	clean = clean.replace(/\ /g, '');
	clean = clean.replace(/\./g, '');
	clean = clean.replace(/\#/g, '');
	clean = clean.replace(/\*/g, '');
	clean = clean.replace(/\:/g, '');
	clean = clean.replace(/\;/g, '');
	clean = clean.replace(/\,/g, '');
	clean = clean.replace(/\//g, '');
	clean = clean.replace(/\-/g, '');
	clean = clean.replace(/\!/g, '');
	clean = clean.replace(/\?/g, '');
	clean = clean.replace(/\(/g, '');
	clean = clean.replace(/\)/g, '');
	clean = clean.replace(/\[/g, '');
	clean = clean.replace(/\]/g, '');
	clean = clean.replace(/\&/g, '');
	clean = clean.replace(/\$/g, '');
	return clean;
}

WordMap.prototype.cleanseWord = function(thisWord){
	return cleanseWord(thisWord);
}

WordMap.prototype.hasWord = function(searchFor){
	var search = this.cleanseWord(searchFor);
	var index = -1;
	var size = this.map.length;
	for(var w = 0; w < size; w++){
		if(this.map[w].word === search){
			index = w;
			break;
		}
	}
	return index;
}

WordMap.prototype.addNewWord = function(newWord){
	this.map.push({
		word: newWord,
		count: 1
	});
}

WordMap.prototype.countWord = function(thisWord){
	var index = this.hasWord(thisWord);
	this.map[index].count++;
}

WordMap.prototype.add = function(thisWord){
	var cleanWord = this.cleanseWord(thisWord);
	if(cleanWord.length > 1){
		var index = this.hasWord(cleanWord);
		if(this.isIgnored(cleanWord)){
			this.ignoredCatches++;
			//console.log('Caught ignored word: ' + thisWord);
		}
		else{
			if(index < 0){
				this.addNewWord(cleanWord);
			}
			else{
				this.countWord(cleanWord);
			}
		}
		this.totalWords++;
	}
	else{
		//console.log('rejected: ' + cleanWord);
	}
}

WordMap.prototype.get = function(index){
	var response = null;
	if(index >= 0 && index < this.map.length){
		response = this.map[index];
	}
	return response;
}

WordMap.prototype.sort = function(descending){
	this.map.sort(function(a, b){
		if(descending){
			//Sorts word pairings so most frequent are first
			return b.count - a.count;	
		}
		else{
			//Sorts word pairings so most frequent are last
			return a.count - b.count;
		}
	});
}

WordMap.prototype.getResults = function(size, topResults){
	if(topResults){
		console.log('Most Frequent Results:');
	}
	else{
		console.log('Least Frequent Results:');
	}
	if(size === 'ALL'){
		size = this.map.length;
	}
	this.sort(topResults);
	var result;
	for(var w = 0; w < size; w++){
		result = this.get(w);
		if(result){
			console.log((w+1) + '. ' + result.word + ' (' + result.count + ')');
		}
	}
	console.log('Caught ' + this.ignoredCatches + ' ignored words.');
	console.log('Total Words Analyzed: ' + this.totalWords);
}

WordMap.prototype.addIgnoredWord = function(badWord){
	this.ignored.push(badWord);
	var index = this.hasWord(badWord);
	if(index < 0){
		//Do nothing
	}
	else{
		this.map.splice(index, 1);
	}
}

WordMap.prototype.isIgnored = function(thisWord){
	var targetWord = this.cleanseWord(thisWord);
	var response = false;
	var size = this.ignored.length;
	for(var b = 0; b < size; b++){
		if(this.cleanseWord(this.ignored[b]) === targetWord){
			response = true;
			break;
		}
	}
	return response;
}

WordMap.prototype.getFrequency = function(thisWord){
	var frequency = 0.0;
	var cleanWord = this.cleanseWord(thisWord);
	var index = this.hasWord(cleanWord);
	if(index < 0){
		//Do Nothing
	}
	else{
		var wordCount = this.map[index].count;
		frequency = wordCount / this.totalWords;
		//console.log(wordCount + ' / ' + this.totalWords + ' = ' + frequency);
	}
	return frequency;
}

WordMap.prototype.getFrequencyMap = function(wordList){
	var frequencyMap = new WordMap();
	var size = wordList.length;
	var currentWord = '';
	for(var w = 0; w < size; w++){
		currentWord = this.cleanseWord(wordList[w]);
		var frequency = this.getFrequency(currentWord);
		if(
			frequency > 0 &&
			frequencyMap.hasWord(currentWord) === -1 &&
			!this.isIgnored(currentWord) &&
			currentWord.length > 1
		){
			//console.log('adding: "' + currentWord + '"');
			frequencyMap.map.push({
				word: currentWord,
				count: frequency
			});
		}
		else{
			//console.log('unsatisfied: ' + currentWord)
		}
	}
	return frequencyMap;
}

WordMap.prototype.getNonIgnoredWords = function(sample){
	var response = [];
	var thisText = sample.text.split(" ");
	var textSize = thisText.length;
	var currentWord = '';
	for(var t = 0; t < textSize; t++){
		currentWord = this.cleanseWord(thisText[t]);
		if(this.isIgnored(currentWord) || currentWord.length <= 1){

		}
		else{
			var found = false;
			var listSize = response.length;
			for(var r = 0; r < listSize; r++){
				if(response[r] === currentWord){
					found = true;
					break;
				}
			}
			if(!found){
				response.push(currentWord);
			}
		}
	}
	return response;
}

WordMap.prototype.getMatches = function(sampleList1, sampleList2){
	var matches = [];
	var wordsList1 = sampleList1.slice();//this.getNonIgnoredWords(sample1);
	var wordsList2 = sampleList2.slice();//this.getNonIgnoredWords(sample2);
	var size1 = wordsList1.length;
	for(var a = 0; a < size1; a++){
		if(wordsList1[a].length > 1){
			var size2 = wordsList2.length;
			for(var b = 0; b < size2; b++){
				if(wordsList1[a] === wordsList2[b]){
					matches.push(wordsList1[a]);
					wordsList2.splice(b, 1);
					break;
				}
			}
		}
		else{
			//console.log('caught: ' + wordsList1[a]);
		}
	}
	/*if(matches.length === 1 && matches[0].charAt(0) === 'i'){
		console.log(matches + ': ' + this.isIgnored(matches[0]));
	}*/
	return matches;
}

WordMap.prototype.compareSamples = function(sample1, sample2){
	var score = 0;
	//console.log(sample1.keywords, sample2.keywords)
	var matches = this.getMatches(sample1.keywords, sample2.keywords);
	var size = matches.length;
	for(var m = 0; m < size; m++){
		var frequency = this.getFrequency(matches[m]);
		var inverseFrequency = Math.pow(frequency, -1);
		//Just checking to be sure the math works
		//console.log(frequency + '^-1 = ' + inverseFrequency);
		score += inverseFrequency;
	}
	return score;
}