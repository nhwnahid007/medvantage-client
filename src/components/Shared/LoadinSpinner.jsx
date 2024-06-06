import PropTypes from 'prop-types'
import { GiMedicines } from 'react-icons/gi'


const LoadingSpinner = ({ smallHeight }) => {
  return (
    <div
      className={` ${smallHeight ? 'h-[250px]' : 'h-[70vh]'}
      flex 
      flex-col 
      justify-center 
      items-center 
      animate-spin
      text-7xl
      text-[#7600dc]
      `}
    >
      <GiMedicines />
    </div>
  )
}

LoadingSpinner.propTypes = {
  smallHeight: PropTypes.bool,
}

export default LoadingSpinner