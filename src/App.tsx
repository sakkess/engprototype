import { useMemo, useState } from 'react'
import './App.css'

const chapter = {
  name: 'Science and Technology',
  missionHeading: 'Vocabulary Boost',
  missionDescription:
    'Read the text, and click each word you are unfamiliar with. We\'ll find new important words to add to your vocabulary.',
  steps: [
    {
      id: 'step-1',
      text: `Science and technology are important in our everyday lives. Science helps us understand how the world works. Technology uses this knowledge to make tools and machines that help people. For example, smartphones let us talk to friends, search for information, and take photos. Doctors use new medical tools to find illnesses earlier and help patients get better. Scientists also study nature, space, and climate to learn more about our planet. Technology continues to change quickly, and many new inventions appear every year. These changes make life easier, safer, and more interesting for people around the world.`,
    },
    {
      id: 'step-2',
      text: `Science and technology influence almost every aspect of modern society. Scientific research allows us to explore complex problems such as climate change, diseases, and energy production. Technology then transforms these discoveries into practical solutions that people can use. Renewable energy systems, for example, combine scientific understanding of natural forces with engineering to reduce pollution. Digital technologies have also reshaped communication, making it possible to work, study, and collaborate from almost anywhere. While these advances bring many benefits, they also raise important questions about privacy, security, and the ethical use of data. Understanding these issues helps societies make better decisions.`,
    },
    {
      id: 'step-3',
      text: `Science and technology are increasingly intertwined, driving innovation at a pace unmatched in human history. Breakthroughs in fields such as artificial intelligence, biotechnology, and quantum computing illustrate how theoretical research can rapidly evolve into transformative applications. These developments offer new possibilities for medicine, environmental management, and global communication, but they also present significant challenges. Societies must navigate concerns related to algorithmic bias, genetic modification, and the environmental cost of high-tech manufacturing. As technologies grow more powerful, ethical frameworks and public dialogue become essential. A well-informed population can help ensure that scientific progress benefits humanity while minimizing potential risks.`,
    },
  ],
}

type Stage = 'mission' | 'reading' | 'complete'

type Vocabulary = Record<string, string>

