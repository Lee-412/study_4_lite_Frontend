'use server'

export const fetch_listening = async() => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_LINK_API_URL}/listening-tests?populate[Listening][populate]=*`)
    const data = await res.json()

    console.log(data);
    
}

export const uploadMedia = async(file:any, link:any) =>{
    const form = new FormData()
    form.append('files', file)
    try {
        const response = await fetch(link, {
            method: 'POST',
            body: file,
        })
        const data = await response.json()
        console.dir(data);
        console.dir(response.status);
    return response
    } catch(e) {
        throw e
    }
    
}
interface Listening {
    form: object
}

class ListeningTest {
    form:object
    constructor() {
        this.form = {
            Listening: []
        }
    }
    addAudio(Audio:any) {

    }

}
