// import CommentType from "../types/CommentType";
import RecommendationType from "../types/RecommendationType";
import StageType from "../types/StageType";
import TagType from "../types/TagType";
import UserType from "../types/UserType";
import dateFormatter from "../utils/dateFormatter";

interface recommendationProps {
  recommendation: RecommendationType;
  tags: TagType[];
  users: UserType[];
  stages: StageType[];
  // comments: CommentType[]
}

export default function Recommendation(
  props: recommendationProps
): JSX.Element {
  const recommendationTags = props.tags.filter(
    (element) =>
      element.recommendation_id === props.recommendation.recommendation_id
  );
  const recommendationStage = props.stages.find(
    (element) => element.stage_id === props.recommendation.stage_id
  );
  const recommenderName = props.users.find(
    (element) => element.user_id === props.recommendation.user_id
  )?.name;

  return (
    <div className="recommendation">
      <div className="row">
        <h2 className="col-6">
          <a href={props.recommendation.url}>
            {props.recommendation.title && props.recommendation.title}
          </a>
        </h2>
        <h3 className="offset-4 col-2">{props.recommendation.recommended}</h3>
      </div>
      <div className="row">
        <h3 className="col-3">
          {props.recommendation.author && props.recommendation.author}
        </h3>
        <h3 className="col-3">{props.recommendation.content}</h3>
        <h4 className="offset-4 col-2">{recommenderName}</h4>
      </div>
      <div className="row">
        <p className="col-12">{props.recommendation.description}</p>
      </div>
      <div className="row">
        <p className="col-12">
          Recommended for Week {recommendationStage?.stage_week}:{" "}
          {recommendationStage?.stage_description}
        </p>
      </div>
      <div className="row">
        <p className="col-12">
          Why? {props.recommendation.recommended_description}
        </p>
      </div>
      <div className="row">
        <div className="col-9">
          {recommendationTags?.map((tag) => (
            <button className="btn btn-warning btn-sm mx-2" key={tag.tag_id}>
              {tag.name}
            </button>
          ))}
        </div>
        <p className="offset-1 col-2">
          {dateFormatter(props.recommendation.time)}
        </p>
      </div>
      <div className="row">
        <button className="offset-1 col-2">See comments</button>
        <p className="offset-7 col-1">{props.recommendation.likes} likes</p>
        <p className="col-1">{props.recommendation.dislikes} dislikes</p>
      </div>
    </div>
  );
}
