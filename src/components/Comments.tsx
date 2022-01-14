import axios from "axios";
import { config } from "dotenv";
import { useEffect } from "react";
import CommentType from "../types/CommentType";
import RecommendationType from "../types/RecommendationType";
import UserType from "../types/UserType";
import Comment from "./Comment";

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

// eslint-disable-next-line
export async function getComments(
  setComments: (input: CommentType[]) => void,
  id: number
) {
  const response = await axios.get(`${apiBaseURL}comments/${id}`);
  setComments(response.data.data);
}
