import { Box, Typography } from "@mui/material";
import exp from "constants"


const TitleBox = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: "center",
                alignItems: 'center',

            }}
        >
            <Typography sx={{
                display: 'flex',
                marginTop: "30px",
                marginBottom: "20px",
                fontWeight: "bold",
                width: "80vw",
                justifyContent: "center",
                height: "10vh",
                fontSize: "5vh",
                alignItems: 'center',
                color: "#09366E"
            }}>
                Hệ thống Study Tiếng Anh
            </Typography>

        </Box>
    )
}
export default TitleBox;