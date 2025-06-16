import * as React from 'react';
import { Link, useLocation } from "react-router-dom";
import { Drawer, Toolbar, List, Divider, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import InventoryIcon from '@mui/icons-material/Inventory';
import PeopleIcon from '@mui/icons-material/People';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ReceiptIcon from '@mui/icons-material/Receipt';

const drawerWidth = 200;

const menuListOptions = [
  { text: 'Productos', icon: <InventoryIcon />, path: '/products' },
  { text: 'Clientes', icon: <PeopleIcon />, path: '/customers' },
  { text: 'Ventas', icon: <ShoppingCartIcon />, path: '/sales' },
  { text: 'Listas', icon: <MonetizationOnIcon />, path: '/pricelists' },
  { text:'Repartos', icon: <LocalShippingIcon/>, path: '/shipments'},
  { text:'Facturas', icon: <ReceiptIcon/>, path: '/invoices'}
  
];

export default function ClippedDrawer() {
  const location = useLocation(); // Hook to determine active route

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: '#f8f9fa' // Light background
        },
      }}
    >
      <Toolbar />
      <List>
        {menuListOptions.map(({ text, icon, path }) => (
          <ListItem key={text} disablePadding>
            <ListItemButton 
              component={Link} 
              to={path}
              selected={location.pathname === path} // Highlight active link
              sx={{
                '&.Mui-selected': { backgroundColor: '#e0e0e0' },
                '&:hover': { backgroundColor: '#e8eaf6' }, // Hover effect
              }}
            >
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </Drawer>
  );
}
