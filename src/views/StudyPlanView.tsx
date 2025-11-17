import type { FC } from 'react'

export type StudyTopic = {
  id: string
  title: string
  summary: string
  stepsCount: number
}

type StudyPlanViewProps = {
  topics: StudyTopic[]
  onOpenTopic: (topicId: string) => void
}

const StudyPlanView: FC<StudyPlanViewProps> = ({ topics, onOpenTopic }) => {
  return (
    <section className="card">
      <header className="card__header">
        <p className="eyebrow">Study app</p>
        <h1>Study plan</h1>
        <p>Pick a topic to walk through its guided garden path of steps.</p>
      </header>

      <div className="study-plan__topics">
        {topics.map((topic) => (
          <article key={topic.id} className="study-topic">
            <div>
              <h2>{topic.title}</h2>
              <p>{topic.summary}</p>
            </div>
            <div className="study-topic__actions">
              <span>{topic.stepsCount} steps</span>
              <button type="button" onClick={() => onOpenTopic(topic.id)}>
                Enter topic
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default StudyPlanView
