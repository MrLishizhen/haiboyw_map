import React,{Component} from "react";
import styles from './index.less'
export default class Map_gd extends Component{

    componentDidMount() {
        var map = new AMap.Map(styles.container, {
            resizeEnable: true,
            center: ['112.121743', '32.010161'],
            showLabel: false
        });

        map.on("complete", function() {
            log.success("地图加载完成！");

            var styleName = "amap://styles/darkblue";
            map.setMapStyle(styleName);

            AMap.plugin('AMap.DistrictSearch', () => {
                var districtSearch = new AMap.DistrictSearch({
                    // 关键字对应的行政区级别，共有5种级别
                    level: 'province',
                    //  是否显示下级行政区级数，1表示返回下一级行政区
                    subdistrict: 1,
                    // 返回行政区边界坐标点
                    showbiz: false,
                    extensions:'all',
                })

                // 搜索所有省/直辖市信息
                districtSearch.search('襄阳市', (status, result) => {
                    // 查询成功时，result即为对应的行政区信息

                    let data = result.districtList[0].districtList;
                    for(let i = 0;i<data.length;i++){

                        var marker = new AMap.Marker({
                            position: new AMap.LngLat(data[i].center.lng, data[i].center.lat),
                            icon: '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png',
                            offset: new AMap.Pixel(0, -30),
                            title: data[i].name,
                        });

                        marker.setMap(map);

                        districtSearch.search(data[i].name, (status, result) => {
                            handlePolygon(result);
                        })
                    }

                })
            })

            function handlePolygon(result) {
                let bounds = result.districtList[0].boundaries;
                console.log(bounds);
                if (bounds) {
                    for (let i = 0, l = bounds.length; i < l; i++) {
                        //生成行政区划polygon
                        let polygon = new AMap.Polygon({
                            map: map, // 指定地图对象
                            strokeWeight: 1, // 轮廓线宽度
                            path: bounds[i], //轮廓线的节点坐标数组
                            fillOpacity: 0.155, //透明度
                            fillColor: '#256edc', //填充颜色
                            strokeColor: '#256edc', //线条颜色
                        })
                        // console.log(bounds[i])
                        // polygons.push(polygon);
                        polygon.on('click', (e) => {
                            // 点击绘制的区域时执行其他交互

                        })
                    }
                    // 地图自适应
                    map.setFitView()
                }
            }




            // 创建点覆盖物

        });
    }


    render(){
        return (
            <div id={styles.container}></div>
        )
    }
}