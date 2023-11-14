import { Ingridient } from './ingridient/ingridient';
import styles from './ingridients.module.css';
import { forwardRef, FC, ForwardedRef } from 'react';
import { useAppSelector  } from '../../../hooks/index';
import { TElementState, TElement } from '../../../utils/types';

interface IProps {
  title: string,
  type: string,
  ref: ForwardedRef<HTMLDivElement>
}

export const Ingridients: FC<IProps> = forwardRef(
  ({title, type}, ref) => {
    const data = useAppSelector(state => state.ingredients.ingredients);  
    return(
      <>
        <h2 ref={ref} className='text text_type_main-medium mb-6'>{title}</h2>
        <ul className={`${styles.List} pl-4 mb-10`}>
          {data.filter((item: TElementState) => item.type === type).map((filteredItem: TElement) => (
              <Ingridient key={filteredItem._id} data={filteredItem} />
            ))
          }
        </ul>
      </>
    )
  }
)
