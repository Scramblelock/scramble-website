import { createGlobalStyle } from 'styled-components'

export const lightTheme = {
  body: '#fffff',
  main: '#5C14DB',
  mainColor: '#FFFFFF',
  accent: '#E5DE17',
  accentColor: '#161616',
  secondary: '#FFFFFF',
  secondaryColor: '#343434',
  dullColor: '#343434',
  ternary: '#000000',
  codeColor: '#D121C5',
}

export const GlobalStyles = createGlobalStyle`
    html,
    body {
    padding: 0;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
        Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    }

    a {
    color: inherit;
    text-decoration: none;
    }

    * {
    box-sizing: border-box;
    }
`
