import * as React from 'react';
import {
    Box,
    Button,
    Container,
    Link,
    Table,
    TableCell,
    TableBody,
    TableRow,
    TableHead,
    Typography,
    Paper, TableContainer, Divider, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Breadcrumbs
} from "@mui/material";
import "./Main.css"
import {useAppDispatch, useAppSelector} from "../app/hooks";
import {fetchUsersAsync, selectMovieLoadStatus, selectUsers, User} from "../reducers/usersSlice";
import {useEffect, useState} from "react";
import {Add, Delete, Edit} from "@mui/icons-material";
import Dashboard from "./Dashboard";
import {matchPath, Route, useNavigate} from "react-router-dom";
import {deleteUser} from "../api/user";

export default function Users() {

    const users = useAppSelector(selectUsers);
    const status = useAppSelector(selectMovieLoadStatus);
    const [userToDelete,setUserToDelete] = useState<User | null>(null);
    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchUsersAsync())
    }, [dispatch]);


    const onDialogClose = () => {
        setUserToDelete(null)
    }

    const onDelete = ()=>{
        const user = userToDelete;
        if(user){
            setUserToDelete(null);
            deleteUser(user.id).then(r=>{
                dispatch(fetchUsersAsync())
            })
        }
    }

    return (
        <Box className="app-area">

            <Dialog open={userToDelete!==null} onClose={onDialogClose}>
                <DialogTitle id="alert-dialog-title">
                    Confirm
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Do you want to delete user {userToDelete?.name}?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onDialogClose}>Cancel</Button>
                    <Button onClick={onDelete} autoFocus>
                        OK
                    </Button>
                </DialogActions>
            </Dialog>

            <Breadcrumbs aria-label="breadcrumb" sx={{mb:'20px'}}>
                 <Typography color="text.primary">Users</Typography>
            </Breadcrumbs>

            <Divider sx={{my:"10px"}}/>
            <Button
                onClick={()=>{navigate("/users/new-user")}}
                variant="contained"
                startIcon={<Add />}
            >
                Add New
            </Button>
            <Divider sx={{my:"10px"}}/>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table" size="small">
                    <TableHead>
                        <TableRow className="header-row">
                            <TableCell align="left">ID</TableCell>
                            <TableCell align="left">Email</TableCell>
                            <TableCell align="left">Name</TableCell>
                            <TableCell align="left">Role</TableCell>
                            <TableCell sx={{width:"50px"}} size="small" align="left"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((row) => (
                            <TableRow key={row.name}>
                                <TableCell sx={{width:"30px"}} align="left">{row.id}</TableCell>
                                <TableCell sx={{width:"200px"}} align="left">{row.email}</TableCell>
                                <TableCell align="left">{row.name}</TableCell>
                                <TableCell align="left">{row.roles.map(r=><span>{r.name}</span>)}</TableCell>
                                <TableCell sx={{width:"190px"}} align="right">
                                    <Box sx={{display:"flex",gap:"3px"}}>
                                        <Button
                                            onClick={()=>{navigate(`/users/edit-user/${row.id}`)}}
                                            variant="contained"
                                            startIcon={<Edit />}
                                            size="small"
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            onClick={()=>{setUserToDelete(row)}}
                                            variant="contained"
                                            startIcon={<Delete />}
                                            size="small"
                                        >
                                            Delete
                                        </Button>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
         </Box>
    );
}
