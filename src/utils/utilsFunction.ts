export const get_minute_from_seconds = (second:string) => {
    let seconds = parseInt(second)
    let minute = Math.floor(seconds / 60);
    return minute
}
export const counting_words = (input:string) => {
    //console.log(input);
    
    let words = input.split(' ');
    let real_words = words.filter((word:any)=>{
        const num_check = '0123456789'
        let regex = /^[a-zA-Z]+$/
        return word !== '' && ((regex.test(word))||num_check.includes(word[0]) || word.includes('\'') || word.includes('\"') || word.includes('\-'))
    })
    //console.log(real_words);
    return real_words.length
}

//console.log(counting_words('   hfjshfjsh .   442 4 5 $   hfhskshf hfhskfhs    jfkhsf jfksfk'));
