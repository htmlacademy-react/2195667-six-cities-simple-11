import { memo, useState } from 'react';
import { Sort } from '../../const';
import { useAppDispatch } from '../../hooks';
import { changeSorting } from '../../store/action';

type Props = {
  sorting: string;
}

function Filter(props: Props): JSX.Element {
  const { sorting } = props;
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by </span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={() => setIsOpened(true)}
      >
        {sorting}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul
        className={`places__options places__options--custom ${
          isOpened ? 'places__options--opened' : ''
        }`}
        onMouseLeave={() => setIsOpened(false)}
      >
        {(Object.keys(Sort) as Array<keyof typeof Sort>).map((value) => (
          <li
            className={`places__option ${
              sorting === Sort[value] ? 'places__option--active' : ''
            }`}
            tabIndex={0}
            value={Sort[value]}
            key={value}
            onClick={() => {
              setIsOpened(false);
              dispatch(changeSorting({ sorting: Sort[value] }));
            }}
          >
            {Sort[value]}
          </li>
        ))}
      </ul>
    </form>
  );
}


export default memo(
  Filter,
  (prevProps, nextProps) => prevProps.sorting === nextProps.sorting
);
