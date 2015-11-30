function getWordMap(dataset, thisWordMap){
	var wordMap = thisWordMap || new WordMap();
	var size = dataset.length;
	for(var d = 0; d < size; d++){
		var words = dataset[d].text.split(" ");
		var numOfWords = words.length;
		//console.log(words);
		for(var w = 0; w < numOfWords; w++){
			wordMap.add(words[w]);
		}
	}
	return wordMap;
}

function checkPair(list, id1, id2){
	var foundPair = false;
	var size = list.length;
	for(var i = 0; i < size; i++){
		var found1 = false;
		var found2 = false;
		if(
			list[i].samples[0].id === id1 ||
			list[i].samples[1].id === id1
		){
			found1 = true;
		}
		if(
			list[i].samples[0].id === id2 ||
			list[i].samples[1].id === id2
		){
			found2 = true;
		}
		if(found1 && found2){
			foundPair = true;
			//console.log(id1 + ' and ' + id2 + ' was already checked')
			break;
		}
	}
	return foundPair;
}

function getSampleById(list, id){
	var index = -1;
	var size = list.length;
	for(var i = 0; i < size; i++){
		if(list[i].id === id){
			index = i;
			break;
		}
	}
	return index;
}

function getTopicWithId(list, id){
	var index = -1;
	var size = list.length;
	for(var i = 0; i < size; i++){
		if(list[i].hasID(id)){
			index = i;
			break;
		}
	}
	return index;
}

/*var results = getWordMap(testData);
console.log(results);*/

console.log("LOADED summary.js");