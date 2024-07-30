import { useEffect, useState, useRef } from 'react';
import MyModal from './../components/UI/MyModal/MyModal';
import PostForm from './../components/PostForm';
import PostList from './../components/PostList';
import Pagination from './../components/UI/pagination/Pagination';
import Loader from './../components/UI/Loader/Loader';
import MyButton from '../components/UI/button/MyButton';
import PostFilter from './../components/PostFilter';
import { usePosts } from '../hooks/usePosts';
import { useFetching } from '../hooks/useFetching';
import { getPageCount } from '../utils/pages';
import PostService from './../API/PostService';
import { useObserver } from '../hooks/useObserver';
import MySelect from '../components/UI/select/MySelect';
// nfn - снипет стрелочной функции
// usf - useState

function Posts() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({ sort: '', query: '' });
  const [modal, setModal] = useState(false);
  const sortedAndSearchetPosts = usePosts(posts, filter.sort, filter.query);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const lastElement = useRef();

  const [fetchPosts, isPostLoading, postError] = useFetching(async (limit, page) => {
    const response = await PostService.getAll(limit, page);
    setPosts([...posts, ...response.data]);
    const totalCount = response.headers['x-total-count'];
    setTotalPages(getPageCount(totalCount, limit));
  });

  useObserver(lastElement, page < totalPages, isPostLoading, () => {
    setPage(page + 1);
  });

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false);
  };

  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id));
  };

  useEffect(() => {
    fetchPosts(limit, page);
  }, [page,limit]);

  const changePage = (page) => {
    setPage(page);
  };

  return (
    <div className="App">
      <MyButton style={{ marginTop: 30 }} onClick={() => setModal(true)}>
        Добавить пост
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModal>
      <hr style={{ margin: '15px 0' }} />
      <PostFilter filter={filter} setFilter={setFilter} />
      <MySelect
        value={limit}
        onChange={(value) => setLimit(value)}
        defaultValue={'Количество элементов на странице'}
        options={[
          { value: 5, name: '5' },
          { value: 10, name: '10' },
          { value: 15, name: '15' },
          { value: -1, name: 'показать все посты' },
        ]}
      />
      {postError && <h1>Произошла ошибка {postError}</h1>}
      {isPostLoading && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '180px' }}>
          <Loader />
        </div>
      )}
      <PostList remove={removePost} posts={sortedAndSearchetPosts} title="Посты про JS" />
      <div ref={lastElement} style={{ height: '20px', background: 'red' }}></div>
      {!isPostLoading && <Pagination page={page} changePage={changePage} totalPages={totalPages} />}
    </div>
  );
}

export default Posts;
