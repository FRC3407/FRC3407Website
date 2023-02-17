import Layout from "@components/layout";
import styles from "styles/pages/Error.module.scss";
import React from "react";
import Button from "@mui/material/Button";

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: null | Error }
  { hasError: boolean; error: null | Error }
> {
  constructor(props: React.DetailedHTMLProps<any, any>) {
    super(props);

    this.state = { hasError: false, error: null };
    this.state = { hasError: false, error: null };
  }

  public static getDerivedStateFromError(error: Error) {
    console.error(error);

    return { hasError: true, error };
    return { hasError: true, error };
  }

  public render() {
    if (this.state.hasError) {
      return (
        <Layout title={`Error`}>
          <div className={styles.errorPage}>
            <h1 className={styles.mainHeader}>Drat!</h1>
            <h4>Something went wrong, that&apos;s for sure</h4>
            <p>
              We have reported the error to the proper authorities and it should
              be fixed soonish
            </p>
            <div className={styles.options}>
              <Button
                className={styles.button}
                variant="contained"
                onClick={() => {
                  this.setState({ hasError: false, error: null });
                }}
              >
                Try Again
              </Button>
              <Button className={styles.button} variant="contained" href="/">
                Go Home
              </Button>
            </div>
          </div>
        </Layout>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
