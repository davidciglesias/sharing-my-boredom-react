import React from 'react'
import TitleHolder from './TitleHolder';
import ContentHolder from './ContentHolder';

class NewPostHolder extends React.Component {
  render() {
    return (
      <>  
        <TitleHolder title={"Create a new post!"}/>
        <ContentHolder content={"WIP, come back later :)"}/>
      </>
      )
    }
}

export default NewPostHolder