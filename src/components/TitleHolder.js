import React from 'react';
import Typography from '@material-ui/core/Typography';

const TitleHolder = (props) =>
(
    <>
        <Typography paragraph variant="h3">
            {props.title}
        </Typography>
    </>
)

export default TitleHolder