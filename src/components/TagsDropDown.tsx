import TagType from "../types/TagType";

interface TagsDropDownProps {
  tags: TagType[];
  dropDownValue: string;
  setDropDownValue: (input: string) => void;
  setDropDownArray: (input: string[]) => void;
  dropDownArray: string[];
}

export default function TagsDropDown(props: TagsDropDownProps): JSX.Element {
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
          if (e.target.value !== "Filter by tag") {
            props.setDropDownArray([...props.dropDownArray, e.target.value]);
          }
          props.setDropDownValue("Filter by tag");
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
