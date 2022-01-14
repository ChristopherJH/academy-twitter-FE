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
  studyListClicked: boolean;
  setStudyListClicked: (input: boolean) => void;
  setDropdownArray: (input: string[]) => void;
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
          setDropdownArray={props.setDropdownArray}
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
            props.setDropDownValue("");
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

        {Array.from(new Set(props.dropDownArray)).map((el, index) => (
          <button className="btn btn-custom" key={index}>
            {el}
          </button>
        ))}
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
  setDropdownArray: (input: string[]) => void;
  dropDownArray: string[];
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
        onChange={(e) => {
          props.setDropDownValue(e.target.value);
          props.setDropdownArray([...props.dropDownArray, e.target.value]);
        }}
      >
        <option id="tag-dropdown-filter-by-tag">Filter by tag</option>
        {filteredTagNames.map((name, index) => (
          <option key={index}>{name}</option>
        ))}
      </select>
    </div>
  );
}
