import React from 'react'
import TitleHolder from './TitleHolder';
import ContentHolder from './ContentHolder';

class HomeHolder extends React.Component {
  render() {
    return (
      <>  
        <TitleHolder title={"Welcome home!"}/>
        <ContentHolder content={"Please pick a post to continue :)"}/>
      </>
      )
    }
}

export default HomeHolder