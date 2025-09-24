import React from 'react';
import { useLocation, Link as RouterLink } from 'react-router-dom';
import { Breadcrumbs, Link, Typography } from '@mui/material';

// Optional: map URL segments to friendly names
const breadcrumbNameMap = {
  products: "Productos",
  customers: "Clientes",
  sales: "Ventas",
  create: "Crear",
  pricelists: "Listas de Precios",
  shipments: "Envios",
  invoices: "Facturas",
};

export function AppBreadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(Boolean); // remove empty segments

  return (
    <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
      <Link component={RouterLink} color="inherit" to="/">
        Home
      </Link>

      {pathnames.map((segment, index) => {
        const routeTo = '/' + pathnames.slice(0, index + 1).join('/');
        const isLast = index === pathnames.length - 1;
        const name = breadcrumbNameMap[segment] || segment;

        return isLast ? (
          <Typography key={routeTo} color="text.primary">
            {name}
          </Typography>
        ) : (
          <Link key={routeTo} component={RouterLink} to={routeTo} color="inherit">
            {name}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
}
