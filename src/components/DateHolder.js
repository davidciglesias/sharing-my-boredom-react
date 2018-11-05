import React from 'react'
import Moment from 'react-moment';

class DateHolder extends React.Component {
    render() {
        const { creationDate } = this.props
        return (
            <>
                {creationDate !== undefined && ` - Posted `}
                {creationDate !== undefined && <Moment format="YYYY-MM-DD @ HH:mm" date={creationDate}/>}
            </>
        )
    }
}
export default DateHolder