var reg = require('cla/reg');

reg.register('service.controlm.action', {
    name: _('Control-M action'),
    icon: '/plugin/cla-controlm-plugin/icon/controlm-service.svg',
    form: '/plugin/cla-controlm-plugin/form/controlm-view-form.js',
    handler: function(ctx, config) {


        var miutil  = require('miutil');
        var log     = require('cla/log');
        var ci      = require('cla/ci');


        if (!config.server) {
            log.fatal(_("Server CI doesn't exist"));
        }
        var serverCM = ci.findOne({
            mid: config.server + ""
        });

        var userName  = serverCM.username;
        var password  = serverCM.password;
        var port      = serverCM.port;
        var accept_any_cert = serverCM.accept_any_cert;
        var urlBase   = serverCM.urlBase;
        var timeout   = config.timeout || 10;
        var pause     = config.checkTime || 1;
        var command   = config.command||'';
        var jobname   = config.jobName||'*';
        var status    = config.status||[];
        var jobid     = config.jobId||'*';
        var args      = {};

        if (typeof(status) == "string") {status = [status]; }

        console.log('next action  : ' + command );
        var web     = require('cla/web');
        var ssl_opts  =    { "verify_SSL": !accept_any_cert };
        var agent = web.agent(ssl_opts);

        if (command == 'token') {
            var token = miutil.obtainToken(agent, urlBase, userName, password,port,timeout,pause)|| '0';
            if (token == 0) {
                log.fatal(_("ControlM server error."));
            }
            console.log('token : ' + token);
            ctx.stash('ctm_token',token);
            return token;
        }

        var token = ctx.stash('ctm_token');
        if (!token) {
              log.fatal(_("Obtain a ControlM token before execute this feature : " + command));
              }
        var authorization = 'Bearer ' + token;

        var response;
        var objeto;

        if (command == 'build' || command == 'deploy' || command == 'run') {

            var url = "https://"+urlBase+":"+port+"/automation-api/"+command;
            var body;
            var content_Type = "form-data";
            var file = [config.jsonFile];

            if (command == 'run') {
                    body = 'jobDefinitionsFile : '+ file ;
            } else {
                    body = 'definitionsFile : ' + file ;
            }
            response = miutil.postWorkFlow(url, authorization,  body, timeout, accept_any_cert)
            objeto = JSON.parse(response);
        }

        if (command == 'getstatusbyname' || command == 'getstatusbyrunid' || command == 'getjoboutput' || command == 'getjoblog' || command == 'runnow' ) {

            if (command == 'getstatusbyrunid') {
                var runid = ctx.stash('ctm_run')["runId"];
                console.log("runid : " +runid);
                var url = "https://"+urlBase+":"+port+"/automation-api/run/status/"+runid;
                objeto = miutil.geting(agent,timeout,pause,url,authorization);
            } else if (command == 'getjoboutput') {
                console.log("jobid : " +jobid);
                var url = "https://"+urlBase+":"+port+"/automation-api/run/job/"+jobid+"/output/";
                objeto = miutil.geting(agent,timeout,pause,url,authorization);
             } else if (command == 'runnow') {
                console.log("jobid : " +jobid);
                var url = "https://"+urlBase+":"+port+"/automation-api/run/job/"+jobid+"/runNow/";
                response = miutil.posting(url, authorization,  body, timeout, accept_any_cert);
                objeto = JSON.parse(response);
            } else if (command == 'getjoblog') {
                console.log("jobid : " +jobid);
                var url = "https://"+urlBase+":"+port+"/automation-api/run/job/"+jobid+"/log/";
                objeto = miutil.geting(agent,timeout,pause,url,authorization);
            } else if (command == 'getstatusbyname') {
                 var statusChain = "";
                 if (status.length > 0) {
                    var key = status.pop();
                    var statusConv = {endedok:"Ended OK",
                                      endednotok:"Ended Not OK",
                                      executing:"Executing",
                                      waituser:"Wait User",
                                      waitresource:"Wait Resource",
                                      waitcondition:"Wait Condition",
                                      waitworkload:"Wait Workload",
                                      waithost:"Wait Host",
                                      statusunknown:"Status Unknown"};

                     statusChain = "status="+statusConv[key];
                     status.forEach(function(key) {
                     statusChain += ","+ statusConv[key];
                     })
                 }

                 var url = "https://"+urlBase+":"+port+"/automation-api/run/jobs/status?jobname="+jobname+"&"+statusChain;
                 console.log("jobname : " + jobname);
                 console.log("options : " + statusChain);
                 objeto = miutil.geting(agent,timeout,pause,url,authorization);;
            }

        }

        var key = 'ctm_' + command
        ctx.stash(key,objeto);
        console.log(objeto);
        return objeto;
    }
});