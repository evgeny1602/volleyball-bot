import { useState, useMemo } from 'react'
import { SubmitButton } from '@/ui/buttons/SubmitButton'
import { ClearButton } from '@/ui/buttons/ClearButton'
import { CancelButton } from '@/ui/buttons/CancelButton'

export const BaseForm = ({
  onCancel,
  onSubmit,
  initialFormData,
  schema,
  formConfig,
}) => {
  const [formData, setFormData] = useState(
    initialFormData || formConfig.emptyFormData
  )

  const validation = useMemo(() => schema.safeParse(formData), [formData])

  const updateField = (id, isNumber) => (value) => {
    setFormData((prev) => ({
      ...prev,
      [id]: isNumber ? (value === '' ? '' : Number(value)) : value,
    }))
  }

  return (
    <div className="flex flex-col gap-4">
      {formConfig.fieldsConfig.map(
        ({ id, type: Component, isNumber, ...rest }) => (
          <Component
            key={id}
            value={formData[id]}
            onChange={updateField(id, isNumber)}
            {...rest}
          />
        )
      )}

      <div className="mt-6 flex flex-col gap-3">
        <SubmitButton
          validation={validation}
          onClick={() => onSubmit(formData)}
        />
        <ClearButton onClick={() => setFormData(formConfig.emptyFormData)} />
        <CancelButton onClick={onCancel} />
      </div>
    </div>
  )
}
