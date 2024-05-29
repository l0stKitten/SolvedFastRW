import { TextField, IconButton, Grid } from "@mui/material";
import React, { Fragment } from "react";
import CloseIcon from '@mui/icons-material/Close';

export function Field({ element, index, valueChange, labelField, nameField, handleEraseField }) {
    const { value } = element;

    const handleElementChange = (e) => {
        valueChange(index, e.target.value);
    };

    const handleElementErase = (e) => {
        handleEraseField(index);
    };

    return (
        <Fragment>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={11}>
                    <TextField
                        disabled
                        margin="dense"
                        name={nameField}
                        label={labelField}
                        fullWidth
                        variant="outlined"
                        value={value}
                        type="text"
                        onChange={handleElementChange}
                    />
                </Grid>
                <Grid item xs={1}>
                    <IconButton 
                        aria-label="delete" 
                        color="error"
                        onClick={handleElementErase}
                    >
                        <CloseIcon />
                    </IconButton>
                </Grid>
            </Grid>
        </Fragment>
    );
}