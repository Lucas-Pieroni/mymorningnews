export default function( wishList = [] , action) {
    console.log("Contenu action reçu du dispatch:", action)
    if(action.type == 'addArticle') {
        console.log("envoie d'un article via reducer")
        return [...wishList, {title: action.title, description: action.title, content: action.content, image: action.image }]
    }  if (action.type == 'deleteArticle'){
        console.log("fonction delete")
        return (wishList.filter((article) => (article.title != action.title)))
    } else{
        return wishList;
    }
}
  











