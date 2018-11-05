import React from 'react'
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import DefinedStyle from './../visual/DefinedStyle';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import PropTypes from 'prop-types';

class DrawerHeader extends React.Component {
    render() {
        const { classes, theme, onClick } = this.props
        return (
            <>
              <div className={classNames(classes.drawerHeader)}>
                These are lovely posts
                <IconButton onClick={onClick}>
                  {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
              </div>
            </>
        )
    }
}

DrawerHeader.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired
}

export default withStyles(DefinedStyle, {withTheme: true})(DrawerHeader)