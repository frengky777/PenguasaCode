"use client";

import React from "react";

export class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: any) {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error("🧨 React caught an error:", error);
  }

  render() {
    if (this.state.hasError) {
      return <div className="p-4 text-red-500">Something went wrong in this section.</div>;
    }

    return this.props.children;
  }
}
