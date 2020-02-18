import {Http} from "../utils/http";

class BannerData {
    // 获取首页轮播图数据
    static async getIndexBanner(){
        return await Http.request({
            url:`/banner/list/10`
        })
    }
    //  获取新闻列表页的轮播图数据
    static async getNewsBanner() {
        return await Http.request({
            url:`/banner/list/20`
        })
    }
}

export {
    BannerData
}
