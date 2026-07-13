import { useAllPromoRequests, useUserMutations } from '@/hooks/users'
import { cn } from '@/utils/cn'
import { dateTimeFormatGameCard, safariDateFix } from '@/utils/formatters'
import { LoaderFullScreen } from '@/ui/LoaderFullscreen'
import { DeleteButton } from '@/ui/buttons/DeleteButton'
import { CalendarDays, Phone, User2 } from 'lucide-react'
import { formatPhone } from '@/utils/formatters'

const PromoRequestsContainer = ({ children, className }) => {
  return (
    <div className={cn('text-sm text-gray-400 dark:text-gray-300', className)}>
      {children}
    </div>
  )
}

const PromoRequestCardField = ({ children, className }) => {
  return (
    <span
      className={cn(
        'inline-flex gap-1 items-center text-gray-600 dark:text-gray-400',
        className
      )}
    >
      {children}
    </span>
  )
}

const PromoRequestCard = ({ promoRequest, onDelete, className }) => {
  return (
    <div
      className={cn(
        'w-full p-4 h-28 rounded-4xl shadow-sm dark:shadow-sm-dark bg-white dark:bg-gray-700 overflow-hidden border border-gray-300 dark:border-gray-700 flex flex-col justify-between',
        className
      )}
    >
      <div className="flex justify-between mx-2 mt-2">
        <PromoRequestCardField>
          <CalendarDays size={14} />
          {dateTimeFormatGameCard(
            new Date(safariDateFix(promoRequest.created_at))
          )}
        </PromoRequestCardField>

        <PromoRequestCardField>
          <Phone size={14} />
          {formatPhone(promoRequest.phone)}
        </PromoRequestCardField>

        <PromoRequestCardField>
          <User2 size={14} />
          {promoRequest.name}
        </PromoRequestCardField>
      </div>

      <div>
        <DeleteButton
          className="w-full"
          confirmText="Вы уверны, что хотите удалить заявку?"
          onClick={onDelete}
        >
          Удалить заявку
        </DeleteButton>
      </div>
    </div>
  )
}

export const PromoRequestsList = () => {
  const { data: promoRequests, isLoading, error } = useAllPromoRequests()
  const { deletePromoRequest } = useUserMutations()

  if (isLoading) {
    return <LoaderFullScreen />
  }

  if (promoRequests.length == 0) {
    return (
      <PromoRequestsContainer className="flex justify-center">
        Заявок с лэндинга пока нет.
      </PromoRequestsContainer>
    )
  }

  return (
    <PromoRequestsContainer className="flex flex-col gap-2">
      {promoRequests.map((promoRequest) => (
        <PromoRequestCard
          key={promoRequest.id}
          promoRequest={promoRequest}
          onDelete={() => deletePromoRequest(promoRequest.id)}
        />
      ))}
    </PromoRequestsContainer>
  )
}
