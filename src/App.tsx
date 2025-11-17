import './App.css'

const chapters = [
  'Science and Technology',
  'Environment',
  'History',
  'Career',
  'Literature',
  'Education',
  'Society and Culture',
  'Media',
]

function App() {
  const activeChapterIndex = 0

  return (
    <div className="app-shell">
      <main className="study-card" aria-label="Study Plan">
        <div className="chapter-heading">
          <h1>Study Plan</h1>
        </div>

        <ol className="chapter-list">
          {chapters.map((title, index) => (
            <li key={title} className="chapter-item">
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
