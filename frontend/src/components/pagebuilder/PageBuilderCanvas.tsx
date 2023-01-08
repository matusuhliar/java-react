import * as React from 'react';
import {Box} from "@mui/material";
import "./PageBuilder.css"
import {ReactElement, useRef, useState} from "react";


export default function PageBuilderCanvas() {

    const canvas = useRef(null);

    const items = [
        {
            id: "1",
            x: 15,
            y: 25,
            w: 200,
            h: 100,
            bg: 'red'
        },
        {
            id: "2",
            x: 56,
            y: 125,
            w: 250,
            h: 110,
            bg: 'green'
        }
    ];

    return (
        <Box ref={canvas} className="canvas-area">
            {
                items.map(item => <PageBuilderCanvasItem key={item.id} definition={item} canvas={canvas}/>)
            }

        </Box>
    );
}

interface CanvasItemDefinition {
    id: string,
    x: number,
    y: number,
    w: number,
    h: number,
    bg: string
}

interface CanvasItemType {
    definition: CanvasItemDefinition,
    canvas:any
}

function PageBuilderCanvasItem(props: CanvasItemType) {

    const [pos, setPos] = useState(props.definition);
    const item = useRef(null);

    const onMouseDown = (event: any, position: string) => {
        event.preventDefault();

        const origin = {...pos}
        const originEvent = {x:event.clientX,y:event.clientY}
        const onMouseMove = (event: any) => {
            if (props.canvas.current) {
                const rec = (props.canvas.current as HTMLElement).getBoundingClientRect();
                if ("top-left" === position) {
                    pos.x = Math.min(Math.max(0,event.clientX - rec.x),origin.x+origin.w - 10);
                    pos.y = Math.min(Math.max(0,event.clientY - rec.y),origin.y+origin.h - 10);
                    pos.w = origin.w + (origin.x - pos.x);
                    pos.h = origin.h + (origin.y - pos.y);
                }else if("bottom-right" === position) {
                    pos.w = Math.max(10,event.clientX - rec.x - origin.x);
                    pos.h = Math.max(10,event.clientY - rec.y - origin.y);
                }else if("move" === position) {
                    pos.x = Math.max(0,event.clientX - originEvent.x + origin.x);
                    pos.y = Math.max(0,event.clientY - originEvent.y + origin.y);
                }
                setPos({...pos});
            }
        }

        const onMouseUp = (event: any) => {
            document.body.removeEventListener("mousemove", onMouseMove)
            document.body.removeEventListener("mouseup", onMouseUp)
        }
        document.body.addEventListener("mousemove", onMouseMove)
        document.body.addEventListener("mouseup", onMouseUp)

    }

    return (
        <div ref={item} style={{
            top: pos.y - 4 + "px",
            left: pos.x - 4 + "px",
            width: pos.w + 8 + "px",
            height: pos.h + 8 + "px"
        }} className="canvas-item-wrapper">
            <div onMouseDown={(event) => onMouseDown(event, "move")} className="canvas-item" style={{
                position: "absolute",
                top: "4px",
                left: "4px",
                width: pos.w + "px",
                height: pos.h + "px",
                background: pos.bg
            }}></div>
            <div onMouseDown={(event) => onMouseDown(event, "top-left")} style={{
                position: "absolute",
                top: "4px",
                left: "4px",
                width: "8px",
                height: "8px",
                background: "silver"
            }}></div>
            <div onMouseDown={(event) => onMouseDown(event, "bottom-left")} style={{
                position: "absolute",
                top: pos.h - 4+ "px",
                left: "4px",
                width: "8px",
                height: "8px",
                background: "silver"
            }}></div>
            <div onMouseDown={(event) => onMouseDown(event, "bottom-right")} style={{
                position: "absolute",
                top: pos.h - 4+ "px",
                left: pos.w - 4+ "px",
                width: "8px",
                height: "8px",
                background: "silver"
            }}></div>
            <div onMouseDown={(event) => onMouseDown(event, "top-right")} style={{
                position: "absolute",
                top: "4px",
                left: pos.w - 4 + "px",
                width: "8px",
                height: "8px",
                background: "silver"
            }}></div>
        </div>
    );
}

