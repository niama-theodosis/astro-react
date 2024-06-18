"use client"

import {cn} from "@/lib/utils"
import * as LabelPrimitive from "@radix-ui/react-label"
import type {ComponentPropsWithRef} from "react"
import {tv, type VariantProps} from "tailwind-variants"

// STYLES **********************************************************************************************************************************
export const LABEL = tv({base: "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"})

// ROOT ************************************************************************************************************************************
export const Label = ({className, ...props}: LabelProps) => <LabelPrimitive.Root className={cn(LABEL(), className)} {...props} />

// TYPES ***********************************************************************************************************************************
export type LabelProps = ComponentPropsWithRef<typeof LabelPrimitive.Root> & VariantProps<typeof LABEL>
