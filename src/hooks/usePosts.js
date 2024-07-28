import { useMemo } from "react";

export const useSortedPosts = (posts, sort) => {
  const sortedPosts = useMemo(() => {
    if (sort) {
      return [...posts].sort((a, b) => a[sort].localeCompare(b[sort])); // Механизм сортировки постов
    }
    return posts;

    // т.к selectedSort по умолчанию эта пустая строка наша проверка не отработает и выдаст ошибку
    // т.к функция localCompare вызывается у несуществуещего поля и мы получаем undefind
    // для этого создается эта проверка
  }, [sort, posts]);

  return sortedPosts;
};

export const usePosts = (posts, sort, query) => {
    const sortedPosts = useSortedPosts(posts,sort)

  const sortedAndSearchetPosts = useMemo(() => {
    return sortedPosts.filter((post) => post.title.toLocaleLowerCase().includes(query));
  }, [query, sortedPosts]);

  return sortedAndSearchetPosts
};
