import RecommendationType from "../types/RecommendationType";
import StageType from "../types/StageType";
import TagType from "../types/TagType";
import UserType from "../types/UserType";
import Recommendation from "./Recommendation";
import searchBarFilter from "../utils/filters/searchBarFilter";
import tagsFilter from "../utils/filters/tagsFilter";

interface recommendationListProps {
  recommendations: RecommendationType[];
  tags: TagType[];
  users: UserType[];
  stages: StageType[];
  // comments: CommentType[]
  searchText: string;
  dropDownValue: string;
}

export default function Recommendations(
  props: recommendationListProps
): JSX.Element {
  // Filtering recommendations based on search text and tag drop down
  let filteredRecommendations = props.recommendations;
  if (props.searchText) {
    filteredRecommendations = searchBarFilter(
      props.recommendations,
      props.searchText
    );
    // filteredRecommendations = props.recommendations.filter(
    //   (recommendation) =>
    //     recommendation.title
    //       .toLowerCase()
    //       .includes(props.searchText.toLowerCase()) ||
    //     recommendation.author
    //       .toLowerCase()
    //       .includes(props.searchText.toLowerCase()) ||
    //     recommendation.description
    //       .toLowerCase()
    //       .includes(props.searchText.toLowerCase())
    // );
  }
  if (props.dropDownValue) {
    // filter tags based on drop down value
    // const filteredTags = props.tags.filter(
    //   (tag) => tag.name === props.dropDownValue
    // );
    // // filter recommendations based on tags with the drop down value
    // filteredRecommendations = filteredRecommendations.filter(
    //   (recommendation) =>
    //     // returns true if a recommendation exists with that tag
    //     filteredTags.find(
    //       (tag) => tag.recommendation_id === recommendation.recommendation_id
    //     ) !== undefined
    // );
    filteredRecommendations = tagsFilter(
      props.tags,
      props.dropDownValue,
      filteredRecommendations
    );
  }

  return (
    <div>
      {filteredRecommendations.map((recommendation) => (
        <Recommendation
          key={recommendation.recommendation_id}
          recommendation={recommendation}
          tags={props.tags}
          stages={props.stages}
          users={props.users}
        />
      ))}
      ;
    </div>
  );
}
