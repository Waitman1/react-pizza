import React from 'react';
import Categories from '../components/Categories';
import Sort, { sortName } from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';

import { useSelector } from 'react-redux';
import {
  selectSortFilter,
  setCategoryId,
  setCurrentPage,
  setFilters,
} from '../redux/slices/filterSlice';
import { SearchPizzaParams, fetchPizzas, selectPizzaItems } from '../redux/slices/pizzaSlice';

import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../redux/store';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const { categoryId, sortType, currentPage, searchValue } = useSelector(selectSortFilter);
  const { items, status } = useSelector(selectPizzaItems);

  const onChangeCategory = (id: number) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams;
      const sort = sortName.find((obj) => obj.sortProperty === params.sortBy);

      dispatch(
        setFilters({
          searchValue: params.search,
          categoryId: Number(params.category),
          currentPage: Number(params.currentPage),
          sortType: sort || sortName[0],
        }),
      );
      // isSearch.current = true;
    }
  }, []);

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sortType.sortProperty,
        categoryId,
        currentPage,
      });

      navigate(`/?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sortType.sortProperty, searchValue, currentPage]);

  React.useEffect(() => {
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      getPizzas();
    }
    isSearch.current = false;
  }, [categoryId, sortType.sortProperty, searchValue, currentPage]);

  const getPizzas = async () => {
    const sortBy = sortType.sortProperty.replace('-', '');
    const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    dispatch(
      fetchPizzas({
        sortBy,
        order,
        category,
        search,
        currentPage: String(currentPage),
      }),
    );
  };

  return (
    <>
      <div className="container">
        <div className="content__top">
          <Categories categoryId={categoryId} onChangeCategory={onChangeCategory} />
          <Sort />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        {status === 'error' ? (
          <div>
            <h2>Произошла ошибка</h2>
            <p>Не удалось получить пиццы</p>
          </div>
        ) : (
          <div className="content__items">
            {status === 'loading'
              ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
              : items.map((obj: any) => <PizzaBlock key={obj.key} {...obj} />)}
          </div>
        )}

        <Pagination currentPage={currentPage} onChangePage={onChangePage} />
      </div>
    </>
  );
};

export default Home;
