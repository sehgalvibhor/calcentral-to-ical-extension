(function(xhr) {
    var XHR = XMLHttpRequest.prototype;

    var open = XHR.open;
    var send = XHR.send;
    var setRequestHeader = XHR.setRequestHeader;

    XHR.open = function(method, url) {
        this._method = method;
        this._url = url;
        this._requestHeaders = {};
        this._startTime = (new Date()).toISOString();

        return open.apply(this, arguments);
    };

    XHR.setRequestHeader = function(header, value) {
        this._requestHeaders[header] = value;
        return setRequestHeader.apply(this, arguments);
    };

    XHR.send = function(postData) {

        this.addEventListener('load', function() {
            var endTime = (new Date()).toISOString();

            var myUrl = this._url ? this._url.toLowerCase() : this._url;
            if(myUrl.includes('api/')) {
                var responseHeaders = this.getAllResponseHeaders();
                if (this.responseType != 'blob' && this.responseText) {
                    try {
                        var arr = JSON.parse(this.responseText);
                        if(arr['warnings'].length==0){
                            console.log(arr);
                        }else{
                            console.log("CalCentral to Ical : Conflict in Schedule, try again!")
                        }
                                                

                    } catch(err) {
                        console.log(err);
                    }
                }

            }
        });

        return send.apply(this, arguments);
    };

})(XMLHttpRequest);
