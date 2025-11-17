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
  { id: 'step-2', title: 'Step 2' },
  { id: 'step-3', title: 'Step 3' },
  { id: 'step-4', title: 'Step 4' },
  { id: 'step-5', title: 'Step 5' },
  { id: 'step-6', title: 'Step 6' },
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

  const pathD = stonePositions.reduce((acc, point, index, arr) => {
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
          <h1>Study Plan</h1>
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
