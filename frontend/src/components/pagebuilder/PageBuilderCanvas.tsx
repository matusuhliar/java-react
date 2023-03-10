import * as React from 'react';
import {Box, Button} from "@mui/material";
import "./PageBuilder.css"
import {MouseEventHandler, ReactElement, useEffect, useRef, useState} from "react";
import {DeleteForever, MoveDown, MoveUp, Preview, Settings} from "@mui/icons-material";
import PageBuilderForm from "./PageBuilderForm";
import {WIDGETS} from "./PageBuilderWidgets";
import {v4 as uuidv4} from 'uuid';
import PageBuilderCanvasItem, {CanvasItemDefinition, CanvasItemType} from "./PageBuilderCanvasItem";

interface PageBuilderCanvasProps {
    activeWidget: string | null,
    setActiveWidget: Function,
    items: CanvasItemDefinition[],
    setItems:Function,
    active: string | null,
    setActive: Function
}

export default function PageBuilderCanvas(props: PageBuilderCanvasProps) {

    const {active, setActive} = props;
    const [open, setOpen] = useState<boolean>(false);
    const {items,setItems} = props;

    //const [items, setItems] = useState<any[]>(props.items || []);
    const canvas = useRef(null);

    const deleteItem=(e:KeyboardEvent)=>{
        if(!open && active !== null && e.code==='Delete'){
            const remainingItems = items.filter(i=>i.id !== active);
            setItems(remainingItems);
        }
    }

    const updateItems = (item:CanvasItemDefinition) => {
        for(let i=0;i<items.length;i++){
            if(items[i].id === item.id) items[i] = item;
        }
        setItems([...items])
    }


    const setActiveItem = (itemId:string) =>{
        setActive(itemId)
    }



    useEffect(()=>{
        window.addEventListener('keydown',deleteItem,false)
        return ()=>{
            window.removeEventListener("keydown",deleteItem, false)
        }
    },[active])

    if (props.activeWidget && active) {
        setActive(null);
    }

    const onMouseDown = (event: any) => {
        if (!props.activeWidget && event.target === canvas.current) {
            setActive(null);
        }else if (props.activeWidget) {
            const rec = (canvas.current) ? (canvas.current as HTMLElement).getBoundingClientRect() : {x: 0, y: 0};

            if (WIDGETS.VIDEO === props.activeWidget) {
                items.push({
                    id: uuidv4(),
                    event:event,
                    type: WIDGETS.VIDEO,
                    data: {
                        src: "https://file-examples.com/storage/fea8fc38fd63bc5c39cf20b/2017/04/file_example_MP4_480_1_5MG.mp4"
                    },
                    x: event.clientX - rec.x,
                    y: event.clientY - rec.y,
                    w: 10,
                    h: 10,
                    bg: 'transparent',
                })

            } else if (WIDGETS.TEXT === props.activeWidget) {
                items.push({
                    id: uuidv4(),
                    event:event,
                    type: WIDGETS.TEXT,
                    data: {
                        text: "Sample text ...",
                        color: "black"
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
                        background: "white",
                        opacity:1
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


            <Box ref={canvas} className="canvas-area" onMouseDown={onMouseDown}>
                {
                    items.map(item => <PageBuilderCanvasItem key={item.id} active={item.id === active}
                                                             setActive={setActiveItem} setOpen={setOpen}
                                                             definition={item} canvas={canvas} updateItems={updateItems}
                                                             newMode={!!props.activeWidget}/>)
                }
            </Box>
        </Box>
    );
}
