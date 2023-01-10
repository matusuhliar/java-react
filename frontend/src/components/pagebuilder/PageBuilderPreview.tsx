import * as React from 'react';
import {Alert, Box, Breadcrumbs, Container, Divider, Typography} from "@mui/material";
import "./PageBuilder.css"
import {useRef, useState} from "react";
import PageBuilderCanvasItem, {CanvasItemDefinition} from "./PageBuilderCanvasItem";

export default function PageBuilderPreview() {

    const [activeWidget, setActiveWidget] = useState<string | null>(null);
    const canvas = useRef(null);
    const itemsStr = window.localStorage.getItem("preview")||"[]";
    const items = (JSON.parse(itemsStr) as CanvasItemDefinition[]);
    let maxWidth = 10;
    items.forEach(i=>maxWidth = Math.max(i.x+i.w,maxWidth))


    return (
        <Box className="page-builder preview">
            <Box ref={canvas} className="canvas-preview" style={{maxWidth:maxWidth+"px"}}>
                {
                    items.map(item => <PageBuilderCanvasItem key={item.id} active={false}
                                                             setActive={()=>{}} setOpen={()=>{}}
                                                             updateItems={()=>{}}
                                                             definition={item} canvas={canvas}
                                                             newMode={false}/>)
                }
            </Box>
        </Box>
    );
}
