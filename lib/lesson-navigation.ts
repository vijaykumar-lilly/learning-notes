import { curriculumData } from './curriculum-data'

export interface LessonNavigation {
  previous?: {
    title: string
    href: string
  }
  next?: {
    title: string
    href: string
  }
}

// Flatten all lessons into a single ordered array
export function getAllLessonsInOrder() {
  const lessons: Array<{ title: string; slug: string; domainSlug: string }> = []
  
  curriculumData.forEach(domain => {
    domain.topics.forEach(topic => {
      lessons.push({
        title: topic.title,
        slug: topic.slug,
        domainSlug: domain.slug
      })
    })
  })
  
  return lessons
}

// Get previous and next lesson navigation for a given lesson
export function getLessonNavigation(
  domainSlug: string,
  lessonSlug: string
): LessonNavigation {
  const allLessons = getAllLessonsInOrder()
  const currentIndex = allLessons.findIndex(
    lesson => lesson.domainSlug === domainSlug && lesson.slug === lessonSlug
  )
  
  if (currentIndex === -1) {
    return {}
  }
  
  const navigation: LessonNavigation = {}
  
  // Previous lesson
  if (currentIndex > 0) {
    const prev = allLessons[currentIndex - 1]
    navigation.previous = {
      title: prev.title,
      href: `/learn/${prev.domainSlug}/${prev.slug}`
    }
  }
  
  // Next lesson
  if (currentIndex < allLessons.length - 1) {
    const next = allLessons[currentIndex + 1]
    navigation.next = {
      title: next.title,
      href: `/learn/${next.domainSlug}/${next.slug}`
    }
  }
  
  return navigation
}
