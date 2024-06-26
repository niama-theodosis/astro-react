"use client"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import {cn} from "@/lib/utils"
import type {ComponentPropsWithRef} from "react"
import type {Nav} from "./header.astro"

// MAIN ************************************************************************************************************************************
export const Menu = ({navs, ...props}: MenuProps) => (
  <NavigationMenu {...props}>
    <NavigationMenuList>
      {navs.map(({href, id, items, label}) =>
        items ? (
          <NavigationMenuItem key={id}>
            <NavigationMenuTrigger className="lg:text-base">{label}</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[900px]">
                {items.map(({href, id, image, label, text}) => (
                  <li key={id}>
                    <NavigationMenuLink asChild>
                      <a
                        href={href}
                        className="flex select-none items-center gap-2 space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <img src={image.src} alt={image.alt} height={64} width={64} className="rounded-md object-cover" />
                        <div className="space-y-2">
                          <div className="font-heading text-sm font-bold leading-none">{label}</div>
                          <p className="line-clamp-3 text-sm leading-snug text-muted-foreground">{text}</p>
                        </div>
                      </a>
                    </NavigationMenuLink>
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        ) : (
          <NavigationMenuItem key={id}>
            <NavigationMenuLink asChild>
              <a href={href} className={cn(navigationMenuTriggerStyle(), "lg:text-base")}>{label}</a>
            </NavigationMenuLink>
          </NavigationMenuItem>
        )
      )}
    </NavigationMenuList>
  </NavigationMenu>
)

// TYPES ***********************************************************************************************************************************
export type MenuProps = ComponentPropsWithRef<typeof NavigationMenu> & {navs: Nav[]}
