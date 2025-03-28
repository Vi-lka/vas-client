"use client"

import { updateUserAction } from '@/app/actions'
import AuthError from '@/components/errors/AuthError'
import SubmitButton from '@/components/froms/inputs/SubmitButton'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Switch } from '@/components/ui/switch'
import { EmailNotificationsFormT } from '@/lib/types/forms'
import { zodResolver } from '@hookform/resolvers/zod'
import { CircleAlert } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import type { z } from 'zod'

export default function EmailNotificationsForm({
  report,
  subscribedContent,
  subscribedReport,
}: {
  report: boolean | null,
  subscribedContent: boolean | null;
  subscribedReport: boolean | null;
}) {

  const router = useRouter()
  const [isPending, setPending] = React.useState(false);

  const form = useForm<z.infer<typeof EmailNotificationsFormT>>({
    resolver: zodResolver(EmailNotificationsFormT), 
    defaultValues: {
      subscribedContent,
      subscribedReport
    },
    mode: "onChange",
  })

  const handleEmailNotificationsUpdate = () => {
    setPending(true)

    const updateUser = updateUserAction({
      subscribedContent: form.getValues("subscribedContent"),
      subscribedReport: form.getValues("subscribedReport"),
    })
    .then((data) => {
      return data
    })

    toast.promise(updateUser, {
      loading: 'Сохраняем...',
      success: (data) => {
        setPending(false)
        // refresh server components
        router.refresh();
        form.reset({
          subscribedContent: data.subscribedContent,
          subscribedReport: data.subscribedReport
        });
        return `Успешно!`;
      },
      error: (err) => {
        setPending(false)
        return <AuthError data={err as Error} />
      }
    });
  };

  return (
    <Form {...form}>
      <form action={handleEmailNotificationsUpdate} className="w-full space-y-6">
        <div>
          <h3 className="text-lg font-medium">Email Уведомления</h3>
          <div className="space-y-3 mt-3">
            <FormField
              control={form.control}
              name="subscribedContent"
              render={({ field }) => (
                <FormItem className="flex flex-row md:gap-8 gap-1 items-center justify-between rounded-xl border p-3 shadow">
                  <div className="space-y-0.5">
                    <FormLabel className='font-medium'>Контент</FormLabel>
                    <FormDescription className='text-xs'>
                      {`Получайте электронные письма о\u00A0новых материалах, изменениях в\u00A0программе или\u00A0направлениях и\u00A0о\u00A0многом другом.`}
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      size="md"
                      checked={!!field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            {report && (
              <FormField
                control={form.control}
                name="subscribedReport"
                render={({ field }) => (
                  <FormItem className="flex flex-row md:gap-8 gap-1 items-center justify-between rounded-xl border p-3 shadow">
                    <div className="space-y-0.5">
                      <FormLabel className='font-medium'>Заявка</FormLabel>
                      <FormDescription className='text-xs'>
                        {"Получайте электронные письма о\u00A0статусе вашей заявки."}
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        size="md"
                        checked={!!field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            )}
          </div>
        </div>
        <SubmitButton 
          disabled={!(form.formState.isDirty && form.formState.isValid) || form.formState.isSubmitting || isPending}
          className='sm:px-12 px-6 mx-auto'
        >
          Сохранить
        </SubmitButton>
        <p className='text-muted-foreground text-xs flex gap-1 items-center'>
          <CircleAlert className='w-4 h-4'/>
          <span>{`Eсли вы не нашли письма,\u00A0пожалуйста, проверьте\u00A0папку со спамом`}</span>
        </p>
      </form>
    </Form>
  )
}
