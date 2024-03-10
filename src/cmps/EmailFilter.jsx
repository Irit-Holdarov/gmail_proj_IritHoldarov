import { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";

export function EmailFilter({ filterBy, onSetFilter }) {
  const [filterByToEdit, setFilterByToEdit] = useState(filterBy)


  // useEffect = (()=>{
  //   onSetFilter(filterByToEdit)    
  // },[filterByToEdit])


  function handleChange(ev) {
    let { value, name: field } = ev.target // ev.target.value  ev.target.name
    setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
  }




  return (
    <form className="email-filter">
      <label htmlFor="search"></label>
      <IoSearch className="search-icon" />
      <input
        id="search"
        name="txt"
        placeholder="Search mail"
        type="text"
        value={filterByToEdit.txt}
        onChange={handleChange} />


      <label >
        <select className="isRead-select"

          name="isRead"
          value={'' + filterByToEdit.isRead}
          onChange={handleChange}>
            
          <option value={'null'}>All</option>
          <option value={'true'}>Read</option>
          <option value={'false'}>Unread</option>
        </select>
      </label>

    </form>
  )
}