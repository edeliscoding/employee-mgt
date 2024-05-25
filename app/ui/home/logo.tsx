import Image from "next/image";
import React from "react";

export default function EdelLogo() {
  return (
    <div className="mb-4">
      <Image src="/logo.png" height={250} width={250} alt="edel logo" />
    </div>
  );
}
