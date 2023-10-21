import PropTypes from 'prop-types';
import { Ingridient } from './ingridient/ingridient';
import styles from './ingridients.module.css';
import { useSelector } from 'react-redux';
import {forwardRef} from 'react';

export const Ingridients = forwardRef(
  ({title, type}, ref) => {
    const data = useSelector(state => state.ingredients.ingredients);  
    return(
      <>
        <h2 ref={ref} className='text text_type_main-medium mb-6'>{title}</h2>
        <ul className={`${styles.List} pl-4 mb-10`}>
          {data.filter(item => item.type === type).map(filteredItem => (
              <Ingridient key={filteredItem._id} data={filteredItem} />
            ))
          }
        </ul>
      </>
    )
  }
)

Ingridients.propTypes = {
  type: PropTypes.string,
  title: PropTypes.string,
}