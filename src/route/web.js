import express from "express";
import homeController  from "../controller/homeController";

let router = express.Router();

const initWebRoute =(app)=>{
    router.get('/',homeController.getHomepage);
    router.get('/detail/user/:id',homeController.getDetailPage);
    router.get('/about', (req, res) => {
          res.send('i am Ben')
        })
        
        return app.use('/',router) // '/' thêm tiền tố 
}
// module.exports=initWebRoute; 14 or 15 true
export default initWebRoute;