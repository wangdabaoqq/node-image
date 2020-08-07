var request = require('request');
var fetch = require('node-fetch');
const async = require("async"); // 控制并发数，防止被封IP
const fs = require('fs')

const createThrottle = require('async-throttle');
const throttle = createThrottle(2)
let arrs = 0
let link = []
// function sleep(numberMillis) {
//   let now = new Date();
//   const exitTime = now.getTime() + numberMillis;
//   while (true) {
// 	  now = new Date();
// 	  if (now.getTime() > exitTime)
// 	  return;
//   }
// }

// for (let i = 1; i <= 30000; i++) {
//   link.push(`http://api.cygps.com:8080/jsonapi/base/getService.json?data={"serviceMethod":"selectRepairByPage","serviceName":"com.cygps.dubbo.VehicleManager.IVehicleManager","serviceBody":{"_pageSize":1,"_page":${i},"_sortField":"repair_time","_number":-1}}`)
// }
// let aaa = [], errNum = 0, errUrl = []
// const init = () => {
//   const reptileMove = (url, callback) => {
//     console.log(url, 111)
//     var options = {
//         'method': 'GET',
//         url,
//         'headers': {
//           'token': 'lxcgj99009910899009928349900991990099[483]9900991592360350738990099001990099cf4ee96c7a7c67ede59355691da18d33'
//         }
//       };
//     request(options, function (error, response) {
//       // console.log(response)
//       let datas = JSON.parse(response.body)
//       if (error || datas.code == -1) {
//         // reptileMove(url, callback)
//         errNum++
//         errUrl.push(url)
//         callback()
//         return false
//       }
//     // if (error) throw new Error(error);
//       // console.log(response.body)
//       // let datas = JSON.parse(response.body)
//       // console.log(datas.array, datas)
//       // console.log(JSON.stringify(datas.array), url)
//       // console.log('%j', url)
//       // console.log('%j', datas)
//       aaa = [...aaa, ...datas.array]
//       sleep(50)
//       callback()
//       // callback(datas[''])
//     })
//   }
//   async.mapLimit(link, 1, function (url, callback) {
//     console.log('异步回调的url:' + url);
// 	  reptileMove(url, callback);
//   }, function (err, result) {
//     // console.log(req)
//     // console.log(result)
//     console.log('----------------------------');
//     console.log('城市抓取完毕');
//     console.log('----------------------------');
//     console.log(aaa.length)
//     console.log(errNum)
//     console.log(errUrl)
//     // let t = JSON.stringify(aaa);
//     // fs.writeFileSync('data.json', t);
//     // fetchYear(req, res); 
//     // getInfo()
//     // console.log(req)
// 	  // reptileMove(url, callback);
//   });
// }
// init()
// // let init = async(i) => {
// //   console.log(i)
// //   // for (let i = 300; i <= 11000; i+=300) {
// //   var options = {
// //     'method': 'GET',
// //     'url': `http://api.cygps.com:8080/jsonapi/base/getService.json?data={"serviceMethod":"selectRepairByPage","serviceName":"com.cygps.dubbo.VehicleManager.IVehicleManager","serviceBody":{"_pageSize": ${i},"_page":1,"_sortField":"repair_time","_number":-1}}`,
// //     'headers': {
// //       'token': 'lxcgj99009910899009928349900991990099[483]9900991592360350738990099001990099cf4ee96c7a7c67ede59355691da18d33'
// //     }
// //   };
// //   request(options, function (error, response) {
// //     if (error) throw new Error(error);
// //     // console.log(response);
// //     let bodys =  JSON.parse(response.body)
// //     console.log(bodys)
// //     let ddd = bodys['array']
// //     // console.log(ddd)
// //     // arrs = arrs.concat(ddd)
// //     // arrs = [...arrs, ...ddd]
// //     // console.log(ddd)
// //   });
// //   // }
// // }
// // // for (let i = 100; i <= 10000; i+=100) {
// // //   setInterval(() => {
// // //     init(i)
// // //   }, 10000)
// // // }
// // // setTimeout(() => {
// // // }, 3000)
// // // console.log(arrs.length)

