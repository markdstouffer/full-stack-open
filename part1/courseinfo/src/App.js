import React from 'react'

const Header = (props) => {
      console.log(props)
      return <h1>{props.course.name}</h1>
}

const Part = (props) => {
  console.log(props)
  return (
      <p>{props.name} {props.exercises}</p>
  )
}

const Content = (props) => {
  console.log(props)
  return (
    <>
      <Part name={props.course.parts[0].name} exercises={props.course.parts[0].exercises} />
      <Part name={props.course.parts[1].name} exercises={props.course.parts[1].exercises} />
      <Part name={props.course.parts[2].name} exercises={props.course.parts[2].exercises} />
    </>
  )
}

const Footer = (props) => {
  console.log(props)
  return (
      <p>Number of exercises {props.course.parts[0].exercises + props.course.parts[1].exercises 
        + props.course.parts[2].exercises}</p>
  )
}

const App = () => {
  //#region Variable definitions
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  //#endregion

  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Footer course={course} />
    </div>
  )
}

export default App