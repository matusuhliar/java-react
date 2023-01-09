import * as React from 'react';
import {Alert, Box, Breadcrumbs, Button, Divider, Grid, MenuItem, Modal, TextField, Typography} from "@mui/material";
import "./PageBuilder.css"
import PageBuilderWidgets, {WIDGETS} from "./PageBuilderWidgets";
import PageBuilderCanvas from "./PageBuilderCanvas";
import {useEffect, useState} from "react";
import {Textarea} from "@mui/joy";
import {Controller} from "react-hook-form";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface FormProps{
    open:boolean,
    save:Function,
    close:Function,
    type:string,
    data:any
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function PageBuilderForm(props:FormProps) {

    const [data,setData] = useState(props.data);

    useEffect(() => setData(props.data), [props]);

    const getFields = (type:string)=>{
        if(type===WIDGETS.TEXT){
            return (
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth={true}
                            required
                            id="outlined-required"
                            label="Color"
                            size="small"
                            value={data.color}
                            onChange={(event)=>{data.color=(event.target as HTMLInputElement).value;setData({...data})}}
                            InputLabelProps={{shrink: true}}
                        />
                    </Grid>
                     <Grid item xs={12}>
                        <ReactQuill theme="snow" value={data.text} onChange={(value)=>{data.text=value;setData({...data})}} />
                    </Grid>
                    <Grid item xs={6}>
                        <Button onClick={()=>props.save(data)}>Save</Button>
                    </Grid>
                </Grid>
            )
        }else if(type===WIDGETS.IMAGE){
            return (
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth={true}
                            required
                            id="outlined-required"
                            label="Image URL"
                            size="small"
                            value={data.url}
                            onChange={(event)=>{data.url=(event.target as HTMLInputElement).value;setData({...data})}}
                            InputLabelProps={{shrink: true}}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Button onClick={()=>props.save(data)}>Save</Button>
                    </Grid>
                </Grid>
            )
        }else if(type===WIDGETS.BOX){
            return (
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth={true}
                            required
                            id="outlined-required"
                            label="Background Color"
                            size="small"
                            value={data.background}
                            onChange={(event)=>{data.background=(event.target as HTMLInputElement).value;setData({...data})}}
                            InputLabelProps={{shrink: true}}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth={true}
                            required
                            id="outlined-required"
                            label="Opacity"
                            size="small"
                            value={data.opacity}
                            onChange={(event)=>{data.opacity=(event.target as HTMLInputElement).value;setData({...data})}}
                            InputLabelProps={{shrink: true}}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Button onClick={()=>props.save(data)}>Save</Button>
                    </Grid>
                </Grid>
            )
        }

        return null;
    }


    return (
        <Modal
            open={props.open}
            onClose={()=>props.close()}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                {getFields(props.type)}
            </Box>
        </Modal>
    );
}
