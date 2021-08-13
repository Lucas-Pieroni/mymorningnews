var mongoose = require('mongoose');

var options = {
    connectTimeoutMS: 5000,
    useUnifiedTopology : true,
    useNewUrlParser: true,
}

mongoose.connect('mongodb+srv://adminnews:news@cluster0.w7tys.mongodb.net/mymorningnews?retryWrites=true&w=majority',
    options,
    function(err){
        if(err){
            console.log("Connexion DB échouée",err);
        } else {
            console.log("Connexion DB réussie")
        }
    }
)
