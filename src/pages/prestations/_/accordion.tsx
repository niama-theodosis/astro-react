import {Accordion, AccordionContent, AccordionItem, AccordionTrigger, type AccordionMultipleProps} from "@/components/ui/accordion"
import {getServiceColor} from "@/lib/pocketbase/utils"
import type {ReactNode} from "react"

// ROOT ************************************************************************************************************************************
export default ({benefits, proceedings, reasons, variant, ...props}: AccordionProps) => (
  <Accordion type="multiple" className="w-full" {...props}>
    <AccordionItem value="reasons">
      <AccordionTrigger variant={variant}>Pourquoi opter pour une séance ?</AccordionTrigger>
      <AccordionContent className="text-base">{reasons}</AccordionContent>
    </AccordionItem>
    <AccordionItem value="proceedings">
      <AccordionTrigger variant={variant}>Comment celle-ci se déroule-t-elle ?</AccordionTrigger>
      <AccordionContent className="text-base">{proceedings}</AccordionContent>
    </AccordionItem>
    <AccordionItem value="benefits">
      <AccordionTrigger variant={variant}>Quels en sont les bienfaits ?</AccordionTrigger>
      <AccordionContent className="text-base">{benefits}</AccordionContent>
    </AccordionItem>
  </Accordion>
)

// TYPES ***********************************************************************************************************************************
export type AccordionProps = Omit<AccordionMultipleProps, "children" | "type"> & {
  benefits?: ReactNode
  proceedings?: ReactNode
  reasons?: ReactNode
  variant: ReturnType<typeof getServiceColor>
}
