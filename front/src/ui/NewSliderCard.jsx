import { ModalButton } from '@/ui/ModalButton'
import { Megaphone } from 'lucide-react'
import { cn } from '@/utils/cn'

export const NewSliderCard = ({ data, className }) => {
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
          <div className="text-bot-grey-800 text-center">
            <img
              src={data.image_url}
              className="rounded-3xl mb-2"
            />
            {data.content}
          </div>
        )}
      />
    </div>
  )
}
