import React, { useState } from 'react';
import './styles/App.css';
import PostList from './components/PostList';
import PostForm from './components/PostForm';
import MySelect from './components/UI/select/MySelect';
import MyInput from './components/UI/input/MyInput';

// nfn - снипет стрелочной функции
// usf - useState

function App() {
  const [posts, setPosts] = useState([
    { id: 1, title: '', body: 'Description' },
    { id: 2, title: 'Javascript 2', body: 'Description' },
    { id: 3, title: 'Javascript 3', body: 'Description' },
  ]);

  const [selectedSort, setSelectedSort] = useState(''); // По чем сортируем Заголовок(title) или Описание(body)
  const [searchQuery, setSearchQuery] = useState(''); // Состояние для поиска

  function getSortedPost() {
    console.log('ОТРАБОТАЛА ФУНКЦИЯ СОРТЕД ПОСТ')
    if (selectedSort) {
      return [...posts].sort((a, b) => a[selectedSort].localeCompare(b[selectedSort])) // Механизм сортировки постов 
    }
    return posts

  } // т.к selectedSort по умолчанию эта пустая строка наша проверка не отработает и выдаст ошибку
  // т.к функция localCompare вызывается у несуществуещего поля и мы получаем undefind
  // для этого создается эта функция



  const sortedPost = getSortedPost()


  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
  };

  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id));
  };

  const sortPosts = (sort) => {
    setSelectedSort(sort);
  };

  return (
    <div className="App">
      <PostForm create={createPost} />
      <hr style={{ margin: '15px 0' }} />
      <div>
        <MyInput
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Поиск"
        />
        <MySelect
          value={selectedSort}
          onChange={sortPosts}
          defaultValue="Сортировка"
          options={[
            { value: 'title', name: 'По названию' },
            { value: 'body', name: 'По описанию' },
          ]}
        />
      </div>
      {posts.length !== 0 ? (
        <PostList remove={removePost} posts={sortedPost} title="Посты про JS" />
      ) : (
        <h1 style={{ textAlign: 'center', marginTop: '60px' }}>Посты не были найдены</h1>
      )}
    </div>
  );
}

export default App;
