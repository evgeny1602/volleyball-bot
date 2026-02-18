export const ParagraphedText = ({ text, className }) => {
  return (
    <div className={className}>
      {text
        .split('\n')
        .filter(Boolean)
        .map((line, i) => (
          <p
            key={i}
            className="text-justify"
          >
            {line}
          </p>
        ))}
    </div>
  )
}
