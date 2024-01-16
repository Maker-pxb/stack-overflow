export enum HomeFilterEnum {
  NEWEST = 'newest',
  RECOMMENDED = 'recommended',
  FREQUENT = 'frequent',
  UNANSWERED = 'unanswered'
}

export enum QuestionFilterEnum {
  MOST_RECENT = 'most_recent',
  OLDEST = 'oldest',
  MOST_VOTED = 'most_voted',
  MOST_VIEWED = 'most_viewed',
  MOST_ANSWERED = 'most_answered'
}

export enum TagFiltersEnum {
  POPULAR = 'popular',
  RECENT = 'recent',
  NAME = 'name',
  OLD = 'old'
}

export enum GlobalSearchFiltersEnum {
  QUESTION = 'question',
  ANSWER = 'answer',
  USER = 'user',
  TAG = 'tag'
}

export enum UserFiltersEnum {
  NEW_USERS = 'new_users',
  OLD_USERS = 'old_users',
  TOP_CONTRIBUTORS = 'top_contributors'
}

export enum AnswerFiltersEnum {
  HIGHEST_UPVOTES = 'highestUpvotes',
  LOWEST_UPVOTES = 'lowestUpvotes',
  RECENT = 'recent',
  OLD = 'old'
}

export const AnswerFilters = [
  { name: 'Highest Upvotes', value: AnswerFiltersEnum.HIGHEST_UPVOTES },
  { name: 'Lowest Upvotes', value: AnswerFiltersEnum.LOWEST_UPVOTES },
  { name: 'Most Recent', value: AnswerFiltersEnum.RECENT },
  { name: 'Oldest', value: AnswerFiltersEnum.OLD }
]

export const UserFilters = [
  { name: 'New Users', value: UserFiltersEnum.NEW_USERS },
  { name: 'Old Users', value: UserFiltersEnum.OLD_USERS },
  { name: 'Top Contributors', value: UserFiltersEnum.TOP_CONTRIBUTORS }
]

export const QuestionFilters = [
  { name: 'Most Recent', value: QuestionFilterEnum.MOST_RECENT },
  { name: 'Oldest', value: QuestionFilterEnum.OLDEST },
  { name: 'Most Voted', value: QuestionFilterEnum.MOST_VOTED },
  { name: 'Most Viewed', value: QuestionFilterEnum.MOST_VIEWED },
  { name: 'Most Answered', value: QuestionFilterEnum.MOST_ANSWERED }
]

export const TagFilters = [
  { name: 'Popular', value: TagFiltersEnum.POPULAR },
  { name: 'Recent', value: TagFiltersEnum.RECENT },
  { name: 'Name', value: TagFiltersEnum.NAME },
  { name: 'Old', value: TagFiltersEnum.OLD }
]

export const HomePageFilters = [
  { name: 'Newest', value: HomeFilterEnum.NEWEST },
  { name: 'Recommended', value: HomeFilterEnum.RECOMMENDED },
  { name: 'Frequent', value: HomeFilterEnum.FREQUENT },
  { name: 'Unanswered', value: HomeFilterEnum.UNANSWERED }
]

export const GlobalSearchFilters = [
  { name: 'Question', value: GlobalSearchFiltersEnum.QUESTION },
  { name: 'Answer', value: GlobalSearchFiltersEnum.ANSWER },
  { name: 'User', value: GlobalSearchFiltersEnum.USER },
  { name: 'Tag', value: GlobalSearchFiltersEnum.TAG }
]
