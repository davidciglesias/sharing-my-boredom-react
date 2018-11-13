import React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from 'react-router-dom/Link';
import EditIcon from '@material-ui/icons/Edit'

const TitleHolder = (props) =>
(
    <>
        <Typography paragraph variant="h3">
            {props.title}
            <Link
                to={{
                pathname: `/putUpdatePost`,
                search: `?postId=${props.currentPostId}`
                }} 
            >
                <EditIcon/>
            </Link>
        </Typography>
    </>
)

export default TitleHolder