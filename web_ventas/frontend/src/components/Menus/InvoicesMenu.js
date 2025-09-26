import React from 'react';
import { BaseMenu } from './BaseMenu';

const InvoicesMenu = () => {
  return (
    <BaseMenu
          items={[
            { label: 'Generar Factura', onClick: () => window.location.href = '/invoices/create' },
        ]}
        >
    </BaseMenu>
  );
};
export default InvoicesMenu;
