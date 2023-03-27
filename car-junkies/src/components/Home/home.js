import { useState, useEffect } from "react";
import Posts from "../Posts/posts";
import styles from './Home.module.css'
import { postsServiceFactory } from '../../services/postsService';
import { useService } from '../../hooks/useService';

const Home = () => {
    const [posts, setPosts] = useState([]);
    const postService = useService(postsServiceFactory);

    useEffect( () => {
        postService.getAllPosts().then( result => {
            setPosts(result);
        })
    }, []);

    return (
        <div className = {styles['home-container']}>
            <h2>Wellcome to Car-Junkies</h2>
            <p> The place for car enthusiasts by car enthusiasts</p>

            <h4> Latest posts </h4>
            {
                <Posts posts = {posts} setPosts = {setPosts}/>
            }
        </div>
    )
}

export default Home;