import Person from "./Person"

const Number = ({personsToSHow, removePerson }) => {
  return(
    <>
      <ul>
        <Person persons = {personsToSHow} removePerson={removePerson}  />
      </ul>
    </>
  )
}

export default Number