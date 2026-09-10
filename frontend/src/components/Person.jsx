const Person = ( {persons, removePerson} ) => {
  return(
    <>
      {persons.map(person => 
        <li 
          key={person.name}>{person.name} {person.number}
          <button onClick={() => {removePerson(person.id)}}>delete</button>
        </li>
      )}
    </>
  )
}

export default Person