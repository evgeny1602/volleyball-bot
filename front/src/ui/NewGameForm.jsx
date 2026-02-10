import { Input } from '@/ui/Input'
import { DateInput } from '@/ui/DateInput'
import { useState } from 'react'
import { TimeInput } from '@/ui/TimeInput'
import { QuantityInput } from '@/ui/QuantityInput'
import { TextInput } from '@/ui/TextInput'
import { MoneyInput } from '@/ui/MoneyInput'
import { CreateButton } from '@/ui/buttons/CreateButton'

export const NewGameForm = () => {
  const [name, setName] = useState('')
  const [location, setLocation] = useState('')
  const [address, setAddress] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [duration, setDuration] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [maxPlayers, setMaxPlayers] = useState('')

  return (
    <div className="flex flex-col gap-4 mt-4">
      <Input
        label="Название игры"
        placeholder="Введите название игры"
        value={name}
        onChange={setName}
      />
      <Input
        label="Место"
        placeholder="Введите место"
        value={location}
        onChange={setLocation}
      />
      <Input
        label="Адрес"
        placeholder="Введите адрес"
        value={address}
        onChange={setAddress}
      />

      <DateInput
        label="Дата"
        value={date}
        onChange={setDate}
      />

      <TimeInput
        label="Время"
        value={time}
        onChange={setTime}
      />

      <QuantityInput
        label="Длительность (мин.)"
        value={duration}
        onChange={setDuration}
      />

      <TextInput
        label="Описание"
        placeholder="Введите описание"
        value={description}
        onChange={setDescription}
      />

      <MoneyInput
        label="Цена"
        value={price}
        onChange={setPrice}
      />

      <QuantityInput
        label="Макс. игроков"
        value={maxPlayers}
        onChange={setMaxPlayers}
      />

      <CreateButton
        className="mt-12"
        onClick={() => console.log('Создать игру')}
      >
        Создать
      </CreateButton>
    </div>
  )
}
