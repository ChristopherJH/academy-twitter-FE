import RecommendationType from "../types/RecommendationType";
import StageType from "../types/StageType";
import TagType from "../types/TagType";
import UserType from "../types/UserType";
import Recommendation from "./Recommendation";
import searchBarFilter from "../utils/filters/searchBarFilter";
import tagsFilter from "../utils/filters/tagsFilter";
import StudyListType from "../types/StudyListType";

interface recommendationListProps {
  recommendations: RecommendationType[];
  tags: TagType[];
  users: UserType[];
  stages: StageType[];
  // comments: CommentType[]
  searchText: string;
  dropDownValue: string;
  signedInUser: UserType;
  setRecommendations: (input: RecommendationType[]) => void;
  studyList: StudyListType[];
  setStudyList: (input: StudyListType[]) => void;
}

export default function Recommendations(
  props: recommendationListProps
): JSX.Element {
  // Filtering recommendations based on search text and tag drop down
  let filteredRecommendations = props.recommendations;
  if (props.searchText) {
    filteredRecommendations = searchBarFilter(
      props.recommendations,
      props.searchText
    );
  }
  if (props.dropDownValue) {
    filteredRecommendations = tagsFilter(
      props.tags,
      props.dropDownValue,
      filteredRecommendations
    );
  }

  return (
    <div id="recommendations-list">
      {filteredRecommendations.map((recommendation) => (
        <Recommendation
          key={recommendation.recommendation_id}
          recommendation={recommendation}
          tags={props.tags}
          stages={props.stages}
          users={props.users}
          signedInUser={props.signedInUser}
          setRecommendations={props.setRecommendations}
          studyList={props.studyList}
          setStudyList={props.setStudyList}
        />
      ))}
    </div>
  );
}
