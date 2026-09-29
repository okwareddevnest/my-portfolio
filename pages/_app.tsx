import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Schibsted_Grotesk } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";

const sans = Schibsted_Grotesk({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-sans",
  display: "swap",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <div className={`${sans.variable} font-sans`}>
        <Component {...pageProps} />
      </div>
    </ThemeProvider>
  );
}
