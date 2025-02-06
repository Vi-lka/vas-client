/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import React from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { FormLabel } from '../ui/form';
import { InputField } from './inputs/InputField';
import DropzoneFile from './inputs/DropzoneFile';
import { useFormContext } from 'react-hook-form';
import DirectionSelect from './inputs/DirectionSelect';

export default function MetadataReportAdditional({
  isPending
}: {
  isPending: boolean,
}) {
  const form = useFormContext();

  const data = form.getValues("additionalReports") as {
    direction: string;
    reportName: string;
    reportFile?: {
        url: string;
        file?: File | null | undefined;
    } | undefined;
    imageFile?: {
        url: string;
        file?: File | null| undefined;
    } | undefined;
  }[] | null | undefined
    
  const additionalReports = data ? data : [] 
  
  return (
    <div className='space-y-2 !mb-3 w-full'>
      <p className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 my-2'>Доп. доклады:</p>
      {additionalReports.length > 0 
        ? (
          <Accordion 
            type="single" 
            collapsible 
            className='mb-2'
          >
            {additionalReports.map((item, indx) => (
              <AccordionItem key={indx} value={`${indx}`} className='border-b-2'>
                <AccordionTrigger className='py-2 justify-end'>
                  <div className='flex w-full flex-1 items-center justify-between gap-3'>
                    <p className='flex-1 text-left text-base'>{item.reportName}</p>
                    {/* <Button
                      type='button'
                      asChild
                      className='w-fit h-fit p-1 mr-1 z-50'
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        form.setValue(
                          "additionalReports", 
                          additionalReports.filter((_, i) => indx !== i), 
                          {shouldDirty: true, shouldTouch: true, shouldValidate: true}
                        )
                      }}
                    >
                      <Delete size={16}/>
                    </Button> */}
                  </div>
                </AccordionTrigger>
                <AccordionContent className='flex flex-col gap-2 border-2 border-b-0 border-boder rounded-t-xl p-3'>
                  <div className='w-full'>
                    <FormLabel>Направление<span className='text-destructive'>*</span></FormLabel>
                    <DirectionSelect 
                      name={`additionalReports[${indx}].direction`}
                      defaultValue={form.getValues(`additionalReports[${indx}].direction`) as string}
                      // disabled={form.formState.isSubmitting || isPending}
                      disabled
                      className="mt-1"
                    />
                  </div>

                  <div className='w-full'>
                    <FormLabel>Название доклада<span className='text-destructive'>*</span></FormLabel>
                    <InputField
                      value={form.getValues(`additionalReports[${indx}].reportName`) as string}
                      // disabled={form.formState.isSubmitting || isPending}
                      disabled
                      className='mt-1 bg-background rounded-lg border-border shadow'
                      onChange={(e) => form.setValue(
                        `additionalReports[${indx}].reportName`, 
                        e.target.value,
                        {shouldDirty: true, shouldTouch: true, shouldValidate: true}
                      )}
                    />
                  </div>

                  <div className='w-full flex lg:flex-row flex-col justify-between lg:gap-3 gap-2'>
                    <div className='lg:w-1/2 w-full'>
                      <FormLabel>Тезисы:</FormLabel>
                      <DropzoneFile
                        isImage={false}
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                        formValue={form.getValues(`additionalReports[${indx}].reportFile`) ? form.getValues(`additionalReports[${indx}].reportFile`) : {
                          file: null,
                          url: "",
                        }}
                        formValueName={`additionalReports[${indx}].reportFile`}
                        accept={{
                          "application/msword": [".doc", ".docx", ".DOC", ".DOCX"],
                          "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".doc", ".docx", ".DOC", ".DOCX"] 
                        }}
                        maxSize={5 * 1024 * 1024} // 5Mb
                        // disabled={form.formState.isSubmitting || isPending}
                        disabled
                        className="mt-1 min-h-32 bg-background rounded-lg border-dashed border border-primary/50 shadow hover:bg-secondary transition-all outline outline-1 outline-border outline-offset-2"
                      >
                        <p className="text-xs text-muted-foreground mt-2 text-center">
                          DOC, DOCX (Max 5Mb)
                        </p>
                      </DropzoneFile>
                    </div>
                      
                    <div className='lg:w-1/2 w-full'>
                      <FormLabel>Иллюстрация:</FormLabel>
                      <DropzoneFile
                        isImage
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                        formValue={form.getValues(`additionalReports[${indx}].imageFile`) ? form.getValues(`additionalReports[${indx}].imageFile`) : {
                          file: null,
                          url: "",
                        }}
                        formValueName={`additionalReports[${indx}].imageFile`}
                          accept={{
                            'image/jpg': [],
                            'image/jpeg': [],
                            'image/png': [],
                          }}
                        maxSize={20 * 1024 * 1024} // 20Mb
                        // disabled={form.formState.isSubmitting || isPending}
                        disabled
                        className="mt-1 min-h-32 bg-background rounded-lg border-dashed border border-primary/50 shadow hover:bg-secondary transition-all outline outline-1 outline-border outline-offset-2"
                      >
                        <p className="text-xs text-muted-foreground mt-2 text-center">
                          JPEG, JPG, PNG (Max 20Mb)
                        </p>
                      </DropzoneFile>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )
        : null
      }
      {/* <Button 
        className='w-full'
        type="button"
        onClick={() => 
          form.setValue(
            "additionalReports", 
            [...additionalReports, {reportName: `${additionalReports.length+1}`}], 
            {shouldDirty: true, shouldTouch: true, shouldValidate: true}
          )
        }
      >
        <Plus className='w-5 h-5 mr-1'/>Добавить доклад
      </Button> */}
    </div>
  )
}
