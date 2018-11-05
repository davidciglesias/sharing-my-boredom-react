import React from 'react'
import Typography from '@material-ui/core/Typography'
import AuthorHolder from '../components/AuthorHolder'
import DateHolder from '../components/DateHolder'

class AuthorDateHolder extends React.Component {
    render() {
        const { classes, fullname, email, creationDate } = this.props;
        return (
            <>
                <Typography variant="caption" >
                    <AuthorHolder 
                        classes={classes}
                        fullname={fullname}
                        email={email}
                    />
                    <DateHolder
                        creationDate={creationDate}
                    />
                </Typography>
            </>
        )
    }
}

export default AuthorDateHolder