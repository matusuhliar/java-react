import * as React from 'react';
import {
    Alert,
    Box,
    Breadcrumbs,
    Button,
    Divider,
    Grid,
    MenuItem,
    Modal, Popover,
    Slider,
    TextField,
    Typography
} from "@mui/material";
import "./PageBuilder.css"
import PageBuilderWidgets, {WIDGETS} from "./PageBuilderWidgets";
import PageBuilderCanvas from "./PageBuilderCanvas";
import {useEffect, useRef, useState} from "react";
import {Textarea} from "@mui/joy";
import {Controller} from "react-hook-form";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { SketchPicker } from 'react-color';

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
    width: 800,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function PageBuilderForm(props:FormProps) {

    const [data,setData] = useState(props.data);

    useEffect(() => setData(props.data), [props]);

    const toolbarOptions = [
        ['bold', 'italic', 'underline'],        // toggled buttons
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ 'color': [] }, { 'background': [] }],
        ['clean']                                         // remove formatting button
    ];

    const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>): void => {
        if(e.target.files && e.target.files.length>0) {
            let reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            reader.onload = function () {
                data.url=reader.result;
                setData({...data})
            };
        };
    }

    const getFields = (type:string)=>{
        if(type===WIDGETS.TEXT){
            return (
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Box sx={{width:"100%",height:"300px"}}>
                            <ReactQuill modules={{toolbar:toolbarOptions}} theme="snow" value={data.text} onChange={(value)=>{data.text=value;setData({...data})}} />
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" onClick={()=>props.save(data)}>Save</Button>
                        <Button variant="contained" onClick={()=>props.close()}>Cancel</Button>
                    </Grid>
                </Grid>
            )
        }else if(type===WIDGETS.IMAGE){
            return (
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <input onChange={handleFileSelected} type="file" accept="image/*" />
                        {/*<TextField
                            fullWidth={true}
                            required
                            id="outlined-required"
                            label="Image URL"
                            size="small"
                            type="file"
                            value={data.url}
                            onChange={(event)=>{data.url=(event.target as HTMLInputElement).value;setData({...data})}}
                            InputLabelProps={{shrink: true}}
                        />*/}
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" onClick={()=>props.save(data)}>Save</Button>
                        <Button variant="contained" onClick={()=>props.close()}>Cancel</Button>
                    </Grid>
                </Grid>
            )
        }else if(type===WIDGETS.VIDEO){
            return (
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth={true}
                            required
                            id="outlined-required"
                            label="Video URL"
                            size="small"
                            value={data.src}
                            onChange={(event)=>{data.src=(event.target as HTMLInputElement).value;setData({...data})}}
                            InputLabelProps={{shrink: true}}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" onClick={()=>props.save(data)}>Save</Button>
                        <Button variant="contained" onClick={()=>props.close()}>Cancel</Button>
                    </Grid>
                </Grid>
            )
        }else if(type===WIDGETS.BOX){
            return (
                <Grid container spacing={2}>
                    <Grid item xs={2}>
                        Background:
                    </Grid>
                    <Grid item xs={10}>
                        <ColorPicker value={data.background} onChange={(value:any)=>{data.background=value;setData({...data})}} />
                    </Grid>
                    <Grid item xs={2}>
                        Opacity:
                    </Grid>
                    <Grid item xs={10}>
                        <Slider aria-label="Volume" defaultValue={30} step={10} min={0} max={100} value={data.opacity*100} onChange={(event,value:any)=>{data.opacity=value/100;setData({...data})}} />
                    </Grid>
                    <Grid sx={{gap:2}} item xs={12}>
                        <Button variant="contained" onClick={()=>props.save(data)}>Save</Button>
                        <Button variant="contained" onClick={()=>props.close()}>Cancel</Button>
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

interface ColorPickerProps {
    value:string,
    onChange:Function
}

function ColorPicker(props:ColorPickerProps) {


    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <div style={{display:"flex",flexDirection:"row"}}>
            <div  style={{background:props.value,width:"100%",height:"25px",border:"1px solid black"}}  onClick={handleClick}></div>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <SketchPicker
                    color={ props.value }
                    onChangeComplete={ (color:any)=>props.onChange(color.hex)}
                />
            </Popover>
        </div>
    );
}