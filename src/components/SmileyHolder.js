import React from 'react';
import SmileyChip from '../components/SmileyChip'
import WhatsHotIcon from '@material-ui/icons/Whatshot';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';
import MoodIcon from '@material-ui/icons/Mood';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';

const SmileyHolder = (props) => 
(
    <>
      {props.happy !== undefined &&
        <SmileyChip
          icon={<MoodIcon />}
          level={props.happy}
          label='happy'
          onClick={(label) => props.onClick(label)}
        />
      }
      {props.sad !== undefined &&
        <SmileyChip
          icon={<SentimentVeryDissatisfiedIcon />}
          level={props.sad}
          label='sad'
          onClick={(label) => props.onClick(label)}
        />
      }
      {props.angry !== undefined &&
        <SmileyChip
          icon={<WhatsHotIcon />}
          level={props.angry}
          label='angry'
          onClick={(label) => props.onClick(label)}
        />
      }
      {props.surprised !== undefined &&
        <SmileyChip
          icon={<PriorityHighIcon />}
          level={props.surprised}
          label='surprised'
          onClick={(label) => props.onClick(label)}
        />
      }
    </>
)

export default SmileyHolder