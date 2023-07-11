import { createTheme } from '@mui/material/styles';
import data from "../data.json";
const { theme } = data

export const lightTheme = createTheme(theme.light)

export const darkTheme = createTheme(theme.dark)