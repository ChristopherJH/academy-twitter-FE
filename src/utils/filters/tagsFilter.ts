import TagType from "../../types/TagType";
import RecommendationType from "../../types/RecommendationType";

export default function tagsFilter(
  tags: TagType[],
  dropDownArray: string[],
  filteredRecommendations: RecommendationType[]
): RecommendationType[] {
  /*input: arrayOfTags (array of objects), arraySelectedTags, filteredRecommendations
  output: filteredRecommendations

  filteredTags = []

  for each of arraySelectedTags
    if that tag exists in arrayOfTags
      push into a filteredTags array




  */
  const filteredTags: TagType[] = [];
  for (const tag of tags) {
    if (dropDownArray.includes(tag.name)) {
      filteredTags.push(tag);
    }
  }

  //  tags.filter((tag) => tag.name === dropDownValue);

  // filter recommendations based on tags with the drop down value
  return filteredRecommendations.filter(
    (recommendation) =>
      // returns true if a recommendation exists with that tag
      filteredTags.find(
        (tag) => tag.recommendation_id === recommendation.recommendation_id
      ) !== undefined
  );
}
