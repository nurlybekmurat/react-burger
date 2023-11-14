import { useRef, FC } from 'react';
import { useDrop, useDrag, DropTargetMonitor } from 'react-dnd';
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { TElement } from '../../../utils/types';
import styles from './ingredient-item.module.css';

interface IProps {
  data: TElement,
  deleteElement: (() => void) | undefined,
  moveElement: (dragIndex: number, hoverIndex: number) => void,
  index: number,
  id: string
}

interface DragItem {
  index: number;
  id?: string;
  type: string;
  derp?: string;
}

export const IngredientItem: FC <IProps> = ({ data, deleteElement, moveElement, index, id }) => {
  const ref = useRef<HTMLLIElement>(null)
  const [{ handlerId }, drop]: any = useDrop<TElement, void>({
    accept: 'item',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId()
      }
    },
    hover: (item: DragItem, monitor: DropTargetMonitor) => {
      if (!ref.current) {
        return
      }
      const dragIndex: number = item.index;
      const hoverIndex: number = index
      if (dragIndex === hoverIndex) {
        return
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset()!
      const hoverClientY = clientOffset.y - hoverBoundingRect.top
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }
      moveElement(dragIndex, hoverIndex)
      item.index = hoverIndex
    }
  })

  const [{ isDragging }, drag] = useDrag({
    type: 'item',
    item: () => {
      return { id, index }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })
  const opacity = isDragging ? 0 : 1
  drag(drop(ref))

  return (
    <li 
      className={`${styles.IngredientItem}`}
      style={{ opacity }}
      ref={ref}
      id={data.id}
      data-handler-id={handlerId}

    >
      <div className={`${styles.IngredientItemIcon}`}>
        <DragIcon type="primary" />
      </div>
      <ConstructorElement
        text={data.name}
        price={data.price}
        thumbnail={data.image_mobile}
        handleClose={deleteElement}
      />
    </li>
  );
}
