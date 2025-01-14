import React from "react";
import "./list.scss";
import Card from "../card/Card";
import useFetch from "../../hooks/useFetch";

const List = ({ sort, maxPrice, subCats, catId }) => {
  const { data, loading, error } = useFetch(`/products?populate=*&[filters][categories][id]=${catId}${subCats?.map((item) => `&[filters][sub_categories][id][$eq]=${item}`)}`
  );
  // &[filters][price][$lte]=${maxPrice}&sort=price:${sort}
  return (
    <div className="list">
      {error
        ? "Something wrong!"
        : loading
        ? "Loading..."
        : data && data?.map((item) => <Card item={item} key={item?.id} />)}
    </div>
  );
};

export default List;
