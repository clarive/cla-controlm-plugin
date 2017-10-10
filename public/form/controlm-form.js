(function(params) {
    console.log(params);
    var username = Cla.ui.textField({
        name: 'username',
        fieldLabel: _('Username'),
        allowBlank: false
    });

    var password = Cla.ui.textField({
        name: 'password',
        fieldLabel: _('Password'),
        inputType: 'password',
        allowBlank: false
    });

    var urlBase = Cla.ui.textField({
        name: 'urlBase',
        fieldLabel: _('URL'),
        allowBlank: false,
        value: params.rec.urlBase||'https://www.example.com/support'
    });

    var port = Cla.ui.numberField({
        name: 'port',
        fieldLabel: _('Port'),
        allowBlank: false,
        maxLength: '5',
        value: 8443
    });
    var accept_any_cert = Cla.ui.checkBox({
        name: 'accept_any_cert',
        fieldLabel: _('Accept any Server Certificate'),
        checked:params.rec.accept_any_cert||false
    });

    return [
        username,
        password,
        urlBase,
        port,
        accept_any_cert
    ]
})