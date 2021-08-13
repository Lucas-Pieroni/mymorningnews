import React, {useState, useEffect} from 'react';
import { Card, Icon} from 'antd';
import Nav from './Nav'
import { useParams } from "react-router-dom";
import { connect } from 'react-redux';

const { Meta } = Card;

function ScreenArticlesBySource(props) {
  console.log("ScreenArticleBySources.props:", props)
const [articleList, setArticleList] = useState([]);
let { idJournal}= useParams();
console.log("résultat récup journal API:", articleList)

const handleClickLike = async (title,description,content,urlToImage) =>{
  console.log("click détecté like", title,description,content,urlToImage)
  props.addToWishList(title,description,content,urlToImage)
  const rawResponse = await fetch("/addarticletowishlist",{
    method:'POST',
    headers: {'Content-Type' : 'application/x-www-form-urlencoded'},
    body: `title=${title}&description=${description}&img=${urlToImage}`
  })
}

useEffect (() =>{
  const requestApi = async () => {
    const rawJournalApi = await fetch (`https://newsapi.org/v2/top-headlines?sources=${idJournal}&apiKey=01ee0af47fe9493bbe1a861f3eb5aff9`)
    console.log("réponse API:", rawJournalApi)
    const journalApiParse = await rawJournalApi.json()
    console.log("réponse API parsée:", journalApiParse)
    setArticleList(journalApiParse.articles)
  }
  requestApi()
}, [])
console.log("idJournal:", idJournal)

  return (
    <div>   
            <Nav/>
            <div className="Banner"/>
            <div className="Card">
              <div  style={{display:'flex',justifyContent:'center', flexWrap:'wrap'}}>
                {articleList.map((article)=>
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
                      src={article.urlToImage}
                  />
                  }
                  actions={[
                      <Icon type="read" key="ellipsis2" />,
                      <Icon type="like" key="ellipsis" onClick={() => handleClickLike(article.title, article.description, article.content, article.urlToImage)}  />
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

function mapDispatchToProps(dispatch) {
  console.log("mapDispatchToProps:", dispatch)
  return {
      addToWishList : function(title, description, content, image) {
        console.log("addToWishList fonctionne")
        console.log("contenu de title et desc",title, description, content )
        dispatch({type:"addArticle", title:title, description:description, content:content, image:image})
      }
  }
}

export default connect(null, mapDispatchToProps) (ScreenArticlesBySource);
