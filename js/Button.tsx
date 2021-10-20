import React, { MouseEventHandler } from "react";

type Props = {
  action: string;
  active: boolean;
  icon: string;
  onClick: MouseEventHandler;
  text: string;
};

export default function Button({ action, active, icon, onClick, text }: Props) {
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
      className={`button ${action}`}
      onClick={active ? onClick : undefined}
      style={active ? { opacity: "1" } : { opacity: "0.5" }}
    >
      {icon ? <i className={icon} aria-hidden="true" /> : text}
    </div>
  );
}
