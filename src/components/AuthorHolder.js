import React from 'react'
import MailIcon from '@material-ui/icons/Mail'
import { withStyles } from '@material-ui/core/styles'
import DefinedStyle from '../visual/DefinedStyle'
import PropTypes from 'prop-types'
import classNames from 'classnames'

class AuthorHolder extends React.Component {
    render() {
    const {classes, fullname, email} = this.props
    return(
        <>
            {fullname !== undefined && `${fullname}`}
            {email !== undefined && ` - `}
            {email !== undefined && 
            <a href={`mailto:${email}`}><MailIcon className={classNames(classes.verticalAlign)}/></a>
            }
        </>

    )}
}

AuthorHolder.propTypes = {
    classes: PropTypes.object.isRequired
  };

export default withStyles(DefinedStyle, { withTheme: true})(AuthorHolder)