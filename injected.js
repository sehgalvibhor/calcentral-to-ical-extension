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
            if(myUrl) {

                // here you get the RESPONSE HEADERS
                var responseHeaders = this.getAllResponseHeaders();

                if ( this.responseType != 'blob' && this.responseText) {
                    // responseText is string or null
                    try {

                        // here you get RESPONSE TEXT (BODY), in JSON format, so you can use JSON.parse
                        var arr = this.responseText;

                        // printing url, request headers, response headers, response body, to console

                        //console.log(this._url);
                        //console.log(JSON.parse(this._requestHeaders));
                        //console.log(responseHeaders);
                        console.log(JSON.parse(arr));                        

                    } catch(err) {
                        console.log("Error in responseType try catch");
                        console.log(err);
                    }
                }

            }
        });

        return send.apply(this, arguments);
    };

})(XMLHttpRequest);
