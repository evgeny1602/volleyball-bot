import { NewCard } from '@/ui/NewCard'
import { Loader } from '@/ui/Loader'
import { useNews, useNewMutations } from '@/hooks/news'
import { ModalButton } from '@/ui/ModalButton'
import { MessageSquarePlus } from 'lucide-react'
import { BaseForm } from '@/ui/BaseForm'
import { newSchema } from '@/utils/validations'
import { newForm } from '@/utils/forms'

export const NewsList = () => {
  const { data, isLoading } = useNews()
  const { createNew } = useNewMutations()

  if (isLoading) return <Loader variant="small" />

  return (
    <div className="pt-2">
      <ModalButton
        Icon={MessageSquarePlus}
        modalHeader="Создать новость"
        ModalContent={({ onCancel }) => (
          <BaseForm
            formConfig={newForm}
            schema={newSchema}
            onCancel={onCancel}
            onSubmit={async (formData) => {
              console.log(formData)
              await createNew(formData)
              onCancel?.()
            }}
          />
        )}
        variant="success"
        className="w-full"
      />

      <div className="mt-4 flex flex-col gap-4">
        {data?.data.map((new_) => (
          <NewCard
            key={new_.id}
            new_={new_}
          />
        ))}
      </div>
    </div>
  )
}
