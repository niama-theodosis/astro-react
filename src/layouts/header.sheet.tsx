import {BUTTON} from "@/components/ui/button"
import {Button} from "@/components/ui/button/button"
import {Label} from "@/components/ui/label"
import {Separator} from "@/components/ui/separator"
import {Sheet, SheetClose, SheetContent, SheetTrigger} from "@/components/ui/sheet"
import {Fragment} from "react/jsx-runtime"
import type {Nav} from "./header.astro"

export function HeaderSheet({navs}: {navs: Nav[]}) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" color="tertiary" className="order-1 md:hidden">
          <span className="i-lucide-panel-left h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="sm:max-w-xs">
        <nav className="grid gap-6 text-lg">
          {navs.map(({id, href, label, items}, i) => (
            <Fragment key={id}>
              {i > 0 && <Separator />}
              {items ? (
                <>
                  <Label className={BUTTON({variant: "label", size: "lg", className: "font-bold"})}>{label}</Label>
                  {items.map(({id, label, href}) => (
                    <SheetClose key={id} asChild>
                      <Button variant="ghost" asChild>
                        <a href={href}>{label}</a>
                      </Button>
                    </SheetClose>
                  ))}
                </>
              ) : (
                <SheetClose key={id} asChild>
                  <Button variant="ghost" size="lg" asChild className="font-bold">
                    <a href={href}>{label}</a>
                  </Button>
                </SheetClose>
              )}
            </Fragment>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  )
}
