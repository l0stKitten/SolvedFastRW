import * as React from 'react';
import { AppBar, Toolbar, Button } from '@mui/material';

import { useNavigate } from 'react-router-dom';

const menuOptions = [
    { id: 1, name: "Programar", color: "primary", variant: "contained", navigate: "/programar" },
    { id: 2, name: "Técnicos", color: "inherit", variant: "text", navigate: "/tecnicos" },
    { id: 3, name: "Cliente", color: "inherit", variant: "text", navigate: "/clientes" },
    { id: 4, name: "Servicios", color: "inherit", variant: "text", navigate: "/servicios" },
    { id: 5, name: "Hoja de Trabajo", color: "inherit", variant: "text", navigate: "/hojatrabajo" },
    { id: 6, name: "Log Out", color: "inherit", variant: "text", navigate: "/ranks" },
];

export default function Menu() {
    const navigate = useNavigate();

    const handleNavigate = (route) => {
        navigate(route)
    }
    
    return (
        <AppBar position="static" color="transparent" sx={{ boxShadow: 0 }}>
            <Toolbar sx={{ justifyContent: "flex-end" }}>
                {menuOptions.map((option) => (
                    <Button
                        color={option.color}
                        variant={option.variant}
                        sx={{ margin: 1 }}
                        key={option.id}

                        onClick={() => handleNavigate(option.navigate)}
                    >
                        {option.name}
                    </Button>
                ))}
            </Toolbar>
        </AppBar>
    );
}