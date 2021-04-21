import CartCount from './CartCount'
import PropTypes from 'prop-types';

function Header(props)
{
  const headerObj = {
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-between",
    fontSize: "25px",
    fontFamily: "OldFashion"
  }
  return(
  <div style={headerObj}>
    <div>Welcome to Ye Olde General Store (Now Online!)</div>
    <CartCount count={props.count}/>
  </div>
  )
}

Header.propTypes = {

  count: PropTypes.number,
  
}


export default Header;