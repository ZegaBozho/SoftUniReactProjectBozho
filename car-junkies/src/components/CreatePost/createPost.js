import { useState, useContext} from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { postsServiceFactory } from '../../services/postsService';
import { useService } from '../../hooks/useService';
import { TextField, Button } from '@mui/material';
import styles  from '../Login/Login.module.css';

const inputStyles = {
    marginTop: "1em",
    width:'35%',
    marginLeft: 'auto',
    marginRight: 'auto',
}
const largeTextStyle = {
    marginTop: "1em",
    width:'80%',
    marginLeft: 'auto',
    marginRight: 'auto',
}

const CreatePost = ({setShowCreatePost, setPosts}) => {
    const { userId, username, userPic } = useContext(AuthContext);
    const [ postValues, setPostvalues ] = useState({
        ownerId:userId,
        userName:username,
        userPic: userPic,
        date:'',
        postText:'',
        postMedia:'',
    }) 

    const postService = useService(postsServiceFactory);

    const handleUpdatePosts = (newPost) => {
        setPosts(state => { const newState =  state.concat([newPost])
            return newState.sort((a,b) => b._createdOn - a._createdOn)
        }
           
        );
    }
      
    const handleSubmit = (e) => {
        e.preventDefault();
        if ( postValues.postText !== '' ) {
            let post = postValues;
            const currentDate = new Date();
            post.date = currentDate.toLocaleDateString('en-UK', { year: 'numeric', month: 'long', day: 'numeric' });
            postService.createPost(post).then( result => {
                handleUpdatePosts(result);
                setShowCreatePost(false);
            })
        }
    }

    const handleChange = (e) => {
        const newValue = e.target.value
        setPostvalues(state => {return {...state, [e.target.id]: newValue}})
    }


    return (
        <div >
             <form onSubmit = {handleSubmit} className = {styles['login-form']}>
                <TextField
                    id="postMedia"
                    type ="text"
                    label = "Media url"
                    sx = {inputStyles}
                    onChange = {handleChange}
                />
                <TextField
                    id="postText"
                    sx = {largeTextStyle}
                    onChange = {handleChange}
                    multiline
                    rows = {10}
                    coumns = {255}
                />
                <Button 
                    variant="contained" type='Submit' 
                    sx= {inputStyles}
                >Post</Button>
        
            </form>
        </div>
    )
}

export default CreatePost;