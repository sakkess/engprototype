export type Stage = 'mission' | 'reading' | 'complete'

export type ChapterStep = {
  id: string
  text: string
}

export type Chapter = {
  name: string
  missionHeading: string
  missionDescription: string
  steps: ChapterStep[]
}

export type Vocabulary = Record<string, string>
