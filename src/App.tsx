import React, {useState} from 'react';
import './App.css';
import {createStyles, Grid, makeStyles, Typography, TextField, Box} from "@material-ui/core"
import {DropzoneArea} from "material-ui-dropzone";

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            maxWidth: "800px",
            margin: "0 auto",
            marginTop: "20px"
        },
    })
);

function App() {
    const classes = useStyles();
    const [mimeType, setMimeType] = useState("");
    const [acceptedFiles, setAcceptedFiles] = useState<string[]>([]);
    const [fileName, setFileName] = useState<string>("");
    
    return (
        <div className={classes.root}>
            <Grid container direction={"column"} justify={"center"} spacing={3}>
                <Grid item xs={12}>
                    <DropzoneArea
                        filesLimit={1}
                        acceptedFiles={acceptedFiles}
                        showFileNames
                        showFileNamesInPreview
                        onChange={(files: File[]) =>{
                            if(files != null && files.length === 1){
                                const file = files[0];
                                setMimeType(file.type);
                                setFileName(file.name);
                            } else {
                              setMimeType("");
                              setFileName("");
                            }
                        }}

                        dropzoneText={`Drop your file here. Currently accepting the following files [${acceptedFiles.join(",")}]`}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Typography variant={"body2"}>
                        Drag-and-drop a file on the dropzone, and its MIME type (as seen by the dropzone) is shown
                        below. Your file won't be uploaded anywhere. Your browser simply inspects the MIME type.
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant={"body2"}>Change the accepted files parameter of the dropzone here:</Typography>
                  <Box mt={2}>
                    <TextField variant="outlined" label="Accepted files (comma separated list)" fullWidth onChange={(event)=>setAcceptedFiles(event.target.value.split(",").map(t => t.trim()))}/>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant={"body2"}>Mime type:</Typography>
                    <Typography variant={"body2"} component={"div"}>
                        <pre>
                            {mimeType}
                        </pre>
                    </Typography>
                    <Typography variant={"body2"}>File name:</Typography>
                    <Typography variant={"body2"} component={"div"}>
                        <pre>
                            {fileName}
                        </pre>
                    </Typography>
                </Grid>
            </Grid>
        </div>
    );
}

export default App;
