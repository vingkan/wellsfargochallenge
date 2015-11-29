# Roaming Thoughts
* How might we determine the topic of a social media item without using words that were not in it?
** We could use an external source like Google Trends to supply related words not from the original text.
** We could also take words from other social media samplings from the same dataset. It is likely that at least one other item of the same topic contains the wording needed to appropriately classify a sample.
* To use the second approach, we need some sort of grouping algorithm that can group social media samples that are likely to be of similar topics.
* Using a grouping strategy, is it better to first identify a group of similar samples then classify them or the other way around?
** We could attempt to classify samples first, then use the "intermediate" classification as another attribute in the grouping algorithm.

Set up a lunr search???