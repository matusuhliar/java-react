import * as React from 'react';
import {Box, Button, Container, Link, Typography} from "@mui/material";
import "./Main.css"
import {DashboardCustomize, Dataset, Pages, People, VerifiedUser} from "@mui/icons-material";
import Dashboard from "./Dashboard";
import {
    Routes,
    Route, useNavigate, matchPath, useLocation
} from "react-router-dom";
import Users from "./Users";
import {ReactElement} from "react";
import UserNew from "./UserNew";
import UserEdit from "./UserEdit";
import {useAppDispatch, useAppSelector} from "../app/hooks";
import Loader from "./Loader";
import PageBuilder from "./pagebuilder/PageBuilder";
import {setToken} from "../app/axios";

const ROUTES = [
    {
       path:["/"],
       label: "Dashboard",
       icon: <DashboardCustomize />,
       element:<Dashboard />,
    },
    {
        path:["/page-builder"],
        label: "Page Builder",
        icon: <Pages />,
        element:<PageBuilder />,
    },
    {
        path:["/users","/users/new-user","/users/edit-user/:id"],
        label: "Users",
        icon: <People />,
        element:<Users />,
    }
]

interface IMenuItem {
    path:string[],
    label:string,
    icon:ReactElement,
    element:ReactElement
}

function MenuItem(props:IMenuItem) {
    const navigate = useNavigate();

    let selected = false;
    props.path.forEach(p=>{
        selected = selected || !!matchPath(p,window.location.pathname)
    })

    return (
        <Button
            onClick={()=>navigate(props.path[0])}
            fullWidth={true}
            variant={selected?"contained":"outlined"}
            startIcon={props.icon}
        >
            {props.label}
        </Button>
    )
}

export default function Main() {

    const dispatch = useAppDispatch();

    const logOut = () => {
        setToken("","");
        window.location.reload()
    }

    return (
        <Box className="main">
            <Loader />
            <Box className="top-bar">
                <Typography component="span">Mole Designer - Simple Web Site Designer</Typography>
                <Box className="gap"></Box>
                <Button className="logout" onClick={logOut}>Log Out</Button>
            </Box>
            <Box className="content">
                <Box className="menu">
                    {
                        ROUTES.map(r=><MenuItem key={r.path[0]} icon={r.icon} element={r.element} label={r.label} path={r.path} />)
                    }
                </Box>
                <Routes>
                    <Route path="/" element={<Dashboard />}/>
                    <Route path="/page-builder" element={<PageBuilder />}/>
                    <Route path="/users" element={<Users />}/>
                    <Route path="/users/new-user" element={<UserNew />}/>
                    <Route path="/users/edit-user/:id" element={<UserEdit />}/>
                </Routes>
            </Box>
        </Box>
    );
}
