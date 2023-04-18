
import { useEffect, useState, useContext } from 'react';
import {Card, CardHeader, CardMedia, CardContent, CardActions, Collapse, Avatar, IconButton, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { postsServiceFactory } from '../../services/postsService';
import { useService } from '../../hooks/useService';
import Comment from '../Comment/comment';
import { commentServiceFactory } from '../../services/commentService';
import CreateComment from '../CreateComment/createComment';
import { AuthContext } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';



const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));

const Post = ({
  post,
  setPosts
}) => {

    const [expanded, setExpanded] = useState(false);
    const [comments, setComments] = useState([]);
    const postService = useService(postsServiceFactory);
    const commentService = useService(commentServiceFactory);
    const { userId } = useContext(AuthContext);
    const [isOwner, setIsOwner] = useState();

    useEffect( () => {
      commentService.getAllCommentsForPost(post._id).then( result => {
        setComments(result);
      })
   
    }, [])

    useEffect( () => {
      if ( userId ) {
        setIsOwner(userId === post._ownerId);
      }
      else { setIsOwner(false);}
    }, [userId]);

    const handleDelete = (postId) => {
      postService.delete(postId).then( () => {
          setPosts(state => state.filter( post => post._id !== postId))
      })
    }



    return (
        <Card sx={{
          maxWidth: '30em',
          marginLeft: 'auto',
          marginRight: 'auto',
          marginTop: '4em',
        }}>
      <CardHeader
        avatar={ 
          <Avatar aria-label="user" src = {post.userPic} alt = ''>
          </Avatar>
        }
        title={post.userName}
        subheader={post.date}
        
      />
      
      
      { post.postMedia !== '' &&  <CardMedia
            component="img"
            height="194"
            image={post.postMedia}
            alt=""
        />
      }
     
      <CardContent>
        <Typography variant="body2" color="text.secondary" sx = {{textAlign: 'left'}}>
          {post.postText}
        </Typography>
      </CardContent>
       
      <CardActions disableSpacing>
        {isOwner &&   <IconButton aria-label="delete" >
        <DeleteForeverIcon 
          onClick = {() =>   handleDelete(post._id)}
        />
       
      </IconButton>}
      {isOwner && <Link to={`/myPosts/${ post._id}/edit`} className="button">Edit</Link>}
      <ExpandMore
        expand={expanded}
        onClick={() =>  setExpanded(state => !state)}
        aria-expanded={expanded}
        aria-label="show more"
      >
        <ExpandMoreIcon />
      </ExpandMore>
    </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography>  Comments: </Typography>
          <CreateComment setComments = {setComments} postId = {post._id}/>

          {comments.map((comment) => {
                return (
                    <Comment key = {comment._id} comment = {comment}/>
                );
            })
          }
        </CardContent>
      </Collapse>
    </Card>
    )
}

export default Post;