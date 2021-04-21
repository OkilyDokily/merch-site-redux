import React from 'react'
import PropTypes from 'prop-types';

function MerchItem(props) {

  const MerchItemStyle = {
    display: "flex",
    justifyContent: "space-between",
    border: "1px solid",
    borderColor: "#4a71d4",
    marginBottom: "5px",
    padding: "6px"
  }

  const boldLabel = {
    fontWeight:"bold"
  }
  return (
    <div className="merch-item" style={MerchItemStyle} onClick={() => props.showDetailsFunction(props.item)}>
      <div>
        <div style={boldLabel}>Item Name </div>
        <div>{props.item.name}</div>
      </div>
      <div>
        <div style={boldLabel}>Description </div>
        <div>{props.item.description}</div>
      </div>
      <div>
        <div style={boldLabel}>Quantity: {props.item.quantity}</div>
        <div></div>
      </div>
    </div>
  )
}

MerchItem.propTypes = {
  item: PropTypes.object,
  showDetailsFunction:PropTypes.func
}


export default MerchItem;