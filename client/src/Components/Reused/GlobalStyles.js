import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`



    /* http://meyerweb.com/eric/tools/css/reset/ 
        v2.0 | 20110126
        License: none (public domain)
    */

    html, body, div, span, applet, object, iframe,
    blockquote, pre,
    a, abbr, acronym, address, big, cite, code,
    del, dfn, em, img, ins, kbd, q, s, samp,
    small, strike, strong, sub, sup, tt, var,
    b, u, i, center,
    dl, dt, dd, ol, ul, li,
    fieldset, form, label, legend,
    table, caption, tbody, tfoot, thead, tr, th, td,
    article, aside, canvas, details, embed, 
    figure, figcaption, footer, header, hgroup, 
    menu, nav, output, ruby, section, summary,
    time, mark, audio, video {
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 100%;
        font: inherit;
        vertical-align: baseline;
    }

    input {
        &:disabled {
            cursor: not-allowed;
        }
    }

    /* HTML5 display-role reset for older browsers */
    article, aside, details, figcaption, figure, 
    footer, header, hgroup, menu, nav, section {
        display: block;
    }
    body {
        line-height: 1;
    }
    ol, ul {
        list-style: none;
    }
    blockquote, q {
        quotes: none;
    }
    blockquote:before, blockquote:after,
    q:before, q:after {
        content: '';
        content: none;
    }
    table {
        border-collapse: collapse;
        border-spacing: 0;
    }
    :root {
        --red: #c72a2f; 
        --black: #050a05; 
        --green: #5d9e75; 
        --yellow: #edcd5f; 
        --darkyellow: #685f25; 
        --brown: #4e3415; 
        --darkgray: #2f3223; 
        --lightgray: #7c8484; 
        --gray: #3c4444;
        --white: #FFFFFF;
    }
    body{
        background-color: var(--black);
        color: var(--white)
    }
    html {
        scroll-behavior: smooth;
    }

`;

export default GlobalStyles;


