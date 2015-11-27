function getWordMap(dataset, thisWordMap){
	var wordMap = thisWordMap || new WordMap();
	var size = dataset.length;
	for(var d = 0; d < 10; d++){
		var words = dataset[d].text.split(" ");
		var numOfWords = words.length;
		//console.log(words);
		for(var w = 0; w < numOfWords; w++){
			wordMap.add(words[w]);
		}
	}
	return wordMap;
}

/*var results = getWordMap(testData);
console.log(results);*/

console.log("LOADED summary.js");