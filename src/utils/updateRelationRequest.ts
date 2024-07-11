'use server'

import { fileURLToPath } from "url"

export async function updateRelation(connect_id:number, link: string, field: string) {
    const res_fetch = await fetch(link, {cache: "no-cache"})
    const res_json = await res_fetch.json()
    // console.log(connect_id);
    // console.log(link);
    // console.log(field);
    
    
    
    const current_connection_id = res_json.data.attributes[field].data.map((item:any)=> item.id)
    //console.log(current_connection_id);
    
    const payload = {
        data: {
            [field]: {
                connect: [...current_connection_id, connect_id]
            }
        }
    }
    //console.log(payload);
    
    const res_put = await fetch(link, {
        method: "PUT",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(payload)
    })
    const res = await res_put.json()
    //console.log(res.data.attributes.answer_wrtings);
    return res.data.attributes.answer_wrtings
}