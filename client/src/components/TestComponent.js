import React, {useEffect, useState} from 'react';
import axios from "axios";


function TestComponent() {

    const [courses, setCourse] = useState('');

    useEffect(() => {
        axios.get('http://localhost:5000/api/courses')
            .then(response => {
                setCourse(response.data);
                console.log(response.data)
            });
    }, []);

    return (
        <div className='Test-Component'>
            <ul>
                {courses.length > 0 ?
                    courses.map(course => (
                        <li key={course.id}>{course.title}</li>
                    ))
                    : null}
            </ul>
        </div>
    );
}


export default TestComponent();