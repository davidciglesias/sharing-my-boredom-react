import * as React from 'react'
import {each} from 'lodash'
 
export default class HighLighter extends React.Component{
 
renderName(name) {
 
var splitPattern = this.props.searchTerm != null ? new RegExp("(" + this.props.searchTerm + ")" , "i") : '';
var miniWords = name.split(splitPattern);
 
var html = [];
 
each(miniWords, (miniWord, index) => {
if (this.props.searchTerm != null && miniWord.toLowerCase() === this.props.searchTerm.toLowerCase()) {
html.push(<span key={index} className={this.props.highlightedItemClass}>{miniWord}</span>)
} else {
html.push(<span key={index} className={this.props.itemClass}>{miniWord}</span>)
}
 
});
 
return <span> {html}</span>;
}
render() {
const { wrapperClass } = this.props;
return (
<div className={wrapperClass}>{this.renderName(this.props.text)}</div>
)
}
}