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

WordMap.prototype.cleanseWord = function(thisWord){
	var response = thisWord;
	response = response.toLowerCase();
	//ELIMINATE CHARACTERS AT LAST CHARACTER
		/*var lastChar = response.charAt(response.length-1);
		if(lastChar === '.' || lastChar === '#' || lastChar === ':' || lastChar === ',' || lastChar === '/' || lastChar === '-'){
			response = response.substr(0, response.length - 1);
		}*/
	//ELIMINATE CHARACTERS GLOBALLY BY REGEX
	response = response.replace(/\ /g, '');
	response = response.replace(/\./g, '');
	response = response.replace(/\#/g, '');
	response = response.replace(/\*/g, '');
	response = response.replace(/\:/g, '');
	response = response.replace(/\;/g, '');
	response = response.replace(/\,/g, '');
	response = response.replace(/\//g, '');
	response = response.replace(/\-/g, '');
	response = response.replace(/\!/g, '');
	response = response.replace(/\?/g, '');
	response = response.replace(/\(/g, '');
	response = response.replace(/\)/g, '');
	response = response.replace(/\[/g, '');
	response = response.replace(/\]/g, '');
	return response;
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
	if(cleanWord.length > 0){
		var index = this.hasWord(cleanWord);
		if(!this.isIgnored(cleanWord)){
			if(index < 0){
				this.addNewWord(cleanWord);
			}
			else{
				this.countWord(cleanWord);
			}
		}
		else{
			this.ignoredCatches++;
			//console.log('Caught ignored word: ' + thisWord);
		}
		this.totalWords++;
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
		console.log((w+1) + '. ' + result.word + ' (' + result.count + ')');
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
	var response = false;
	var size = this.ignored.length;
	for(var b = 0; b < size; b++){
		if(this.ignored[b] === thisWord){
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
			currentWord.length > 0
		){
			//console.log('adding: "' + currentWord + '"');
			frequencyMap.map.push({
				word: this.cleanseWord(currentWord),
				count: frequency
			});
		}
	}
	return frequencyMap;
}