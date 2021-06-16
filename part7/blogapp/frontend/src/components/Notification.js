import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  if (notification !== null && notification.notification !== null) {
    const style = notification.sec === 'bad'
      ? {
        border: 'solid',
        padding: 10,
        borderWidth: 1,
        color: 'red'
      }
      : {
        border: 'solid',
        padding: 10,
        borderWidth: 1,
        color: 'green'
      }

    return (
      <div style={style}>
        {notification.notification}
      </div>
    )
  }
  return null
}

export default Notification
