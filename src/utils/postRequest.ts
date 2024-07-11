'use server'

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