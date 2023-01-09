import * as React from 'react';
import {Box, Button} from "@mui/material";
import "./PageBuilder.css"
import {ReactElement, useRef, useState} from "react";
import {DeleteForever, Settings} from "@mui/icons-material";
import PageBuilderForm from "./PageBuilderForm";
import {WIDGETS} from "./PageBuilderWidgets";
import {v4 as uuidv4} from 'uuid';

interface PageBuilderCanvasProps {
    activeWidget: string | null
    setActiveWidget: Function
}

export default function PageBuilderCanvas(props: PageBuilderCanvasProps) {

    const [active, setActive] = useState<string | null>(null);
    const [open, setOpen] = useState<boolean>(false);
    const canvas = useRef(null);

    const [items, setItems] = useState<any[]>([]);

    if (props.activeWidget && active) {
        setActive(null);
    }

    const onMouseDown = (event: any) => {

        if (props.activeWidget) {
            const rec = (canvas.current) ? (canvas.current as HTMLElement).getBoundingClientRect() : {x: 0, y: 0};

            if (WIDGETS.TEXT === props.activeWidget) {
                items.push({
                    id: uuidv4(),
                    event:event,
                    type: WIDGETS.TEXT,
                    data: {
                        text: "Sample text ..."
                    },
                    x: event.clientX - rec.x,
                    y: event.clientY - rec.y,
                    w: 10,
                    h: 10,
                    bg: 'transparent',
                })
            } else if (WIDGETS.IMAGE === props.activeWidget) {
                items.push({
                    id: uuidv4(),
                    event:event,
                    type: WIDGETS.IMAGE,
                    data: {
                        url: "https://www.fluentu.com/blog/wp-content/uploads/2016/09/thinking-in-a-foreign-language-e1479154410182.png.webp"
                    },
                    x: event.clientX - rec.x,
                    y: event.clientY - rec.y,
                    w: 10,
                    h: 10,
                    bg: 'transparent',
                })
            } else if (WIDGETS.BOX === props.activeWidget) {
                items.push({
                    id: uuidv4(),
                    event:event,
                    type: WIDGETS.BOX,
                    data: {
                        background: "white"
                    },
                    x: event.clientX - rec.x,
                    y: event.clientY - rec.y,
                    w: 10,
                    h: 10,
                    bg: 'transparent',
                })
            }

            props.setActiveWidget(null);
            setItems(items);
        }
    }

    const activeItem = items.find(i => i.id === active);

    return (
        <Box className="canvas-area-wrapper">
            {
                activeItem ? <PageBuilderForm
                    data={activeItem.data}
                    close={() => setOpen(false)}
                    save={(data: any) => {
                        activeItem.data = data;
                        setItems([...items]);
                        setOpen(false);
                    }}
                    open={open}
                    type={activeItem.type}
                /> : null
            }

            <Box className="canvas-area-toolbar">
                <Button variant={"contained"} onClick={() => setOpen(true)} disabled={active === null}
                        startIcon={<Settings/>}>Component Settings</Button>
                <Button variant={"contained"} onClick={() => setItems(items.filter(item=>item.id!==active))} disabled={active === null}
                        startIcon={<DeleteForever/>}>Remove Component</Button>
            </Box>
            <Box ref={canvas} className="canvas-area" onMouseDown={onMouseDown}>
                {
                    items.map(item => <PageBuilderCanvasItem key={item.id} active={item.id === active}
                                                             setActive={setActive}
                                                             definition={item} canvas={canvas}
                                                             newMode={!!props.activeWidget}/>)
                }

            </Box>
        </Box>
    );
}

interface CanvasItemDefinition {
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

interface CanvasItemType {
    definition: CanvasItemDefinition,
    canvas: any,
    active: boolean,
    setActive: Function,
    newMode: boolean
}

function PageBuilderCanvasItem(props: CanvasItemType) {

    const [pos, setPos] = useState(props.definition);
    const [firstRender, setFirstRender] = useState(true);

    const item = useRef(null);


    const onMouseDown = (event: any, position: string) => {
        if (props.newMode) return;
        event.preventDefault();
        event.stopPropagation();
        if (!props.active) {
            props.setActive(props.definition.id)
        }

        const origin = {...pos}
        const originEvent = {x: event.clientX, y: event.clientY}
        const onMouseMove = (event: any) => {
            if (props.canvas.current) {
                const rec = (props.canvas.current as HTMLElement).getBoundingClientRect();
                if ("top-left" === position) {
                    pos.x = Math.min(Math.max(0, event.clientX - rec.x), origin.x + origin.w - 10);
                    pos.y = Math.min(Math.max(0, event.clientY - rec.y), origin.y + origin.h - 10);
                    pos.w = origin.w + (origin.x - pos.x);
                    pos.h = origin.h + (origin.y - pos.y);
                } else if ("bottom-right" === position) {
                    pos.w = Math.max(10, event.clientX - rec.x - origin.x);
                    pos.h = Math.max(10, event.clientY - rec.y - origin.y);
                } else if ("top-right" === position) {
                    pos.w = Math.max(10, event.clientX - rec.x - origin.x);
                    pos.y = Math.min(Math.max(0, event.clientY - rec.y), origin.y + origin.h - 10);
                    pos.h = origin.h + (origin.y - pos.y);
                } else if ("bottom-left" === position) {
                    pos.x = Math.min(Math.max(0, event.clientX - rec.x), origin.x + origin.w - 10);
                    pos.w = origin.w + (origin.x - pos.x);
                    pos.h = Math.max(10, event.clientY - rec.y - origin.y);
                } else if ("move" === position) {
                    pos.x = Math.max(0, event.clientX - originEvent.x + origin.x);
                    pos.y = Math.max(0, event.clientY - originEvent.y + origin.y);
                }
                pos.x = Math.round(pos.x / 10) * 10
                pos.y = Math.round(pos.y / 10) * 10
                pos.w = Math.round(pos.w / 10) * 10
                pos.h = Math.round(pos.h / 10) * 10
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

    if (props.definition.event && firstRender) {
        setFirstRender(false);
        onMouseDown(props.definition.event, "bottom-right")
    }


    const renderData = () => {
        if (WIDGETS.TEXT === props.definition.type) {
            return props.definition.data.text
        } else if (WIDGETS.IMAGE === props.definition.type) {
            return "<img style=\"width:100%;height:100%\" src=\"" + props.definition.data.url + "\" />"
        } else if (WIDGETS.BOX === props.definition.type) {
            return "<div style=\"width:100%;height:100%;background:"+props.definition.data.background+"\" />"
        }
        return "";
    }

    if (!props.active) {
        return (
            <div ref={item} style={{
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

