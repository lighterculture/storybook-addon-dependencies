import React, { ReactNode } from "react";
interface BadgeProps {
  children: ReactNode;
  show?: boolean;
  value?: string | number;
  translate?: string;
  color?: string;
  bg?: string;
}
export const Badge = ({ children, value, show = true, translate, color, bg }: BadgeProps) => {
  return <div></div>;
};
