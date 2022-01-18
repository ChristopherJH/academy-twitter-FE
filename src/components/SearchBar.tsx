interface SearchBarProps {
  searchText: string;
  setSearchText: (input: string) => void;
}

export default function SearchBar(props: SearchBarProps): JSX.Element {
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
