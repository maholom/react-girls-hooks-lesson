import React, { useState } from 'react';
import { Maybe } from '../components/Maybe';
import { useGetJSON } from '../hooks/useGetJSON';
import { Button } from '../components/Button';
import { Formik, Field, Form } from 'formik';

export function StudentDetail(props) {
  const { student } = props;
  const initials = student.firstName[0] + student.lastName[0];

  const [editMode, setEditMode] = useState(false);

  const { data, loading, refetch } = useGetJSON(
    'http://18.157.77.111/students/' + student.id
  );

  return (
    <div>
      <div className="student-detail-container">
        <div className="student-detail-initials">{initials}</div>
        {editMode ? (
          <Formik
            initialValues={student}
            onSubmit={(values) => {
              fetch('http://18.157.77.111/students/' + student.id, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
              }).then((response) => {
                if (response.ok) {
                  setEditMode(false);
                  refetch();
                }
              });
            }}
          >
            <Form className="flex flex-col gap-1">
              <Field
                name="firstName"
                type="text"
                className="p-2 border-2 border-indigo-600 rounded-md"
              />
              <Field
                name="lastName"
                type="text"
                className="p-2 border-2 border-indigo-600 rounded-md"
              />
              <Field
                name="gender"
                type="text"
                className="p-2 border-2 border-indigo-600 rounded-md"
              />
              <Field
                name="house"
                type="text"
                className="p-2 border-2 border-indigo-600 rounded-md"
              />
              <Field
                name="year"
                type="number"
                className="p-2 border-2 border-indigo-600 rounded-md"
              />
              <button
                type="submit"
                className="p-2 bg-indigo-600 text-white rounded-md"
              >
                Submit
              </button>
            </Form>
          </Formik>
        ) : (
          <h2 className="student-detail-name">
            {student.firstName} {student.lastName}
          </h2>
        )}{' '}
        <p>{student.house}</p>
        <p>{student.year}</p>
        {loading ? (
          <p>Načítám</p>
        ) : (
          <p>
            <Maybe fallback="Chybí popis">{data.description}</Maybe>
          </p>
        )}
        <Button onClick={() => setEditMode(true)}>Upravit</Button>
      </div>
    </div>
  );
}
