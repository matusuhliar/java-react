import * as React from 'react';
import {Alert, Box, Breadcrumbs, Divider, Typography} from "@mui/material";
import "./PageBuilder.css"
import {HorizontalSplit, Image, TextFormat, VerticalSplit} from "@mui/icons-material";
import {cloneElement, ReactElement, useState} from "react";



export default function PageBuilderWidgets() {

    const [activeWidget,setActiveWidget] = useState<string | null>(null)

    const onClick = (widget:any)=>{
        setActiveWidget(widget.id);
    }

    const [widgets] = useState([{
        id:"image",
        element:<PageBuilderWidgetImage />
    },{
        id:"text",
        element:<PageBuilderWidgetText />
    },{
        id:"horizontal-box",
        element:<PageBuilderWidgetHorizontalContainer />
    },{
        id:"vertical-box",
        element:<PageBuilderWidgetVerticalContainer />
    }])

    return (
        <Box className="widgets">
            {
                widgets.map(widget=>cloneElement(widget.element,{className:"widget"+(activeWidget === widget.id?" active":""),key:widget.id,onClick:()=>onClick(widget)}))
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
            <Typography>Horizontal Box</Typography>
        </div>
    );
}

function PageBuilderWidgetVerticalContainer(props:any) {
    return (
        <div className="widget" {...props}>
            <VerticalSplit />
            <Typography>Vertical box</Typography>
        </div>
    );
}