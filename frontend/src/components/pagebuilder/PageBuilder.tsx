import * as React from 'react';
import {Alert, Box, Breadcrumbs, Divider, Typography} from "@mui/material";
import "./PageBuilder.css"
import PageBuilderWidgets from "./PageBuilderWidgets";

export default function PageBuilder() {
    return (
        <Box className="app-area">
            <Breadcrumbs aria-label="breadcrumb" sx={{mb:'20px'}}>
                <Typography color="text.primary">Page Builder</Typography>
            </Breadcrumbs>
            <Divider sx={{my:"10px"}}/>
            <Box className="page-builder">
                <Box className="components">
                    <Box className="header">
                        Components
                    </Box>
                    <PageBuilderWidgets />
                </Box>
                <Box className="canvas">
                    <Box className="header">
                        Canvas
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
