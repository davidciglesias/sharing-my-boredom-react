import React from 'react'
import TitleHolder from './TitleHolder';
import ContentHolder from './ContentHolder';
import AuthorDateHolder from './AuthorDateHolder';
import SmileyHolder from './SmileyHolder';

class PostHolder extends React.Component {
    render() {
    const { classes, theme, currentPostContent, onStatusClick} = this.props
    return (
        <>
          <TitleHolder title={currentPostContent.title}/>
          <ContentHolder content={currentPostContent.content}/>
          <AuthorDateHolder
            classes={classes}
            theme={theme}
            fullname={currentPostContent.fullname}
            email={currentPostContent.email}
            creationDate={currentPostContent.creationDate}
          />
          <SmileyHolder 
            happy={currentPostContent.happy}
            sad={currentPostContent.sad}
            angry={currentPostContent.angry}
            surprised={currentPostContent.surprised}
            onClick={(label) => onStatusClick(label)}
          />
        </>
      )
    }
}

export default PostHolder