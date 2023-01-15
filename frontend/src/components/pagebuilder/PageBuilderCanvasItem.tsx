import {useRef, useState} from "react";
import {WIDGETS} from "./PageBuilderWidgets";
import * as React from "react";

export interface CanvasItemDefinition {
    id: string,
    type: string,
    x: number,
    y: number,
    w: number,
    h: number,
    bg: string,
    data: any,
    event: MouseEvent | null
}

export interface CanvasItemType {
    definition: CanvasItemDefinition,
    canvas: any,
    active: boolean,
    updateItems: Function,
    setActive: Function,
    setOpen: Function,
    newMode: boolean
}

export default function PageBuilderCanvasItem(props: CanvasItemType) {

    const [pos, setPos] = useState(props.definition);
    const [firstRender, setFirstRender] = useState(true);

    const item = useRef(null);


    const onMouseDown = (event: any, position: string) => {
        if (props.newMode) return;
        event.preventDefault();
        if (!props.active) {
            props.setActive(props.definition.id)
        }

        const origin = {...pos}
        const originEvent = {x: event.clientX, y: event.clientY}
        const onMouseMove = (event: any) => {
            if (props.canvas.current) {
                const rec = (props.canvas.current as HTMLElement).getBoundingClientRect();
                const recX = rec.x - props.canvas.current.scrollLeft;
                const recY = rec.y - props.canvas.current.scrollTop;
                if ("top-left" === position) {
                    pos.x = Math.min(Math.max(0, event.clientX - recX), origin.x + origin.w - 10);
                    pos.y = Math.min(Math.max(0, event.clientY - recY), origin.y + origin.h - 10);
                    pos.w = origin.w + (origin.x - pos.x);
                    pos.h = origin.h + (origin.y - pos.y);
                } else if ("bottom-right" === position) {
                    pos.w = Math.max(10, event.clientX - recX - origin.x);
                    pos.h = Math.max(10, event.clientY - recY - origin.y);
                } else if ("top-right" === position) {
                    pos.w = Math.max(10, event.clientX - recX - origin.x);
                    pos.y = Math.min(Math.max(0, event.clientY - recY), origin.y + origin.h - 10);
                    pos.h = origin.h + (origin.y - pos.y);
                } else if ("bottom-left" === position) {
                    pos.x = Math.min(Math.max(0, event.clientX - recX), origin.x + origin.w - 10);
                    pos.w = origin.w + (origin.x - pos.x);
                    pos.h = Math.max(10, event.clientY - recY - origin.y);
                } else if ("move" === position) {
                    pos.x = Math.max(0, event.clientX - originEvent.x + origin.x);
                    pos.y = Math.max(0, event.clientY - originEvent.y + origin.y);
                }
                //pos.x = Math.round(pos.x / 10) * 10
                //pos.y = Math.round(pos.y / 10) * 10
                //pos.w = Math.round(pos.w / 10) * 10
                //pos.h = Math.round(pos.h / 10) * 10
                const newItem = {...pos};
                setPos(newItem);
                props.updateItems(newItem)
            }
        }

        const onMouseUp = (event: any) => {
            document.body.removeEventListener("mousemove", onMouseMove)
            document.body.removeEventListener("mouseup", onMouseUp)
        }
        document.body.addEventListener("mousemove", onMouseMove)
        document.body.addEventListener("mouseup", onMouseUp)

    }

    if (props.definition.event && firstRender) {
        setFirstRender(false);
        onMouseDown(props.definition.event, "bottom-right")
        props.definition.event = null;
    }


    const renderData = () => {
        if (WIDGETS.TEXT === props.definition.type) {
            return "<div style=\"width:100%;height:100%;color:"+props.definition.data.color+"\" >"+props.definition.data.text+"</div>"
        } else if (WIDGETS.IMAGE === props.definition.type) {
            return "<img style=\"width:100%;height:100%\" src=\"" + props.definition.data.url + "\" />"
        } else if (WIDGETS.BOX === props.definition.type) {
            return "<div style=\"width:100%;height:100%;background:"+props.definition.data.background+";opacity:"+props.definition.data.opacity+"\" />"
        } else if (WIDGETS.VIDEO === props.definition.type) {
            return "<video width=\"100%\" height=\"100%\" controls><source src=\""+props.definition.data.src+"\" type=\"video/mp4\"></video>"
        }
        return "";
    }

    const onClick = (event:any)=>{
        if(event.detail === 2){
            props.setOpen(true);
        }
    }

    if (!props.active) {
        return (
            <div onClick={onClick} ref={item} style={{
                top: pos.y - 4 + "px",
                left: pos.x - 4 + "px",
                width: pos.w + 8 + "px",
                height: pos.h + 8 + "px"
            }} className="canvas-item-wrapper disabled">
                <div onMouseDown={(event) => onMouseDown(event, "move")} className="canvas-item" style={{
                    position: "absolute",
                    top: "4px",
                    left: "4px",
                    width: pos.w + "px",
                    height: pos.h + "px",
                    background: pos.bg
                }} dangerouslySetInnerHTML={{__html: renderData()}}>

                </div>
            </div>
        )
    }

    return (
        <div onClick={onClick} ref={item} style={{
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
            }} dangerouslySetInnerHTML={{__html: renderData()}}>
            </div>
            <div onMouseDown={(event) => onMouseDown(event, "move")} className="canvas-item" style={{
                position: "absolute",
                top: "4px",
                left: "4px",
                width: pos.w + "px",
                height: pos.h + "px",
                background: "#2a2a2a",
                opacity: 0.001
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
                top: pos.h - 4 + "px",
                left: "4px",
                width: "8px",
                height: "8px",
                background: "silver"
            }}></div>
            <div onMouseDown={(event) => onMouseDown(event, "bottom-right")} style={{
                position: "absolute",
                top: pos.h - 4 + "px",
                left: pos.w - 4 + "px",
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

