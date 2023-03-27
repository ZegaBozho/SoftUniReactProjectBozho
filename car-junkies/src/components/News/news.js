import { Card, Typography, CardContent } from "@mui/material";
import { useState } from "react"
import styles from './News.module.css';


const News = () => {
    const [news, setNews ] = useState([]);


    return (
        <div className = {styles['news-container']}>
            <h2>Latest news</h2>
            {
                news.map(article => {
                    return (
                        <Card variant="outlined" sx={{ width: 320 }}>
                            <Typography level="h2" fontSize="md" sx={{ mb: 0.5 }}>
                                {article.title}
                            </Typography>
                            <Typography level="body2">{article.date}</Typography>
                            <CardContent>
                                { article.text }
                            </CardContent>
                        </Card>
                    )
                })
            }
        </div>
    )
}

export default News;