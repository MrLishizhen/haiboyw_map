const bezierCalculate = (poss, precision) => {
  //维度，坐标轴数（二维坐标，三维坐标...）
  var dimersion = 2;
  //贝塞尔曲线控制点数（阶数）
  var number = poss.length;
  //控制点数不小于 2 ，至少为二维坐标系
  if (number < 2 || dimersion < 2) return null;
  var result = new Array();
  //计算杨辉三角
  var mi = new Array();
  mi[0] = mi[1] = 1;
  for (var i = 3; i <= number; i++) {
    var t = new Array();
    for (var j = 0; j < i - 1; j++) {
      t[j] = mi[j];
    }

    mi[0] = mi[i - 1] = 1;
    for (var j = 0; j < i - 2; j++) {
      mi[j + 1] = t[j] + t[j + 1];
    }
  }

  //计算坐标点
  for (var i = 0; i < precision; i++) {
    var t = i / precision;
    var p = {x: 0, y: 0};
    result.push(p);
    for (var j = 0; j < dimersion; j++) {
      var temp = 0.0;
      for (var k = 0; k < number; k++) {
        temp += Math.pow(1 - t, number - k - 1) * (j == 0 ? poss[k].x: poss[k].y) * Math.pow(t, k) * mi[k];
      };
      j == 0 ? p.x = temp: p.y = temp;
    }
  }

  return result;
}

const lineCalculate = (start, end, precision) => {
  var coordinates = [];
    for(var i = n - 1; i >= 0; i--){
      coordinates.push( {lat: start.lat*i/n + end.lat*(n-i)/n,
      lng: start.lng*i/n + end.lng*(n-i)/n});
    }
}

const lineStraight = (p1, p2) => {
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  return Math.sqrt(dx * dx + dy * dy);
}

const plyCalculate = (list,n) => {

  let all_len1 = 0, rlist = [];
  for (let i = 0; i < list.length; i++) {
    const el1 = list[i];
    const el2 = list[i + 1];
    if (el2) {
      const l = lineStraight(el2, el1);
      all_len1 += l;
      rlist.push({
        len: l,
        start: el1,
        end: el2
      });
    } else {
      break;
    }
  }

  const lPrecent = rlist.map((r) => { return {per: r.len/all_len1, ...r}});
  let tiaojian = [], t_temp =  0;
  for (let i = 0; i < lPrecent.length; i++) {
    if (i > 0) {
      t_temp += lPrecent[i-1]['per'];
      tiaojian.push(t_temp);
    }
  }

  const points = [];  var s = 0, index = 0;
  for (let i = 0; i < n; i++) {
    const r = i/(n - 1);
    const {start, end, per} = lPrecent[index];

    for (let j = index; j < tiaojian.length; j++) {
      if (r > tiaojian[j]) {
        index ++;
        s += per;
        break;
      }
      
    }

    
    const newStart = lPrecent[index]['start'];
    const newEnd = lPrecent[index]['end'];
    r = (r - s) / lPrecent[index]['per'];
    const dx = newEnd['x'] - newStart['x'];
    const dy = newEnd['y'] - newStart['y'];

    var tx, ty;
    // if (Math.abs(dx) > 0 ) {
    //   tx = r * dx + newStart["x"];
    //   ty = newStart['y'];
    // } 
    
    // if (Math.abs(dy) > 0){
    //   tx = newStart["x"];
    //   ty = r * dy + newStart["y"];
    // }

    tx = r * dx + newStart["x"];
    ty = r * dy + newStart["y"];
    points.push({x: tx, y: ty})
  }
  
  return points;
}

const square = (x) => x*x;

const plyCalculateNew = (ps,N) => {
  const prev_point = ps.diff(1) //前一个点

  ps["dis_pre"] = Math.sqrt(square(ps["x"]-prev_point["x"]) + square(ps["y"]- prev_point["y"]))


  ps["cumsum_dis"] = ps["dis_pre"].cumsum()
}

const plyLineLength = (list) => {
  if (list.length < 2) return 0;
  var total = 0;
  for (let i = 0; i < list.length - 1; i++) {
    const startPoint = list[i];
    const endPoint = list[i + 1];
    const len = lineStraight(startPoint, endPoint);
    total += len;
  }
  return total;
}

export {
  bezierCalculate,
  plyCalculate,
  plyCalculateNew,
  plyLineLength
}
