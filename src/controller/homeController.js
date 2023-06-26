import connection from '../configs/connectDB';

let getHomepage =(req,res)=>{
    let data=[];
    connection.query(
        'SELECT * FROM `users` ',
        function(err, results, fields) {
        // console.log(`>>> check mysql`)
        // console.log(results); // results contains rows returned by server
        // console.log(fields); // fields contains extra meta data about results, if available
        results.map((row)=>{
            data.push({
                id: row.id,
                email: row.email,
                firstName: row.firstName,
                lastName:row.lastName
            })
        });   
            // console.log(`>>>checkdata: `,typeof(data),JSON.stringify(data))
            return res.render('test/index.ejs',{dataUser: JSON.stringify(data)})   
    });
        
}
module.exports={
    getHomepage
}