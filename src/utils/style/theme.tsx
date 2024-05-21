//  Made by Ngamaleu Poukam Pierre Irénée
import { createTheme } from '@mui/material'
import { green, red } from '@mui/material/colors'
import React from 'react'

declare module '@mui/material/styles' {
  interface Theme {
    common: {
      // line: React.CSSProperties['color']
      // inputBackground: React.CSSProperties['color']
      // adminElement: React.CSSProperties['color']
      button: React.CSSProperties['color']
      notification: React.CSSProperties['color']
      submitBtnSuccess: React.CSSProperties['color']
      submitBtnEchec: React.CSSProperties['color']
      background: React.CSSProperties['color']
      // adminBackground: React.CSSProperties['color']
      // offWhite: React.CSSProperties['color']
      // placeholder: React.CSSProperties['color']
      // label: React.CSSProperties['color']
      // body: React.CSSProperties['color']
      // titleActive: React.CSSProperties['color']
      // dialogBackground: React.CSSProperties['color']
      greeting: React.CSSProperties['color']
    }
  }
  interface ThemeOptions {
    common: {
      // line: React.CSSProperties["color"];
      // inputBackground: React.CSSProperties["color"];
      // adminElement: React.CSSProperties["color"];
      button: React.CSSProperties['color']
      notification: React.CSSProperties['color']
      submitBtnSuccess: React.CSSProperties['color']
      submitBtnEchec: React.CSSProperties['color']
      background: React.CSSProperties['color']
      // adminBackground: React.CSSProperties["color"];
      // offWhite: React.CSSProperties["color"];
      // placeholder: React.CSSProperties["color"];
      // label: React.CSSProperties["color"];
      // body: React.CSSProperties["color"];
      // titleActive: React.CSSProperties["color"];
      // dialogBackground: React.CSSProperties["color"]
      greeting: React.CSSProperties['color']
    }
  }
  interface TypographyVariants {
    h1: React.CSSProperties
    h2: React.CSSProperties
    h3: React.CSSProperties
    body1: React.CSSProperties
    body2: React.CSSProperties
    caption: React.CSSProperties
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    h1: React.CSSProperties
    h2: React.CSSProperties
    h3: React.CSSProperties
    body1: React.CSSProperties
    body2: React.CSSProperties
    caption: React.CSSProperties
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    h1: true
    h2: true
    h3: true
    body1: true
    body2: true
    caption: true
  }
}

export const theme = createTheme({
  palette: {
    primary: {
      main: '#2092BA',
      light: '#0D3A4A',
      dark: '#061D25',
      contrastText: '#000000',
    },
    secondary: {
      main: '#00E5FF',
      light: '#33eaff',
      dark: '#00a0b2',
      contrastText: '#fff',
    },
  },
  common: {
    button: '#F5FA05',
    greeting: '#f0f0f0',
    notification: '#1a7ea0',
    submitBtnSuccess: green[500],
    submitBtnEchec: red[500],
    background: "#eeeeee"
  },
})