const vocabulary: Vocabulary = {
  a: 'yksi',
  about: 'noin / liittyen',
  advances: 'edistysaskeleet',
  algorithmic: 'algoritminen',
  allows: 'sallii',
  almost: 'melkein',
  also: 'myös',
  and: 'ja',
  anywhere: 'mihin tahansa',
  appear: 'ilmestyä',
  applications: 'sovellukset',
  are: 'ovat',
  around: 'ympäri',
  artificial: 'keinotekoinen',
  as: 'kuten / koska',
  aspect: 'näkökohta',
  at: '–ssa / –ssä',
  become: 'tulla joksikin',
  benefits: 'hyödyt',
  better: 'parempi',
  bias: 'harha',
  biotechnology: 'bioteknologia',
  breakthroughs: 'läpimurrot',
  bring: 'tuoda',
  but: 'mutta',
  can: 'voi',
  challenges: 'haasteet',
  change: 'muutos',
  changes: 'muutokset',
  climate: 'ilmasto',
  collaborate: 'tehdä yhteistyötä',
  combine: 'yhdistää',
  communication: 'viestintä',
  complex: 'monimutkainen',
  computing: 'laskenta',
  concerns: 'huolet',
  continues: 'jatkuu',
  cost: 'kustannus',
  data: 'data',
  decisions: 'päätökset',
  developments: 'kehitykset',
  dialogue: 'vuoropuhelu',
  digital: 'digitaalinen',
  discoveries: 'löydöt',
  diseases: 'sairaudet',
  doctors: 'lääkärit',
  driving: 'ajava / ohjaava',
  earlier: 'aikaisemmin',
  easier: 'helpompi',
  energy: 'energia',
  engineering: 'insinööritiede',
  ensure: 'varmistaa',
  environmental: 'ympäristöön liittyvä',
  essential: 'välttämätön',
  ethical: 'eettinen',
  every: 'jokainen',
  everyday: 'arkipäiväinen',
  evolve: 'kehittyä',
  example: 'esimerkki',
  explore: 'tutkia',
  fields: 'alat',
  find: 'löytää',
  for: '–lle / varten',
  forces: 'voimat',
  frameworks: 'viitekehykset',
  friends: 'ystävät',
  from: '–sta / –stä',
  genetic: 'geneettinen',
  get: 'saada',
  global: 'globaali',
  grow: 'kasvaa',
  have: 'olla',
  help: 'auttaa',
  helps: 'auttaa',
  high: 'korkea',
  history: 'historia',
  how: 'miten',
  human: 'ihminen',
  humanity: 'ihmiskunta',
  illnesses: 'sairaudet',
  illustrate: 'havainnollistaa',
  important: 'tärkeä',
  in: '–ssa / –ssä',
  increasingly: 'yhä enemmän',
  influence: 'vaikuttaa',
  information: 'tieto',
  informed: 'tietoinen',
  innovation: 'innovaatio',
  intelligence: 'älykkyys',
  interesting: 'kiinnostava',
  intertwined: 'nivoutunut',
  into: '–ksi',
  inventions: 'keksinnöt',
  issues: 'kysymykset',
  it: 'se',
  knowledge: 'tieto',
  learn: 'oppia',
  let: 'antaa',
  life: 'elämä',
  lives: 'elämät',
  machines: 'koneet',
  make: 'tehdä',
  making: 'tehden',
  management: 'hallinta',
  manufacturing: 'valmistus',
  many: 'monet',
  medical: 'lääketieteellinen',
  medicine: 'lääketiede',
  minimizing: 'minimoiminen',
  modern: 'moderni',
  modification: 'muokkaus',
  more: 'lisää / enemmän',
  must: 'täytyy',
  natural: 'luonnollinen',
  nature: 'luonto',
  navigate: 'suunnistaa / ohjata',
  new: 'uusi',
  of: '–n',
  offer: 'tarjota',
  our: 'meidän',
  pace: 'tahti',
  patients: 'potilaat',
  people: 'ihmiset',
  photos: 'valokuvat',
  planet: 'planeetta',
  pollution: 'saaste',
  population: 'väestö',
  possibilities: 'mahdollisuudet',
  possible: 'mahdollinen',
  potential: 'potentiaalinen',
  powerful: 'voimakas',
  practical: 'käytännöllinen',
  present: 'esittää / nykyinen',
  privacy: 'yksityisyys',
  problems: 'ongelmat',
  production: 'tuotanto',
  progress: 'edistys',
  public: 'julkinen',
  quantum: 'kvantti',
  questions: 'kysymykset',
  quickly: 'nopeasti',
  raise: 'nostaa / herättää',
  rapidly: 'nopeasti',
  reduce: 'vähentää',
  related: 'liittyvä',
  renewable: 'uusiutuva',
  research: 'tutkimus',
  reshaped: 'muovannut uudelleen',
  risks: 'riskit',
  safer: 'turvallisempi',
  science: 'tiede',
  scientific: 'tieteellinen',
  scientists: 'tieteilijät',
  search: 'hakea',
  security: 'turvallisuus',
  significant: 'merkittävä',
  smartphones: 'älypuhelimet',
  societies: 'yhteiskunnat',
  society: 'yhteiskunta',
  solutions: 'ratkaisut',
  space: 'avaruus',
  study: 'opiskella / tutkia',
  such: 'sellaiset / kuten',
  systems: 'järjestelmät',
  take: 'ottaa',
  talk: 'puhua',
  tech: 'tekniikka',
  technologies: 'teknologiat',
  technology: 'teknologia',
  that: 'joka / että',
  the: 'määräinen artikkeli',
  then: 'sitten',
  theoretical: 'teoreettinen',
  these: 'nämä',
  they: 'he',
  this: 'tämä',
  to: '–lle / –ksi',
  tools: 'työkalut',
  transformative: 'muutoksen tekevä',
  transforms: 'muuntaa',
  understand: 'ymmärtää',
  understanding: 'ymmärrys',
  unmatched: 'vertaansa vailla',
  us: 'meitä',
  use: 'käyttää',
  uses: 'käyttää',
  well: 'hyvin',
  while: 'sillä aikaa kun',
  with: 'kanssa',
  work: 'työskennellä',
  works: 'toimii',
  world: 'maailma',
  year: 'vuosi',
}

const tokenizeText = (text: string) =>
  text.match(/([A-Za-z']+|[^A-Za-z'\s]+|\s+)/g) ?? [text]

