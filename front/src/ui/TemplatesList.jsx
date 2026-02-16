import { TemplateCard } from '@/ui/TemplateCard'
import { Loader } from '@/ui/Loader'
import { useTemplates, useTemplateMutations } from '@/hooks/templates'
import { ModalButton } from '@/ui/ModalButton'
import { ClipboardPlus } from 'lucide-react'
import { BaseForm } from '@/ui/BaseForm'
import { templateSchema } from '@/utils/validations'
import { gameForm } from '@/utils/forms'

export const TemplatesList = () => {
  const { data, isLoading } = useTemplates()
  const { createTemplate } = useTemplateMutations()

  if (isLoading) return <Loader variant="small" />

  return (
    <div className="pt-2">
      <ModalButton
        Icon={ClipboardPlus}
        modalHeader="Создать шаблон"
        ModalContent={({ onCancel }) => (
          <BaseForm
            formConfig={gameForm}
            schema={templateSchema}
            onCancel={onCancel}
            onSubmit={async (formData) => {
              await createTemplate(formData)
              onCancel?.()
            }}
          />
        )}
        variant="success"
        className="w-full"
      />

      <div className="mt-4 flex flex-col gap-4">
        {data?.data.map((template) => (
          <TemplateCard
            key={template.id}
            template={template}
          />
        ))}
      </div>
    </div>
  )
}
