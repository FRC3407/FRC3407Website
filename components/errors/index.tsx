import React from "react";

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: React.DetailedHTMLProps<any, any>) {
    super(props);

    this.state = { hasError: false };
  }

  public static getDerivedStateFromError(error: Error) {
    console.error(error);

    return { hasError: true };
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div>
          <h2>Oops, there is an error!</h2>
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
