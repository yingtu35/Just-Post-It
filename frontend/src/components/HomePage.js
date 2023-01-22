import React, { useState, useRef, useEffect } from "react";
import { Grid, TextField, Button, Typography, Collapse, Alert, IconButton} from "@mui/material";
import Post from "./Post";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

export default function HomePage(props) {
    const [posts, setPosts] = useState([]);
    const[successMsg, setSuccessMsg] = useState("");
    const[errorMsg, setErrorMsg] = useState("");
    const[inputCount, setInputCount] = useState(0);
    const inputRef = useRef();

    function handleInput() {
        if (inputRef.current.value) {
            if (inputRef.current.value.length > 128){
                inputRef.current.value = inputRef.current.value.slice(0, -1);
            } 
        }
        setInputCount(inputRef.current.value.length);
    }

    function onSubmit() {
        if (inputRef.current.value) {
            const msg = inputRef.current.value;
            const requestOptions = {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    message: msg,
                }),
            }

            fetch("/api/create-post", requestOptions)
            .then((response) => {
                if (response.ok){
                    return response.json();
                }else{
                    if(response.status === 403){
                        setErrorMsg("Sorry! No more than 6 posts are allowed.")
                        setTimeout(() => {
                            setErrorMsg("");
                        }, 2000);
                    }
                    console.log(response.json());
                    return
                }
            })
            .then((data) => {
                if(data){
                    getCurrentOwnerPosts();
                    setSuccessMsg("Congratulations! Post is put on the wall.")
                    setTimeout(() => {
                        setSuccessMsg("");
                    }, 2000);
                    inputRef.current.value = "";
                    setInputCount(0);
                }
            });
        }
        else{
            setErrorMsg("Oh! You didn't input anything...")
            setTimeout(() => {
                setErrorMsg("");
            }, 2000);
        }
    }

    function onClear() {
        inputRef.current.value="";
        setInputCount(0);
        setSuccessMsg("")
        setErrorMsg("");

    }

    function getCurrentOwnerPosts() {
        fetch("/api/get-posts")
        .then((response) => response.json())
        .then((data) => {
            setPosts(data.posts);
        })
    }

    useEffect(() => {
        // effect 1: get all posts of the user
        getCurrentOwnerPosts();
        return () => {
            // clean up previous effect here
        }
    }, []);

    return (
        <div style={{height: '100vh', overflow: 'auto'}}>
        <Grid container>
            <Grid container spacing={1} align="center" mb={3}>
                <Grid item xs={12} >
                    <Typography component="h3" variant="h3">
                        Just Post It!
                    </Typography>
                    <Typography component="body1" variant="body1">
                        Currently support up to 6 posts for PC version.
                        Mobile version is currently not supported. 
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <IconButton aria-label="GitHub" 
                                href="https://github.com/yingtu35">
                        <GitHubIcon />
                    </IconButton>
                    <IconButton aria-label="LinkedIn" color="primary"
                                href="https://www.linkedin.com/in/yingtu/">
                        <LinkedInIcon />
                    </IconButton>
                    <IconButton aria-label="Facebook" color="primary"
                                href="https://www.facebook.com/profile.php?id=100000582214483">
                        <FacebookIcon />
                    </IconButton>
                    <IconButton aria-label="Instagram" color="primary" style={{color: 'purple'}}
                                href="https://www.instagram.com/orevo860305/">
                        <InstagramIcon />
                    </IconButton>
                </Grid>
                <Grid item xs={12} >
                        <TextField
                            id="outlined-multiline-static"
                            inputRef={inputRef}
                            autoFocus={true}
                            label="Messages"
                            multiline
                            rows={3}
                            placeholder="Enter your message here"
                            // fullWidth
                            style={{width: '50%'}}
                            onChange={handleInput}
                        />
                        <Collapse in={successMsg != "" || errorMsg != ""} sx={{width: "50%"}}>
                            {successMsg != "" ? (
                            <Alert severity="success" onClose={() => setSuccessMsg("")}> {successMsg} </Alert>
                            ) : (
                            <Alert severity="error" onClose={() => setErrorMsg("")}> {errorMsg} </Alert>
                            )}
                        </Collapse>
                </Grid>
                <Grid item xs={12}>
                    <Typography component="body1" variant="body1">
                        {inputCount}/128
                    </Typography>
                    <Button color="secondary" variant="contained" sx={{mr: 1, ml: 1}} onClick={onClear}>
                        Clear
                    </Button>
                    <Button color="primary" variant="contained" onClick={onSubmit}>
                        Post It!
                    </Button>
                </Grid>
            </Grid>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} mt={3}>
                    {posts.map((post, index) => (
                            <Post key={index} {...post} updateCallback={getCurrentOwnerPosts}/>
                    ))}
            </Grid>
        </Grid>      
        </div>
    )
}