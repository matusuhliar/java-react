import * as React from 'react';
import {
    Alert,
    Box,
    Breadcrumbs, Button,
    Divider,
    Paper,
    Table, TableBody,
    TableCell, TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import "./PageBuilder.css"
import {Delete, Edit, HorizontalSplit, Image, TextFormat, VerticalSplit, Videocam} from "@mui/icons-material";
import {cloneElement, ReactElement, useState} from "react";
import {CanvasItemDefinition} from "./PageBuilderCanvasItem";
import {Page} from "./PageBuilder";

interface PageBuilderPropertiesProps{
    pages:Page[]
    activePage?:string,
    setActivePage:Function
}

export default function PageBuilderProperties(props:PageBuilderPropertiesProps) {

    return (
        <Box className="properties-wrapper" onClick={(e)=>e.stopPropagation()}>
            {props.pages.map((page) => (
                <Box key={page.id} className={"page" + (props.activePage === page.id?" selected":"")}>
                    <Box onClick={()=>props.setActivePage(page.id)} className="label">{page.path}</Box>
                    <Edit />
                    <Delete />
                </Box>
            ))}
        </Box>
    );
}