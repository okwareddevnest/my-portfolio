import { Html, Head, Main, NextScript } from "next/document";

// Runs before first paint so a stored dark preference never flashes light.
// Light is the default; dark only when the visitor chose it with the toggle.
const themeScript = `try{if(localStorage.getItem("theme")==="dark")document.documentElement.classList.add("dark")}catch(e){}`;

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
