# Control-M plugin

<img src="https://cdn.jsdelivr.net/gh/clarive/cla-controlm-plugin/public/icon/controlm.svg?sanitize=true" alt="Control-M Plugin" title="Control-M Plugin" width="120" height="120">

Control-M plugin will allow you to automate the operations of Control-M from Clarive.

This plugin connect Clarive with Control-M through their API, you can do the following tasks from Clarive.

- **Test and deploy WorkFlows in a Control-M environment.**
- **Schedule or run jobs in Control-M.**
- **List status, outputs and logs of jobs in Control-M.**

# What is Control-M

It's a BMC product to automate diverse batch application workloads, enable DevOps collaboration with a jobs-as-Code approach for application change and deployment cycle.

Control-M Automation API is a set of programmatic interfaces that give developers and DevOps engineers access to the capabilities of Control-M.
Check out BMC documentation for more info:

[BMC docs](https://docs.bmc.com/docs/display/public/workloadautomation/Control-M+Workload+Automation+Documentation)

[Github Control-M QuickStart](https://github.com/controlm/automation-api-quickstart)

## Requirements

A Control-M server or a Control-M workbench.
Clarive version 6.8 or newer.

## Installation

To install this plugin, place the `cla-controlm-plugin` folder inside the `$CLARIVE_BASE/plugins` directory in a Clarive
instance.

### ControlM Server

To configurate the ControlM Server Resource open:

In **Clarive SE**: Resources -> ClariveSE.

In **Clarive EE**: Resources -> ControlM.

This Resource is to save your Control-M server parameters:
- **Name -**  Identify your Control-M server.
- **Description -**  A short description of the Controlm-M server.
- **Moniker -** A short word to identify your Control-M server.
- **Username -** An existing Control-M user.
- **Password -** The password of the user.
- **URL -** URL of the Control-M server.
- **Port -** The Control-M server port.
- **Accept any server Certificate -** Check if you don't want to validate the Control-M server Certificate.

Example:

		Name: TESTCTM
		Description: Test Control-M server.
		Moniker: TEST
		Username: Workbench
		Password: ********
		URL: 10.0.2.2
		Port: 8443
		Accept any server Certificate: 'checked'

To test your Control-M resource definition, select the tab ´Services´ and click on `Check Server Availability`. In the following dialog window click run, and if the test is successful, you'll see the message `Control-M server OK.`.

### Control-M action

The various parameters are:

- **Control-M server (variable name: server)-** Select your Control-M server from the list.
- **Operation (command)-** Operation to perform:
	- **Obtain Token ("token")** - Obtains a Token, first task to do.
	- **Test your WorkFlow ("build")** - Tests your JSON file WorkFlow.
	- **Deploy your WorkFlow ("deploy")** - Deploys your WorkFlow file in Control-M.
	- **Run your WorkFlow jobs ("run")** - Deploys and execute your WorkFlow file.
	- **Run a job now ("runnow")** - Runs a job in Control-M.
	- **Get status of jobs by jobname ("getstatusbyname")** - Gives you status of a jobs identified by it's jobs name or prefix.
	- **Get status of jobs by Run ID ("getstatusbyrunid")** - Gives you status of a job identified by it's Run ID.
	- **Get job Output ("getjoboutput")** - Obtains the output of jobs identified by jobname prefix or/and job status.
	- **Get job log ("getjoblog")** - Obtains the log of jobs.
- **WorkFlow JSON file (json_file)** - Some operations require you set the path of a WorkFlow JSON file.
- **Job name (job_name)** - Optional value to filter output by the name or prefix of job names, only on some operations.
- **Job Id (job_id)** - Some operations require you provide the job ID.
- **Run Id (run_id)** - Some operations require you provide the run ID.
- **Job Status (status)** - Optional value to filter output by job status, only on some operations.
	- **Ended OK ("endedok")**
	- **Ended Not OK ("endednotok")**
	- **Executing ("executing")**
	- **Wait User ("waituser")**
	- **Wait Resource ("waitresource")**
	- **Wait Condition ("waitcondition")**
	- **Wait Workload ("waitworkload")**
	- **Wait Host ("waithost")**
	- **Status Unknown ("statusunknown")**
- **Timeout (seconds) (variable name: timeout)-**  Time for the service stop trying to connect to the Control-M server.
- **Refresh time (seconds) (variable name: checktime)-** Wait time between tries of connecting to the Control-M server.

## How to use

### Note
All operations except for 'Obtain Token' depends on a Token. In a Rule, execute the operation `Obtain Token` before any other Control-M operation.

### In Clarive EE

Once the plugin is placed in its folder, you can find this service in the palette in the section of generic service and can be used like any other palette op.

Op Name: **Control-M action**

Example:

```yaml
    Control-M server: ControlM Server
    Operation: Obtain Token
    Timeout (seconds): 10
    Refresh time (seconds): 10
``` 

```yaml
    Control-M server: ControlM Server
   	Operation: Get status of jobs by jobname
   	Job Status: Ended OK
   	Job name: test-name
    Timeout (seconds): 10
    Refresh time (seconds): 10
``` 

### In Clarive SE

#### Rulebook

If you want to use the plugin through the Rulebook, in any `do` block, use this ops as examples to configure the different parameters:

Example:

```yaml
rule: Control-M demo
do:
   - controlm_task:
       server: controlm_resource	# Required. Use the mid set to the resource you created
       command: 'token'			# Required   
       timeout: '10'            	# Required   
       check_time: '10'         	# Required
``` 

```yaml
rule: Yet another Control-M demo
do:
   - controlm_task:
       server: controlm_resource	# Required. Use the mid set to the resource you created
       command: 'getstatusbyname'	# Required
       status: ['endedok']
       job_name: 'test-name'   
       timeout: '10'            	# Required   
       check_time: '10'         	# Required
```

##### Outputs

###### Success

The service will return the Control-M API response.

###### Possible configuration failures

**Task failed**

You will get the error returned by the Control-M API.

**Variable required**

```yaml
Error in rulebook (compile): Required argument(s) missing for op "controlm_task": "command"
```

Make sure you have all required variables defined.

**Not allowed variable**

```yaml
Error in rulebook (compile): Argument `Command` not available for op "controlm_task"
```

Make sure you are using the correct paramaters (make sure you are writing the variable names correctly).

## More questions?

Feel free to join **[Clarive Community](https://community.clarive.com/)** to resolve any of your doubts.
