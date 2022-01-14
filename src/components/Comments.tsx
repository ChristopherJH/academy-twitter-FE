import axios from "axios";
import { config } from "dotenv";
import { useEffect } from "react";
import CommentType from "../types/CommentType";
import RecommendationType from "../types/RecommendationType";
import UserType from "../types/UserType";
import dateFormatter from "../utils/dateFormatter";

config();

const apiBaseURL = process.env.REACT_APP_API_BASE;

interface CommentsProps {
  signedInUser: UserType;

  recommendation: RecommendationType;
  comments: CommentType[];
  setComments: (input: CommentType[]) => void;
}

export function Comments(props: CommentsProps): JSX.Element {
  useEffect(() => {
    getComments(props.setComments, props.recommendation.recommendation_id);
    // eslint-disable-next-line
  }, []);
  return (
    <>
      {props.comments?.map((comment, index) => {
        return (
          <Comment
            signedInUser={props.signedInUser}
            key={index}
            comment={comment}
            setComments={props.setComments}
            recommendation={props.recommendation}
          />
        );
      })}
    </>
  );
}

interface CommentProps {
  comment: CommentType;
  signedInUser: UserType;
  setComments: (input: CommentType[]) => void;
  recommendation: RecommendationType;
}

function Comment(props: CommentProps): JSX.Element {
  return (
    <div className="comment-div">
      <div className="comment-header">
        <h5>{props.comment.name}</h5>
        {props.signedInUser.user_id === props.comment.user_id && (
          <button
            className="btn btn-danger delete-rec-button"
            onClick={() => {
              handleDeleteComment(
                props.comment.comment_id,
                props.recommendation.recommendation_id,
                props.setComments
              );
            }}
          >
            <i className="fa fa-trash-o"></i>
          </button>
        )}
      </div>
      {props.comment.is_like ? <p>Upvoted</p> : <p>Downvoted</p>}
      <h6>{dateFormatter(props.comment.date)}</h6>
      <p>{props.comment.body}</p>

      <hr
        className="solid
      "
      ></hr>
    </div>
  );
}

// eslint-disable-next-line
export async function getComments(
  setComments: (input: CommentType[]) => void,
  id: number
) {
  const response = await axios.get(`${apiBaseURL}comments/${id}`);
  console.log(response.data.data);
  setComments(response.data.data);
}

async function handleDeleteComment(
  comment_id: number,
  recommendation_id: number,
  setComments: (input: CommentType[]) => void
) {
  await axios.delete(
    `${apiBaseURL}${recommendation_id}/comments/${comment_id}`
  );
  getComments(setComments, recommendation_id);
}
