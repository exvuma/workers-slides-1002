export function getWordOfTheDay(path) {


}
export function getAirQuality(){
    // let resp = fetch('https://api.openaq.org/v1/cities')
    let resp = fetch('https://google.com')
    .then((e) =>{
        console.log('no errors in fetch')
        return e.json()
    })
    .catch((e) =>console.error(e))
    return resp
}
