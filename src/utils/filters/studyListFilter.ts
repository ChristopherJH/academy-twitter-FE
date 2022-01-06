import StudyListType from "../../types/StudyListType"
import RecommendationType from "../../types/RecommendationType";

export default function studyListFilter(
  studyList: StudyListType[],
  filteredRecommendations: RecommendationType[]
): RecommendationType[] {
  return filteredRecommendations.filter(
    (recommendation) =>
      studyList.find(
        (studyListItem) => studyListItem.recommendation_id === recommendation.recommendation_id
      ) !== undefined
  );
}
