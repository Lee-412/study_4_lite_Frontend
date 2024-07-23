'use client'
import TestContainer from "@/app/course/TestContainer";
import TestConnection from "@/component/TestConnection/TestConnection";
import useSWR from 'swr'

const Test_api_url = `${process.env.NEXT_PUBLIC_STRAPI_LINK_API_URL}/tests`
const fetcher = (...args: any[]) => fetch(...args).then(res => res.json())
const TestPage = () => {
    const { data, error, isLoading } = useSWR(Test_api_url, fetcher)
    console.log(data);

    const sessionData = window.sessionStorage

    const userData = sessionData.getItem("userData")
    let userDataJson
    if (userData !== null) {
        userDataJson = JSON.parse(userData)
    }
    const userId = userDataJson.user.id
    console.log(userDataJson.user.id);

    if (isLoading) return (<h1>Đợi 1 lát</h1>)
    return (
        <>
            <TestContainer tests={data.data} userid={userId} />
            {/* <TestConnection /> */}
        </>
    )
};

export default TestPage;