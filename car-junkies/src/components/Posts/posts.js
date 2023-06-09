import Post from '../Post/post';
import CreatePost from '../CreatePost/createPost';
import { AuthContext } from '../../contexts/AuthContext';
import { Button } from '@mui/material';
import { useState, useContext } from 'react';
import styles from './Posts.module.css';


const inputStyles = {
    marginTop: "1em",
    width:'35%',
    marginLeft: 'auto',
    marginRight: 'auto',
    bgcolor: 'primary',
}

const Posts = ({
    posts,
    edit,
    setPosts,
}) => {

    const [showCreatePost, setShowCreatePost] = useState(false);
    const { userId } = useContext(AuthContext);

    const handleToggleAddPost = () => {
        setShowCreatePost(state => !state);
    }

    return (
        <div className = {styles['posts-container']}>
           {userId && <>
                {
                    showCreatePost && <CreatePost setShowCreatePost = {setShowCreatePost} setPosts = {setPosts}/>
                }
                <Button 
                        variant={showCreatePost?"outlined":"contained"} type='button' 
                        sx= {inputStyles}
                        onClick = {handleToggleAddPost}
                    >{showCreatePost?"Cancel":"Add post"}</Button>
            </>}
          
            {posts && posts.length? posts.map(post => { return (
                    <Post key = {post._id} post = {post} edit = {edit} setPosts = {setPosts}/>  ); }) : !userId ?
                    <div>
                        You need to be logged in to post
                        
                    </div>
                    :!edit? <div>
                       There are no posts currently. Be the first to post in this forum.
                    </div> : null
               
            }
        </div>
    )

}

export default Posts;