function Topic(headNode){
	this.id = headNode.id;
	this.headNode = headNode;
	this.topic = '';
	this.nodes = [];
	this.wordMap = new WordMap(BLACK_LIST);
	this.addAllWords(headNode.text);
	this.assessTopic();
}

Topic.prototype.addNode = function(newNode){
	this.nodes.push(newNode);
	this.addAllWords(newNode.text);
	this.assessTopic();
}

Topic.prototype.addAllWords = function(text){
	var words = text.split(" ");
	var size = words.length;
	for(var w = 0; w < size; w++){
		this.wordMap.add(words[w]);
	}
}

Topic.prototype.assessTopic = function(){
	this.wordMap.sort(true);
	this.topic = this.wordMap.map[0].word;
}