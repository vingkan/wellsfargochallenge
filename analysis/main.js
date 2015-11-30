//var testData = {json data initialized in data/stringified.js};
//var wordMap = new WordMap();
//var testData;

var storage = new Storage();

var IGNORE_THESE_WORDS = [' ', 'to', 'the', 'in', 'of', 'is', '&', 'a', 'it', 'i', 'who', 'you', 'your', 'and', 'will', 'for', 'be', 'with', 'they', 'we', 'are', 'on', 'at', 'what', 'me', 'too', 'in', 'for', 'an', 'for', 'their', 'when', 'its', 'my', 'from', 'have', 'had', 'this', 'or', 'if', 'was', 'by', 'has', 'as', 'do', 'would', 'dont', 'there', 'oh', 'didnt', 'wasnt', 'were', 'should', 'used', 'rt', 'youre', 'our', 'come', 'been', 'that', 'us', 'so', 'im', 'fb', 'goo', 'gl', 'bit', 'ly', 'did', 'https', 'internet', 'INTERNET', 'he', 'she', 'hes', 'shes', 'said', 'doesnt', 'st', 'rd', 'th', 'just', 'here', 'et', 'etc', 'done', 'one', 'two', 'three', 'anyone', 'da'];
var TOPIC_WORDS = ['bank', 'banka', 'bankb', 'bankc', 'bankd', 'name', 'twit_hndl', 'ret_twit', 'name_resp', 'internet', 'twit_hndl_banka', 'twit_hndl_bankb', 'twit_hndl_bankc', 'twit_hndl_bankd', 'dir_msg'];
var BLACK_LIST = IGNORE_THESE_WORDS.concat(TOPIC_WORDS);
var baselineWordMap = new WordMap(BLACK_LIST);

var TARGET_SAMPLE = null;

var DATASET_SIZE = 100;

getRandomDataArray(storage, DATASET_SIZE, 'sample', testDataAnalysis);

function testDataAnalysis(dataset){

	//WORD MAP ANALYSIS
	baselineWordMap = getWordMap(dataset, baselineWordMap);
	//topResults = false;
	//baselineWordMap.getResults(10, topResults);

	//WORD UNIQUENESS ANALYSIS
	var sample1 = dataset[2];
	//Display on HTML Page
	/*sample1.toHTML('current-sample', {
		keywords: baselineWordMap.getNonIgnoredWords(sample1)
	});*/
	//Display in Console
	//console.log(sample1);

	//FREQUENCY MAP ANALYSIS
	//var wordList = sample1.text.split(' ');
	/*var frequencyMap = baselineWordMap.getFrequencyMap(wordList);
	console.log(frequencyMap);
	frequencyMap.getResults(3, false);
	frequencyMap.getResults(3, true);*/

	TARGET_SAMPLE = sample1;

	console.log('FINISHED BASELINE ANALYSIS');

	//getRandomDataArray(storage, 1000, 'comparisons', comparisonAnalysis);

	//comparisonAnalysis(dataset);
	comparisonAnalysis(dataset);

}

function comparisonAnalysis(dataset){

	console.log('start')

	var size = DATASET_SIZE;
	var comparables = [];

	for(var s = 0; s < size; s++){
		dataset[s].keywords = baselineWordMap.getNonIgnoredWords(dataset[s]);
		dataset[s].mappings = [];
	}
	console.log('***Created all getNonIgnoredWords Lists.');

	for(var a = 0; a < size; a++){
		if(a%10 === 0 ){
			console.log(a);
		}
		for(var b = 0; b < size; b++){
			if(dataset[a].id === dataset[b].id || checkPair(comparables, dataset[a].id, dataset[b].id)){
			}
			else{
				var score = baselineWordMap.compareSamples(dataset[a], dataset[b]);
				if(score > 0){
					comparables.push({
						samples: [dataset[a], dataset[b]],
						score: score
					});
					dataset[a].mappings.push({
						id: dataset[b].id,
						score: score
					});
					dataset[b].mappings.push({
						id: dataset[a].id,
						score: score
					});
				}
			}
		}
	}

	//DONT OUTPUT CONTENDERS TO PAGE
	/*if(comparables.length > 0){

		var numOfContenders = comparables.length;
		comparables.sort(function(a, b){
			return b.score - a.score;
		});
		var maxScore = comparables[0].score;
		var maxScoreIndex = comparables[0].samples[0];

		//console.log(comparables[0]);

		for(var c = 0; c < numOfContenders; c++){

			var matchesList = baselineWordMap.getMatches(
				comparables[c].samples[0].keywords,
				comparables[c].samples[1].keywords
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
	}*/

	console.log('FINISHED COMPARISON ANALYSIS');

	groupingAnalysis(dataset);

}

