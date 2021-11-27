import React, { useState } from 'react';
import { Home } from './pages/Home.jsx';
import { StudentDetail } from './pages/StudentDetail.jsx';
import Button from './components/Button.js';
import examsImage from './exams.svg';

const App = () => {
  const [selectedStudent, setSelectedStudent] = useState(null);
  return (
    <>
      <div className="app">
        <img src={examsImage} alt="exams" />
        <main>
          {selectedStudent ? (
            <>
              <Button onClick={() => setSelectedStudent(null)}>Zpět</Button>
              <StudentDetail student={selectedStudent} />
            </>
          ) : (
            <Home onStudentClick={(student) => setSelectedStudent(student)} />
          )}
        </main>
      </div>
    </>
  );
};

export default App;
