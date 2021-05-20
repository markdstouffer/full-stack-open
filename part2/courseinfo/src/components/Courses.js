import React from 'react-dom'

const Header = ({ course }) => {
    return (
      <h1>{course.name}</h1>
    )
  }
  
  const Total = ({ parts }) => {
    var totalEx = parts.reduce((sum, part) => sum+part.exercises, 0)
    return (
      <b>total of {totalEx} exercises</b>
    )
  }
  
  const Part = (props) => {
    return (
      <p>
        {props.part.name} {props.part.exercises}
      </p>    
    )
  }
  
  const Content = ({ parts }) => {
    return (
      <div>
        {parts.map(x => 
          <Part key={x.id} part={x} />
        )}
      </div>
    )
  }
  
  const Course = ({ course }) => {
    return (
      <div>
        <Header course={course}/>
        <Content parts={course.parts}/>
        <Total parts={course.parts}/>
      </div>
    )
  }

const Courses = ({courses}) => {
    return (
      <div>
        {courses.map(x =>
          <Course key={x.id} course={x} />
        )}
      </div>
    )
  }

export default Courses