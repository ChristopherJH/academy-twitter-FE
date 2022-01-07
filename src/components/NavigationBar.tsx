import RecommendationType from "../types/RecommendationType";
import StudyListType from "../types/StudyListType";
import TagType from "../types/TagType";
import studyListFilter from "../utils/filters/studyListFilter";

interface NavigationBarProps {
  searchText: string;
  setSearchText: (input: string) => void;
  tags: TagType[];
  dropDownValue: string;
  setDropDownValue: (input: string) => void;
  recommendations: RecommendationType[];
  studyList: StudyListType[];
  setRecommendations: (input: RecommendationType[]) => void;
}

export default function NavigationBar(props: NavigationBarProps): JSX.Element {
  return (
    <div className="navbar row">
      <div className="col-3">
        <SearchBar
          searchText={props.searchText}
          setSearchText={props.setSearchText}
        />
      </div>
      <div className="col-2">
        <TagsDropDown
          tags={props.tags}
          dropDownValue={props.dropDownValue}
          setDropDownValue={props.setDropDownValue}
        />
      </div>
      <div className="offset-4 col-3 text-right">
        <button
          className="btn btn-outline-dark mr-2"
          onClick={() =>
            props.setRecommendations(
              studyListFilter(props.studyList, props.recommendations)
            )
          }
        >
          View study List
        </button>

        <button
          className="btn btn-outline-dark"
          onClick={() => props.setRecommendations(props.recommendations)}
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
        className="search form-control"
        type="text"
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
    <div className="tag-dropdown">
      <select
        className="form-select form-control"
        aria-label="default"
        value={props.dropDownValue}
        onChange={(e) => props.setDropDownValue(e.target.value)}
      >
        <option selected>Filter by tag</option>
        {filteredTagNames.map((name, index) => (
          <option key={index}>{name}</option>
        ))}
      </select>
    </div>
  );
}
