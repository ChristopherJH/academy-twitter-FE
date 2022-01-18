import axios from "axios";
import { useEffect } from "react";
import CommentType from "../types/CommentType";
import RecommendationType from "../types/RecommendationType";
import UserType from "../types/UserType";
import Comment from "./Comment";
import { config } from "dotenv";

config();

const apiBaseURL = process.env.REACT_APP_API_BASE;

interface CommentsProps {
  signedInUser: UserType;

  recommendation: RecommendationType;
  comments: CommentType[];
  setComments: (input: CommentType[]) => void;
  setSorciness: (input: number) => void;
}

export function Comments(props: CommentsProps): JSX.Element {
  const { recommendation, setComments } = props;
  useEffect(() => {
    console.log("getComments called");
    getComments(setComments, recommendation.recommendation_id);
  }, [recommendation.recommendation_id, setComments]);

  const upvotes = props.comments.filter((comment) => comment.is_like).length;
  const downvotes = props.comments.filter(
    (comment) => comment.is_dislike
  ).length;
  props.setSorciness(upvotes - downvotes);
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

async function getComments(
  setComments: (input: CommentType[]) => void,
  id: number
): Promise<void> {
  const response = await axios.get(`${apiBaseURL}comments/${id}`);
  setComments(response.data.data);
}

export async function handleDeleteComment(
  comment_id: number,
  recommendation_id: number,
  setComments: (input: CommentType[]) => void
): Promise<void> {
  await axios.delete(
    `${apiBaseURL}${recommendation_id}/comments/${comment_id}`
  );
  getComments(setComments, recommendation_id);
}

export async function postComment(
  endorse: boolean,
  id: number,
  user_id: number,
  commentBody: string,
  setCommentBody: (input: string) => void,
  setComments: (input: CommentType[]) => void,
  setCommentPressed: (input: boolean) => void
): Promise<void> {
  let is_like = false;
  let is_dislike = false;
  if (endorse) {
    is_like = true;
  } else {
    is_dislike = true;
  }
  await axios.post(`${apiBaseURL}comments/${id}`, {
    body: commentBody,
    user_id: user_id,
    is_like: is_like,
    is_dislike: is_dislike,
  });
  setCommentBody("");
  getComments(setComments, id);
  setCommentPressed(false);
}
