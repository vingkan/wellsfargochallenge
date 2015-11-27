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

WordMap.prototype.addWord = function(thisWord){
	var index = this.hasWord(thisWord);
	if(index < 0){
		this.addNewWord(thisWord);
	}
	else{
		this.countWord(thisWord);
	}
}

var wordMap = new WordMap();

console.log("LOADED summary.js");