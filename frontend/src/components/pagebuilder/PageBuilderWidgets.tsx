import * as React from 'react';
import {Alert, Box, Breadcrumbs, Divider, Typography} from "@mui/material";
import "./PageBuilder.css"
import {HorizontalSplit, Image, TextFormat, VerticalSplit, Videocam} from "@mui/icons-material";
import {cloneElement, ReactElement, useState} from "react";

interface PageBuilderWidgetsProps{
    activeWidget:string | null
    setActiveWidget: Function
}

export const WIDGETS={
    IMAGE:"image",
    TEXT:"text",
    BOX:"box",
    VIDEO:"video",
}

export default function PageBuilderWidgets(props:PageBuilderWidgetsProps) {

    const onClick = (widget:any)=>{
        props.setActiveWidget(widget.id);
    }

    const [widgets] = useState([{
        id:WIDGETS.IMAGE,
        element:<PageBuilderWidgetImage />
    },{
        id:WIDGETS.TEXT,
        element:<PageBuilderWidgetText />
    },{
        id:WIDGETS.BOX,
        element:<PageBuilderWidgetHorizontalContainer />
    },{
        id:WIDGETS.VIDEO,
        element:<PageBuilderWidgetVideo />
    }])

    return (
        <Box className="widgets">
            {
                widgets.map(widget=>cloneElement(widget.element,{className:"widget"+(props.activeWidget === widget.id?" active":""),key:widget.id,onClick:()=>onClick(widget)}))
            }
        </Box>
    );
}
function PageBuilderWidgetText(props:any) {
    return (
        <div className="widget" {...props}>
            <TextFormat />
            <Typography>Text</Typography>
        </div>
    );
}

function PageBuilderWidgetImage(props:any) {

    return (
        <div className="widget" {...props}>
            <Image />
            <Typography>Image</Typography>
        </div>
    );
}

function PageBuilderWidgetHorizontalContainer(props:any) {
    return (
        <div className="widget" {...props}>
            <HorizontalSplit />
            <Typography>Box</Typography>
        </div>
    );
}

function PageBuilderWidgetVideo(props:any) {
    return (
        <div className="widget" {...props}>
            <Videocam />
            <Typography>Video</Typography>
        </div>
    );
}