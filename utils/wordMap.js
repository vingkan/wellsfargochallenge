function WordMap(blackListedWords){
	this.map = [];
	//To Show Format of Entries
	/*this.map.push({
		word: 'sample',
		count: 0
	});*/
	this.blackList = blackListedWords || [];
}

WordMap.prototype.cleanseWord = function(thisWord){
	var response = thisWord;
	response.toLowerCase();
	/*response.replace(/\./g, '');
	response.replace(/\#/g, '');*/
	return response;
}

WordMap.prototype.hasWord = function(search){
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
	var index = this.hasWord(cleanWord);
	if(!this.isBlackListed(cleanWord)){
		if(index < 0){
			this.addNewWord(cleanWord);
		}
		else{
			this.countWord(cleanWord);
		}
	}
	else{
		//console.log('Caught blacklisted word: ' + thisWord);
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
	this.sort(topResults);
	var result;
	for(var w = 0; w < size; w++){
		result = this.get(w);
		console.log(w + '. ' + result.word + ' (' + result.count + ')');
	}
}

WordMap.prototype.addBlackListedWord = function(badWord){
	this.blackList.push(badWord);
	var index = this.hasWord(badWord);
	if(index < 0){
		//Do nothing
	}
	else{
		this.map.splice(index, 1);
	}
}

WordMap.prototype.isBlackListed = function(thisWord){
	var response = false;
	var size = this.blackList.length;
	for(var b = 0; b < size; b++){
		if(this.blackList[b] === thisWord){
			response = true;
			break;
		}
	}
	return response;
}