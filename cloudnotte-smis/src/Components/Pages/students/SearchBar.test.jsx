import{it,expect,describe,} from 'vitest';
import {render,screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {useState} from 'react';
import SearchBar from './SearchBar';
import StudentTable from './StudentTable'

describe('SearchBar',()=>{
    it('searches a particular student and renders',async ()=>{
       
        const user =userEvent.setup();
        function TestWrapper(){
            const[searchTerm,setSearchTerm]=useState('');
        return(<SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />)
        };
        render(<TestWrapper />)
        const searchInput=screen.getByRole('textbox');
        await user.type(searchInput, 'John');
    
        expect(searchInput).toHaveValue('John');
    });
    it('checks for no student found',async()=>{
     
        render(<StudentTable filteredStudents={[]} students={[
            {id:1, firstName:'John', lastName:'Newman'},
            {id:2, firstName:'Brendan', lastName:'Nwanze'}
        ]}/>
    );
   
    expect(screen.getByText(/no students found/i)).toBeInTheDocument();
    })
});