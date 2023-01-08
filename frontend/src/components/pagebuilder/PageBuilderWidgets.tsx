import * as React from 'react';
import {Alert, Box, Breadcrumbs, Divider, Typography} from "@mui/material";
import "./PageBuilder.css"
import {HorizontalSplit, Image, TextFormat, VerticalSplit} from "@mui/icons-material";
import {cloneElement, ReactElement, useState} from "react";



export default function PageBuilderWidgets() {

    const onMouseDown = (event:DragEvent,widget:ReactElement) => {
        event.preventDefault();

        let el = (event.target as HTMLElement);
        while((el as HTMLElement).className!=='widget' && el){
            el = (el.parentNode as HTMLElement)
        }
        const el1 = (el?.cloneNode(true) as HTMLElement);

        el1.className+=' dragging';
        document.body.appendChild(el1);
        el1.style.top = event.pageY+10 + "px";
        el1.style.left = event.pageX+10 + "px";
        const mouseMove = (event:MouseEvent) => {
            if(el1){
                el1.style.top = event.pageY+10 + "px";
                el1.style.left = event.pageX+10 + "px";
            }
        }
        const mouseUp = (event:MouseEvent) => {
            if(el1){
                el1.remove();
                document.body.removeEventListener("mousemove",mouseMove)
                document.body.removeEventListener("mouseup",mouseUp)
                document.body.removeEventListener("mouseleave", mouseUp)
            }
        }

        document.body.addEventListener("mouseup", mouseUp)
        document.body.addEventListener("mouseleave", mouseUp)
        document.body.addEventListener("mousemove", mouseMove)
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
                widgets.map(widget=>cloneElement(widget.element,{key:widget.id,onMouseDown:onMouseDown}))
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