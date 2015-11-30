function Topic(headNode){
	this.headNode = headNode;
	this.nodes = [];
}

Topic.prototype.addNode = function(newNode){
	this.nodes.push(newNode);
}