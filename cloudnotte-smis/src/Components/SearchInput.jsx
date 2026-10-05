import './SearchInput.css'

function SearchInput({searchText,setSearchText}){
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