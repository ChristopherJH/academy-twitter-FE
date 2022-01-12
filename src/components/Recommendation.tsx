// import CommentType from "../types/CommentType";
import RecommendationType from "../types/RecommendationType";
import StageType from "../types/StageType";
import TagType from "../types/TagType";
import UserType from "../types/UserType";
import dateFormatter from "../utils/dateFormatter";
import { config } from "dotenv";
import axios from "axios";
import StudyListType from "../types/StudyListType";
import { useEffect, useState } from "react";

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
  studyList: StudyListType[];
  setStudyList: (input: StudyListType[]) => void;
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
  const [likes, setLikes] = useState<number>(0);
  const [dislikes, setDislikes] = useState<number>(0);
  const [commentBody, setCommentBody] = useState<string>("");

  useEffect(() => {
    getLikes(setLikes, props.recommendation.recommendation_id);
    getDislikes(setDislikes, props.recommendation.recommendation_id);
  }, [props.recommendation.recommendation_id]);

  const handleAddorRemoveToStudyList = async (add: boolean) => {
    try {
      if (add) {
        await axios.delete(
          `${apiBaseURL}study_list/${props.signedInUser.user_id}/${props.recommendation.recommendation_id}`
        );
      } else {
        await axios.post(
          `${apiBaseURL}study_list/${props.signedInUser.user_id}/${props.recommendation.recommendation_id}`
        );
      }
      const studyListResponse = await axios.get(
        `${apiBaseURL}study_list/${props.signedInUser.user_id}`
      );
      props.setStudyList(studyListResponse.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="recommendation">
      <div className="row">
        <h2 className="col-6 recommendation-title searchbar-test">
          <a href={props.recommendation.url} id="recommendation-url">
            {props.recommendation.title && props.recommendation.title}
          </a>
        </h2>
        <div className="recommended-and-add-to-sl offset-3 col-3">
          <h4 className="recommended" id="recommendation-recommended">
            {props.recommendation.recommended}
          </h4>
          {props.signedInUser.user_id !== 0 && (
            <div className="add-button-div">
              {props.studyList
                .map((item) => item.recommendation_id)
                .includes(props.recommendation.recommendation_id) ? (
                <button
                  onClick={() => handleAddorRemoveToStudyList(true)}
                  className="btn btn-outline-primary add-button"
                  id="add-sl-button"
                >
                  -
                </button>
              ) : (
                <button
                  onClick={() => handleAddorRemoveToStudyList(false)}
                  className="btn btn-outline-primary add-button"
                  id="remove-sl-button"
                >
                  +
                </button>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="row">
        <h3 className="col-3 searchbar-test" id="recommendation-author">
          {props.recommendation.author && props.recommendation.author}
        </h3>
        <h3 className="col-3" id="recommendation-content">
          {props.recommendation.content}
        </h3>
      </div>
      <div className="row">
        <p className="col-12 searchbar-test" id="recommendation-description">
          <hr className="solid"></hr>
          {props.recommendation.description}
        </p>
      </div>
      <div className="row">
        <p className="col-12" id="recommendation-stage">
          Recommended for Week {recommendationStage?.stage_week}:{" "}
          {recommendationStage?.stage_description}
        </p>
      </div>
      <div className="row">
        <p className="col-12" id="recommendation-recommended-description">
          Why? {props.recommendation.recommended_description}
        </p>
      </div>
      <div className="row">
        <div className="col-9 recommendation-tags-div">
          {recommendationTags?.map((tag) => (
            <button
              className="btn btn-custom btn-sm mx-2 recommendation-tag"
              disabled
              key={tag.tag_id}
            >
              {tag.name}
            </button>
          ))}
        </div>
        <div className="offset-1 col-2">
          <h5 id="recommendation-username">👤 {recommenderName}</h5>
          <p id="recommendation-date">
            {dateFormatter(props.recommendation.time)}
          </p>
        </div>
      </div>
      <div className="row">
        <button className="col-2" id="recommendation-see-comments-button">
          See comments
        </button>
        <h5
          className="offset-7 col-2 text-right"
          id="recommendation-like-count"
        >
          Endorsements: {likes - dislikes}
        </h5>
        {props.signedInUser.user_id !== 0 && (
          <div className="col-1">
            <button
              className="btn btn-primary mb-2"
              type="button"
              data-toggle="collapse"
              data-target="#create-comment-section"
              aria-expanded="false"
              aria-controls="create-comment-section"
            >
              Comment
            </button>
          </div>
        )}
      </div>
      <div className="collapse row" id="create-comment-section">
        <div className="card card-body">
          <textarea
            className="form-control"
            placeholder="Write your comment"
            value={commentBody}
            onChange={(e) => setCommentBody(e.target.value)}
          />
          <div className="row endorse-veto-buttons text-right">
            <button
              className="btn btn-custom offset-10 mr-2 mt-2"
              onClick={() =>
                postComment(
                  true,
                  props.recommendation.recommendation_id,
                  props.signedInUser.user_id,
                  commentBody,
                  setCommentBody
                )
              }
            >
              Endorse
            </button>
            <button
              className="btn btn-custom mt-2"
              onClick={() =>
                postComment(
                  false,
                  props.recommendation.recommendation_id,
                  props.signedInUser.user_id,
                  commentBody,
                  setCommentBody
                )
              }
            >
              Veto
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

async function getLikes(setLikes: (input: number) => void, id: number) {
  const response = await axios.get(`${apiBaseURL}${id}/likes`);
  setLikes(response.data.data[0].count);
  console.log(response.data.data[0].count);
}

async function getDislikes(setDislikes: (input: number) => void, id: number) {
  const response = await axios.get(`${apiBaseURL}${id}/dislikes`);
  setDislikes(response.data.data[0].count);
  console.log(response.data.data[0].count);
}

async function postComment(
  endorse: boolean,
  id: number,
  user_id: number,
  commentBody: string,
  setCommentBody: (input: string) => void
) {
  let is_like = false;
  let is_dislike = false;
  if (endorse) {
    is_like = true;
  } else {
    is_dislike = true;
  }
  const response = await axios.post(`${apiBaseURL}comments/${id}`, {
    body: commentBody,
    user_id: user_id,
    is_like: is_like,
    is_dislike: is_dislike,
  });
  console.log(response);
  setCommentBody("");
}
