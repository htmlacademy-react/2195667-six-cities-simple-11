import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeCity } from '../../store/action';

type Props = {
  cities: string[];
}

function Tabs(props: Props): JSX.Element {
  const { cities } = props;
  const dispatch = useAppDispatch();
  const activeCity = useAppSelector((state) => state.city);

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {cities.map((city) => (
            <li className="locations__item" key={city}>
              <a
                className={`locations__item-link tabs__item ${
                  activeCity === city ? 'tabs__item--active' : ''
                }`}
                href="/"
                onClick={(evt) => {
                  evt.preventDefault();
                  dispatch(changeCity({ city: city }));
                }}
              >
                <span>{city}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default Tabs;
