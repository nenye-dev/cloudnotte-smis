import {useState} from 'react'
import {
    Diff,
    BookA,
    UserGroup,
    Sigma,
    Germ,
    FlaskConical,
    Radiation,
    Landmark,
    BookOpenText,
    Handshake,
    UtensilsCrossed,
    Tractor,
    Church,
    Wrench,
    MirrorRound,
    Percent,
    ChartNoAxesCombined,
    Trees,
    Music,
    Banknote
} from 'lucide-react'
import './CoursesPage.css'


function CoursesPage(){
       const [selectedGroup,setSelectedGroup]=useState(null)
       const [selectedGroupName,setSelectedGroupName]=useState('')
       const [selectedGroupDescription,setSelectedGroupDescription]=useState('')      
            const courses=[
                {
                    className:'mathematics',
                    icon:Diff,
                    name:'Mathematics',
                    description:'The study of numbers, calculations, shapes, patterns, and how to solve problems using logical thinking.'
                
                },
                 {
                    className:'english',
                    icon:BookA, 
                    name:'English',
                    description:'The study of reading, writing, speaking, grammar, vocabulary, and effective communication.'
                   
                },
                 {
                    className:'civic',
                    icon:UserGroup,
                    name:'Civic Education',
                    description:'The study of citizens rights, responsibilities, values, and how people can contribute positively to society.'          
                },
                 {
                     className:'further-mathematics',
                     icon:Sigma, 
                     name:'Further Mathematics',
                    description:'An advanced study of mathematics that covers topics such as algebra, calculus, statistics, and complex problem-solving.'
                    
                },
                 {
                     className:'biology',
                     icon:Germ ,
                     name:'Biology',
                     description:'The study of living things, including humans, animals, plants, and how their bodies and environments work.'                  
                },
                 {
                    className:'chemistry',
                    icon:FlaskConical, 
                    name:'Chemistry',
                    description:'The study of substances, their properties, how they interact, and the changes they undergo.'
                    
                },
                 {
                     className:'physics',
                     icon:Radiation,
                     name:'Physics',
                     description:'The study of matter, energy, forces, motion, electricity, and how things work in the physical world.'
                    
                },
                 {
                     className:'government',
                     icon:Landmark,
                     name:'Government',
                    description:'The study of how governments work, political systems, leadership, laws, and the relationship between citizens and the state.'
                    
                },
                 {
                    className:'literature',
                    icon:BookOpenText,
                    name:'Literature',
                    description :'The study of stories, poems, plays, and other written works to understand their meaning, themes, and characters.'
                    
                },
                 {
                     className:'sociology',
                     icon:Handshake, 
                     name:'Sociology',
                     description: 'The study of society, human relationships, social behaviour, and how people interact with one another.'
                   
                },
                 {
                     className:'food',
                     icon:UtensilsCrossed,
                     name:'Food and Nutrition',
                     description:'The study of food, healthy eating, meal planning, cooking, and how nutrients affect the body.'
                    
                },
                 {
                    className:'agriculture',
                    icon:Tractor,
                    name: 'Agricultural Science',
                    description:'The study of farming, crops, animals, soil, and agricultural practices used to produce food and other useful products.'
                   
                },
                 {
                     className:'crs',
                     icon:Church, 
                     name:'CRS',
                     description:'The study of Christian beliefs, teachings, values, the Bible, and how they relate to everyday life.'
                    
                },
                 {
                     className:'technical',
                     icon:Wrench ,
                     name:'Technical Drawing',
                     description:'The study of how to create accurate drawings and plans used in engineering, construction, design, and other technical fields.'
                   
                },
                 {
                     className:'cosmetology',
                     icon:MirrorRound,
                     name:'Cosmetology',
                     description:'The study and practice of beauty care, including hair, skincare, makeup, nails, and personal grooming.'
                    
                },
                 {
                     className:'marketing',
                     icon:Percent,
                     name:'Marketing',
                     description:'The study of how businesses promote, sell, and deliver products or services to customers.'
                 
                },
                 {
                     className:'economics',
                     icon:ChartNoAxesCombined,
                     name:'Economics',
                     description:'The study of how people, businesses, and governments make decisions about limited resources, money, production, and consumption.'
                    
                },
                 {
                    className:'geography',
                    icon:Trees, 
                    name:'Geography',
                    description:'The study of the Earth, its physical features, people, places, climate, and how humans interact with their environment.'
                    
                },
                 {
                    className:'music',
                    icon:Music ,
                    name:'Music',
                    description:'The study of sounds, rhythm, melody, instruments, singing, musical performance, and music creation.'
                    
                },
                 {
                    className:'accounting',
                    icon:Banknote,
                    name:'Accounting',
                    description:'The study of how money and financial transactions are recorded, organized, analyzed, and reported.'
                    
                },
            

            ]
            console.log(courses)
            
           const juniorCourses=[
            'Mathematics',
            'English',
            'Civic Education',
            'Agricultural Science',
            'Music',
            'Geography',
            'CRS',
            'Accounting',
            'Literature',
            'Sociology',
           ]
           const seniorCourses=[
            'Mathematics',
            'English',
            'Civic Education',
            'Further Mathematics',
            'Biology',
            'Chemistry',
            'Physics',
            'Marketing',
            'Cosmetology',
            'Government',
            'Literature',
            'Sociology',
            'Food and Nutrition',
            'Technical Drawing',
            'Economics',
            'Accounting'
           ]
           console.log(juniorCourses)
           console.log(seniorCourses)
           const bothCourses=juniorCourses.filter(course=>
            seniorCourses.includes(course)
           )
           const juniorOnlyCourses=juniorCourses.filter(course=>
            !seniorCourses.includes(course)
           )
           const seniorOnlyCourses=seniorCourses.filter(course=>
            !juniorCourses.includes(course)
           )
         console.log(bothCourses)
         if (selectedGroup){
                const selectedCourses=courses.filter(course=>
                    selectedGroup.includes(course.name)
                )
                return (
                    <>
                     
                     <main className="courses-page">
                        <button className="back-button"
                         onClick={()=>setSelectedGroup(null)}
                        >
                            ← Back to Courses
                        </button>
                        <div className="course-heading">
                            <div>
                                <h1>{selectedGroupName} Courses</h1>
                                <p className="courses-subtitle">{selectedGroupDescription}</p>
                            </div>
                            <div className="course-count">
                                <span>{selectedCourses.length} Courses</span>
                            </div>
                        </div>
                        <div className="courses-container">
                            {selectedCourses.map((course)=>{
                            const Icon=course.icon
                            return(
                                <div className={`course-card ${course.className}`} key={course.name}>
                                    <div className="course-icon">
                                        <Icon />
                                    </div>
                                    <div className="course-content">
                                        <h3>{course.name}</h3>
                                        <p>{course.description}</p>
                                    </div>
                                </div>
                        )
                        })}
                        </div>
                     </main>
                    </>
                )
            }
    return(
    <>
        
        <main className="courses-page">
            <div className="course-heading">
                <div>
                    <h1>Courses Offered</h1>
                    <p className="courses-subtitle">
                        Explore the subjects available to our students.
                    </p>
                </div>
                <div className="course-count">
                    <span>{courses.length} Courses</span>
                </div>
            </div>
            <div className='courses-venn'>
                <div className="course-group junior-group">
                    <div className="group-heading">
                        <span className="group-number">01</span>
                        <h2>Junior Courses</h2>
                    </div>
                        <div className="group-course-list">
                            {juniorOnlyCourses.map((course)=>(
                                <span key={course}>{course}</span>
                            ))}
                        </div>
                        <button 
                        onClick={()=>{
                        setSelectedGroup([
                            ...juniorOnlyCourses,
                           ])
                            setSelectedGroupName('Junior')
                            setSelectedGroupDescription(
                                'These are th courses strictly for junior students.'
                            )
                        }}
                        >
                         Learn more
                        </button>
                </div>
                
                <div className="course-group both-group">
                    <div className="group-heading">
                        <span className="group-number">02</span>
                        <h2>Both</h2>
                    </div>
                    <p className="group-description">
                        courses available to both junior and senior students.
                    </p>
                    <div className="group-course-list">
                        {bothCourses.map((course)=>(
                            <span key={course}>{course}</span>
                        ))}
                    </div>
                    <button 
                        onClick={()=>{
                        setSelectedGroup([
                            ...bothCourses])
                            setSelectedGroupName('Junior and Senior')
                            setSelectedGroupDescription(
                                'These are courses for both junior and senior students.'
                            )
                        }}
                        >
                            Learn more
                        </button>
                </div>
                <div className="course-group senior-group">
                    <div className="group-heading">
                        <span className="group-number">03</span>
                        <h2>Senior Courses</h2>
                    </div>
                    <div className="group-course-list">
                            {seniorOnlyCourses.map((course)=>(
                                <span key={course}>{course}</span>
                            ))}
                        </div>
                        <button 
                        onClick={()=>{
                        setSelectedGroup([
                            ...seniorOnlyCourses,
                            ])
                            setSelectedGroupName('Senior')
                            setSelectedGroupDescription(
                                'These are courses strictly for senior students.'
                            )
                        }}
                        >
                            Learn more
                        </button>
                    </div>
                
                
            </div>
        </main>
      
    </>
    )
}
export default CoursesPage