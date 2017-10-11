var reg = require("cla/reg");

reg.registerCIService('checkServer', {
    class: 'controlMServer',
    name: _('Check Server Availability'),
    icon: '/plugin/cla-controlm-plugin/icon/controlm.svg',
    form: '/plugin/cla-controlm-plugin/form/controlm-service.js',
    show_in_palette: 0,
    handler: function(ctx, config) {
        var web     = require("cla/web");
        var miutil  = require("miutil");
        var userName  = this.username();
        var password  = this.password();
        var port      = this.port();
        var acceptAnyCert = this.acceptAnyCert();
        var urlBase   = this.urlBase();
        var timeout   = config.timeout || 10;
        var pause     = config.checkTime || 1;
        var ssl_opts      =    { "verify_SSL": !acceptAnyCert };
        var agent = web.agent(ssl_opts);
        var token = miutil.obtainToken(agent, urlBase, userName, password,port,timeout,pause)|| '0';
        if (token == 0) {
                log.fatal(_("ControlM server does not  respond correctly"));
        }
        console.log(_('ControlM server OK.'));
        console.log('token : ' + token);
        ctx.stash('ctm_token',token);
        return token;
        }
    }
);