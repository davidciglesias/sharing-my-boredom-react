import React from 'react'
import MenuList from '@material-ui/core/MenuList';
import ListItem from '@material-ui/core/ListItem';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import classNames from 'classnames';
import ListItemIcon from '@material-ui/core/ListItemIcon';
//import HighLighter from 'react-highlighter';
import HighLighter from './Highlighter'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import DefinedStyle from './../visual/DefinedStyle';
import queryString from 'query-string'
import StyledNavLink from './StyledNavLink';

class PostList extends React.Component {

    render() {
        const {filteredPostsTerm, posts, classes } = this.props
        return (
            <>
                <MenuList dense>
                    {posts.filter((post) => 
                    post.title.toLowerCase().includes(filteredPostsTerm.toLowerCase()) || filteredPostsTerm === "")
                    .map((text, index) => {
                        let isTheItemActive = queryString.parse(window.location.search).id === `${text.idpost}`
                        return (
                            <StyledNavLink
                                to={{
                                    pathname: `/post`,
                                    search: `?id=${text.idpost}`
                                }} 
                                key={text.idpost}
                                isActive={this.isTheItemActive}
                            >
                                <ListItem 
                                    button
                                    className={isTheItemActive ? classNames(classes.navBarSelectedBackground) : ""}
                                >
                                    <ListItemIcon>
                                        {index % 2 === 0 
                                        ? <InboxIcon />
                                        : <MailIcon className={classNames(classes.verticalAlign)} />}
                                    </ListItemIcon>
                                    <HighLighter 
                                        searchTerm={filteredPostsTerm}
                                        text={text.title}
                                        highlightedItemClass={classNames(classes.highlightedText)}
                                    />                                    
                                </ListItem> 
                            </StyledNavLink>
                        )
                        })}
                </MenuList>
            </>
        )
    }
}

PostList.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(DefinedStyle, { withTheme: true })(PostList)

