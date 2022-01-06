import TagType from "../../types/TagType";
import RecommendationType from "../../types/RecommendationType";

export default function tagsFilter(
  tags: TagType[],
  dropDownValue: string,
  filteredRecommendations: RecommendationType[]
): RecommendationType[] {
  const filteredTags = tags.filter((tag) => tag.name === dropDownValue);
  // filter recommendations based on tags with the drop down value
  return filteredRecommendations.filter(
    (recommendation) =>
      // returns true if a recommendation exists with that tag
      filteredTags.find(
        (tag) => tag.recommendation_id === recommendation.recommendation_id
      ) !== undefined
  );
}
