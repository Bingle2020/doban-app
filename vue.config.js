// TODO:如果真实开发请让你的api与公司的api保持一致,项目完成后打包上架时,不会打包此处的代码! 你项目中网络请求与公司提供的api不一致导致无法请求数据
module.exports = {
    devServer: {
        // before(app) {
        //     // 在服务器开始创建时声明当前本地服务
        //     // app代表服务器,get当前api为get请求,
        //     app.get('/ele/seller', function (req, res) {
        //         res.json({data: seller});
        //     });
        //     app.get('/ele/goods', function (req, res) {
        //         res.json({data: goods});
        //         // res.json 后台向前端返回json数据
        //     });
        //     app.get('/ele/ratings', function (req, res) {
        //         res.json({data: ratings});
        //     });
        // },
        // 跨域api代理设置,TODO:跨域代理同样不会被打包到上架项目中,所以跨域api与真实服务保持一致
		// disableHostCheck: false,
		// host: "192.168.40.219",
		// port: 8080,
		// https: false,
		// hotOnly: false,
        proxy: {
            "/apix": {
                target: "https://api.douban.com",
                changeOrigin: true, // 代理跳转至指定的host
                // 当你要 https://api.douban.com/v2/movie/in_theaters?apikey=0b2bdeda43b5688921839c8ecb20399b&city=广州&start=0&count=10&client=&udid=
                pathRewrite: {
                    '^/apix': '',
                }
            },
            "/apic": {
                // http://douban.uieee.com/v2/movie/coming_soon
                target: "http://douban.uieee.com",
                changeOrigin: true,
                pathRewrite: {
                    '^/apic': '',
                }
            },
            "/apij": {
                // /apij/v2/movie/subject/30166972?apikey=0b2bdeda43b5688921839c8ecb20399b&city=广州&client=&udid=
                target: "http://api.douban.com",
                changeOrigin: true,
                pathRewrite: {
                    '^/apij': '',
                }
            },
            // http://api.map.baidu.com/location/ip?ip=&ak=fQM7VXha4ogQlZcGCG0lYIRVIROk7rDv&coor=bd09ll 城市ip定位
            "/locate": {
                target: "http://api.map.baidu.com",
                changeOrigin: true,
                pathRewrite: {
                    '^/locate': '',
                }
            },
            // "/locate": {
            //     // https://apis.map.qq.com/ws/location/v1/ip?key=4SFBZ-GEWKX-VBB4V-7YRTU-2W342-S5F3H
            //     target: "https://apis.map.qq.com",
            //     changeOrigin: true,
            //     pathRewrite: {
            //         '^/locate': '',
            //     }
            // },
            "/around": {
                // https://apis.map.qq.com/ws/place/v1/search?boundary=nearby(23.148719,113.453335,1000)&page_size=20&page_index=1&keyword=电影院&orderby=_distance&key=4SFBZ-GEWKX-VBB4V-7YRTU-2W342-S5F3H
                target: "https://apis.map.qq.com",
                changeOrigin: true,
                pathRewrite: {
                    '^/around': '',
                }
            }
        }
    }
}