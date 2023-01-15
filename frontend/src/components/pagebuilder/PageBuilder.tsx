import * as React from 'react';
import {Alert, Box, Breadcrumbs, Button, Divider, Typography} from "@mui/material";
import "./PageBuilder.css"
import PageBuilderWidgets from "./PageBuilderWidgets";
import PageBuilderCanvas from "./PageBuilderCanvas";
import {useState} from "react";
import {DeleteForever, MoveDown, MoveUp, Preview, Settings} from "@mui/icons-material";
import PageBuilderProperties from "./PageBuilderProperties";
import {CanvasItemDefinition} from "./PageBuilderCanvasItem";
import {v4 as uuidv4} from 'uuid';
import PageBuilderPages from './PageBuilderPages';

export interface Page{
    id: string,
    path: string,
    items: CanvasItemDefinition[]
}

export default function PageBuilder() {

    const [pages, setPages] = useState<Page[]>([{
        id: uuidv4(),
        path: "home",
        items:[]
    },{
        id: uuidv4(),
        path: "contacts",
        items:[]
    }]);

    const [active, setActive] = useState<string | null>(null);

    const [activePage, setActivePage] = useState<string>(pages[0].id);

    const [activeWidget, setActiveWidget] = useState<string | null>(null);

    const selectedPage = pages.find(p=>p.id === activePage);

    const setActivePageWrapper = (page:string) => {
        setActive(null)
        setActivePage(page)
    }

    const setItems = (items:CanvasItemDefinition[])=>{
        if(selectedPage){
            selectedPage.items = items;
            setPages([...pages]);
        }
    }

    if(!selectedPage) return null;

    return (
        <Box className="app-area">
            <Breadcrumbs aria-label="breadcrumb" sx={{mb:'20px'}}>
                <Typography color="text.primary">Page Builder</Typography>
            </Breadcrumbs>
            <Divider sx={{my:"10px"}}/>
            <Box className="page-builder">
                <Box className="components">
                    <Box className="header">
                        Components
                    </Box>
                    <PageBuilderWidgets activeWidget={activeWidget} setActiveWidget={setActiveWidget} />
                </Box>
                <Box className="canvas">
                    <Box className="header">
                        Canvas
                    </Box>
                    <PageBuilderCanvas active={active} setActive={setActive} activeWidget={activeWidget} setActiveWidget={setActiveWidget} items={selectedPage.items} setItems={setItems}/>
                </Box>
                <Box className="properties">
                    <Box className="header">
                        Pages
                    </Box>
                    <PageBuilderPages pages={pages} activePage={activePage} setActivePage={setActivePageWrapper}/>
                    <Box className="header">
                        Actions
                    </Box>
                    <PageBuilderProperties active={active} items={selectedPage.items} setItems={setItems} />
                </Box>
            </Box>
        </Box>
    );
}
