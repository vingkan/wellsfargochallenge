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

# Future Steps
### Ignored Words List
For this challenge, I manually created a "blacklist" of insignificant words to ignore during analysis. Given more time, an algorithm could be written to artificially weed out such words, by running several frequency tests and eliminating high frequency words that are not related to the main topic (e.g., Wells Fargo, bank names, the scrubbed twitter handle string, etc.). This could be done by creating a "whitelist" of main topic words or through numerical analysis to find the "sweet spot" of frequencies that are likely to belong to words that should be ignored. I personally think that the list of words to ignore can be generated once by a team of humans and added to over time, as it seems to be a fairly static list of words used in general language.