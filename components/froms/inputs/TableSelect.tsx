import type { MetadataFormT } from "@/lib/types/forms";
import type { ControllerRenderProps, UseFormReturn } from "react-hook-form";
import MultipleSelectorField from "./MultipleSelectorField";

export default function TableSelect({
  form,
  field,
}: {
  form: UseFormReturn<MetadataFormT>,
  field: ControllerRenderProps<MetadataFormT, "tables">
}) {

  const dataForField = [
    {
        value: "Нормативно-правовое регулирование в сфере государственной охраны и сохранения объектов археологического наследия", 
        label: "Нормативно-правовое регулирование в сфере государственной охраны и сохранения объектов археологического наследия"
    },
    {
        value: "Государственная охрана, сохранение и популяризация объектов археологического наследия", 
        label: "Государственная охрана, сохранение и популяризация объектов археологического наследия"
    },
    {
        value: "Археология в образовании", 
        label: "Археология в образовании"
    },
    {
        value: "Сохранение объектов культурного наследия на Новых территориях РФ", 
        label: "Сохранение объектов культурного наследия на Новых территориях РФ"
    },
  ]

  return (
    <MultipleSelectorField
        {...field}
        disabled={form.formState.isSubmitting}
        defaultOptions={dataForField}
        placeholder="Выберите круглые столы..."
        emptyIndicator={<p className="py-6 text-center text-sm">Не найдено</p>}
        className='bg-background rounded-lg border-border shadow'
        badgeClassName="font-medium"
    />
  )
}