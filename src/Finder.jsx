// import './assets/css/Finder.css';
import { useState } from 'react';
import { TextField, Button, ButtonGroup, Box, Typography, Paper } from '@mui/material';
import { Search } from '@mui/icons-material';


function Finder({onSearch, onViewModeChange, viewMode}) {
     const [inputValue, setInputValue] = useState("");

    const handleInputChange = (evento) => {
        const value = evento.target.value;
        setInputValue(value);
        if (onSearch) onSearch(value);
        }



    return(
        <Box sx={{ p: 2 }}>
            <Typography variant="h5" gutterBottom align="left">
                Pokédex
            </Typography>
            
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', justifyContent: 'space-between' }}>
                <TextField
                    placeholder="Buscar Pokemon"
                    value={inputValue}
                    onChange={handleInputChange}
                    size="small"
                    sx={{  width: '400px'}}
                     InputProps={{
                        startAdornment: <Search sx={{ color: 'gray', mr: 1 }} />
                    }}
                />
                
                <ButtonGroup  size="small">
                       <Button 
                        variant={viewMode === 'list' ? 'contained' : 'outlined'}
                        onClick={() => onViewModeChange('list')}
                         color="primary">Lista  </Button>
                    <Button 
                        variant={viewMode === 'grid' ? 'contained' : 'outlined'}
                        onClick={() => onViewModeChange('grid')}
                        color="primary" > Cuadrícula </Button>                 
                </ButtonGroup>
            </Box>
        </Box>
    )
}


export default Finder;