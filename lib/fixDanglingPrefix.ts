export default function fixDanglingPrefix(str: string) {
    const replacedText = str.split(' ').map(word => {
        if (word.length <= 3) return word + '\u00A0'
        else return word
    }).filter(function( element ) {
        return element !== undefined;
   }).join(' ')
   
    const result = replacedText.replaceAll('\u00A0 ', '\u00A0')
    
    return result
}