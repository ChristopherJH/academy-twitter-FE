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
}

export default function Recommendations(
  props: recommendationListProps
): JSX.Element {
  return (
    <div>
      {props.recommendations.map((recommendation) => (
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
