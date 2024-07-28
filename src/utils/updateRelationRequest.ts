'use server'


// hàm này ko sử dụng cho endpoint : /api/users
export async function updateRelation(connect_id: number, link: string, field: string) {
    const res_fetch = await fetch(link, { cache: "no-cache" })
    const res_json = await res_fetch.json()
    console.log(res_json);
    if (link.includes(`${process.env.NEXT_PUBLIC_STRAPI_LINK_API_URL}/users`)) {

        const payload = {
            data: {
                [field]: {
                    connect: [connect_id]
                }
            }
        }
        const res_put = await fetch(link, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        })
        const res = await res_put.json()
        return res.data
    } else {
        const payload = {
            data: {
                [field]: {
                    connect: [connect_id]
                }
            }
        }
        const res_put = await fetch(link, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        })
        const res = await res_put.json()
        return res.data

    }

}