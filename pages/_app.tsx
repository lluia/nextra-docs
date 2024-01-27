import "./global.css";
import { GoogleTagManager } from "@next/third-parties/google";

export default function App({ Component, pageProps }) {
  if (process.env.VERCEL_ENV !== "production") {
    return <Component {...pageProps} />;
  }
  return (
    <>
      <Component {...pageProps} />
      <GoogleTagManager gtmId="AW-11313383806" />
    </>
  );
}
