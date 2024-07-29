import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PostService from '../API/PostService';
import { useFetching } from '../hooks/useFetching';
import Loader from '../components/UI/Loader/Loader';

const PostIdPage = () => {
  const params = useParams();
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [fetchingPostByID, isLoading, error] = useFetching(async (id) => {
    const response = await PostService.getById(id);
    setPost(response.data);
  });

  const [fetchingComments, isComLoading, comError] = useFetching(async (id) => {
    const response = await PostService.getCommentsByPostId(id)
    setComments(response.data);
  });

  useEffect(() => {
    fetchingPostByID(params.id);
    fetchingComments(params.id)
  }, []);
  return (
    <div>
      <h1>Пользователь попал на страницу поста c ID = {params.id} </h1>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <div>
            {post.id}. {post.title}
          </div>
          <h1>Комментарии</h1>
          {isComLoading
          ?<Loader/>
          : <div>
            {comments.map((com, i)=>
              <div key={i}>
                <h5>{com.email}</h5>
                <div>{com.body}</div>
              </div>
            )}
          </div>
          }
        </div>
      )}
    </div>
  );
};

export default PostIdPage;
