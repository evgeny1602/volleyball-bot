import { ModalButton } from '@/ui/ModalButton'
import { Megaphone } from 'lucide-react'
import { cn } from '@/utils/cn'
import { ParagraphedText } from '@/ui/ParagraphedText'

export const NewSliderCard = ({ data, className }) => {
  // console.log(data.content)

  return (
    <div
      className={cn(
        'w-full h-70 bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center',
        className
      )}
      style={{
        backgroundImage: `url(${data.image_url})`,
      }}
    >
      <ModalButton
        modalHeader={data.title}
        Icon={Megaphone}
        ModalContent={() => (
          <div className="flex flex-col gap-3">
            <img
              src={data.image_url}
              className="rounded-3xl"
            />

            <ParagraphedText
              className="flex flex-col gap-2 text-sm indent-4"
              text={data.content}
            />
          </div>
        )}
      />
    </div>
  )
}
