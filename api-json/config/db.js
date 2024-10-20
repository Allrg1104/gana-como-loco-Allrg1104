const mongoose = require('mongoose')
//mongodb+srv://allrg1104:<db_password>@allrg1104.xtqyw.mongodb.net/?retryWrites=true&w=majority&appName=Allrg1104

const DB_URI = 'mongodb+srv://allrg1104:<db_password>@allrg1104.xtqyw.mongodb.net/?retryWrites=true&w=majority&appName=Allrg1104'

module.exports = ()=>{

    const connect =()=> {
        mongoose.connect(
            DB_URI,
            {
                KeepAlive: true,
                useNewUrlParser: true, 
                useUnifiedTopology:true
            },
            (err) =>{
                if (err){
                    console.log('Error DB');
                }else{
                    console.log('Conexion Exitosa');
                }
            } 

        )
    }

    connect();
}