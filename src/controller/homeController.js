import bodyParser from 'body-parser';
import pool from '../configs/connectDB';
import multer from 'multer';

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
    let [user] = await pool.execute('SELECT * FROM users WHERE id=?',[userID])
    console.log(`check req params: `,user)
    return res.send(JSON.stringify(user[0]))
}
let createNewUser=async(req,res)=>{
    // console.log('check req: ',req.body)

    let {firstName, lastName, email, address} = req.body;

    await pool.execute('insert into users(firstName, lastName, email, address) values (?,?,?,?)',
    [firstName,lastName,email,address])
    return res.redirect('/')
}

let deleteUser =async (req,res) => {
    let userID = req.body.userID;
    await pool.execute('delete from users where id = ?',[userID])
    return res.redirect('/');
    // return res.send(`check delete ${req.body.userID}`) 
}

let getEditPage = async(req, res)=>{
    let id =req.params.id;
    let [user]=  await pool.execute('select * from users where id = ?',[id]);
    // return res.send(JSON.stringify(user));
    return res.render('update.ejs',{dataUser : user[0]});
}

let postUpdateUser=async(req,res)=>{
    let {firstName, lastName, email, address,id} = req.body;
    await pool.execute('update users set firstName=?,lastName=?,email=?,address=? where id=?'
    ,[firstName, lastName, email, address,id])
    // console.log('check request:',req.body)
    // return res.send('check updateuser')
    return res.redirect('/')
}

let getUploadFilePage = async(req, res) => {
    return res.render('uploadFile.ejs')
}

// const storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//         cb(null, 'uploads/');
//     },

//     // By default, multer removes file extensions so let's add them back
//     filename: function(req, file, cb) {
//         cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//     }
// });

// const imageFilter = function(req, file, cb) {
//     // Accept images only
//     if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
//         req.fileValidationError = 'Only image files are allowed!';
//         return cb(new Error('Only image files are allowed!'), false);
//     }
//     cb(null, true);
// };
// const upload = multer().single('profile_pic');

let handleUploadFile = async(req,res)=>{
    // 'profile_pic' is the name of our file input field in the HTML form
    console.log(req.file)
    // upload(req, res, function(err) {
        // req.file contains information of uploaded file
        // req.body contains information of text fields, if there were any

        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        else if (!req.file) {
            return res.send('Please select an image to upload');
        }
        // else if (err instanceof multer.MulterError) {
        //     return res.send(err);
        // }
        // else if (err) {
        //     return res.send(err);
        // }

        // Display uploaded image for user validation
        res.send(`You have uploaded this image: <hr/><img src="/image/${req.file.filename}" width="500"><hr /><a href="/upload">Upload another image</a>`);
    // });
}

// const uploadMultiple = multer().array('multiple_images');
let handleUploadMultipleFiles=async(req,res)=>{
        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        else if (!req.files) {
            return res.send('Please select an image to upload');
        }
        

        let result = "You have uploaded these images: <hr />";
        const files = req.files;
        console.log('check files:',files)
        let index, len;

        // Loop through all the uploaded images and display them on frontend
        for (index = 0, len = files.length; index < len; ++index) {
            result += `<img src="/image/${files[index].filename}" width="300" style="margin-right: 20px;">`;
        }
        result += '<hr/><a href="/upload">Upload more images</a>';
        res.send(result);
    
}

module.exports={
    getHomepage,getDetailPage,createNewUser,deleteUser,getEditPage,postUpdateUser,getUploadFilePage,
    handleUploadFile,handleUploadMultipleFiles
}