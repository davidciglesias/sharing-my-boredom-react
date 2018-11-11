import React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from 'react-router-dom/Link';
import classNames from 'classnames'
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
                //className={classNames(props.classes.verticalAlign)}
            >
                <EditIcon/>
            </Link>
        </Typography>
    </>
)

export default TitleHolder