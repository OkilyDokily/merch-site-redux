import React from 'react';
import ReusableForm from './ReusableForm';
import PropTypes from 'prop-types';

function EditMerch(props)
{
  return (
    <div>
      <ReusableForm details={props.details} edit={true} reusableFormFunction={props.onEditMerch}/>
    </div>
  )
}

EditMerch.propTypes = {

  details:PropTypes.object,
  reusableFormFunction: PropTypes.func,

}


export default EditMerch;

