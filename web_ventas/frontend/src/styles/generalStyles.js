import { borderRadius } from "@mui/system";

export const appBarStyles = {
    position: 'fixed',
    /*background: "rgb(27,18,179)",*/    
    /*background: "linear-gradient(90deg, #5172c0, #3b5791)",*/
    zIndex: (theme) => theme.zIndex.drawer + 1,    
}

export const appBarContainerStyles = {
    display:'inline', 
    justifyContent: 'left',
     paddingLeft: '20px'
}

const DRAWER_WIDTH = 240

export const drawerStyles = {
    width: DRAWER_WIDTH,
    flexShrink: 0,
    '& .MuiDrawer-paper': {
      width: DRAWER_WIDTH,
      boxSizing: 'border-box',
    },
    boxShadow: '10px 10px 5px 0px rgba(0,0,0,0.75)',
    '&:hover': {
      background: 'Grey'
    }
  };

export const drawerContainerStyles = {  
    boxSizing: 'border-box',
    boxShadow: '5px 5px 5px 0px rgba(0,0,0,0.75)',
    width: '10%',    
    height: '100%',
    border: '2px solid black',  
}


export const alertStyles = {
  success:{
    background: 'green'
  },
  error:{
      background: 'red'
  }

}

export const containerStyles = (theme) =>( {
  width: '100%', marginRight: '1%', backgroundColor: theme.palette.container.main, color : theme.palette.container.text,
  borderRadius: '30px',
    overflowY: 'auto', // add vertical scroll
    overflowX: 'auto',
    padding: '10px',    // optional: inner spacing
})

export const containerAltStyles = (theme) =>( {
  width: '100%', marginRight: '1%', backgroundColor: theme.palette.container.main, color : theme.palette.container.text,
  borderRadius: '30px',
    overflowY: 'auto', // add vertical scroll
    overflowX: 'auto',
    padding: '5px',    // optional: inner spacing
})


export const dataGridStyles =(theme) => ( {
  backgroundColor: "container.main",     
  color: "container.text",
  "& .MuiDataGrid-main": {
    backgroundColor: "container.main",   
  },
  "& .MuiDataGrid-virtualScroller": {
    backgroundColor: "container.main",    // the scrolling area
  },
  "& .MuiDataGrid-columnHeaders": {
    backgroundColor: "tableHeader.main",    // optional: slightly different header color
  },
  "& .MuiDataGrid-footerContainer": {
    backgroundColor: "container.main",    // pagination/footer area
  },
})

export const pageHeaderStyles = () => ({
      display: 'flex',
      alignItems: 'center',
      gap: 15,
      marginBottom: '10px',
})


