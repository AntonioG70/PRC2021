module.exports = {
    devServer: {
     proxy: {
       '/api': {
         target: 'http://localhost:7777',
         secure: true,
         changeOrigin: true,
         pathRewrite: {
           '^/api': ''
         }
       },
     }
   } 
   };