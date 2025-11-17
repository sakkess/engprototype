import { useState } from 'react'
import type { ComponentType } from 'react'
import './App.css'
import StudyPlanView from './views/StudyPlanView'
import TopicFlowView from './views/TopicFlowView'
import ConceptSeedsView from './views/topicFlow/ConceptSeedsView'
import PracticePatchView from './views/topicFlow/PracticePatchView'
import ReflectionClearingView from './views/topicFlow/ReflectionClearingView'

type TopicStep = {
  id: string
  label: string
  View: ComponentType
}

type TopicFlow = {
  id: string
  title: string
  summary: string
  steps: TopicStep[]
}

type ViewState = { type: 'plan' } | { type: 'topicFlow'; topicId: string; stepIndex: number }

const TOPIC_FLOWS: TopicFlow[] = [
  {
    id: 'web-foundations',
    title: 'Web foundations',
    summary: 'HTML, CSS, and the basics that keep your interface rooted.',
    steps: [
      { id: 'concept', label: 'Concept seeds', View: ConceptSeedsView },
      { id: 'practice', label: 'Practice patch', View: PracticePatchView },
      { id: 'reflection', label: 'Reflection clearing', View: ReflectionClearingView },
    ],
  },
  {
    id: 'js-garden',
    title: 'JavaScript garden path',
    summary: 'A gentle stroll through scripting essentials.',
    steps: [
      { id: 'concept-js', label: 'Concept seeds', View: ConceptSeedsView },
      { id: 'practice-js', label: 'Practice patch', View: PracticePatchView },
      { id: 'reflection-js', label: 'Reflection clearing', View: ReflectionClearingView },
    ],
  },
]

const App = () => {
  const [viewState, setViewState] = useState<ViewState>({ type: 'plan' })

  const openTopic = (topicId: string) => {
    setViewState({ type: 'topicFlow', topicId, stepIndex: 0 })
  }

  const activeTopic =
    viewState.type === 'topicFlow'
      ? TOPIC_FLOWS.find((topic) => topic.id === viewState.topicId)
      : undefined

  const handleBack = () => {
    if (viewState.type !== 'topicFlow' || !activeTopic) {
      setViewState({ type: 'plan' })
      return
    }

    if (viewState.stepIndex === 0) {
      setViewState({ type: 'plan' })
      return
    }

    setViewState({ type: 'topicFlow', topicId: viewState.topicId, stepIndex: viewState.stepIndex - 1 })
  }

  const handleNext = () => {
    if (viewState.type !== 'topicFlow' || !activeTopic) {
      setViewState({ type: 'plan' })
      return
    }

    const isLastStep = viewState.stepIndex >= activeTopic.steps.length - 1

    if (isLastStep) {
      setViewState({ type: 'plan' })
      return
    }

    setViewState({ type: 'topicFlow', topicId: viewState.topicId, stepIndex: viewState.stepIndex + 1 })
  }

  const planView = (
    <main className="app">
      <StudyPlanView
        topics={TOPIC_FLOWS.map((topic) => ({
          id: topic.id,
          title: topic.title,
          summary: topic.summary,
          stepsCount: topic.steps.length,
        }))}
        onOpenTopic={openTopic}
      />
    </main>
  )

  if (viewState.type === 'plan') {
    return planView
  }

  if (!activeTopic) {
    return planView
  }

  const currentStep = activeTopic.steps[viewState.stepIndex]

  if (!currentStep) {
    return planView
  }

  return (
    <main className="app">
      <TopicFlowView
        topicTitle={activeTopic.title}
        topicSummary={activeTopic.summary}
        stepIndex={viewState.stepIndex}
        totalSteps={activeTopic.steps.length}
        StepView={currentStep.View}
        onBack={handleBack}
        onNext={handleNext}
      />
    </main>
  )
}

export default App
