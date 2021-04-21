import ReusableForm from './ReusableForm';


function AddMerchForm(props) {
  const AddMerchFormStyle = {
    marginTop: "200px"
  }
  return (
    <div style={AddMerchFormStyle}>
      <ReusableForm reusableFormFunction={props.onAddMerch} />
    </div>
  )
}

export default AddMerchForm;