const normalizeWord = (word: string) => word.toLowerCase().replace(/[^a-z']/g, '')

function App() {
  const [stage, setStage] = useState<Stage>('mission')
  const [stepIndex, setStepIndex] = useState(0)
  const [markedWords, setMarkedWords] = useState<Set<string>>(new Set())

  const currentStep = chapter.steps[stepIndex]
  const markedCount = markedWords.size

  const handleWordToggle = (word: string) => {
    const normalized = normalizeWord(word)
    if (!normalized) {
      return
    }

    setMarkedWords((prev) => {
      const next = new Set(prev)
      if (next.has(normalized)) {
        next.delete(normalized)
      } else {
        next.add(normalized)
      }
      return next
    })
  }

  const handleBack = () => {
    if (stage === 'reading') {
      if (stepIndex === 0) {
        setStage('mission')
      } else {
        setStepIndex((prev) => Math.max(prev - 1, 0))
      }
    } else if (stage === 'complete') {
      setStage('reading')
      setStepIndex(chapter.steps.length - 1)
    }
  }

  const handleContinue = () => {
    if (stage === 'mission') {
      setStage('reading')
      return
    }

    if (stage === 'reading') {
      const reachedTarget = markedCount >= 10
      const lastStep = stepIndex === chapter.steps.length - 1

      if (reachedTarget || lastStep) {
        setStage('complete')
        return
      }

      setStepIndex((prev) => Math.min(prev + 1, chapter.steps.length - 1))
      return
    }

    if (stage === 'complete') {
      setMarkedWords(new Set())
      setStepIndex(0)
      setStage('mission')
    }
  }

  const readingTokens = useMemo(
    () => (stage === 'reading' ? tokenizeText(currentStep.text) : []),
    [stage, currentStep.text],
  )

const stageLabel = stage === 'reading' ? 'Guided Reading' : stage === 'complete' ? 'Ready for Practice' : null

  return (
    <div className="app-shell">
      <main className="study-card" aria-label="Vocabulary Study Flow">
        <header className="chapter-header">{stageLabel && <h1>{stageLabel}</h1>}</header>

        {stage === 'mission' && (
          <section className="mission-panel" aria-live="polite">
            <p className="mission-heading">
              {chapter.missionHeading}: {chapter.name}
            </p>
            <p className="mission-text">{chapter.missionDescription}</p>
          </section>
        )}

        {stage === 'reading' && (
          <section className="reading-panel" aria-live="polite">
            <div className="reading-meta">
              <p className="step-label">Step {stepIndex + 1} of {chapter.steps.length}</p>
              <p className="word-count">Marked words: {markedCount}</p>
            </div>

            <div className="reading-instructions">
              <p>Click every word you want to review. You can select up to 10 before the next activity begins.</p>
            </div>

            <article className="reading-text" aria-label={`Reading step ${stepIndex + 1}`}>
              {readingTokens.map((token, index) => {
                if (/^[A-Za-z']+$/.test(token)) {
                  const normalized = normalizeWord(token)
                  const isMarked = markedWords.has(normalized)
                  const translation = vocabulary[normalized]

                  return (
                    <button
                      key={`${token}-${index}`}
                      type="button"
                      className={`word-token ${isMarked ? 'is-selected' : ''}`}
                      onClick={() => handleWordToggle(token)}
                    >
                      <span>{token}</span>
                      {isMarked && (
                        <span className="word-translation">{translation ?? '—'}</span>
                      )}
                    </button>
                  )
                }

                if (/^\s+$/.test(token)) {
                  return <span key={`space-${index}`}>{token}</span>
                }

                return (
                  <span key={`char-${index}`} className="punctuation">
                    {token}
                  </span>
                )
              })}
            </article>
          </section>
        )}

        {stage === 'complete' && (
          <section className="complete-panel" aria-live="polite">
            <h2>Great work!</h2>
            <p>
              You marked <strong>{markedCount}</strong> words for {chapter.name}. Continue to the next
              activity or restart this flow to review the text again.
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
        )}

        <footer className="flow-controls">
          <button type="button" className="secondary" onClick={handleBack} disabled={stage === 'mission'}>
            Back
          </button>
          <button type="button" className="primary" onClick={handleContinue}>
            {stage === 'complete' ? 'Restart mission' : 'Continue'}
          </button>
        </footer>
      </main>
    </div>
  )
}

export default App
