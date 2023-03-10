import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document";

const APP_NAME = "Wild Cards Team Website";
const APP_DESCRIPTION =
  "The Official Website of the Wild Cards (FRC Team 3407)";

class _Document extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    return await Document.getInitialProps(ctx);
  }

  render() {
    return (
      <Html lang="en" dir="ltr">
        <Head>
          <meta name="application-name" content={APP_NAME} />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="default"
          />
          <meta name="apple-mobile-web-app-title" content={APP_NAME} />
          <meta name="description" content={APP_DESCRIPTION} />
          <meta name="format-detection" content="telephone=no" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="theme-color" content="#FFFFFF" />

          <link
            rel="apple-touch-icon"
            href="/static/icons/apple-touch-icon.png"
          />
          <link rel="shortcut icon" href="/static/icons/icon_512x512.png" />
          <meta charSet="utf-8" />
          <meta name="description" content={APP_DESCRIPTION} />
          <meta
            name="keywords"
            content="robotics,3407,first,frc.moundsview,mounds view,high school,wild cards"
          />

          <link rel="manifest" href="/manifest.json" />
          <link
            rel="apple-touch-icon"
            href="/static/icons/icon_512x512.png"
          ></link>
          <meta name="theme-color" content="#317EFB" />
          <meta name="application-name" content={APP_NAME} />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="default"
          />
          <meta name="apple-mobile-web-app-title" content={APP_NAME} />
          <meta name="description" content={APP_DESCRIPTION} />
          <meta name="format-detection" content="telephone=no" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta
            name="msapplication-config"
            content="/static/icons/browserconfig.xml"
          />
          <meta name="msapplication-TileColor" content="#2B5797" />
          <meta name="msapplication-tap-highlight" content="no" />
          <meta name="theme-color" content="#000000" />

          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/static/icons/icon_32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/static/icons/icon_16x16.png"
          />
          <link
            rel="mask-icon"
            href="/static/icons/icon_512x512.png"
            color="#5bbad5"
          />

          <meta
            name="twitter:card"
            content="The Official Site of the FRC Team 3407"
          />
          <meta name="twitter:url" content="https://frcteam3407.com" />
          <meta name="twitter:title" content={APP_NAME} />
          <meta name="twitter:description" content={APP_DESCRIPTION} />
          <meta
            name="twitter:image"
            content="https://yourdomain.com/icons/android-chrome-192x192.png"
          />
          <meta property="og:type" content="website" />
          <meta property="og:title" content={APP_NAME} />
          <meta property="og:description" content={APP_DESCRIPTION} />
          <meta property="og:site_name" content={APP_NAME} />
          <meta property="og:url" content="https://frcteam3407.com" />
          <meta
            property="og:image"
            content="https://yourdomain.com/icons/icon_72x72.png"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default _Document;
