import * as React from 'react';
import { Link, useLocation } from "react-router-dom";
import { Drawer, Toolbar, List, Divider, ListItem, ListItemButton, ListItemIcon, ListItemText, Box, IconButton } from "@mui/material";
import InventoryIcon from '@mui/icons-material/Inventory';
import PeopleIcon from '@mui/icons-material/People';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ReceiptIcon from '@mui/icons-material/Receipt';
import ClearIcon from '@mui/icons-material/Clear';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';

const drawerWidth = 200;

const menuListOptions = [
  { text: 'Productos', icon: <InventoryIcon />, path: '/products' },
  { text: 'Clientes', icon: <PeopleIcon />, path: '/customers' },
  { text: 'Ventas', icon: <ShoppingCartIcon />, path: '/sales' },
  { text: 'Listas', icon: <MonetizationOnIcon />, path: '/pricelists' },
  { text:'Repartos', icon: <LocalShippingIcon/>, path: '/shipments'},
  { text:'Facturas', icon: <ReceiptIcon/>, path: '/invoices'}
  
];

export default function ClippedDrawer({open, setOpen}) {
  const location = useLocation();



  return (
    <Drawer
      variant="temporary"
      anchor="left"
      open={open}
      onClose={()=>setOpen(false)}      
    >
    <Box
    sx={{ width: 240 }}
    role="presentation"
    onClick={()=>setOpen(false)}
    class="sidebar"
  >
    <IconButton onClick={()=>setOpen(false)} color="inherit">
      <ClearOutlinedIcon/>
    </IconButton>      
      <List color="inherit">
        {menuListOptions.map(({ text, icon, path }) => (
          <ListItem key={text} disablePadding>
            <ListItemButton 
              component={Link} 
              to={path}
              selected={location.pathname === path} // Highlight active link
              color="inherit"
              sx={{
                '&.Mui-selected': { backgroundColor: '#065350ff' },
                '&:hover': { backgroundColor: '#333333' }, // Hover effect
              }}
            >
              <ListItemIcon sx={{ color: '#E0E0E0' }}>{icon}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
  </Box>

      <Divider />
    </Drawer>
  );
}
