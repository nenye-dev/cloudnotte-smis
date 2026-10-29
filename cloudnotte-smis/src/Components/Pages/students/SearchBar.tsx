import type {Dispatch,SetStateAction} from 'react';

type SearchBarProps={
  searchTerm:string;
  setSearchTerm:Dispatch<SetStateAction<string>>;
}

function SearchBar({searchTerm,setSearchTerm}:SearchBarProps){
    return(
        <div className="search-bar">
        <input
          type="text"
          placeholder="Search students by name"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
      </div>
    )
}
export default SearchBar