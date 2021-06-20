import React from 'react'
import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  if (notification !== null && notification.notification !== null) {
    const style = notification.sec === 'bad' ? 'danger' : 'success'

    return (
      <Alert className="Noti" variant={style}>
        {notification.notification}
      </Alert>
    )
  }
  return null
}

export default Notification
