import React from 'react'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import classNames from 'classnames';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import HighLighter from 'react-highlighter';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import DefinedStyle from './../visual/DefinedStyle';

class PostList extends React.Component {
    render() {
        const {filteredPostsTerm, posts, classes, theme, onClick} = this.props
        return (
            <>
                <List>
                    {posts.filter((post) => 
                    post.title.toLowerCase().includes(filteredPostsTerm.toLowerCase()) || filteredPostsTerm === "")
                    .map((text, index) => (
                        <ListItem button key={text.idpost} onClick={() => onClick(text.idpost)}>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon className={classNames(classes.verticalAlign)} />}
                            </ListItemIcon>
                            <HighLighter 
                                search={filteredPostsTerm}
                                ignoreDiacritics={true}
                                matchStyle={{backgroundColor: theme.palette.secondary.light}}
                            >
                                {text.title}
                            </HighLighter>
                        </ListItem>
                        ))}
                </List>
            </>
        )
    }
}

PostList.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(DefinedStyle, { withTheme: true })(PostList)

