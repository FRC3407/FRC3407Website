import React from "react";

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean, error: null | Error }
> {
  constructor(props: React.DetailedHTMLProps<any, any>) {
    super(props);

    this.state = { hasError: false, error: null };
  }

  public static getDerivedStateFromError(error: Error) {
    console.error(error);

    return { hasError: true, error };
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div>
          <h2>Oops, there is an error!</h2>
          <h3>{this.state.error?.message}</h3>
          <button
            type="button"
            onClick={() => this.setState({ hasError: false })}
          >
            Try again?
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
