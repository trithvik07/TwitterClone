import { IconType } from "react-icons";
export type Item = {
  label: string;
  icon: IconType;
  navigate: string;
  auth?: boolean;
  alert?: boolean;
};
