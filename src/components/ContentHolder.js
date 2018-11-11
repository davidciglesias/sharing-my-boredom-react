import React from 'react';
import Typography from '@material-ui/core/Typography';
import marked from 'marked'

const ContentHolder = (props) => {
    let markedText = props.content === undefined ? "" : marked(props.content)
    return (
        <>
            <Typography paragraph variant="body2" dangerouslySetInnerHTML={{__html: markedText}}>
                
            </Typography>
        </>
    )
}

export default ContentHolder