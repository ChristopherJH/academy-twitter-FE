interface NavigationBarProps {
  searchText: string;
  setSearchText: (input: string) => void;
}

export default function NavigationBar(props: NavigationBarProps): JSX.Element {
  return (
    <div className="navbar">
      <h1>Academy Twitter</h1>
      <SearchBar
        searchText={props.searchText}
        setSearchText={props.setSearchText}
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
