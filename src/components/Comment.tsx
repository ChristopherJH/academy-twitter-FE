import CommentType from "../types/CommentType";
import RecommendationType from "../types/RecommendationType";
import UserType from "../types/UserType";
import dateFormatter from "../utils/dateFormatter";
import { handleDeleteComment } from "./Comments";

interface CommentProps {
  comment: CommentType;
  signedInUser: UserType;
  setComments: (input: CommentType[]) => void;
  recommendation: RecommendationType;
}

export default function Comment(props: CommentProps): JSX.Element {
  return (
    <div className="comment-div">
      <div className="comment-header">
        <h5>👤{props.comment.name}</h5>
        {props.signedInUser.user_id === props.comment.user_id && (
          <button
            id="deleteComment"
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
