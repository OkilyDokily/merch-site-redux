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
      {props.merchList.map((item, index) => {
        return <MerchItem item={item} key={item.id} showDetailsFunction={props.onShowDetails} />
      })}
    </div>
  )
}

MerchItem.propTypes = {
  merchList: PropTypes.arrayOf(PropTypes.object),
  onShowDetails: PropTypes.func
}


export default MerchList;