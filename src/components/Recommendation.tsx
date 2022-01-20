import RecommendationType from "../types/RecommendationType";
import StageType from "../types/StageType";
import TagType from "../types/TagType";
import UserType from "../types/UserType";
import dateFormatter from "../utils/dateFormatter";
import { config } from "dotenv";
import axios from "axios";
import StudyListType from "../types/StudyListType";
import { useState } from "react";
import { Comments, postComment } from "./Comments";
import CommentType from "../types/CommentType";

config();

const apiBaseURL = process.env.REACT_APP_API_BASE;

interface recommendationProps {
  recommendation: RecommendationType;
  tags: TagType[];
  users: UserType[];
  stages: StageType[];
  signedInUser: UserType;
  setRecommendations: (input: RecommendationType[]) => void;
  studyList: StudyListType[];
  setStudyList: (input: StudyListType[]) => void;
  setDropDownArray: (input: string[]) => void;
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
  let recommenderName = props.users.find(
    (element) => element.user_id === props.recommendation.user_id
  )?.name;
  const [sorciness, setSorciness] = useState<number>(0);
  const [commentBody, setCommentBody] = useState<string>("");
  const [comments, setComments] = useState<CommentType[]>([]);
  const [commentPressed, setCommentPressed] = useState<boolean>(false);
  const [seeCommentsPressed, setSeeCommentsPressed] = useState<boolean>(false);
  const viewCommentIDName = `view-comment-section-${props.recommendation.recommendation_id}`;
  const createCommentIDName = `create-comment-section-${props.recommendation.recommendation_id}`;
  const usersCommentOnPost = comments.filter(
    (comment) => comment.user_id === props.signedInUser.user_id
  );

  const isFaculty = props.users.find(
    (element) => element.user_id === props.recommendation.user_id
  )?.is_faculty;
  if (isFaculty) {
    recommenderName = recommenderName + " (Faculty)";
  }

