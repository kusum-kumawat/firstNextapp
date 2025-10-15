// components/ErrorBoundary.tsx
import React from "react";
import { useError } from "../_context/ErrorContext";

interface Props {
  children: React.ReactNode;
}

export class ErrorBoundary extends React.Component<Props> {
  static contextType = React.createContext(null);

  override componentDidCatch(error: Error) {
    // Hook into our global error context
    // const { setError } = this.context;
    console.log(this.context);
    // setError(error.message);
  }

  override render() {
    return this.props.children;
  }
}
