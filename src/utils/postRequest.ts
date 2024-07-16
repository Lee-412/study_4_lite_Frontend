'use server'

export async function fetchData(link:string) {
    const response = await fetch(link)
    const data = await response.json()
    return data
}

export async function postRequest(data:object, link: string) {
    console.log(data);
    
    const payload = {
        "data": {
            ...data 
        }
    }
    console.log(payload);
    
    const response = await fetch(link, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
            "Content-Type": "application/json"
        },
        cache: "no-cache"
    })
    const result = await response.json();
    console.log(result);
    return result

}

export const uploadMedia = async(form:any) =>{
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_LINK_API_URL}/upload`, {
            method: 'POST',
            body: form,
        })
        const data = await response.json()
        return data
    } catch(e) {
        throw e
    }
    
}