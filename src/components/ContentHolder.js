import React from 'react';
import Typography from '@material-ui/core/Typography';

const ContentHolder = (props) =>
(
    <>
        <Typography paragraph variant="body2">
            {props.content}
        </Typography>
    </>
)

export default ContentHolder