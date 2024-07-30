import { useEffect, useState } from 'react';
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

  const [fetchPosts, isPostLoading, postError] = useFetching(async (limit, page) => {
    const response = await PostService.getAll(limit, page);
    setPosts([...posts, ...response.data]);
    const totalCount = response.headers['x-total-count'];
    setTotalPages(getPageCount(totalCount, limit));
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
  }, [page]);

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
      {postError && <h1>Произошла ошибка {postError}</h1>}
      {isPostLoading && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '180px' }}>
          <Loader />
        </div>
      )}
      <PostList remove={removePost} posts={sortedAndSearchetPosts} title="Посты про JS" />

      {!isPostLoading && <Pagination page={page} changePage={changePage} totalPages={totalPages} />}
    </div>
  );
}

export default Posts;
