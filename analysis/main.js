//var testData = {json data initialized in data/stringified.js};
//var wordMap = new WordMap();
//var testData;

var storage = new Storage();

var IGNORE_THESE_WORDS = [' ', 'to', 'the', 'in', 'of', 'is', '&', 'a', 'it', 'i', 'who', 'you', 'your', 'and', 'will', 'for', 'be', 'with', 'they', 'we', 'are', 'on', 'at', 'what', 'me', 'too', 'in', 'for', 'an', 'for', 'their', 'when', 'its', 'my', 'from', 'have', 'had', 'this', 'or', 'if', 'was', 'by', 'has', 'as', 'do', 'would', 'dont', 'there', 'oh', 'didnt', 'wasnt', 'were', 'should', 'used', 'rt', 'youre', 'our', 'come', 'been', 'that', 'us'];
var TOPIC_WORDS = ['bank', 'banka', 'bankb', 'bankc', 'bankd', 'name', 'twit_hndl', 'ret_twit', 'name_resp', 'internet', 'twit_hndl_banka', 'twit_hndl_bankb', 'twit_hndl_bankc', 'twit_hndl_bankd'];
var BLACK_LIST = IGNORE_THESE_WORDS.concat(TOPIC_WORDS);
var baselineWordMap = new WordMap(BLACK_LIST);

var TARGET_SAMPLE = null;

getRandomDataArray(storage, 1000, 'sample', testDataAnalysis);

function testDataAnalysis(dataset){

	//WORD MAP ANALYSIS
	baselineWordMap = getWordMap(dataset, baselineWordMap);
	topResults = false;
	//baselineWordMap.getResults(10, topResults);

	//WORD UNIQUENESS ANALYSIS
	var sample1 = dataset[2];
	var sample2 = dataset[7];
	//Display on HTML Page
	sample1.toHTML('current-sample');
	//Display in Console
	console.log(sample1);

	//FREQUENCY MAP ANALYSIS
	var wordList = sample1.text.split(' ');
	var frequencyMap = baselineWordMap.getFrequencyMap(wordList);
	console.log(frequencyMap);
	frequencyMap.getResults(3, false);
	frequencyMap.getResults(3, true);

	TARGET_SAMPLE = sample1;

	console.log('FINISHED BASELINE ANALYSIS');

	getRandomDataArray(storage, 100, 'comparisons', comparisonAnalysis);

}

function comparisonAnalysis(dataset){

	//LOOPING COMPARISONS
	var size = dataset.length;
	for(var s = 0; s < size; s++){
		var score = baselineWordMap.compareSamples(TARGET_SAMPLE, dataset[s]);
		if(score > 0){
			console.log(dataset[s].id + ': ' + score.toFixed(5));
			console.log(baselineWordMap.compareSamples(TARGET_SAMPLE, dataset[s]))
			dataset[s].toComparableHTML('comparable-samples', score.toFixed(5));
		}
	}

	console.log('FINISHED COMPARISON ANALYSIS');

}

console.log("LOADED main.js");