function groupingAnalysis(dataset){

	console.log(dataset);

	for(var d = 0; d < DATASET_SIZE; d++){
		if(dataset[d].mappings.length > 0){
			dataset[d].mappings.sort(function(a, b){
				return b.score - a.score;
			});

			dataset[d].pairing = {
				id: dataset[d].mappings[0].id,
				mutual: false,
				chained: [dataset[d].mappings[0].id],
				score: dataset[d].mappings[0].score
			}
		}
		else{
			dataset[d].pairing = {
				id: 'NO_PAIRING',
				mutual: false,
				chained: [],
				score: 'NO_SCORE'
			}
		}
	}

	//var mutualCheckList = dataset.slice();
	for(var d = 0; d < DATASET_SIZE; d++){
		var pairID = dataset[d].pairing.id;
		if(pairID != 'NO_PAIRING'){
			var mateIndex = getSampleById(dataset, pairID);
			var mate = dataset[mateIndex];
			if(mate.pairing.id === dataset[d].id){
				dataset[d].pairing.mutual = true;
				mate.pairing.mutual = true;
			}
			else{
				mate.pairing.chained.push(dataset[d].id);
			}
		}
	}

	var nodes = [];
	var chains = [];

	for(var d = 0; d < DATASET_SIZE; d++){
		if(dataset[d].pairing.mutual){
			//console.log(dataset[d].pairing.chained.length + ': ' + dataset[d].text);
			nodes.push(dataset[d]);
		}
		else{
			chains.push(dataset[d]);
		}
	}
	console.log(nodes.length + ' / ' + chains.length);

	var topics = [];

	nodes.sort(function(a, b){
		return b.pairing.chained.length - a.pairing.chained.length;
	});
	var numOfNodes = nodes.length;
	for(var n = 0; n < nodes.length; n++){
		console.log(nodes[n].id +' and ' + nodes[n].pairing.id + ' (chained: ' + nodes[n].pairing.chained.length + ')');
		var pairIndex = getSampleById(nodes, nodes[n].pairing.id);
		var mate = nodes[pairIndex];
		var newTopic = new Topic(nodes[n], baselineWordMap, nodes[n].pairing.score);
		newTopic.addNode(mate);
		nodes.splice(pairIndex, 1);
		topics.push(newTopic);
	}

	var numOfTopics = topics.length;
	/*console.log(topics);
	for(var t = 0; t < numOfTopics; t++){
		console.log('Topic: ' + topics[t].topic, '\nHead: ' + topics[t].headNode.text);
	}*/

	console.log('***Created initial topic areas.');

	var chainsToAdd = chains.slice();
	for(var c = 0; c < chainsToAdd.length; c++){
		var topicID = chainsToAdd[c].pairing.id;
		var topicIndex = getTopicWithId(topics, topicID);
		if(topicIndex < 0 ){
			chainsToAdd.push(chainsToAdd[c]);
		}
		else{
			topics[topicIndex].addNode(chainsToAdd[c]);

		}
		chainsToAdd.splice(c, 1);
	}

	for(var t = 0; t < numOfTopics; t++){
		console.log(
			'Topic: ' + topics[t].topic + ' (' + topics[t].nodes.length + ' nodes)',
			'\nHead: ' + topics[t].headNode.text,
			'\nKeywords: ' + topics[t].getKeywords()
		);
	}

	console.log('***Added chained nodes to topic areas.');

	//NO GROUP MERGING FOR NOW: short on time
	/*var topicPairsChecked = [];
	for(var a = 0; a < numOfTopics; a++){
		for(var b = 0; b < numOfTopics; b++){
			var id1 = topics[a].id;
			var id2 = topics[b].id;
			if(id1 === id2 || checkPair(topicPairsChecked, id1, id2)){
				//console.log('already evaluated: ' + id1 + ' and ' + id2);
				/*if(checkPair(topicPairsChecked, id1, id2)){
					console.log('caught: ', topicPairsChecked, id1, id2)
				}*/
			/*}
			else{
				var sample1 = topics[a].getRepresentativeSample();
				var sample2 = topics[b].getRepresentativeSample();
				var score = baselineWordMap.compareSamples(sample1, sample2);
				//console.log(topics[a].topic + ' (' + topics[a].pairThreshold.toFixed(2) + ') and ' + topics[b].topic + ' (' + topics[b].pairThreshold.toFixed(2) + '): ' + score);
				if(score > 0 && score > topics[a].pairThreshold && score > topics[a].pairThreshold){
					console.log(topics[a].getKeywords());
					console.log(topics[a].headNode.text);
					console.log(topics[b].getKeywords());
					console.log(topics[b].headNode.text);
					var mainTopic = null;
					if(topics[a].pairThreshold >= topics[b].pairThreshold){
						mainTopic = topics[a];
					}
					else{
						mainTopic = topics[b];
					}
				}
				topicPairsChecked.push({
					samples: [{id: id1}, {id: id2}]
				});
			}
		}
	}*/

	//OUTPUT GROUPING RESULTS
	/*for(var t = 0; t < numOfTopics; t++){
		var currentTopic = topics[t];
		console.log(
			'Topic: ' + topics[t].topic + ' (' + topics[t].nodes.length + ' nodes)',
			'\nHead: ' + topics[t].headNode.text,
			'\nKeywords: ' + topics[t].getKeywords()
		);
	}*/


	console.log('***Compare topic areas to each other.');

	console.log('FINISHED GROUPING ANALYSIS');

}

function comparisonTestAnalysis(dataset){

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

	console.log('FINISHED TEST COMPARISON ANALYSIS');

}

console.log("LOADED main.js");