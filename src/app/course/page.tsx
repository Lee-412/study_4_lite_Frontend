'use client'
import TestContainer from "@/app/course/TestContainer";
import FooterApp from "@/component/footer/footer";
import AppHeader from "@/component/header/header";
import AppAppBar from "@/component/header/header.user";
import TestConnection from "@/component/TestConnection/TestConnection";
import { Container } from "@mui/material";
import { useRouter } from "next/navigation";
import useSWR from 'swr'

const Test_api_url = `${process.env.NEXT_PUBLIC_STRAPI_LINK_API_URL}/tests`
//@ts-check
const fetcher = (...args: any[]) => fetch(...args).then(res => res.json())
const TestPage = () => {
    const { data, error, isLoading } = useSWR(Test_api_url, fetcher)

    const sessionData = window.sessionStorage
    const router = useRouter()

    const userData = sessionData.getItem("userData")
    let userDataJson
    if (userData !== null) {
        userDataJson = JSON.parse(userData)
    }
    else {
        router.push('/')
        return
    }
    const userId = userDataJson.user.id
    console.log(userDataJson.user.id);

    if (isLoading) return (<h1>Đợi 1 lát</h1>)
    return (
        <>
            <Container>
                <AppHeader />
                <TestContainer tests={data.data} userid={userId} />
            </Container>
            {/* <TestConnection /> */}
            <FooterApp />
        </>
    )
};

export default TestPage;