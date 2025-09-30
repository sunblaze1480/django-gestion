export const modalTextFieldStyle = {
marginBottom: '20px',
width: 'calc(100% - 90px)', // Adjust width and add margin
}

export const modalTitleStyle = {
marginBottom: '20px',
alignProperty: 'left'
}

export const modalContentStyle = (theme)=>  ({
  position: 'absolute',
  fontFamily: 'Roboto',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: theme.palette.container.main,
  color: theme.palette.container.text,
  width: '30%',
  minWidth:'350px',
  padding: '20px'
})



export const modalSalesDetailStyle = (theme) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  maxWidth: '1000px',
  maxHeight: '90vh',
  bgcolor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius * 2, // slightly more rounded
  boxShadow: '0 8px 24px rgba(0,0,0,0.2)', // subtle soft shadow
  p: 4,
  overflowY: 'auto',
  border: `1px solid ${theme.palette.divider}`,
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(3),
  
  // Table styling
  '& table': {
    borderCollapse: 'separate',
    borderSpacing: 0,
    minWidth: '100%',
    '& th': {
      backgroundColor: theme.palette.grey[900],
      color: theme.palette.common.white,
      fontWeight: 600,
      padding: theme.spacing(1.5),
    },
    '& td': {
      padding: theme.spacing(1.5),
      borderBottom: `1px solid ${theme.palette.divider}`,
    }
  },

  // Inputs inside modal
  '& input[type="number"]': {
    padding: theme.spacing(1),
    borderRadius: 4,
    border: `1px solid ${theme.palette.divider}`,
    width: '100%',
  },

  // Buttons
  '& button': {
    textTransform: 'none',
    fontWeight: 600,
  },
});

