import React, { useMemo, useState } from 'react';
import './styles/App.css';
import PostList from './components/PostList';
import PostForm from './components/PostForm';
import PostFilter from './components/PostFilter';

// nfn - снипет стрелочной функции
// usf - useState

function App() {
  const [posts, setPosts] = useState([
    { id: 1, title: 'Python', body: 'Description' },
    { id: 2, title: 'Javascript 2', body: 'Description' },
    { id: 3, title: 'Javascript 3', body: 'Description' },
  ]);

  const [filter, setFilter] = useState({ sort: '', query: '' });

  const sortedPosts = useMemo(() => {
    if (filter.sort) {
      return [...posts].sort((a, b) => a[filter.sort].localeCompare(b[filter.sort])); // Механизм сортировки постов
    }
    return posts;

    // т.к selectedSort по умолчанию эта пустая строка наша проверка не отработает и выдаст ошибку
    // т.к функция localCompare вызывается у несуществуещего поля и мы получаем undefind
    // для этого создается эта проверка
  }, [filter.sort, posts]);

  const sortedAndSearchetPosts = useMemo(() => {
    return sortedPosts.filter((post) => post.title.toLocaleLowerCase().includes(filter.query));
  }, [filter.query, sortedPosts]);

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
  };

  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id));
  };

  return (
    <div className="App">
      <PostForm create={createPost} />
      <hr style={{ margin: '15px 0' }} />
      <PostFilter filter={filter} setFilter={setFilter} />
      {sortedAndSearchetPosts.length ? (
        <PostList remove={removePost} posts={sortedAndSearchetPosts} title="Посты про JS" />
      ) : (
        <h1 style={{ textAlign: 'center', marginTop: '60px' }}>Посты не были найдены</h1>
      )}
    </div>
  );
}

export default App;
