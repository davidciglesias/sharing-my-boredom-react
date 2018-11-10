
import { createMuiTheme } from '@material-ui/core/styles';

const palette = {
    primary: { main: '#4527A0' },
    secondary: { main: '#757575' },
  };
const typography = { 
    useNextVariants: true
}

const themeName = 'Daisy Bush Boulder Burro';
  
const theme = createMuiTheme({palette, typography, themeName});

export default theme