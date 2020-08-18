const EVENT_KEYWORDS = ['resignation of', 'appointment of', 'departure of']


export const getEventSentences = (source) => {
	let sentences = source.split('talsysBricker')

	sentences = sentences.filter(string => string.trim() != '')
	sentences = sentences.filter(string => new RegExp(EVENT_KEYWORDS.join("|")).test(string))

	return sentences.join('<br/><br/>')
}