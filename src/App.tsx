import { useState } from 'react'
import type { ComponentType } from 'react'
import './App.css'
import StudyPlanView from './views/StudyPlanView'

type ViewId = 'study-plan'

type ViewRegistry = Record<ViewId, ComponentType>

const viewComponents: ViewRegistry = {
  'study-plan': StudyPlanView,
}

function App() {
  const [activeView] = useState<ViewId>('study-plan')
  const ActiveView = viewComponents[activeView]

  return (
    <div className="app">
      <ActiveView />
    </div>
  )
}

export default App
