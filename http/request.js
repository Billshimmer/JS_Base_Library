const host = "***.**.**";

//Promise形式的http请求
export default function(url, params, type = "GET") {
  return new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest();
    var data = new FormData();

    var formdata = function(params) {
        for (var i in params) {
            if (args.hasOwnProperty(i)) {
                data.append(i, args[i]);
            }
      }
    };
    params ? formdata(params) : null;

    xhr.timeout = 3000;
    xhr.responseType = "json";

    xhr.open(type, host + url, true);
    xhr.onload = function (res) {
      var json = xhr.response;
      resolve(json);
    };

    xhr.onerror = function(e) {
      console.error("网络错误");
      reject(e);
    };

    xhr.send(data);
  });
}