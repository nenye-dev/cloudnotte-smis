function SearchBar({searchTerm,setSearchTerm}){
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