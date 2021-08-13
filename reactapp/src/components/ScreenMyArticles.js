import React from 'react';
import { Card, Icon} from 'antd';
import Nav from './Nav'
import { connect } from 'react-redux'

const { Meta } = Card;

function ScreenMyArticles(props) {
  console.log('réception dans myarticles:', props )

  const token = props.token
  const handleClickDelete = async (title) => {
    console.log("click détecté delete,", title, token)
    props.deleteArticle(title)
  const rawResponse = await fetch("/delete-wishlist-article",{
    method:'DELETE',
    headers: {'Content-Type' : 'application/x-www-form-urlencoded'},
    body: `title=${title}&token=${token}`
  })

  }


  return (
    <div>
            <Nav/>
            <div className="Banner"/>
            <div className="Card">
                    <div  style={{display:'flex',justifyContent:'center'}}>
                      {props.addToDisplay.map((article, index)=>
                      <Card
                      style={{  
                        width: 300, 
                        margin:'15px', 
                        display:'flex',
                        flexDirection: 'column',
                        justifyContent:'space-between' }}
                      cover={
                      <img
                          alt="example"
                          src={article.image}
                      />
                      }
                      actions={[
                        <Icon type="read" key="ellipsis2" />,
                          <Icon type="delete" key="ellipsis" onClick={() => handleClickDelete(article.title)} />
                      ]}
                      >
                      <Meta
                        title={article.title}
                        description={article.description}
                      />
                    </Card>
                      )}
                    </div>
             </div>
      </div>
  );
}
function mapStateToProps(state){
  console.log("state reçus du reducer:", state)
  return { addToDisplay: state.addToWishList, token: state.userToken} 
}

function mapDispatchToProps(dispatch) {
  console.log("mapDispatchToProps:", dispatch)
  return {
      deleteArticle : function(title) {
        console.log("deleteArticle fonctionne")
      dispatch({type:"deleteArticle", title:title})
      }
  }
}
export default connect(mapStateToProps, mapDispatchToProps) (ScreenMyArticles);
