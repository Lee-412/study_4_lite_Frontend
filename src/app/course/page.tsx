import TestContainer from "@/app/course/TestContainer";

const Test_api_url = `${process.env.NEXT_PUBLIC_STRAPI_LINK_API_URL}/tests`

const TestPage = async() => {
    const response = await fetch(Test_api_url)
    const data = await response.json()
    //console.log(data.data);
    

    return (
        <TestContainer tests={data.data}/>
    )
};

export default TestPage;