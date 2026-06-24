import "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    surface: string;
  }
  interface PaletteOptions {
    surface?: string;
  }
}
