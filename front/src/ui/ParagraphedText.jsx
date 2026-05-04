import Linkify from 'linkify-react'
import { ExternalLink } from 'lucide-react'
import { cn } from '@/utils/cn'
import { appOpenLink } from '@/utils/tools'

export const ParagraphedText = ({ text, className }) => {
  const handleLinkClick = (event) => {
    event.preventDefault()
    appOpenLink(event.target.href)
  }

  const linkifyOptions = {
    render: ({ attributes, content }) => {
      const { href, ...props } = attributes
      return (
        <a
          {...props}
          href={href}
          onClick={(e) => handleLinkClick(e, href)}
          className={cn(
            'inline-flex items-center gap-1 text-bot-primary',
            'underline decoration-bot-primary/30 hover:opacity-80 break-all'
          )}
        >
          {content}
          <ExternalLink
            size={14}
            className="shrink-0 stroke-[2.5px] no-underline"
          />
        </a>
      )
    },
  }

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
            <Linkify options={linkifyOptions}>{line}</Linkify>
          </p>
        ))}
    </div>
  )
}
