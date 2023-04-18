
import { useState, useEffect} from 'react';
import { postsServiceFactory } from '../../services/postsService';
import { useService } from '../../hooks/useService';
import { TextField, Button } from '@mui/material';
import styles  from '../Login/Login.module.css';
import { useParams, useNavigate } from 'react-router-dom';
import stylesFromEdit from './EditPost.module.css';

const inputStyles = {
    marginTop: "1em",
    width:'35%',
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'center'
}
const largeTextStyle = {
    marginTop: "1em",
    width:'80%',
    marginLeft: 'auto',
    marginRight: 'auto',
}

const EditPost = () => {
    const { postId } = useParams();
    const [ postValues, setPostvalues ] = useState({
        ownerId:'',
        userName:'',
        userPic: '',
        date:'',
        postText:'',
        postMedia:'',
    }) 
    const postService = useService(postsServiceFactory);
    const navigate = useNavigate();


    useEffect(() => {
        postService.getOne(postId)
            .then(result => {
                console.log(result);
                setPostvalues(result);
            });
    }, [postId]);

      
    const handleSubmit = (e) => {
        e.preventDefault();
        if ( postValues.postText.trim() !== '' ) {
            let post = postValues;
            const currentDate = new Date();
            post.date = currentDate.toLocaleDateString('en-UK', { year: 'numeric', month: 'long', day: 'numeric' });
            postService.editPost( post._id, post ).then( result => {
                navigate('/')
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
                    value={postValues.postMedia}
                />
                <TextField
                    id="postText"
                    sx = {largeTextStyle}
                    onChange = {handleChange}
                    multiline
                    rows = {10}
                    coumns = {255}
                    value={postValues.postText}
                />
                <div className={stylesFromEdit['edit-nav-container']}>
                    <Button 
                        sx = {inputStyles}
                        variant="contained" type='Submit' 
                    >Save Changes</Button>
                    <Button 
                        sx = {inputStyles}
                        onClick={() => {navigate('/')}}
                        variant="outlined"type='Submit' 
                    >Cancel</Button>
                </div>
               
        
            </form>
        </div>
    )
}

export default EditPost;