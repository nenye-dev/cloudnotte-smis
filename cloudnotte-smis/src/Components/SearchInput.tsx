import './SearchInput.css'
type SearchInputProps={
    searchText:string;
    setSearchText:(searchText:string)=>void;
}
function SearchInput({searchText,setSearchText}:SearchInputProps){
            return(
                <input 
                className="search-input"
                type="text"
                placeholder="Enter Student Username"
                value={searchText}
                onChange={(event)=>{setSearchText(event.target.value);}}
                />
            );
        }
        export default SearchInput;