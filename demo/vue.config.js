module.exports={
    devServer:{
        open:true,
        proxy:{
           '/api':{
            target:"http://localhost:888",
            changeOrigin:true,
            pathRewrite:{
                '^/api':''
            }
           }
        }

    }
}