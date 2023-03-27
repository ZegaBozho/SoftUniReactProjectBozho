import { useState, useEffect, useContext } from "react";
import Posts from "../Posts/posts";
import styles from '../Home/Home.module.css'
import { postsServiceFactory } from '../../services/postsService';
import { useService } from '../../hooks/useService';
import { AuthContext } from '../../contexts/AuthContext';

const MyPosts = () => {
    const [posts, setPosts] = useState([]);
    const postService = useService(postsServiceFactory);
    const { userId } = useContext(AuthContext)

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