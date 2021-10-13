import styles from './backLink.module.css'
import Link from 'next/link'

type Props = {
  text: string
  href: string
}

export default function BackLink({ text, href}: Props) {
  return (
    <Link href={href}>
      <a className={styles.backlink}>
        <svg
          viewBox="0 0 24 24"
          width="24"
          height="24"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          shapeRendering="geometricPrecision"
        >
          <path d="M15 18l-6-6 6-6" />
        </svg>
        {text}
      </a>
    </Link>
  )
}
