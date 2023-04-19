import { useState, useContext} from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { useService } from '../../hooks/useService';
import { TextField, Button } from '@mui/material';
import styles  from './CreateComment.module.css';
import { commentServiceFactory } from '../../services/commentService';

const inputStyles = {
    marginTop: "1em",
    width:'35%',
    marginLeft: 'auto',
    marginRight: 'auto',
    bgcolor: 'white', 
    borderRadius:'5%'
}
const largeTextStyle = {
    marginTop: "1em",
    width:'100%',
    marginLeft: 'auto',
    marginRight: 'auto',
    bgcolor: 'white', 
    borderRadius:'5%'
}
const postButton = {
    marginTop: "1em",
    width:'35%',
    marginLeft: 'auto',
    marginRight: 'auto',
}

const CreateComment = ({setComments, postId}) => {
    const { userId, username, userPic } = useContext(AuthContext);
    const [ commentValues, setCommentValues ] = useState({
        ownerId:userId,
        userName:username,
        postId: postId,
        userPic: userPic,
        date:'',
        commentText:'',
    }) 

    const commentService = useService(commentServiceFactory);

    const handleUpdateComments = (newComment) => {
        setComments(state => { const newState =  state.concat([newComment])
            return newState.sort((a,b) => a._createdOn - b._createdOn)
        }
           
        );
    }
      
    const handleSubmit = (e) => {
        e.preventDefault();
        if ( commentValues.commentText.trim() !== '' ) {
            let comment = commentValues;
            comment.commentText = commentValues.commentText.trim();
            const currentDate = new Date();
            comment.date = currentDate.toLocaleDateString('en-UK', { year: 'numeric', month: 'long', day: 'numeric' });
            commentService.createComment(comment).then( result => {
                handleUpdateComments(result);
                setCommentValues(state => {return {...state, ['commentText']: ''}})
            })
        }
        else {
            setCommentValues(state => {return {...state, ['commentText']: ''}})
        }
    }

    const handleChange = (e) => {
        const newValue = e.target.value
        setCommentValues(state => {return {...state, [e.target.id]: newValue}})
    }


    return (
        <div >
            {
                userId?  <form onSubmit = {handleSubmit} className = {styles['create-comment-form']}>
                <TextField
                    id="commentText"
                    sx = {largeTextStyle}
                    onChange = {handleChange}
                    multiline
                    rows = {3}
                    coumns = {1000}
                    value={commentValues.commentText}
                />
                <Button 
                    variant="contained" type='Submit' 
                    sx= {postButton}
                >Post</Button>
        
            </form>: <>You must be logged in to comment.</>
            }
            
        </div>
    )
}

export default CreateComment;