// for (let i = 1; i <= 10; i++) {
//   link.push(`http://api.cygps.com:8080/jsonapi/base/getService.json?data={"serviceMethod":"selectRepairByPage","serviceName":"com.cygps.dubbo.VehicleManager.IVehicleManager","serviceBody":{"_pageSize":10,"_page":${i},"_sortField":"repair_time","_number":-1}}`)
// }
// // const sleep = (time = 0) => {
// //   return new Promise((resolve, reject) => {
// //     setTimeout(() => {
// //       resolve();
// //     }, time);
// //   })
// // };
// // const promises = link.map(async (link) => {
// //   // throttle(async () => {
// //     // setTimeout(() => {
// //       // sleep(index * 3000)
// //       // console.log(link)
// //       const res = await fetch(link, {
// //         'method': 'GET',
// //         'headers': {
// //           'token': 'lxcgj99009910899009928349900991990099[483]9900991592360350738990099001990099cf4ee96c7a7c67ede59355691da18d33'
// //         }
// //       });
// //       // setTimeout(async () => {
// //       // console.log(res)
// //       return await res.json();

// // });

// // Promise.all(promises).then(datasets => {
// //   console.log(datasets, 111)
// //   // iterate over datasets
// // }).catch((error) => {
// //   console.log(error)
// // });
// let timeSplit = ['1535760000000', '1551398400000']
let timeDate = (time) => {
  let initDate = new Date(time)
  let Y = initDate.getFullYear() + '-'
  let M = (initDate.getMonth() + 1 < 10 ? '0' + (initDate.getMonth() + 1) : initDate.getMonth() + 1) + '-'
  let D = (initDate.getDate() < 10 ? '0' + (initDate.getDate()) : initDate.getDate())
  // let h = (initDate.getHours() < 10 ? '0' + initDate.getHours() : initDate.getHours()) + ':'
  // let m = (initDate.getMinutes() < 10 ? '0' + initDate.getMinutes() : initDate.getMinutes()) + ':'
  // let s = (initDate.getSeconds() < 10 ? '0' + initDate.getSeconds() : initDate.getSeconds())
  return `${Y}${M}${D}`
}
let errArr = []
let imgArr = []
let errUrl = []
let init = () => {
  let arrUrl = []
  let curCount = 1;
  for (let index = 1; index <= 212; index++) {
    let dates = new Date('2018-09-01').setDate(index)
    // console.log(dates)
    // console.log(timeDate(dates))
    arrUrl.push(`http://api.cygps.com:8080/jsonapi/base/data.json?data={"serviceMethod":"selectByPage","serviceName":"com.cygps.dubbo.commons.data.ICommonDataService","collectionName":"vehicle_repairReport","serviceBody":{"_pageSize":1000,"_page":1,"_sortField":"report_time","*report_time":"${timeDate(dates)}","_number":-1}}`)
    // let date = new Date('2018-09-01').setDate(index)
    // console.log(timeDate(date))
    // arrUrl.push(`http://api.cygps.com:8080/jsonapi/base/data.json?data={"serviceMethod":"selectByPage","serviceName":"com.cygps.dubbo.commons.data.ICommonDataService","collectionName":"vehicle_repairReport","serviceBody":{"_pageSize":1,"_page":${index},"_sortField":"report_time",*report_time":"2018-03-01","_number":-1}}`)
  }
  let reptileMove = (url, callback) => {
    var options = {
      'method': 'POST',
      url,
      'headers': {
        'token': 'lxcgj99009910899009928349900991990099[483]99009915967642074839900990019900992acc14f22c38801178c580091da43762'
      },
      formData: {
      }
    }
    request(options, function (error, response) {
      // curCount++
      if (error) {
        errUrl.push(url)
        // reptileMove(url, callback)
        callback();
      }
      // console.log(response.body)
      try {
        // console.log(response.body)
        curCount++
        let datas = JSON.parse(response.body)
        datas = datas.array
        // console.log(datas)
        datas.forEach(ele => {
          // console.log(ele)
          if (ele.photo_id) {
            ele.photo_id.forEach(e => {
              // console.log(ele)
              // let time = new Date(ele.report_time).getTime()
              // console.log(time)
              // if (time >= 1535760000000 && time <= 1553993143000) {
                imgArr.push(`http://api.cygps.com:8080/jsonapi/base/vehicle.fd?_id=${e}&time=${ele.report_time}`)
              // }
              // console.log(imgArr)
              // imgUpload(ele)
            })
          }
        })
      } catch (e) {
        curCount--
      }
      console.log(curCount)
      // console.log(imgArr)
      callback();
    })
  }
  async.mapLimit(arrUrl, 1, function (series, callback) {
	  reptileMove(series, callback);
  }, function (err, result) {
    // 访问完成的回调函数
    console.log('----------------------------');
    // console.log('车系抓取成功，共有数据：' + countSuccess);
    console.log('----------------------------');
    // console.log('test')
    imgUpload();
  });
}
// var request = require('request');
// let init = () => {
//   for (let index = 1; index < 26000; index++) {
//     // const element = array[index]
//     var options = {
//       'method': 'POST',
//       'url': `http://api.cygps.com:8080/jsonapi/base/data.json?data={"serviceMethod":"selectByPage","serviceName":"com.cygps.dubbo.commons.data.ICommonDataService","collectionName":"vehicle_repairReport","serviceBody":{"_pageSize":1,"_page":${index},"_sortField":"report_time","_number":-1}}`,
//       'headers': {
//         'token': 'lxcgj99009910899009928349900991990099[483]9900991596597347766990099001990099901a646006cc6a60daa0faf29ca646b2'
//       },
//       formData: {

