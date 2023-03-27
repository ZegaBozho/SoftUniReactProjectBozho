import { useState, useEffect, useContext } from "react";
import Posts from "../Posts/posts";
import styles from '../Home/Home.module.css'
import { AuthContext } from '../../contexts/AuthContext';
import { postsServiceFactory } from '../../services/postsService';
import { useService } from '../../hooks/useService';

const MyPosts = () => {
    const [posts, setPosts] = useState([]);
    const { userId } = useContext(AuthContext);
    const postService = useService(postsServiceFactory);


    useEffect( () => {
        postService.getMyPosts(userId).then( result => {
            setPosts(result);
        })
    }, []);

    
    return (
        <div className = {styles['home-container']}>
            <h2>My posts</h2>
            {
                <Posts posts = {posts} edit = {true} setPosts = {setPosts}/>
            }
        </div>
    )
}

export default MyPosts;