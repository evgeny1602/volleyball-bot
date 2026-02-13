export const BaseForm = ({ config, data, onChange, actions }) => {
  return (
    <div className="flex flex-col gap-4">
      {config.map(({ id, type: Component, isNumber, ...rest }) => (
        <Component
          key={id}
          {...rest}
          value={data[id]}
          onChange={onChange(id, isNumber)}
        />
      ))}
      <div className="mt-6 flex flex-col gap-3">{actions}</div>
    </div>
  )
}
