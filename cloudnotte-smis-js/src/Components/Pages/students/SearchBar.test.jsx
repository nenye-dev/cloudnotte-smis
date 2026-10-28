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
    });
    it ('filters students based on the search input',async()=>{
        const user = userEvent.setup();

    const mockStudents = [
       {
        id: 1,
        firstName: 'John',
        lastName: 'Newman',
        email: 'john@example.com',
        age: 20,
        gender: 'male',
        phone: '08012345678',
        image: 'https://example.com/john.jpg',
        address: {
            city: 'Lagos',
            address: 'Ikeja'
        }
    },
    {
        id: 2,
        firstName: 'Brendan',
        lastName: 'Nwanze',
        email: 'brendan@example.com',
        age: 21,
        gender: 'male',
        phone: '08087654321',
        image: 'https://example.com/brendan.jpg',
        address: {
            city: 'Abuja',
            address: 'Garki'
        }
    }
    ];

    function TestWrapper() {
        const [searchTerm, setSearchTerm] = useState('');

        const filteredStudents = mockStudents.filter((student) =>
            `${student.firstName} ${student.lastName}`
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
        );

        return (
            <>
                <SearchBar
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                />

                <StudentTable
                    students={mockStudents}
                    filteredStudents={filteredStudents}
                />
            </>
        );
    }

    render(<TestWrapper />);

    const searchInput = screen.getByRole('textbox');

    await user.type(searchInput, 'John');

    expect(screen.getByText(/Newman\s+John/)).toBeInTheDocument();
    expect(screen.queryByText(/Brendan\s+Nwanze/)).not.toBeInTheDocument();
    })
});