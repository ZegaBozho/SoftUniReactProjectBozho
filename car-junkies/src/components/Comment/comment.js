import {Card, CardContent, Typography, CardHeader, Avatar, CardActions, IconButton } from '@mui/material';
import { AuthContext } from '../../contexts/AuthContext';
import { useContext } from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const Comment = ({
    comment,
    handleDelete
}) => {

    const { userId } = useContext(AuthContext);

    return ( 
    <Card variant="outlined" sx={{ width: 320, marginTop: '1rem'}}>
        <CardHeader
        avatar={ 
          <Avatar aria-label="user" src = {comment.userPic} alt = ''>
          </Avatar>
        }
        title={comment.userName}
        />
        <CardActions disableSpacing>
            {userId === comment.userId &&   <IconButton aria-label="delete" >
                <DeleteForeverIcon 
                onClick = {() =>   handleDelete(comment._id)}
                />
            </IconButton>}
        </CardActions>
        <CardContent sx = {{textAlign: 'left'}}>
            { comment.commentText }
        </CardContent>
        <Typography level="footer">{comment.date}</Typography>
    </Card>)

}

export default Comment;