  return (
    <div className="recommendation">
      <div className="row">
        <h2 className="col-8 recommendation-title searchbar-test">
          <a href={props.recommendation.url} id="recommendation-url">
            {props.recommendation.title && props.recommendation.title}
          </a>
        </h2>
        <div className="recommended-and-add-to-sl offset-0 col-4">
          <h4 className="recommended" id="recommendation-recommended">
            {props.recommendation.recommended}
          </h4>
          {props.signedInUser.user_id !== 0 && (
            <div className="add-button-div">
              {props.studyList
                .map((item) => item.recommendation_id)
                .includes(props.recommendation.recommendation_id) ? (
                <button
                  onClick={() =>
                    handleAddorRemoveToStudyList(
                      true,
                      props.signedInUser.user_id,
                      props.recommendation.recommendation_id,
                      props.setStudyList
                    )
                  }
                  className="btn btn-custom add-button mr-2"
                  type="button"
                  id="add-sl-button"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Remove from study list"
                >
                  -
                </button>
              ) : (
                <button
                  onClick={() =>
                    handleAddorRemoveToStudyList(
                      false,
                      props.signedInUser.user_id,
                      props.recommendation.recommendation_id,
                      props.setStudyList
                    )
                  }
                  className="btn btn-custom add-button mr-2"
                  type="button"
                  id="remove-sl-button"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Add to study list"
                >
                  +
                </button>
              )}

              {props.signedInUser.user_id === props.recommendation.user_id && (
                <button
                  className="btn btn-danger delete-rec-button"
                  id="deleteRecButton"
                  onClick={() => {
                    handleDeleteRecommendation(
                      props.recommendation.recommendation_id,
                      props.setRecommendations
                    );
                  }}
                >
                  <i className="fas fa-trash"></i>
                </button>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="row">
        <div className="col-5 author-and-content">
          <h4 className=" searchbar-test mr-2" id="recommendation-author">
            {props.recommendation.author && props.recommendation.author}
          </h4>
          <h4 id="recommendation-content">({props.recommendation.content})</h4>
        </div>

        <p
          className="offset-4 col-3 text-right mt-2 "
          id="recommendation-stage"
        >
          <strong className="mr-2">
            {recommendationStage?.stage_description}
          </strong>
        </p>
      </div>
      <hr className="solid row"></hr>
      <div className="row">
        <h4 className="col-12 searchbar-test" id="recommendation-description">
          {props.recommendation.description}
        </h4>
      </div>

      <div className="row">
        <p className="col-12" id="recommendation-recommended-description">
          <strong>Why?</strong> "{props.recommendation.recommended_description}"
        </p>
      </div>
      <div className="row">
        <div className="col-9 recommendation-tags-div">
          {recommendationTags?.map((tag) => (
            <button
              className="btn btn-custom btn-sm mx-2 recommendation-tag"
              key={tag.tag_id}
              onClick={() => props.setDropDownArray([tag.name])}
            >
              {tag.name}
            </button>
          ))}
        </div>
        <div className="offset-1 col-2">
          <h5 id="recommendation-username">
            <i
              className="fas fa-user-alt mr-2"
              style={{ fontSize: "24px" }}
            ></i>
            {recommenderName}
          </h5>
          <p id="recommendation-date">
            <i className="fa fa-calendar-o mr-2"></i>

            {dateFormatter(props.recommendation.time)}
          </p>
        </div>
      </div>
      <div className="row mr-2">
        {comments.length > 1 ? (
          <button
            className="col-3"
            id="recommendation-see-comments-button"
            type="button"
            data-toggle="collapse"
            data-target={`#${viewCommentIDName}`}
            aria-expanded="false"
            aria-controls={viewCommentIDName}
            onClick={() => {
              setSeeCommentsPressed(!seeCommentsPressed);
            }}
          >
            {seeCommentsPressed ? "Hide comments" : `See more comments`}
          </button>
        ) : (
          <div className="col-3 text-left">
            {comments.length === 0 && (
              <p className="ml-5">
                <strong>No comments</strong>
              </p>
            )}
          </div>
        )}

        <h5
          className="offset-5 col-2 text-right"
          id="recommendation-like-count"
        >
          Sorciness: {sorciness}
        </h5>
        {props.signedInUser.user_id !== 0 ? (
          usersCommentOnPost.length === 0 ? (
            <div className="offset-1 col-1">
              <button
                className="btn btn-custom mb-2"
                type="button"
                id="add-comment-button"
                data-toggle="collapse"
                data-target={`#${createCommentIDName}`}
                aria-expanded="false"
                aria-controls={createCommentIDName}
              >
                Comment
              </button>
            </div>
          ) : usersCommentOnPost[0].is_like ? (
            <p className="offset-1 col-1">Upvoted</p>
          ) : (
            <p className="offset-1 col-1">Downvoted</p>
          )
        ) : (
          <p>Sign in to comment</p>
        )}
      </div>
      {usersCommentOnPost.length === 0 && props.signedInUser.user_id !== 0 && (
        <div className="collapse row" id={createCommentIDName}>
          <div className="card card-body">
            <textarea
              id="comment-input"
              className="form-control"
              placeholder="Write your comment"
              value={commentBody}
              onChange={(e) => setCommentBody(e.target.value)}
            />
            {commentPressed && commentBody === "" && (
              <div
                className="alert alert-danger"
                id="comment-body-alert"
                role="alert"
              >
                Cannot post an empty comment
              </div>
            )}
            <div className="row endorse-veto-buttons text-right">
              <button
                className="btn btn-custom offset-10 mr-2 mt-2"
                id="endorse-button"
                onClick={() => {
                  setCommentPressed(true);
                  postComment(
                    true,
                    props.recommendation.recommendation_id,
                    props.signedInUser.user_id,
                    commentBody,
                    setCommentBody,
                    setComments,
                    setCommentPressed
                  );
                }}
              >
                Upvote
              </button>
              <button
                className="btn btn-custom mt-2"
                id="veto-button"
                onClick={() => {
                  setCommentPressed(true);
                  postComment(
                    false,
                    props.recommendation.recommendation_id,
                    props.signedInUser.user_id,
                    commentBody,
                    setCommentBody,
                    setComments,
                    setCommentPressed
                  );
                }}
              >
                Downvote
              </button>
            </div>
          </div>
        </div>
      )}

      <Comments
        signedInUser={props.signedInUser}
        recommendation={props.recommendation}
        comments={comments}
        setComments={setComments}
        setSorciness={setSorciness}
        seeCommentsPressed={seeCommentsPressed}
      />
    </div>
  );
}

async function handleDeleteRecommendation(
  id: number,
  setRecommendations: (input: RecommendationType[]) => void
) {
  await axios.delete(`${apiBaseURL}recommendations/${id}`);
  const response = await axios.get(`${apiBaseURL}recommendations`);
  setRecommendations(response.data.data);
}

async function handleAddorRemoveToStudyList(
  add: boolean,
  user_id: number,
  rec_id: number,
  setStudyList: (input: StudyListType[]) => void
) {
  try {
    if (add) {
      await axios.delete(`${apiBaseURL}study_list/${user_id}/${rec_id}`);
    } else {
      await axios.post(`${apiBaseURL}study_list/${user_id}/${rec_id}`);
    }
    const studyListResponse = await axios.get(
      `${apiBaseURL}study_list/${user_id}`
    );
    setStudyList(studyListResponse.data.data);
  } catch (err) {
    console.log(err);
  }
}
