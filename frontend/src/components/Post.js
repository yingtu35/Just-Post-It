import React, { useState, useRef, useEffect } from "react"
import { Box, Grid, TextField, Button, Typography, IconButton, Chip } from "@mui/material"
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { sizing } from '@mui/system';

export default function Post(props) {
    const [owner, setOwner] = useState(props.owner || "");
    const [post_id, setPost_id] = useState(props.post_id || "");
    const [message, setMessage] = useState(props.message || "");
    const [createdAt, setCreatedAt] = useState(props.createdAt || "");
    const [updateEdit, setUpdateEdit] = useState(false);
    const[inputCount, setInputCount] = useState(props.message.length);
    const inputRef = useRef();

    useEffect(() => {
        setOwner(props.owner);
        setPost_id(props.post_id);
        setMessage(props.message);
        setCreatedAt(props.createdAt);
    }, [props.owner, props.post_id, props.message, props.createdAt]);

    function handleInput() {
        if (inputRef.current.value) {
            if (inputRef.current.value.length > 128){
                inputRef.current.value = inputRef.current.value.slice(0, -1);
            } 
        }
        setInputCount(inputRef.current.value.length);
    }

    function onUpdate(){
        const msg = inputRef.current.value;
        console.log(msg);
        const requestOptions = {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                post_id: post_id,
                message: msg,
            }),
        }
        fetch("/api/update-post", requestOptions)
        .then((response) => {
            if (!response.ok){
                error = response.json();
                console.log(error);
                return
            }
            return response.json();
        })
        .then((data) => {
            if(data){
                setMessage(data.message);
                setUpdateEdit(false);
            }
        })
    }

    function onDelete(){
        if (updateEdit){
            setUpdateEdit(false);
        }

        const requestOptions = {
            method: "DELETE",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                post_id: post_id,
            }),
        }

        fetch("/api/delete-post", requestOptions)
        .then((response) => {
            if (response.ok){
                props.updateCallback();
                return
            }else{
                return response.json();
            }
        })
    }
    
    function extractDate(datetime) {
        return datetime.match(/^\d{1,}-\d{2}-\d{2}/)[0];
    }

    return (
            <Grid item xs={2} sm={4} md={4}>
            <Box
                sx={{
                    height: 200,
                    backgroundColor: '#ffeb3b',
                    boxShadow: '3px 3px 9px #000000',
                    '&:hover': {
                    backgroundColor: '#fff176',
                    // opacity: [0.9],
                    },
                }}>
                    <Grid container sx={{padding: 1}}>
                        <Grid container align="right">
                            <Grid item xs={12}>
                                <Chip label={extractDate(createdAt)} size="small"/>
                                <IconButton aria-label="edit">
                                    <EditIcon onClick={() => setUpdateEdit(true)}/>
                                </IconButton>
                                <IconButton aria-label="delete">
                                    <DeleteIcon size="small" onClick={onDelete}/>
                                </IconButton>
                            </Grid>
                        </Grid>
                        {updateEdit ? 
                        <Grid item xs={12}>
                            <TextField
                            id="edit"
                            variant="outlined"
                            inputRef={inputRef}
                            defaultValue={message}
                            autoFocus={true}
                            multiline
                            rows={3}
                            sx={{backgroundColor: "#fffde7"}}
                            fullWidth
                            onChange={handleInput}
                            />
                            <Box align="right">
                                <Typography component="body2" variant="body2">
                                    {inputCount}/128
                                </Typography>
                                <Button color="secondary" 
                                        variant="contained" 
                                        size="small"
                                        onClick={() => setUpdateEdit(false)}>
                                    Back
                                </Button>
                                <Button color="primary" 
                                        variant="contained" 
                                        size="small"
                                        onClick={onUpdate}>
                                    Update
                                </Button>
                            </Box>
                            
                        </Grid> :
                        <Grid item xs={12} textAlign="justify" sx={{maxWidth: 200}}>
                            <Typography component="body1" variant="body1" sx={{padding: 1,}}>
                                {message}
                            </Typography>
                        </Grid>
                        }
                    </Grid>
                </Box>
            </Grid>
    )
}