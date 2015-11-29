//var testData = {json data initialized in data/stringified.js};
//var wordMap = new WordMap();
//var testData;

var storage = new Storage();

var IGNORE_THESE_WORDS = ['to', 'the', 'in', 'of', 'is', '&', 'a', 'it', 'i', 'who', 'you', 'your', 'and', 'will', 'for', 'be', 'with', 'they', 'we', 'are', 'on', 'at', 'what', 'me', 'too', 'in', 'for', 'an', 'for', 'their', 'when', 'its', 'my', 'from', 'have', 'had', 'this', 'or', 'if', 'was', 'by', 'has', 'as', 'do', 'would', 'dont', 'there', 'oh', 'didnt', 'wasnt', 'were', 'should', 'used', 'rt', 'youre', 'our', 'come', 'been'];
var TOPIC_WORDS = ['bank', 'banka', 'bankb', 'bankc', 'bankd', 'name', 'twit_hndl'];
var BLACK_LIST = IGNORE_THESE_WORDS.concat(TOPIC_WORDS);
var baselineWordMap = new WordMap(BLACK_LIST);

getRandomDataArray(storage, 100, 'sample', testDataAnalysis);

function testDataAnalysis(dataset){
	//WORD MAP ANALYSIS
	baselineWordMap = getWordMap(dataset, baselineWordMap);
	topResults = false;
	//baselineWordMap.getResults(10, topResults);
	//WORD UNIQUENESS ANALYSIS
	var sample = dataset[50];
		//Display on HTML Page
		sample.toHTML('current-sample');
	console.log(sample);
	//console.log('Text: ' + sample.text);
	var frequencyMap = new WordMap();
	var words = sample.text.split(" ");
	var size = words.length;
	for(var w = 0; w < size; w++){
		var frequency = baselineWordMap.getFrequency(words[w]);
		if(frequency > 0){
			//console.log(words[w] + ': ' + frequency.toFixed(5));
			frequencyMap.map.push({
				word: frequencyMap.cleanseWord(words[w]),
				count: frequency
			});
		}
	}
	frequencyMap.getResults(3, false);
	frequencyMap.getResults(3, true);
}

console.log("LOADED main.js");