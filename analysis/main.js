//var testData = {json data initialized in data/stringified.js};
//var wordMap = new WordMap();
//var testData;

var storage = new Storage();

var IGNORE_THESE_WORDS = [' ', 'to', 'the', 'in', 'of', 'is', '&', 'a', 'it', 'i', 'who', 'you', 'your', 'and', 'will', 'for', 'be', 'with', 'they', 'we', 'are', 'on', 'at', 'what', 'me', 'too', 'in', 'for', 'an', 'for', 'their', 'when', 'its', 'my', 'from', 'have', 'had', 'this', 'or', 'if', 'was', 'by', 'has', 'as', 'do', 'would', 'dont', 'there', 'oh', 'didnt', 'wasnt', 'were', 'should', 'used', 'rt', 'youre', 'our', 'come', 'been', 'that', 'us', 'so', 'im', 'fb', 'goo', 'gl', 'bit', 'ly', 'did', 'https', 'internet', 'INTERNET'];
var TOPIC_WORDS = ['bank', 'banka', 'bankb', 'bankc', 'bankd', 'name', 'twit_hndl', 'ret_twit', 'name_resp', 'internet', 'twit_hndl_banka', 'twit_hndl_bankb', 'twit_hndl_bankc', 'twit_hndl_bankd'];
var BLACK_LIST = IGNORE_THESE_WORDS.concat(TOPIC_WORDS);
var baselineWordMap = new WordMap(BLACK_LIST);

var TARGET_SAMPLE = null;

getRandomDataArray(storage, 100, 'sample', testDataAnalysis);

function testDataAnalysis(dataset){

	//WORD MAP ANALYSIS
	baselineWordMap = getWordMap(dataset, baselineWordMap);
	//topResults = false;
	//baselineWordMap.getResults(10, topResults);

	//WORD UNIQUENESS ANALYSIS
	var sample1 = dataset[2];
	//Display on HTML Page
	sample1.toHTML('current-sample', {
		keywords: baselineWordMap.getNonIgnoredWords(sample1)
	});
	//Display in Console
	//console.log(sample1);

	//FREQUENCY MAP ANALYSIS
	var wordList = sample1.text.split(' ');
	/*var frequencyMap = baselineWordMap.getFrequencyMap(wordList);
	console.log(frequencyMap);
	frequencyMap.getResults(3, false);
	frequencyMap.getResults(3, true);*/

	TARGET_SAMPLE = sample1;

	console.log('FINISHED BASELINE ANALYSIS');

	//getRandomDataArray(storage, 1000, 'comparisons', comparisonAnalysis);

	//comparisonAnalysis(dataset);
	groupingAnalysis(dataset);

}

function groupingAnalysis(dataset){

	console.log('start')

	var size = dataset.length;
	var comparables = [];

	for(var a = 0; a < size; a++){
		if(a%10 === 0 ){
			console.log(a)
		}
		for(var b = 0; b < size; b++){
			if(dataset[a].id === dataset[b].id){
				
			}
			else if(!checkPair(comparables, dataset[a].id, dataset[b].id)){
				var score = baselineWordMap.compareSamples(dataset[a], dataset[b]);
				if(score > 0){
					comparables.push({
						samples: [dataset[a], dataset[b]],
						score: score
					});
				}
			}
		}
	}

	if(comparables.length > 0){

		var numOfContenders = comparables.length;
		comparables.sort(function(a, b){
			return b.score - a.score;
		});
		var maxScore = comparables[0].score;

		console.log(comparables[0]);

		for(var c = 0; c < numOfContenders; c++){

			var matchesList = baselineWordMap.getMatches(
				comparables[c].samples[0],
				comparables[c].samples[1]
			);

			comparables[c].samples[0].toComparableHTML(
				'comparable-samples', {
				score: comparables[c].score.toFixed(5),
				opacity: ((0.25 * maxScore) + comparables[c].score) / (1.25 * maxScore),
				matches: matchesList,
				map: baselineWordMap
			});
			comparables[c].samples[1].toComparableHTML(
				'comparable-samples', {
				score: comparables[c].score.toFixed(5),
				opacity: ((0.25 * maxScore) + comparables[c].score) / (1.25 * maxScore),
				matches: matchesList,
				map: baselineWordMap
			});

		}

	}
	else{
		console.log('No comparable samples found in dataset.');
	}

	console.log('FINISHED GROUPING ANALYSIS')

}

function comparisonAnalysis(dataset){

	var comparables = [];

	//LOOP THROUGH SAMPLE
	var size = dataset.length;
	for(var s = 0; s < size; s++){
		if(TARGET_SAMPLE.id === dataset[s].id){
			
		}
		else{
			var score = baselineWordMap.compareSamples(TARGET_SAMPLE, dataset[s]);
			if(score > 0){
				comparables.push({
					sample: dataset[s],
					score: score
				});
			}
		}
	}

	//SORT CONTENDERS
	if(comparables.length > 0){
		var numOfContenders = comparables.length;
		comparables.sort(function(a, b){
			return b.score - a.score;
		});
		var maxScore = comparables[0].score;
		for(var c = 0; c < numOfContenders; c++){
			var header = comparables[c].sample.id + ': ' + comparables[c].score.toFixed(5);
			var matchesList = baselineWordMap.getMatches(TARGET_SAMPLE, comparables[c].sample);
			comparables[c].sample.toComparableHTML('comparable-samples', {
				score: comparables[c].score.toFixed(5),
				opacity: ((0.25 * maxScore) + comparables[c].score) / (1.25 * maxScore),
				matches: matchesList
			});
			//console.log(header + '\n' + matchesList + '\n');
		}
	}
	else{
		console.log('No comparable samples found in dataset.');
	}

	console.log('FINISHED COMPARISON ANALYSIS');

}

console.log("LOADED main.js");