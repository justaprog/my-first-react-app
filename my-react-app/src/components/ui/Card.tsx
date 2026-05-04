import type { PropsWithChildren } from "react";

type CardProps = PropsWithChildren<{
  // children prop is included by PropsWithChildren
  className?: string;
}>;

export function Card({ children, className = "" }: CardProps) {
  return <section className={`card ${className}`}>{children}</section>;
}
