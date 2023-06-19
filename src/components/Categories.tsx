import React from 'react';

type CategoriesProps = {
  categoryId: number;
  onChangeCategory: (i: number) => void;
};

const Categories: React.FC<CategoriesProps> = ({ categoryId, onChangeCategory }) => {
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  return (
    <div className="categories">
      <ul>
        {categories.map((value, i) => (
          <li
            key={value}
            onClick={() => onChangeCategory(i)}
            className={categoryId === i ? 'active' : ''}>
            {value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
