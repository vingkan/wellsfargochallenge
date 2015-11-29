# wellsfargochallenge
Repository for the Wells Fargo Data Analytics Challenge.

# Approach

## Steps
* Create a list of words to ignore during analysis
* Populate a word map with all other words and their number of occurrences
* Generate a baseline for the frequency of key words from the word map
* Give each social media sample an "intermediate" classification based on the word from the sample with the lowest baseline frequency
* Create a word map for each sample
* Run group analysis
* Decision tree to determine treshold for word frequency

# Roaming Thoughts
* How might we determine the topic of a social media item without using words that were not in it?
** We could use an external source like Google Trends to supply related words not from the original text.
** We could also take words from other social media samplings from the same dataset. It is likely that at least one other item of the same topic contains the wording needed to appropriately classify a sample.
* To use the second approach, we need some sort of grouping algorithm that can group social media samples that are likely to be of similar topics.
* Using a grouping strategy, is it better to first identify a group of similar samples then classify them or the other way around?
** We could attempt to classify samples first, then use the "intermediate" classification as another attribute in the grouping algorithm.

# Future Steps
### Ignored Words List
For this challenge, I manually created a "blacklist" of insignificant words to ignore during analysis. Given more time, an algorithm could be written to artificially weed out such words, by running several frequency tests and eliminating high frequency words that are not related to the main topic (e.g., Wells Fargo, bank names, the scrubbed twitter handle string, etc.). This could be done by creating a "whitelist" of main topic words or through numerical analysis to find the "sweet spot" of frequencies that are likely to belong to words that should be ignored. I personally think that the list of words to ignore can be generated once by a team of humans and added to over time, as it seems to be a fairly static list of words used in general language.