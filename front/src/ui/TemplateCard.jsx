import { cn } from '@/utils/cn'
import { DeleteButton } from '@/ui/buttons/DeleteButton'
import { useTemplateMutations } from '@/hooks/templates'
import { useGameActions } from '@/hooks/games'
import { Loader } from '@/ui/Loader'
import { ModalButton } from '@/ui/ModalButton'
import { FilePenLine, Volleyball } from 'lucide-react'
import { BaseForm } from './BaseForm'
import { templateSchema, gameSchema } from '@/utils/validations'
import { gameForm } from '@/utils/forms'
import { templateToFormData } from '@/utils/formatters'

const TemplateCardContainer = ({ children, className }) => (
  <div
    className={cn(
      'text-bot-grey-800 flex flex-col gap-4 w-full bg-bot-grey-100 rounded-3xl p-4',
      className
    )}
  >
    {children}
  </div>
)

export const TemplateCard = ({ template, className }) => {
  const { deleteTemplate, updateTemplate, isPending } = useTemplateMutations()
  const { createGame } = useGameActions()

  if (isPending) {
    return (
      <TemplateCardContainer className={className}>
        <Loader variant="small" />
      </TemplateCardContainer>
    )
  }

  return (
    <TemplateCardContainer className={className}>
      <div className="flex flex-row items-center gap-2">
        <div className="w-full">
          <div className="font-medium text-center">{template.name}</div>
          <div className="text-sm text-bot-grey-500 text-center">
            {template.location_name}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2 mt-2">
        <ModalButton
          variant="success"
          Icon={Volleyball}
          modalHeader="Создать игру"
          ModalContent={({ onCancel }) => (
            <BaseForm
              formConfig={gameForm}
              onCancel={onCancel}
              schema={gameSchema}
              initialFormData={templateToFormData(template)}
              onSubmit={async (formData) => {
                await createGame(formData)
                onCancel?.()
              }}
            />
          )}
        />

        <ModalButton
          variant="secondary"
          Icon={FilePenLine}
          modalHeader="Изменить шаблон"
          ModalContent={({ onCancel }) => (
            <BaseForm
              formConfig={gameForm}
              onCancel={onCancel}
              schema={templateSchema}
              initialFormData={templateToFormData(template)}
              onSubmit={(formData) => {
                updateTemplate({ id: template.id, data: formData })
                onCancel?.()
              }}
            />
          )}
        />

        <DeleteButton
          confirmText="Вы уверены, что хотите удалить шаблон?"
          onClick={() => deleteTemplate(template.id)}
        >
          Удалить шаблон
        </DeleteButton>
      </div>
    </TemplateCardContainer>
  )
}
