import PropTypes from 'prop-types';
import { Ingridient } from './ingridient/ingridient';
import styles from './ingridients.module.css';

export const Ingridients = ({data, type, title}) => {

  return(
    <>
    <h2 className='text text_type_main-medium mb-6'>{title}</h2>
    <ul className={`${styles.List} pl-4 mb-10`}>
      {data.filter(item => item.type === type).map(filteredItem => (
          <Ingridient key={filteredItem._id} data={filteredItem} />
        ))
      }
    </ul>
    </>
  )
}

Ingridients.propTypes = {
  optionalUnion: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  type: PropTypes.string,
  title: PropTypes.string,
}