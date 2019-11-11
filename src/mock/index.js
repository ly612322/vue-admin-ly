import Mock from 'mockjs'
import { Option } from 'element-ui';
Mock.setup({
    timeout: 500
  })

Mock.mock('/login', "post", Options =>{
    if(Options.body == "username=admin&password=123456"){
    return {
        "data":{
            token:"qwertyuiop"
        },
        "meta":{
            msg:"登陆成功",
            status:200
        }
    }        
    }
    else{
        return{
            "meta":{
                msg:"等登失败",
                status:404
            }        }
    }
})

export default Mock
