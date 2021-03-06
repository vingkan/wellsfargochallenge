function Topic(headNode, baselineMap, pairThreshold){
	this.id = headNode.id;
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
	this.updateTreshold(newNode);
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

Topic.prototype.updateTreshold = function(newNode){
	if(newNode.pairing.score === 'NO_SCORE'){

	}
	else{
		if(newNode.pairing.score < this.pairThreshold){
			this.pairThreshold = newNode.pairing.score;
		}
	}
}

Topic.prototype.getSubstance = function(sample){
	//Substance falls back on topic
	var substance = this.topic;
	var words = sample.text.split(" ");
	var size = words.length;
	var response = [];
	for(var w = 0; w < size; w++){
		var frequency = this.baselineMap.getFrequency(words[w]);
		response.push({
			word: this.baselineMap.cleanseWord(words[w]),
			frequency: frequency
		});
	}
	response.sort(function(a, b){
		return a.frequency - b.frequency;
	});
	var size = response.length;
	for(var r = 0; r < size; r++){
		if(this.topic === response[r].word || this.baselineMap.isIgnored(response[r].word)){
			//Don't use this word
		}
		else{
			substance = response[r].word;
			break;
		}
	}
	return substance;
}