import React from "react";
import { Field } from "./Field";
import { Grid } from "@mui/material";

/*const handleValueChange = (index, value) => {
        const found = elementsArray.find((element) => element.value === value);
        if (found != null && found.value === value) {
            setError("num_telefono", {
                type: "manual",
                message: "El número de teléfono ya ha sido añadido",
            });
            return;
        }

        const newArray = [...elementsArray];
        const element = newArray[index];
        element.value = value;
        setTF(newArray);
    };*/
    
export function FieldsList({ listElements, labelField, nameField, valueChange, handleEraseField}) {
    return (
        <Grid container spacing={2}>
        {listElements.map((element, index) => (
            <Grid item xs={12} key={index}>
            <Field
                index={index}
                element={element}
                labelField={labelField}
                nameField={nameField}
                valueChange={valueChange}
                handleEraseField={handleEraseField}
            />
            </Grid>
        ))}
        </Grid>
    );
}