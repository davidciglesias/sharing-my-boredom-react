import React from 'react';
import SmileyChip from '../components/SmileyChip'
import WhatsHotIcon from '@material-ui/icons/Whatshot';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';
import MoodIcon from '@material-ui/icons/Mood';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
class SmileyHolder extends React.Component {
  
render() {
    const { happy, sad, angry, surprised, loadingState, onClick} = this.props
    return (
        <>
          {happy !== undefined &&
            <SmileyChip
              icon={<MoodIcon />}
              level={happy}
              label='happy'
              onClick={(label) => onClick(label)}
              loading={loadingState['happy']}
            />
          }
          {sad !== undefined &&
            <SmileyChip
              icon={<SentimentVeryDissatisfiedIcon />}
              level={sad}
              label='sad'
              onClick={(label) => onClick(label)}
              loading={loadingState['sad']}
            />
          }
          {angry !== undefined &&
            <SmileyChip
              icon={<WhatsHotIcon />}
              level={angry}
              label='angry'
              onClick={(label) => onClick(label)}
              loading={loadingState['angry']}
            />
          }
          {surprised !== undefined &&
            <SmileyChip
              icon={<PriorityHighIcon />}
              level={surprised}
              label='surprised'
              onClick={(label) => onClick(label)}
              loading={loadingState['surprised']}
            />
          }
        </>
    )
  }
}

export default SmileyHolder