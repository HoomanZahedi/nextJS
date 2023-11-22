import Link from "next/link";
import React from "react";

function NotFound() {
  return (
    <main className="text-center">
      <h2 className="text-3xl">Requested Page Has Not Been Found</h2>
      <p>
        Get Back to{" "}
        <Link className="text-primary" href="/">
          Dashboard
        </Link>
      </p>
    </main>
  );
}

export default NotFound;
