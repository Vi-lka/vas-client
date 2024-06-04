import type { MetadataFormT } from "@/lib/types/forms";
import type { ControllerRenderProps } from "react-hook-form";
import MultipleSelectorField from "./MultipleSelectorField";

export default function TableSelect({
  field,
  disabled
}: {
  field: ControllerRenderProps<MetadataFormT, "tables">,
  disabled: boolean
}) {

  const dataForField = [
    {
      value: "Археологическое наследие в правовом пространстве России", 
      label: "Археологическое наследие в правовом пространстве России"
    },
    {
      value: "Вопросы популяризации объектов археологического наследия", 
      label: "Вопросы популяризации объектов археологического наследия"
    },
    {
      value: "Археология в образовании", 
      label: "Археология в образовании"
    },
    {
      value: "Археология и музейное дело", 
      label: "Археология и музейное дело"
    },
    {
      value: "Сохранение объектов культурного наследия на новых территориях Российской Федерации", 
      label: "Сохранение объектов культурного наследия на новых территориях Российской Федерации"
    },
  ]

  return (
    <MultipleSelectorField
        {...field}
        disabled={disabled}
        defaultOptions={dataForField}
        placeholder="Выберите круглые столы..."
        emptyIndicator={<p className="py-6 text-center text-sm">Не найдено</p>}
        className='bg-background rounded-lg border-border shadow'
        badgeClassName="font-medium"
    />
  )
}