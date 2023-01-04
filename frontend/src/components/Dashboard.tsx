import * as React from 'react';
import {Alert, Box} from "@mui/material";
import "./Main.css"

export default function Dashboard() {

    return (
        <Box className="app-area">
            <Alert severity="info">
                Welcome to <b>DMS</b>!
                <br />
                <br />
                We and our partners store and/or access information on a device, such as cookies and process personal data, such as unique identifiers and standard information sent by a device for personalised ads and content, ad and content measurement, and audience insights, as well as to develop and improve products. With your permission we and our partners may use precise geolocation data and identification through device scanning. You may click to consent to our and our partners’ processing as described above. Alternatively you may access more detailed information and change your preferences before consenting or to refuse consenting. Please note that some processing of your personal data may not require your consent, but you have a right to object to such processing. Your preferences will apply to this website only. You can change your preferences at any time by returning to this site or visit our privacy policy
            </Alert>
        </Box>
    );
}
