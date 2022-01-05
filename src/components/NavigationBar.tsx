import TagType from "../types/TagType";

interface NavigationBarProps {
  searchText: string;
  setSearchText: (input: string) => void;
  tags: TagType[];
  dropDownValue: string;
  setDropDownValue: (input: string) => void;
}

export default function NavigationBar(props: NavigationBarProps): JSX.Element {
  return (
    <div className="navbar">
      <h1>Academy Twitter</h1>
      <SearchBar
        searchText={props.searchText}
        setSearchText={props.setSearchText}
      />
      <TagsDropDown
        tags={props.tags}
        dropDownValue={props.dropDownValue}
        setDropDownValue={props.setDropDownValue}
      />
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
        className="search"
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
        className="form-select form-select-lg mb-3"
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
