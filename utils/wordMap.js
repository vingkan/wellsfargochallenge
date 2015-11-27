function WordMap(){
	this.map = [];
	this.map.push({
		word: 'sample',
		count: 0
	});
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
	if(index < 0){
		this.addNewWord(thisWord);
	}
	else{
		this.countWord(thisWord);
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
		console.log(w + '. ' + result.word + '(' + result.count + ')');
	}
}