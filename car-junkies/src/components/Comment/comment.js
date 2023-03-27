import {Card, CardContent, Typography } from '@mui/material';

const Comment = ({
    comment
}) => {

    return ( <Card variant="outlined" sx={{ width: 320 }}>
    <Typography level="h2" fontSize="md" sx={{ mb: 0.5 }}>
        {/* add user here */}
    </Typography>
    <Typography level="body2">{comment.date}</Typography>
    <CardContent>
         { comment.text }
    </CardContent>
  </Card>)

}

export default Comment;