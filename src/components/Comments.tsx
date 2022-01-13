import axios from "axios";
import { config } from "dotenv";
import { useEffect } from "react";
import CommentType from "../types/CommentType";
import RecommendationType from "../types/RecommendationType";
import dateFormatter from "../utils/dateFormatter";

config();

const apiBaseURL = process.env.REACT_APP_API_BASE;

interface CommentsProps {
  recommendation: RecommendationType;
  comments: CommentType[];
  setComments: (input: CommentType[]) => void;
}

export function Comments(props: CommentsProps): JSX.Element {
  useEffect(() => {
    getComments(props.setComments, props.recommendation.recommendation_id);
    console.log(props.comments);
    // eslint-disable-next-line
  }, [props.comments, props.recommendation.recommendation_id]);
  return (
    <>
      {props.comments?.map((comment, index) => {
        return <Comment key={index} comment={comment} />;
      })}
    </>
  );
}

interface CommentProps {
  comment: CommentType;
}

function Comment(props: CommentProps): JSX.Element {
  console.log(props.comment);
  return (
    <div className="comment-div">
      <h5>{props.comment.name}</h5>
      <h6>{dateFormatter(props.comment.date)}</h6>
      <p>{props.comment.body}</p>
    </div>
  );
}

// eslint-disable-next-line
export async function getComments(
  setComments: (input: CommentType[]) => void,
  id: number
) {
  const response = await axios.get(`${apiBaseURL}comments/${id}`);
  setComments(response.data.data);
}
