
import FooterApp from "@/component/footer/footer";
import HeaderApp from "@/component/header/header";
import { Box, } from "@mui/material";

export default async function HomePage() {

    return (
        <Box sx={{
        }}>
            <HeaderApp />
            <FooterApp />
        </Box>
    );
}
