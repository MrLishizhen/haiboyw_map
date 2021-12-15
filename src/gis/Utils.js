import axios from "axios";

const MapServerToken =
    process.env.NODE_ENV === "production"
      ? "http://map.cn.gov/RemoteTokenServer?request=getToken&username=cnkwkf&password=cnkwkf12345&clientid=ref.http://bigdata.cn.gov:8070/&expiration=500"
      : `http://map.cn.gov/RemoteTokenServer?request=getToken&username=cnkwkf&password=cnkwkf12345&clientid=ref.${origin}/&expiration=500`;

const getToken = () => {

  return new Promise((resolve, reject) => {
    axios.get(MapServerToken).then((response) => {
      window.mapToken = response.data;
      resolve(response.data)
    }).catch(err => {
      resolve(null)
    })
  })
}

export {
  getToken
}