import './App.css'

const chapters = [
  'Number Line, Addition and Subtraction',
  'Multiplication, Division, and Powers',
  'Letters and Quotients',
  'Handling Fractions',
  'Understanding Exponents',
]

function App() {
  const activeChapterIndex = 0

  return (
    <div className="app-shell">
      <main className="study-card" aria-label="Chapters">
        <div className="chapter-heading">
          <p className="eyebrow">Chapters</p>
          <h1>Dive back into your garden path</h1>
          <p className="subtitle">
            Choose any chapter to continue studying at your own pace.
          </p>
        </div>

        <ol className="chapter-list">
          {chapters.map((title, index) => (
            <li key={title} className="chapter-item">
              <div className="chapter-marker" aria-hidden="true">
                <span
                  className={`chapter-dot ${
                    index === activeChapterIndex ? 'is-active' : ''
                  }`}
                />
                {index !== chapters.length - 1 && <span className="chapter-line" />}
              </div>
              <button
                className={`chapter-button ${
                  index === activeChapterIndex ? 'is-active' : ''
                }`}
                type="button"
              >
                {title}
              </button>
            </li>
          ))}
        </ol>

        <button className="toggle-button" type="button">
          Show less
        </button>
      </main>
    </div>
  )
}

export default App