//       }
//     };
//     request(options, function (error, response) {
//       console.log(error)
//       if (error) throw new Error(error);
//       console.log(response)
//       callBack(response.body);
//     });
//   }
// }
// let imgArr = []
// let callBack = (data) => {
//   let datas = JSON.parse(data)
//   console.log(datas)
//   datas = datas.array
//   // datas = JSON.parse(datas)
//   // console.log(datas)
//   datas.forEach(ele => {
//     if (ele.photo_id) {
//       ele.photo_id.forEach(ele => {
//         // console.log(ele)
//         imgArr.push(`http://api.cygps.com:8080/jsonapi/base/vehicle.fd?_id=${ele}`)
//         // imgUpload(ele)
//       })
//     }
//   })
//   // imgArr.forEach(id => {
//   //   // let imgSrc = `http://api.cygps.com:8080/jsonapi/base/vehicle.fd?_id=${id}`
//   // })
//   imgUpload()
//   // console.log('test')
// }
// let round = Math.ceil(Math.random()*10) + 'sa'
let imgUpload = () => {
  let reptileMove = (url, callback) => {
    // console.log(url)
    // let id = url.split('=')
    let query = url.split(/id=|&time=/g)
    var filename = "./img/" + query[1] + '_' + query[2] + '.png';
    fs.exists(filename, function (b) {
      if (!b) {
        request({url: url}).pipe(fs.createWriteStream('./img/' + query[1] + '_' + query[2]  + '.png')).on("close", function (err) {
          console.log("文件[" + query[1] + "]下载完毕");
          // callback()
        }).on('err', function (err) {
          errArr.push(url)
        })
      }
    })
    callback()
  }
  async.mapLimit(imgArr, 1, function (url, callback) {
    // console.log('异步回调的url:' + url);
    // console.log(url)
    setTimeout(() => {
      reptileMove(url, callback);
    }, 6000)
    // console.log(url)
  // request({url: 'http://api.cygps.com:8080/jsonapi/base/vehicle.fd?_id=5f018091acccd808539586a8'}).pipe(fs.createWriteStream('./' + id + '.png'))
  }, function (err, result) {
    console.log('----------------------------');
    console.log('品牌车系抓取完毕！');
    console.log('----------------------------');
    // fetchYear(req, res);
    // let t = JSON.stringify()
  });
//  request({url: imgSrc}).pipe(fs.createWriteStream('./img/' + id + '.png'))
}

init()


// function aaa () {
//   for (let index = 1; index <= 212; index++) {
//     let dates = new Date('2018-09-01').setDate(index)
//     console.log(dates)
//     console.log(timeDate(dates))
//     let ddd = `http://api.cygps.com:8080/jsonapi/base/data.json?data={"serviceMethod":"selectByPage","serviceName":"com.cygps.dubbo.commons.data.ICommonDataService","collectionName":"vehicle_repairReport","serviceBody":{"_pageSize":1000,"_page":1,"_sortField":"report_time",*report_time":"${timeDate(dates)}","_number":-1}}`
//     console.log(ddd)
//   }
// }
// aaa()