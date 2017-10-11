(function(params) {

    var server = Cla.ui.ciCombo({
            name: 'server',
            value: params.data.server,
            class: 'controlMServer',
            fieldLabel: 'Control-M server',
            allowBlank: false,
            anchor: '100%',
            with_vars: 1
        });

    var commandComboBox = Cla.ui.comboBox({
            name: 'command',
            fieldLabel: _('Operation'),
            data: [
                ['token',_('Obtain Token')],
                ['build',_('Test your WorkFlow')],
                ['deploy',_('Deploy your WorkFlow')],
                ['run',_('Run your WorkFlow jobs')],
                ['runnow',_('Run a job now')],
                ['getstatusbyname',_('Get status of jobs by jobname')],
                ['getstatusbyrunid',_('Get status of jobs by Run ID')],
                ['getjoboutput',_('Get job output')],
                ['getjoblog',_('Get job log')]
            ],
            value: params.data.command||'',
            allowBlank: false,
            anchor: '100%',
            sorted:true,
            singleMode: true,
        });

    var statusComboBox = Cla.ui.comboBox({
            name: 'status',
            fieldLabel: _('Job Status'),
            data: [
                ['endedok',_('Ended OK')],
                ['endednotok',_('Ended Not OK')],
                ['executing',_('Executing')],
                ['waituser',_('Wait User')],
                ['waitresource',_('Wait Resource')],
                ['waitcondition',_('Wait Condition')],
                ['waitworkload',_('Wait Workload')],
                ['waithost',_('Wait Host')],
                ['statusunknown',_('Status Unknown')]
            ],
            value: params.data.status||'',
            allowBlank: true,
            width: 500,
            singleMode: false,
            sorted:true,
            hidden: !(params.data.command  == 'getstatusbyname')
        });

    var jsonFile = Cla.ui.textField({
            name: 'jsonFile',
            fieldLabel: _('WorkFlow JSON File'),
            value: params.data.jsonFile||'',
            allowBlank: false,
            anchor: '95%',
            hidden: !(params.data.command  == 'build' || params.data.command  == 'deploy' || params.data.command  == 'runjobs')
    });

    var jobName = Cla.ui.textField({
            name: 'jobName',
            fieldLabel: _('Job name'),
            value: params.data.jobName||'',
            allowBlank: false,
            anchor: '95%',
            hidden: !(params.data.command  == 'getstatusbyname' )
    });

    var jobId = Cla.ui.textField({
            name: 'jobId',
            fieldLabel: _('Job Id'),
            value: params.data.jobId||'',
            allowBlank: false,
            anchor: '95%',
            hidden: !(params.data.command  == 'runnow' || params.data.command  == 'getjoboutput' || params.data.command  == 'getjoblog')
    });
    var runId = Cla.ui.textField({
            name: 'runId',
            fieldLabel: _('Run Id'),
            value: params.data.runId||'',
            allowBlank: false,
            anchor: '95%',
            hidden: !(params.data.command  == 'getstatusbyrunid')
    });
    var timeout = Cla.ui.numberField({
            name: 'timeout',
            fieldLabel: _('Timeout (seconds)'),
            value: params.data.timeout || 10,
            anchor: '50%',
    })

    var checkTime = Cla.ui.numberField({
            name: 'checktime',
            fieldLabel: _('Refresh time (seconds)'),
            value: params.data.checktime || 5,
            anchor: '50%'
    })

    commandComboBox.on('addItem',function(){
        var v = commandComboBox.getValue();
        if (v == 'token') {
            statusComboBox.allowBlank = true;
            statusComboBox.hide();
            jsonFile.allowBlank = true;
            jsonFile.hide();
            jobName.allowBlank = true;
            jobName.hide();
            jobId.allowBlank = true;
            jobId.hide();
            runId.allowBlank = true;
            runId.hide();
        } else if (v == 'build'){
            statusComboBox.allowBlank = true;
            statusComboBox.hide();
            jsonFile.allowBlank = false;
            jsonFile.show();
            jobName.allowBlank = true;
            jobName.hide();
            jobId.allowBlank = true;
            jobId.hide();
            runId.allowBlank = true;
            runId.hide();
        } else if (v == 'deploy'){
            statusComboBox.allowBlank = true;
            statusComboBox.hide();
            jsonFile.allowBlank = false;
            jsonFile.show();
            jobName.allowBlank = true;
            jobName.hide();
            jobId.allowBlank = true;
            jobId.hide();
            runId.allowBlank = true;
            runId.hide();
        } else if (v == 'run'){
            statusComboBox.allowBlank = true;
            statusComboBox.hide();
            jsonFile.allowBlank = false;
            jsonFile.show();
            jobName.allowBlank = true;
            jobName.hide();
            jobId.allowBlank = true;
            jobId.hide();
            runId.allowBlank = true;
            runId.hide();
        } else if (v == 'runnow'){
            statusComboBox.allowBlank = true;
            statusComboBox.hide();
            jsonFile.allowBlank = true;
            jsonFile.hide();
            jobName.allowBlank = true;
            jobName.hide();
            jobId.allowBlank = false;
            jobId.show();
            runId.allowBlank = true;
            runId.hide();
        } else if (v == 'getstatusbyname'){
            statusComboBox.allowBlank = true;
            statusComboBox.show();
            jsonFile.allowBlank = true;
            jsonFile.hide();
            jobName.allowBlank = true;
            jobName.show();
            jobId.allowBlank = true;
            jobId.hide();
            runId.allowBlank = true;
            runId.hide();
        } else if (v == 'getstatusbyrunid'){
            statusComboBox.allowBlank = true;
            statusComboBox.hide();
            jsonFile.allowBlank = true;
            jsonFile.hide();
            jobName.allowBlank = true;
            jobName.hide();
            jobId.allowBlank = true;
            jobId.hide();
            runId.allowBlank = false;
            runId.show();
        } else if (v == 'getjoboutput'){
            statusComboBox.allowBlank = true;
            statusComboBox.hide();
            jsonFile.allowBlank = true;
            jsonFile.hide();
            jobName.allowBlank = true;
            jobName.hide();
            jobId.allowBlank = false;
            jobId.show();
            runId.allowBlank = true;
            runId.hide();
        } else if (v == 'getjoblog'){
            statusComboBox.allowBlank = true;
            statusComboBox.hide();
            jsonFile.allowBlank = true;
            jsonFile.hide();
            jobName.allowBlank = true;
            jobName.hide();
            jobId.allowBlank = false;
            jobId.show();
            runId.allowBlank = true;
            runId.hide();

        }
    }
        )
    var panel = Cla.ui.panel({
        layout: 'form',
        items: [
            server,
            commandComboBox,
            statusComboBox,
            jsonFile,
            jobName,
            jobId,
            runId,
            timeout,
            checkTime
                ]
        });

   return panel;
})