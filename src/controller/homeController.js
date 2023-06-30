import bodyParser from 'body-parser';
import pool from '../configs/connectDB';

let getHomepage =async(req,res)=>{
    let data=[];
    // connection.query(
    //     'SELECT * FROM `users` ',
    //     function(err, results, fields) {
    //     // console.log(`>>> check mysql`)
    //     // console.log(results); // results contains rows returned by server
    //     // console.log(fields); // fields contains extra meta data about results, if available
    //     results.map((row)=>{
    //         data.push({
    //             id: row.id,
    //             email: row.email,
    //             address: row.a ddress,
    //             firstName: row.firstName,
    //             lastName:row.lastName
    //         })
    //     });   
    //         // console.log(`>>>checkdata: `,typeof(data),JSON.stringify(data))
    //         // return res.render('index.ejs',{dataUser: data})   
    // });
        const [rows, fields] = await pool.execute('SELECT * FROM users');
        return res.render('index.ejs',{dataUser: rows,test: 'hai'})
        console.log(`>>>check rows: `,rows)
}
let getDetailPage =async(req,res)=>{
    let userID =req.params.id;
    let user = await pool.execute('SELECT * FROM users WHERE id=?',[userID])
    console.log(`check req params: `,user)
    return res.send(JSON.stringify(user[0]))
}
let createNewUser=async(req,res)=>{
    console.log('check req: ',req.body)

    let {firstName, lastName, email, address} = req.body;

    await pool.execute('insert into users(firstName, lastName, email, address) values (?,?,?,?)',
    [firstName,lastName,email,address])
    return res.redirect('/')
}
module.exports={
    getHomepage,getDetailPage,createNewUser
}