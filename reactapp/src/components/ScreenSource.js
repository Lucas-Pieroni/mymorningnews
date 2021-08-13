import React,{useState, useEffect} from 'react';
import { List, Avatar} from 'antd';
import Nav from './Nav'
import {Link} from 'react-router-dom'
import { useParams } from "react-router-dom";


function ScreenSource() {
  console.log("entrée screensource")

  const [articleLang, setArticleLang] = useState("FR")
  console.log("articleLang:", articleLang)
  const changeLangEng = () =>{
    console.log("click drapeau UK détecté")
      setArticleLang("EN")
    }
  const changeLangFra = () =>{
    console.log("click drapeau FR détecté")
    setArticleLang("FR")
  }
  


  /* GET newsfeed via API. */
  const [sourceList, setSourceList] = useState ([]); 
  console.log ("sourcelist remplie par API:", sourceList) 
  useEffect (() =>{
    console.log("entrée useEffect")
    if (articleLang =="FR"){
    const requestApi = async () => {
      const rawNewsApi = await fetch ("https://newsapi.org/v2/top-headlines/sources?language=fr&country=fr&apiKey=01ee0af47fe9493bbe1a861f3eb5aff9")
      console.log("réponse API:", rawNewsApi)
      const newsApiParse = await rawNewsApi.json()
      console.log("réponse API parsée:", newsApiParse)
      setSourceList(newsApiParse.sources)
    }
    requestApi()
  }
  if (articleLang == "EN"){
    const requestApi = async () => {
      const rawNewsApi = await fetch ("https://newsapi.org/v2/top-headlines/sources?language=en&country=gb&apiKey=01ee0af47fe9493bbe1a861f3eb5aff9")
      console.log("réponse API:", rawNewsApi)
      const newsApiParse = await rawNewsApi.json()
      console.log("réponse API parsée:", newsApiParse)
      setSourceList(newsApiParse.sources)
    }
    requestApi()
  }
  }, [articleLang])


  return (
    <div>
        <Nav/>
       
       <div className="Banner">
         <div className="flag">
         <Avatar src="/images/france.jpg" onClick={() => changeLangFra()}/>
         <Avatar src="images/uk.png" onClick={() => changeLangEng()}/>
         </div>
       </div>

       <div className="HomeThemes">
          
              <List
                  itemLayout="horizontal"
                  dataSource={sourceList}
                  renderItem={(source, i) => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar src={`/images/${source.category}.png`} />}
                        title={<Link to={`/screenarticlesbysource/${source.id}`} key={i}><h3>{source.name}</h3></Link>}
                        description={source.description}
                      />
                    </List.Item>
                  )}
                />


          </div>
                 
      </div>
  );
}

export default ScreenSource;
