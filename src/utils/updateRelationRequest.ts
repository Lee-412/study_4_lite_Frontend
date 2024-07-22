'use server'

export async function updateRelation(connect_id:number, link: string, field: string) {
    const res_fetch = await fetch(link, {cache: "no-cache"})
    const res_json = await res_fetch.json()
    
    const current_connection_id = res_json.data.attributes[field].data.map((item:any)=> item.id)
    const payload = {
        data: {
            [field]: {
                connect: [...current_connection_id, connect_id]
            }
        }
    }    
    const res_put = await fetch(link, {
        method: "PUT",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(payload)
    })
    const res = await res_put.json()
    return res.data
}