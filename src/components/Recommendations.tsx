import RecommendationType from "../types/RecommendationType";
import StageType from "../types/StageType";
import TagType from "../types/TagType";
import UserType from "../types/UserType";
import Recommendation from "./Recommendation";

interface recommendationListProps {
  recommendations: RecommendationType[];
  tags: TagType[];
  users: UserType[];
  stages: StageType[];
  // comments: CommentType[]
  searchText: string;
}

export default function Recommendations(
  props: recommendationListProps
): JSX.Element {
  const filteredRecommendations: RecommendationType[] =
    props.recommendations.filter(
      (recommendation) =>
        recommendation.title
          .toLowerCase()
          .includes(props.searchText.toLowerCase()) ||
        recommendation.author
          .toLowerCase()
          .includes(props.searchText.toLowerCase()) ||
        recommendation.description
          .toLowerCase()
          .includes(props.searchText.toLowerCase())
    );
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
