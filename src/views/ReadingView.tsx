import { Fragment } from 'react'
import type { Vocabulary } from '../types'

const wordPattern = /^[A-Za-z']+$/
const whitespacePattern = /^\s+$/

export type ReadingViewProps = {
  stepIndex: number
  stepCount: number
  markedCount: number
  tokens: string[]
  markedWords: Set<string>
  vocabulary: Vocabulary
  onWordToggle: (word: string) => void
  normalizeWord: (word: string) => string
}

function ReadingView({
  stepIndex,
  stepCount,
  markedCount,
  tokens,
  markedWords,
  vocabulary,
  onWordToggle,
  normalizeWord,
}: ReadingViewProps) {
  return (
    <section className="reading-panel" aria-live="polite">
      <div className="reading-meta">
        <p className="step-label">Step {stepIndex + 1} of {stepCount}</p>
        <p className="word-count">Marked words: {markedCount}</p>
      </div>

      <div className="reading-instructions">
        <p>Click every word you want to review. You can select up to 10 before the next activity begins.</p>
      </div>

      <article className="reading-text" aria-label={`Reading step ${stepIndex + 1}`}>
        {tokens.map((token, index) => {
          if (wordPattern.test(token)) {
            const normalized = normalizeWord(token)
            const isMarked = markedWords.has(normalized)
            const translation = vocabulary[normalized]

            return (
              <button
                key={`${token}-${index}`}
                type="button"
                className={`word-token ${isMarked ? 'is-selected' : ''}`}
                onClick={() => onWordToggle(token)}
              >
                <span>{token}</span>
                {isMarked && (
                  <span className="word-translation">{translation ?? '—'}</span>
                )}
              </button>
            )
          }

          if (whitespacePattern.test(token)) {
            return <Fragment key={`space-${index}`}>{token}</Fragment>
          }

          return (
            <span key={`char-${index}`} className="punctuation">
              {token}
            </span>
          )
        })}
      </article>
    </section>
  )
}

export default ReadingView
