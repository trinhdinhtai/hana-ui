import { ROUTES } from "@/constants/routes";

export const NAV_FORWARD: string[] = ["nav-forward"];
export const NAV_BACK: string[] = ["nav-back"];

const pathDepth = (path: string) => path.split("/").filter(Boolean).length;

export const navTransitionTypes = (href: string, pathname = ROUTES.HOME) => {
  if (href === ROUTES.HOME || pathDepth(href) < pathDepth(pathname)) {
    return NAV_BACK;
  }

  return NAV_FORWARD;
};
