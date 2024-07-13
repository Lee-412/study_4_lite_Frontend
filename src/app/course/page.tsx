import TestContainer from "@/app/course/TestContainer";
import TestConnection from "@/component/TestConnection/TestConnection";


const Test_api_url = `${process.env.NEXT_PUBLIC_STRAPI_LINK_API_URL}/tests`

const TestPage = async () => {
    const response = await fetch(Test_api_url)
    const data = await response.json()
    //console.log(data.data);



    return (
<<<<<<< HEAD
        <>
            <TestContainer tests={data.data}/>
            <TestConnection />
        </>
=======
        <TestContainer tests={data.data} />
>>>>>>> 6829761dd08c2471ca6ea88794f9e6002ad56b9b
    )
};

export default TestPage;