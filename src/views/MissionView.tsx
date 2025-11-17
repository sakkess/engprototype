import type { Chapter } from '../types'

type MissionViewProps = Pick<Chapter, 'name' | 'missionHeading' | 'missionDescription'>

function MissionView({ name, missionHeading, missionDescription }: MissionViewProps) {
  return (
    <section className="mission-panel" aria-live="polite">
      <p className="mission-heading">
        {missionHeading}: {name}
      </p>
      <p className="mission-text">{missionDescription}</p>
    </section>
  )
}

export default MissionView
