import React from "react";

export default function handleEnterKey(
  event: React.KeyboardEvent<any>,
  buttonRef: React.RefObject<HTMLButtonElement>
) {
  if (event.key === "Enter") {
    buttonRef.current?.click();
  }
}
