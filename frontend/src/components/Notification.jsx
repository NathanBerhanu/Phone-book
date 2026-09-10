const Notification = ({message}) => {
  const notifStyle = {
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  if (!message) return null
  return (
    <div style={notifStyle}>
      {message}
    </div>
  )
}


export default Notification