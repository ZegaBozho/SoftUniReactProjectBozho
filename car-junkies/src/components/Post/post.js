
import { useState } from 'react';
import {Card, CardHeader, CardMedia, CardContent, CardActions, Collapse, Avatar, IconButton, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Comment from '../Comment/comment';


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
  post
}) => {

    const [expanded, setExpanded] = useState(false);
    const [comments, setComments] = useState([]);
   

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
        <Typography variant="body2" color="text.secondary">
          {post.postText}
        </Typography>
      </CardContent>
       
      <CardActions disableSpacing>
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
          {comments.map((comment) => {
                return (
                    <Comment comment = {comment}/>
                );
            })
          }
        </CardContent>
      </Collapse>
    </Card>
    )
}

export default Post;