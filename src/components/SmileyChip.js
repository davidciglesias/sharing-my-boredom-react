import React from 'react';
import Chip from '@material-ui/core/Chip'

const SmileyChip = (props) =>
(
    <>
        <Chip
        tabIndex={-1}
        icon={props.icon}
        label={props.level}
        color={props.level > 5 ? (props.level > 10 ? "secondary" : "primary") : "default"}
        onClick={() => props.onClick(props.label)}
        />
    </>
)

export default SmileyChip