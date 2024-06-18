"use client"

import {getNewsletterMessage, rhfErrorsFromAstro, zNewsletterValues, type NewsletterState, type NewsletterValues} from "@/actions/utils"
import {Submit} from "@/components/submit"
import {Button} from "@/components/ui/button/button"
import {Form, FormControl, FormDescription, FormField, FormItem, FormMessage} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {Toaster} from "@/components/ui/sonner"
import {experimental_withState} from "@astrojs/react/actions"
import {zodResolver} from "@hookform/resolvers/zod"
import {actions} from "astro:actions"
import {useActionState, useEffect, useMemo, type ReactNode} from "react"
import {useForm} from "react-hook-form"
import {toast} from "sonner"

// ROOT ************************************************************************************************************************************
export default function NewsletterForm({children, defaultValues, initialState}: NewsletterFormProps) {
  const [state, action, pending] = useActionState(experimental_withState(actions.subscribeToNewsletter.safe), initialState)

  const form = useForm<NewsletterValues>({
    mode: "onTouched",
    resolver: zodResolver(zNewsletterValues),
    defaultValues,
    errors: useMemo(() => rhfErrorsFromAstro(state.error), [state]),
  })
  const {control, formState, handleSubmit, reset} = form

  useEffect(() => {
    const {code, description} = getNewsletterMessage(state) ?? {}
    if (code === "SUCCESS" || code === "CONFLICT") reset()
    if (code) code === "SUCCESS" ? toast.success("Succès", {description}) : toast.error("Erreur", {description})
  }, [reset, state])

  return (
    <Form {...form}>
      <form action={action} onSubmit={formState.isValid ? undefined : handleSubmit(() => {})} className="flex flex-col gap-8">
        <FormField
          control={control}
          name="email"
          render={({field}) => (
            <FormItem>
              <div className="flex w-full items-center">
                <FormControl>
                  <div className="group relative flex w-full items-center">
                    <span className="i-mdi-envelope absolute left-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Votre courriel..."
                      {...field}
                      className="rounded-r-none pl-9 group-aria-[invalid=true]:border-destructive group-aria-[invalid=true]:ring-destructive"
                    />
                  </div>
                </FormControl>
                <Submit pending={pending} label="Je m'inscris" icon="i-mdi-register" className="rounded-l-none" />
              </div>
              <FormDescription>
                La protection de vos données est
                <Button asChild variant="link" className="h-auto px-1 py-0">
                  <a href="/mentions-legales">ma priorité.</a>
                </Button>
              </FormDescription>
              <FormMessage></FormMessage>
            </FormItem>
          )}
        />
      </form>
      {children}
      <Toaster richColors />
    </Form>
  )
}

export type NewsletterFormProps = {children?: ReactNode; defaultValues: NewsletterValues; initialState: NewsletterState}
