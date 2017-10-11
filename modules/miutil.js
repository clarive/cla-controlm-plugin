 exports.postServer =   function (agent,timeout, pause,url,headers,content_data) {
 	       var util = require("cla/util");
            return util.retry(function() {
                var queueResponse = agent.post(url, {
                    headers: headers,
                    content: JSON.stringify(content_data)
                });
                return queueResponse.content;

                }, {
                pause: pause,
                attempts: pause ? timeout / pause : 0
                }
                );
        }
exports.obtainToken = function(agent, urlBase, userName, password,port,timeout,pause) {
       var miutil  = require("miutil");
       var headers = {
            'Content-Type': 'application/json',
        };
        var content_data = {'username': userName, 'password': password };
        var url = "https://"+urlBase+":"+port+"/automation-api/session/login";
        var token = miutil.postServer(agent,timeout, pause,url,headers,content_data).token || '0';
        return token;
};
exports.postWorkFlow = function(url, authorization,  body, timeout, acceptAnyCert) {
            var reg = require('cla/reg');
            var headers = {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': authorization
                };
            var output = reg.launch('service.web.request', {
                name: _('Post a Workflow to Control-M'),
                config: {
                    method: 'POST',
                    url: url,
                    headers: headers,
                    body: body,
                    timeout: timeout,
                    accept_any_cert: acceptAnyCert
                }
            });
            return output.content;
};
 exports.geting =   function (agent,timeout, pause,url,authorization) {
           var util = require("cla/util");
           var headers = {
                    'Authorization': authorization
            };

            return util.retry(function() {
                var queueResponse = agent.get(url, {
                    headers: headers
                });
                return queueResponse.content;
                }, {
                pause: pause,
                attempts: pause ? timeout / pause : 0
                })
};
 exports.posting =   function (url, authorization,  body, timeout, acceptAnyCert) {
           if (acceptAnyCert)

           var reg = require('cla/reg');
           var util = require("cla/util");
           var headers = {
                    'Authorization': authorization
            };
            var output = reg.launch('service.web.request', {
                name: _('Post to Control-M'),
                config: {
                    method: 'POST',
                    url: url,
                    headers: headers,
                    body: body,
                    timeout: timeout,
                    accept_any_cert: acceptAnyCert
                }
            });
            return output.content;
};