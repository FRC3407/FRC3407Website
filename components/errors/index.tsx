import Layout from "@components/layout";
import React from "react";

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: null | Error }
> {
  constructor(props: React.DetailedHTMLProps<any, any>) {
    super(props);

    this.state = { hasError: true, error: null };
  }

  public static getDerivedStateFromError(error: Error) {
    console.error(error);

    return { hasError: true, error };
  }

  public render() {
    if (this.state.hasError) {
      return (
        <Layout title={`Error`}>
          <h1>Colin is a zingus</h1>
          {/* <h1>There was an error</h1> */}
        </Layout>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
