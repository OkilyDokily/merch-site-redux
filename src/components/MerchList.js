import React from 'react'
import MerchItem from './MerchItem'
import PropTypes from 'prop-types';

function MerchList(props) {
  const merchListStyle = {

    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    marginBottom: "5px",
    minHeight: "70vh",
    width: "400px"
  }
  return (
    <div style={merchListStyle}>
      <h3>Store Inventory</h3>


      {Object.keys(props.merchList).map((key) => {
        return <MerchItem item={props.merchList[key]} key={key} showDetailsFunction={props.onShowDetails} />
      })}
    </div>
  )
}

MerchList.propTypes = {
  merchList: PropTypes.object,
  onShowDetails: PropTypes.func
}


export default MerchList;