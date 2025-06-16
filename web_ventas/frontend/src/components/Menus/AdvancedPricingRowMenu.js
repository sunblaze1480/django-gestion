import React from "react";
import { Typography, Button, Stack } from "@mui/material";

export const AdvancedPricingRowMenu = ({row}) => {

    const handleEditClicked = () => {
        console.log("CLICKEASTE EDIT PARA LA ROW:")
        console.log(row)
    }

    return (
        <Stack direction='row' spacing={2}>
            <Button onClick={handleEditClicked}>EDIT</Button>
            <Button>delet</Button>
        </Stack>   
    )
}