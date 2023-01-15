import * as React from 'react';
import {Alert, Box, Breadcrumbs, Button, Divider, Typography} from "@mui/material";
import "./PageBuilder.css"
import {
    HorizontalSplit,
    Image,
    MoveDown,
    MoveUp,
    Preview,
    TextFormat,
    VerticalSplit,
    Videocam
} from "@mui/icons-material";
import {cloneElement, ReactElement, useState} from "react";
import {CanvasItemDefinition} from "./PageBuilderCanvasItem";

interface PageBuilderWidgetsProps{
    active:string | null,
    items: CanvasItemDefinition[],
    setItems:Function
}

export default function PageBuilderProperties(props:PageBuilderWidgetsProps) {

    const {active, items,setItems} = props;

    const setMoveToTop = () =>{
        setItems([...items.filter(i=>i.id !== active),items.find(i=>i.id === active)]);
    }

    const setMoveToBack = () =>{
        setItems([items.find(i=>i.id === active),...items.filter(i=>i.id !== active)]);
    }

    const preview=()=>{
        items.forEach(i=>i.event = null);
        window.localStorage.setItem("preview",JSON.stringify(items))
        window.open('/preview', "_blank", "toolbar=0, scrollbars=1, resizable=0, width=1000, height=800" );
    }
    return (
        <Box className="properties-wrapper">
            <Button variant="contained"disabled={!active} startIcon={<MoveDown />} onClick={setMoveToBack}>Move to Bottom</Button>
            <Button variant="contained" disabled={!active} startIcon={<MoveUp />} onClick={setMoveToTop}>Move to Top</Button>
            <Button variant="contained" startIcon={<Preview />} onClick={preview}>Preview</Button>
        </Box>
    );
}