// import CommentType from "../types/CommentType";
import RecommendationType from "../types/RecommendationType";
import StageType from "../types/StageType";
import TagType from "../types/TagType";
import UserType from "../types/UserType";

interface recommendationProps {
  recommendation: RecommendationType;
  tags: TagType[];
  // user: UserType
  // stages: StageType[]
  // comments: CommentType[]
}

export default function Recommendation(
  props: recommendationProps
): JSX.Element {
  const found = props.tags.filter(
    (element) =>
      element.recommendation_id === props.recommendation.recommendation_id
  );

  return (
    <>
      <h1>{props.recommendation.title && props.recommendation.title}</h1>
      <p>{props.recommendation.author && props.recommendation.author}</p>
      <p>{props.recommendation.content}</p>
      <p>{props.recommendation.time}</p>
      {found.map((tag) => (
        <p key={tag.tag_id}>{tag.name}</p>
      ))}
      <p>{props.recommendation.description}</p>
      <a href={props.recommendation.url}>Click me!</a>
      <p>{props.recommendation.recommended_description}</p>
      <p>{props.recommendation.recommended}</p>
      <p>{props.recommendation.likes}</p>
      <p>{props.recommendation.dislikes}</p>
    </>
  );
}
