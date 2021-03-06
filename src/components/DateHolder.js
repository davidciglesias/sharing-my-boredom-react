import React from 'react'
import Moment from 'react-moment'
import moment from 'moment-timezone'

class DateHolder extends React.Component {
    render() {
        const { creationDate } = this.props
        moment.tz.setDefault(moment.tz.guess())
        console.log(creationDate)
        return (
            <>
                {creationDate !== undefined && ` - Posted `}
                {creationDate !== undefined && <Moment format="YYYY-MM-DD @ HH:mm" date={moment.utc(creationDate).tz(moment.tz.guess())}/>}
                {creationDate !== undefined && <div>{moment.utc(creationDate).tz(moment.tz.guess()).toString("HH:mm")}</div>}
            </>
        )
    }
}
export default DateHolder