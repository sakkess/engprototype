import type { ComponentType, FC } from 'react'

type TopicFlowViewProps = {
  topicTitle: string
  topicSummary: string
  stepIndex: number
  totalSteps: number
  StepView: ComponentType
  onBack: () => void
  onNext: () => void
}

const TopicFlowView: FC<TopicFlowViewProps> = ({
  topicTitle,
  topicSummary,
  stepIndex,
  totalSteps,
  StepView,
  onBack,
  onNext,
}) => {
  return (
    <section className="card topic-flow">
      <header className="card__header">
        <p className="eyebrow">Topic flow</p>
        <h1>{topicTitle}</h1>
        <p>{topicSummary}</p>
        <p className="topic-flow__progress">
          Step {stepIndex + 1} of {totalSteps}
        </p>
      </header>

      <div className="topic-flow__body">
        <StepView />
      </div>

      <footer className="topic-flow__nav">
        <button type="button" onClick={onBack}>
          Back
        </button>
        <button type="button" onClick={onNext}>
          Next
        </button>
      </footer>
    </section>
  )
}

export default TopicFlowView
