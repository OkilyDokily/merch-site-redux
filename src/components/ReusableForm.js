import React from 'react'
import { v4 } from 'uuid'
import PropTypes from 'prop-types';

function ReusableForm(props) {
  function Submit(e) {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const description = document.getElementById("description").value;
    const quantity = parseInt(document.getElementById("quantity").value);
    const obj = { name, description, quantity }
    const obj2 = props.edit ? { id: props.details.id, ...obj } : { id: v4(), ...obj };
    props.reusableFormFunction(obj2);
  }

  const ReusableFormStyle = {

    width: "269px",
    // minHeight: "70vh",
    marginBottom: "19px",
  }

  const ReusableFormInputStyle = {
    border: "2px solid #5c7fd6",
    borderRadius: "4px",
    height: "25px"
  }

  const ReusableFormInnerDivsStyle = {
    marginBottom: "4px",
    display: "flex",
    justifyContent: "space-between"
  }

  const ReusableFormLabelStyle = {
    paddingRight: "8px",
    fontSize: "24px"


  }
  return (

    <div id="reusable-form" style={ReusableFormStyle}>
      <form>
        <div style={ReusableFormInnerDivsStyle}>
          <label style={ReusableFormLabelStyle}>Name:</label>
          <input style={ReusableFormInputStyle} id="name" type="text" defaultValue={props.edit ? props.details.name : ""} required/>
        </div>

        <div style={ReusableFormInnerDivsStyle}>
          <label style={ReusableFormLabelStyle}>Description:</label>
          <input style={ReusableFormInputStyle} id="description" type="text" defaultValue={props.edit ? props.details.description : ""} required />
        </div>

        <div style={ReusableFormInnerDivsStyle}>
          <label style={ReusableFormLabelStyle}>Quantity:</label>
          <input style={ReusableFormInputStyle} id="quantity" min="1" type="number" defaultValue={props.edit ? props.details.quantity : "1"} required />
        </div>

        <input type="submit" onClick={Submit} value={props.edit ? "edit" : "submit"} />
      </form>
     
    </div>
  )
}

ReusableForm.propTypes = {
  edit: PropTypes.bool,
  details:PropTypes.object,
  reusableFormFunction: PropTypes.func
}

export default ReusableForm;