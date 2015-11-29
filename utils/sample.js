function Sample(textLine, topicOverride){
	var values = textLine.split("|");
	this.id = values[0];
	this.date = values[1];
	this.year = values[2];
	this.month = values[3];
	this.source = values[4];
	this.text = values[5];
	this.topic = topicOverride || 'NO-TOPIC';
}