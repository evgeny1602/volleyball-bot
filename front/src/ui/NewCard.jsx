import { cn } from '@/utils/cn'
import { DeleteButton } from '@/ui/buttons/DeleteButton'
import { useNewMutations } from '@/hooks/news'
import { Loader } from '@/ui/Loader'
import { ModalButton } from '@/ui/ModalButton'
import { FilePenLine, Volleyball } from 'lucide-react'
import { BaseForm } from './BaseForm'
import { newSchema } from '@/utils/validations'
import { newForm } from '@/utils/forms'

const NewCardContainer = ({ children, className, bgImage }) => (
  <div
    style={
      bgImage
        ? {
            backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0)), url(${bgImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }
        : {}
    }
    className={cn(
      'text-bot-grey-800 flex flex-col gap-2 w-full bg-bot-grey-100 rounded-3xl p-4 transition-all',
      className
    )}
  >
    {children}
  </div>
)

export const NewCard = ({ new_, className }) => {
  const { deleteNew, updateNew, isPending } = useNewMutations()

  if (isPending) {
    return (
      <NewCardContainer className={className}>
        <Loader variant="small" />
      </NewCardContainer>
    )
  }

  return (
    <NewCardContainer
      className={className}
      bgImage={new_.image_url}
    >
      <div className="flex flex-col items-center gap-1 w-full p-4 bg-white/90 rounded-3xl">
        <div className="font-medium text-center">{new_.title}</div>
        <div className="text-sm text-bot-grey-500 text-center truncate w-full">
          {new_.content}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <ModalButton
          variant="secondary"
          Icon={FilePenLine}
          modalHeader="Изменить новость"
          ModalContent={({ onCancel }) => (
            <BaseForm
              formConfig={newForm}
              onCancel={onCancel}
              schema={newSchema}
              initialFormData={new_}
              onSubmit={(formData) => {
                console.log(formData)
                updateNew({ id: new_.id, data: formData })
                onCancel?.()
              }}
            />
          )}
        />

        <DeleteButton
          confirmText="Вы уверены, что хотите удалить новость?"
          onClick={() => deleteNew(new_.id)}
        >
          Удалить новость
        </DeleteButton>
      </div>
    </NewCardContainer>
  )
}
