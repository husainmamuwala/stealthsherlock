import { createTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';


// Custom material ui theme for this application
const theme = createTheme({
    palette: {
        
        primary: {
            main: "#FF0000",
            light: "#36623c",
            extraLight: "#32cd32"
        },
        secondary: {
            main: "#FF0000",
        },
        text: {
            main: "#fff"
        },
        error: {
            main: red.A700
        },
        background: {
            light: "#1A1A1A",
            default: "#1A1A1A"
        }
    },
    spacing: 10
})

export default theme