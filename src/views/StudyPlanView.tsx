import './StudyPlanView.css'

export type StudyPlanStep = {
  id: string
  title: string
}

export type StudyPlanViewProps = {
  onStepSelect?: (stepId: string) => void
}

const steps: StudyPlanStep[] = [
  { id: 'science-and-technology', title: 'Science and Technology' },
  { id: 'environment', title: 'Environment' },
  { id: 'history', title: 'History' },
  { id: 'career', title: 'Career' },
  { id: 'literature', title: 'Literature' },
  { id: 'education', title: 'Education' },
  { id: 'society', title: 'Society' },
  { id: 'culture', title: 'Culture' },
  { id: 'media', title: 'Media' },
]

const baseY = 80
const verticalSpacing = 180
const leftPositions = [28, 72]

const StudyPlanView = ({ onStepSelect }: StudyPlanViewProps) => {
  const stonePositions = steps.map((step, index) => ({
    ...step,
    left: leftPositions[index % leftPositions.length],
    top: baseY + index * verticalSpacing,
  }))

  const pathHeight = baseY * 2 + verticalSpacing * (steps.length - 1)

  const sideOffset = 12

  const pathPoints = stonePositions.map((point, index) => {
    const isLastStep = index === stonePositions.length - 1
    const isLeftColumn = point.left < 50
    const adjustedLeft = isLastStep
      ? point.left
      : Math.min(95, Math.max(5, point.left + (isLeftColumn ? sideOffset : -sideOffset)))

    return {
      left: adjustedLeft,
      top: point.top,
    }
  })

  const pathD = pathPoints.reduce((acc, point, index, arr) => {
    if (index === 0) {
      return `M ${point.left} ${point.top}`
    }

    const previous = arr[index - 1]
    const midY = (previous.top + point.top) / 2
    const control1 = `${previous.left} ${midY}`
    const control2 = `${point.left} ${midY}`
    return `${acc} C ${control1} ${control2} ${point.left} ${point.top}`
  }, '')

  const handleStepClick = (stepId: string) => {
    onStepSelect?.(stepId)
  }

  return (
    <main className="study-plan" aria-label="Study plan">
      <div className="study-plan__scroll">
        <header className="study-plan__header">
          <h1>Vocabulary Boost</h1>
          <p>Grow your vocabulary for the English matriculation exam!</p>
        </header>
        <div className="study-plan__path" style={{ height: `${pathHeight}px` }}>
          <svg className="study-plan__line" viewBox={`0 0 100 ${pathHeight}`} preserveAspectRatio="none" role="presentation">
            <path d={pathD} />
          </svg>
          {stonePositions.map((step) => (
            <button
              key={step.id}
              type="button"
              className="study-plan__step"
              style={{
                top: `${step.top}px`,
                left: `${step.left}%`,
              }}
              onClick={() => handleStepClick(step.id)}
            >
              <span className="study-plan__step-title">{step.title}</span>
            </button>
          ))}
        </div>
      </div>
    </main>
  )
}

export default StudyPlanView
