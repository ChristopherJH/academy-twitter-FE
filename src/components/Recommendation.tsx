// import CommentType from "../types/CommentType";
import RecommendationType from "../types/RecommendationType";
import StageType from "../types/StageType";
import TagType from "../types/TagType";
import UserType from "../types/UserType";
import dateFormatter from "../utils/dateFormatter";
import { config } from "dotenv";
import axios from "axios";

config();

const apiBaseURL = process.env.REACT_APP_API_BASE;

interface recommendationProps {
  recommendation: RecommendationType;
  tags: TagType[];
  users: UserType[];
  stages: StageType[];
  // comments: CommentType[]
  signedInUser: UserType;
  setRecommendations: (input: RecommendationType[]) => void;
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
        <h4 className="recommended offset-3 col-2">
          {props.recommendation.recommended}
        </h4>
      </div>
      <div className="row">
        <h3 className="col-3">
          {props.recommendation.author && props.recommendation.author}
        </h3>
        <h3 className="col-3">{props.recommendation.content}</h3>
        <h4 className="offset-4 col-2">Uploaded by: {recommenderName}</h4>
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
        <button className="col-2">See comments</button>
        <h5 className="offset-6 col-1 text-right">
          {props.recommendation.likes}
        </h5>
        {props.signedInUser.user_id === 0 ? (
          <h4 className="col-1 text-left">👍</h4>
        ) : (
          <h4
            className="col-1 text-left like"
            onClick={() =>
              handleLikeDislike(
                true,
                props.recommendation.recommendation_id,
                props.setRecommendations
              )
            }
          >
            👍
          </h4>
        )}

        <h5 className="col-1 text-right">{props.recommendation.dislikes}</h5>
        {props.signedInUser.user_id === 0 ? (
          <h4 className="col-1 text-left">👎</h4>
        ) : (
          <h4
            className="col-1 text-left dislike"
            onClick={() =>
              handleLikeDislike(
                false,
                props.recommendation.recommendation_id,
                props.setRecommendations
              )
            }
          >
            👎
          </h4>
        )}
      </div>
    </div>
  );
}

async function handleLikeDislike(
  like: boolean,
  id: number,
  setRecommendations: (input: RecommendationType[]) => void
) {
  let endpointString = "";
  if (like) {
    endpointString = "like";
  } else {
    endpointString = "dislike";
  }
  try {
    const response = await axios.put(`${apiBaseURL}${endpointString}/${id}`);
    console.log(response);
    const recommendationsResponse = await axios.get(
      `${apiBaseURL}recommendations`
    );
    setRecommendations(recommendationsResponse.data.data);
  } catch (err) {
    console.log(err);
  }
}
