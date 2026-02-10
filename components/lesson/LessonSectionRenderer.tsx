'use client'

import { BeforeYouStart } from '@/components/lesson/BeforeYouStart'
import { Definition } from '@/components/lesson/Definition'
import { Example } from '@/components/lesson/Example'
import { Note } from '@/components/lesson/Note'
import { VisualExplanation } from '@/components/lesson/VisualExplanation'
import { CommonMistake } from '@/components/lesson/CommonMistake'
import { WhatsNext } from '@/components/lesson/WhatsNext'

interface LessonSection {
  section_type: string
  content: any
  display_order: number
}

interface LessonSectionRendererProps {
  section: LessonSection
  locale: string
}

export default function LessonSectionRenderer({ section, locale }: LessonSectionRendererProps) {
  const { section_type, content } = section

  switch (section_type) {
    case 'before_you_start':
      return (
        <BeforeYouStart
          prerequisites={content.prerequisites || []}
          learningObjectives={content.learningObjectives || []}
          estimatedTime={content.estimatedTime}
          difficulty={content.difficulty}
        />
      )

    case 'definition':
      return (
        <Definition term={content.term}>
          {content.definition}
          {content.examples && content.examples.length > 0 && (
            <div className="mt-4">
              <h4 className="font-semibold mb-2">Examples:</h4>
              <ul className="list-disc list-inside space-y-1">
                {content.examples.map((example: string, idx: number) => (
                  <li key={idx}>{example}</li>
                ))}
              </ul>
            </div>
          )}
        </Definition>
      )

    case 'example':
      return (
        <Example
          title={content.title}
          problem={content.problem}
          solution={content.solution}
          steps={content.steps}
        />
      )

    case 'visual':
    case 'visual_explanation':
      return (
        <VisualExplanation
          title={content.title}
          caption={content.caption}
          zoomable={content.zoomable}
        >
          {content.data && renderVisualContent(content)}
        </VisualExplanation>
      )

    case 'note':
      return (
        <Note type={content.type || 'info'}>
          {content.content}
        </Note>
      )

    case 'common_mistake':
      return (
        <CommonMistake
          title={content.title}
          wrong={content.wrong}
          wrongMath={content.wrongMath}
          correct={content.correct}
          correctMath={content.correctMath}
          explanation={content.explanation}
          tip={content.tip}
        />
      )

    case 'whats_next':
      return (
        <WhatsNext
          topics={content.topics || []}
          nextLesson={content.nextLesson}
        />
      )

    default:
      console.warn(`Unknown section type: ${section_type}`)
      return null
  }
}

// Helper function to render visual content
function renderVisualContent(content: any) {
  if (content.type === 'chart') {
    // Render chart visualization
    return <div className="text-center text-gray-500">Chart visualization</div>
  }

  if (content.type === 'diagram') {
    // Render diagram
    return <div className="text-center text-gray-500">Diagram visualization</div>
  }

  if (content.imageUrl) {
    return (
      <img
        src={content.imageUrl}
        alt={content.title || 'Visual explanation'}
        className="max-w-full h-auto rounded-lg"
      />
    )
  }

  return <div>{JSON.stringify(content.data)}</div>
}
