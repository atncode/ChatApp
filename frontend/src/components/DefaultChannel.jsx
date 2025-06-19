const DefaultChannel = ({ name, onClick, classes }) => {
  return (
    <button type="button" onClick={onClick} className={classes}>
      <span className="me-1">#</span>
      {name}
    </button>
  )
}

export default DefaultChannel
