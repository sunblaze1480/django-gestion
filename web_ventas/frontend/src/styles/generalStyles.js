export const appBarStyles = {
    position: 'fixed',
    /*background: "rgb(27,18,179)",*/    
    background: "linear-gradient(90deg, #5172c0, #3b5791)",
    zIndex: (theme) => theme.zIndex.drawer + 1,
    height: '4%',
    justifyContent: 'center'

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
    /*background: '#5156bd'  ,*/
    /*background: 'linear-gradient(90deg, rgba(81,152,189,1) 0%, rgba(98,0,255,1) 100%)',
    color: 'white',*/
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