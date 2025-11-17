import type { Vocabulary } from '../types'

type CompleteViewProps = {
  chapterName: string
  markedCount: number
  markedWords: Set<string>
  vocabulary: Vocabulary
}

function CompleteView({ chapterName, markedCount, markedWords, vocabulary }: CompleteViewProps) {
  return (
    <section className="complete-panel" aria-live="polite">
      <h2>Great work!</h2>
      <p>
        You marked <strong>{markedCount}</strong> words for {chapterName}. Continue to the next activity or restart this flow to review the text again.
      </p>
      {markedCount > 0 && (
        <ul className="marked-list">
          {Array.from(markedWords).map((word) => (
            <li key={word}>
              <span>{word}</span>
              <span className="marked-translation">{vocabulary[word]}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default CompleteView
