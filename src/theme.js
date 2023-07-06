import { createTheme } from '@mui/material/styles';
import data from "../data.json";
const { theme } = data

export const lightTheme = createTheme(
  (theme && theme.light && Object.keys(theme.light).length > 0) ? theme.light :
  {
    palette: {
      mode: "light"
    }
  }
)

export const darkTheme = createTheme(
  (theme && theme.dark && Object.keys(theme.dark).length > 0) ? theme.dark :
  {
    palette: {
      mode: "dark"
    }
  }
)