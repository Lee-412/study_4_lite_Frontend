import { FormDataType } from "@/component/Examination/Writing/writing"

export const submitDataWrting = async (formData: FormDataType) => {
    let dataToserver = {
        task1: formData.task1,
        task2: formData.task2,
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_LINK_API_URL}/wrtings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            data: dataToserver
        }),
    })
    if (!res.ok) {
        throw new Error('Failed to upload writing ');
    }
}

export const submitDataTests = async (formData: FormDataType) => {
    const isValidDate = (dateString: string) => {
        const date = new Date(dateString);
        return !isNaN(date.getTime());
    };

    if (!isValidDate(formData.start_date) || !isValidDate(formData.end_date)) {
        alert("Ngày giờ không hợp lệ. Vui lòng nhập lại.");
        return 'false';
    }

    const isoStartDate = new Date(formData.start_date).toISOString();
    const isoEndDate = new Date(formData.end_date).toISOString();


    let dataToserver = {
        name: formData.name,
        Start: isoStartDate,
        End: isoEndDate,
        type: "Wrting",
        Duration: formData.duration,

    }
    //.log(dataToserver);
    const checkResponse = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_LINK_API_URL}/tests?filters[name][$eq]=${formData.name}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });
    const checkData = await checkResponse.json();

    if (checkData.data.length > 0) {
        alert("Tên này đã tồn tại, vui lòng chọn tên khác.");
        return;
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_LINK_API_URL}/tests`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            data: dataToserver
        }),
    })
    // console.log(response);


    if (!response.ok) {
        throw new Error('Failed to upload test');
    }


}

export async function uploadAndUpdate(objectId: string, file1: File, file2: File): Promise<void> {
    try {
        let uploadedImage1;
        let uploadedImage2;
        if (file1 !== null) {
            uploadedImage1 = await uploadImage(file1);

        }
        if (file2 !== null) {
            uploadedImage2 = await uploadImage(file2);
        }

        let updatedObject = null;
        if (uploadedImage1 && uploadedImage2) {
            updatedObject = await updateObjectWithMultipleImage(objectId, uploadedImage1, uploadedImage2)
        }
        else {
            if (uploadedImage1 !== undefined && uploadedImage1 !== null) {
                updatedObject = await updateObjectWithImage(objectId, uploadedImage1, 'img1')
            }

            if (uploadedImage2 !== undefined && uploadedImage2 !== null) {
                updatedObject = await updateObjectWithImage(objectId, uploadedImage2, 'img2')
            }
        }


        console.log('Updated object:success');
    } catch (error) {
        console.error('Error during upload and update:', error);
    }
}


export async function uploadImage(file: File): Promise<any> {
    const formData = new FormData();
    formData.append('files', file);

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_LINK_API_URL}/upload`, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Failed to upload image');
        }

        const data = await response.json();
        return data[0];
    } catch (error) {
        console.error('Error uploading image:', error);
        throw error;
    }
}
//upload multiple img
export async function updateObjectWithMultipleImage(objectId: string, uploadedImage1: any, uploadedImage2: any): Promise<any> {
    try {
        // console.log(objectId);

        const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_LINK_API_URL}/wrtings/${objectId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                data: {
                    img1: uploadedImage1,
                    img2: uploadedImage2
                },
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to update object with image');
        }

        const updatedObject = await response.json();
        return updatedObject;
    } catch (error) {
        console.error('Error updating object:', error);
        throw error;
    }
}



export async function updateObjectWithImage(objectId: string, uploadedImage: any, img: any): Promise<any> {
    try {
        //  console.log(objectId);
        if (img == 'img1') {
            const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_LINK_API_URL}/wrtings/${objectId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    data: {
                        img1: uploadedImage,
                    },
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to update object with image');
            }

            const updatedObject = await response.json();
            console.log(updatedObject);
            console.log(response.status);
            
            return updatedObject;
        }
        else {
            const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_LINK_API_URL}/wrtings/${objectId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    data: {
                        img2: uploadedImage
                    },
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to update object with image');
            }

            const updatedObject = await response.json();
            return updatedObject;
        }

    } catch (error) {
        console.error('Error updating object:', error);
        throw error;
    }
}


export const updateRelationtoWriting = async (test_id: number, writing_id: number): Promise<any> => {
    try {
        // console.log('Updating test with ID:', test_id, 'to have writing with ID:', writing_id);

        const data_update: object = {
            method: 'PUT',
            body: JSON.stringify({
                data: {
                    wrting: writing_id
                }
            }),
            headers: {
                "Content-Type": "application/json"
            }
        };

        const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_LINK_API_URL}/tests/${test_id}`, data_update);

        if (!response.ok) {
            const error = await response.json();
            console.error('Error updating test:', error);
            throw new Error('Failed to update test with writing');
        }

        const updatedObject = await response.json();
        // console.log('Updated test:', updatedObject);
        return updatedObject;
    } catch (error) {
        console.error('Error updating object:', error);
        throw error;
    }
};



// submit data edit


export const submitEditDataWriting = async (formData: FormDataType) => {
    let dataToServer = {
        task1: formData.task1,
        task2: formData.task2,
    };

    try {
        const wrtingId = formData.id;
        const updateResponse = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_LINK_API_URL}/wrtings/${wrtingId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                data: dataToServer
            }),
        });
        if (!updateResponse.ok) {
            throw new Error('Failed to update writing');
        }
        return wrtingId;
    } catch (error) {
        console.error('Error updating writing:', error);
        throw error;
    }
};


export const submitEditDataTests = async (formData: FormDataType, dataEdit: any) => {
    const isValidDate = (dateString: string) => {
        const date = new Date(dateString);
        return !isNaN(date.getTime());
    };

    if (!isValidDate(formData.start_date) || !isValidDate(formData.end_date)) {
        alert("Ngày giờ không hợp lệ. Vui lòng nhập lại.");
        return 'false';
    }

    const isoStartDate = new Date(formData.start_date).toISOString();
    const isoEndDate = new Date(formData.end_date).toISOString();

    let dataToserver = {
        name: formData.name,
        Start: isoStartDate,
        End: isoEndDate,
        type: "Wrting",
        Duration: formData.duration,
    }
    //console.log(dataToserver);

    // Check if test exists
    const checkResponse = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_LINK_API_URL}/tests?filters[name][$eq]=${dataEdit.test.data.attributes.name}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });
    const checkData = await checkResponse.json();
    //  console.log(checkData);

    if (checkData.data.length > 0) {
        const testId = checkData.data[0].id;
        const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_LINK_API_URL}/tests/${testId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                data: dataToserver
            }),
        });
        if (!response.ok) {
            throw new Error('Failed to update test');
        }
        return testId;
    }

}

