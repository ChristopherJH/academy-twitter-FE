import RecommendationType from "../types/RecommendationType";
import StudyListType from "../types/StudyListType";
import TagType from "../types/TagType";
import UserType from "../types/UserType";
import deleteTag from "../utils/deleteTag";
import studyListFilter from "../utils/filters/studyListFilter";
import SearchBar from "./SearchBar";
import TagsDropDown from "./TagsDropDown";

interface NavigationBarProps {
  searchText: string;
  setSearchText: (input: string) => void;
  tags: TagType[];
  dropDownValue: string;
  setDropDownValue: (input: string) => void;
  recommendations: RecommendationType[];
  studyList: StudyListType[];
  setUserStudyList: (input: RecommendationType[]) => void;
  signedInUser: UserType;
  studyListClicked: boolean;
  setStudyListClicked: (input: boolean) => void;
  setDropDownArray: (input: string[]) => void;
  dropDownArray: string[];
}

export default function NavigationBar(props: NavigationBarProps): JSX.Element {
  return (
    <div className="navbar row">
      <div className="col-7">
        <SearchBar
          searchText={props.searchText}
          setSearchText={props.setSearchText}
        />
      </div>
      <div className="col-2 text-left">
        <TagsDropDown
          tags={props.tags}
          dropDownValue={props.dropDownValue}
          setDropDownValue={props.setDropDownValue}
          setDropDownArray={props.setDropDownArray}
          dropDownArray={props.dropDownArray}
        />
      </div>

      <div className="col-3 text-right">
        {props.signedInUser.user_id !== 0 && !props.studyListClicked && (
          <button
            className="btn btn-outline-dark mr-2"
            id="view-study-list-button"
            onClick={() => {
              props.setUserStudyList(
                studyListFilter(props.studyList, props.recommendations)
              );

              props.setStudyListClicked(true);
            }}
          >
            Study List 📗
          </button>
        )}

        <button
          className="btn btn-outline-dark"
          id="view-all-button"
          onClick={() => {
            props.setUserStudyList([]);
            props.setDropDownValue("Filter by tag");
            props.setDropDownArray([]);
            props.setSearchText("");
            props.setStudyListClicked(false);
          }}
        >
          View all
        </button>
      </div>
      <div className="row">
        {props.dropDownArray.length > 0 && (
          <p className="ml-5 mr-2 selected-tags">Selected tags:</p>
        )}

        {Array.from(new Set(props.dropDownArray)).map((tag, index) => (
          <button
            className="btn btn-custom"
            key={index}
            onClick={(e) => {
              e.preventDefault();
              props.setDropDownArray([...deleteTag(props.dropDownArray, tag)]);
            }}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
}
