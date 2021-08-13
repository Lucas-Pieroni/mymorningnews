export default function (userToken = "", action){
    console.log("Contenu action reçu dispatch token:", action)
    if (action.type == "addToken"){
        console.log("envoie d'un token via le reducer")
        return action.token
    } else {
        return userToken
    }
}
