function WordMap(blackListedWords){
	this.map = [];
	this.map.push({
		word: 'sample',
		count: 0
	});
	this.blackList = blackListedWords || [];
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
	var index = this.hasWord(thisWord);
	if(!this.isBlackListed(thisWord)){
		if(index < 0){
			this.addNewWord(thisWord);
		}
		else{
			this.countWord(thisWord);
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

WordMap.prototype.sort = function(){
	this.map.sort(function(a, b){
		//Sorts word pairings so most frequent are first
		return b.count - a.count;
	});
}

WordMap.prototype.getTopResults = function(size){
	this.sort();
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