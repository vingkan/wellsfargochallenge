function Topic(headNode, baselineMap, pairThreshold){
	this.idList = [];
	this.headNode = headNode;
	this.topic = '';
	this.nodes = [];
	this.wordMap = new WordMap(BLACK_LIST);
	this.baselineMap = baselineMap;
	this.addNode(headNode);
	this.pairThreshold = pairThreshold;
}

Topic.prototype.addNode = function(newNode){
	this.idList.push(newNode.id);
	this.nodes.push(newNode);
	this.addAllWords(newNode.text);
	this.assessTopic();
}

Topic.prototype.hasID = function(targetID){
	var found = false;
	var size = this.idList.length;
	for(var i = 0; i < size; i++){
		if(this.idList[i] === targetID){
			found = true;
			break;
		}
	}
	return found;
}

Topic.prototype.addAllWords = function(text){
	var words = text.split(" ");
	var size = words.length;
	for(var w = 0; w < size; w++){
		this.wordMap.add(words[w]);
	}
}

Topic.prototype.assessTopic = function(){
	var response = [];
	//this.topic = this.wordMap.map[0].word;
	var size = this.wordMap.map.length;
	for(var w = 0; w < size; w++){
		var frequency = this.baselineMap.getFrequency(this.wordMap.map[w].word);
		var inverseFrequency = Math.pow(frequency, -1);
		var score = this.wordMap.map[w].count * inverseFrequency;
		response.push({
			word: this.wordMap.map[w].word,
			score: score
		});
	}
	response.sort(function(a, b){
		return b.score - a.score;
	});
	//console.log('Naive: ' + this.wordMap.map[0].word + ', Boosted: ' + response[0].word);
	this.topic = response[0].word;
}

Topic.prototype.getRepresentativeSample = function(){
	var response = this.headNode;
	response.keywords = this.wordMap.getAllWords();
	return response;
}

Topic.prototype.getKeywords = function(){
	return this.wordMap.getAllWords();
}