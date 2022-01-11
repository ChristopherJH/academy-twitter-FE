import RecommendationType from "../types/RecommendationType";
import StudyListType from "../types/StudyListType";
import TagType from "../types/TagType";
import UserType from "../types/UserType";
import studyListFilter from "../utils/filters/studyListFilter";

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
  setStudyListClicked: (input: boolean) => void;
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
        />
      </div>
      <div className="col-3 text-right">
        {props.signedInUser.user_id !== 0 && (
          <button
            className="btn btn-outline-dark mr-2"
            onClick={() => {
              props.setUserStudyList(
                studyListFilter(props.studyList, props.recommendations)
              );

              props.setStudyListClicked(true);
            }}
          >
            View Spell Book 📗
          </button>
        )}

        <button
          className="btn btn-outline-dark"
          id="view-all-button"
          onClick={() => {
            props.setUserStudyList([]);
            props.setDropDownValue("");
            props.setSearchText("");
            props.setStudyListClicked(false);
          }}
        >
          View all
        </button>
      </div>
    </div>
  );
}

interface SearchBarProps {
  searchText: string;
  setSearchText: (input: string) => void;
}

function SearchBar(props: SearchBarProps): JSX.Element {
  return (
    <div className="searchbar">
      <input
        className="search form-control "
        type="text"
        id="searchbar"
        placeholder="Search recommendations"
        name="search"
        value={props.searchText}
        onChange={(e) => props.setSearchText(e.target.value)}
      ></input>
    </div>
  );
}

interface TagsDropDownProps {
  tags: TagType[];
  dropDownValue: string;
  setDropDownValue: (input: string) => void;
}

function TagsDropDown(props: TagsDropDownProps): JSX.Element {
  const tagNamesArray = props.tags.map((tag) => tag.name);
  const filteredTagNames = Array.from(new Set(tagNamesArray));
  return (
    <div className="tag-dropdown" id="tag-dropdown-div">
      <select
        className="form-select form-control"
        aria-label="default"
        id="tag-dropdown-select"
        value={props.dropDownValue}
        onChange={(e) => props.setDropDownValue(e.target.value)}
      >
        <option selected id="tag-dropdown-filter-by-tag">
          Filter by tag
        </option>
        {filteredTagNames.map((name, index) => (
          <option key={index}>{name}</option>
        ))}
      </select>
    </div>
  );
}
