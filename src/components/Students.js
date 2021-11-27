import React from 'react';
import { useGetJSON } from '../hooks/useGetJSON';
import Student from './Student';

const Students = (props) => {
  const { data, loading } = useGetJSON('http://18.157.77.111/students');

  if (loading) {
    return <div>Načítám...</div>;
  }

  return (
    <ul>
      {data.map((student) => {
        const isThisFemale = student.gender === 'F';
        const initials = `${student.firstName.charAt(
          0
        )}${student.lastName.charAt(0)}`;

        return (
          <Student
            key={student.id}
            isThisFemale={isThisFemale}
            firstName={student.firstName}
            lastName={student.lastName}
            house={student.house}
            initials={initials}
            onClick={() => {
              props.onStudentClick(student);
            }}
          />
        );
      })}
    </ul>
  );
};

export default Students;
