import Link from "next/link";

import { ROUTES } from "@/constants/routes";
import { SITE } from "@/constants/site";
import { NAV_BACK } from "@/lib/nav-transition";
import { source } from "@/lib/source";
import { cn } from "@/lib/utils";

import { BrandContextMenu } from "./brand-context-menu";
import { CommandMenu } from "./command-menu";
import { LogoMark } from "./logo";
import { MainNav } from "./main-nav";
import { MobileNav } from "./mobile-nav";
import { ModeSwitcher } from "./mode-switcher";
import { NavItemGithub } from "./nav-item-github";
import { SiteSettings } from "./site-settings";
import { buttonVariants } from "./ui/button";

const navItems = [
  { href: ROUTES.DOCS, label: "Docs" },
  { href: ROUTES.DOCS_COMPONENTS, label: "Components" },
];

export const SiteHeader = () => (
  <header
    className="sticky top-0 z-50 w-full bg-background"
    style={{ viewTransitionName: "site-header" }}
  >
    <div className="container-wrapper px-6 3xl:fixed:px-0">
      <div className="flex h-(--header-height) items-center gap-2 3xl:fixed:container">
        <MobileNav
          items={navItems}
          tree={source.pageTree}
          className="flex lg:hidden"
        />

        <BrandContextMenu>
          <Link
            href={ROUTES.HOME}
            className={cn(
              buttonVariants({ size: "icon", variant: "ghost" }),
              "hidden size-8 lg:flex"
            )}
            transitionTypes={NAV_BACK}
          >
            <LogoMark className="size-5" />
            <span className="sr-only">{SITE.NAME}</span>
          </Link>
        </BrandContextMenu>

        <MainNav items={navItems} className="hidden lg:flex" />
        <div className="ml-auto flex items-center gap-2 md:flex-1 md:justify-end">
          <div className="hidden w-full flex-1 md:flex md:w-auto md:flex-none">
            <CommandMenu navItems={navItems} tree={source.pageTree} />
          </div>
          <NavItemGithub />
          <ModeSwitcher />
          <SiteSettings />
        </div>
      </div>
    </div>
  </header>
);
