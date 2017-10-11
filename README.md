
# Control-M plugin

Control-M plugin will allow you to automate the operations of Control-M from Clarive.

This plugin connect Clarive with Control-M through Control-M Automation API, you can do the following tasks from Clarive.

- **Test and deploy WorkFlows in a Control-M environment.**
- **Schedule or run jobs in Control-M.**
- **List status, outputs and logs of jobs in Control-M.**

# What is Control-M

It's a BMC product to automate diverse batch application workloads, enable DevOps collaboration with a jobs-as-Code approach for application change and deployment cycle.

Control-M Automation API is a set of programmatic interfaces that give developers and DevOps engineers access to the capabilities of Control-M.
Check out Control-M documentation for more info:
https://docs.bmc.com/docs/display/public/workloadautomation/Control-M+Workload+Automation+Documentation
https://github.com/controlm/automation-api-quickstart

## Requirements

A Control-M server or a Control-M workbench.
Clarive version 6.8 or newer.

Check out Clarive documentation for more info:
http://docs.clarive.com/guide/guide-start/

## Installation

To install this plugin, place the `cla-controlm-plugin` folder inside the `$CLARIVE_BASE/plugins` directory in a Clarive
instance.

## How to Use

Once the plugin is placed in its folder, you can start using it going to your Clarive's instance.

After restarting your Clarive's instance, you will have a new Resource 'ControlMserver' and a palette service `Control-M action`.

### ControlMserver

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

### Palette Service

This palette service `Control-M action` will let you execute any available service of Control-M.
To use this operation, just drag this service into the rule and complete the following parameters:

- **Name -** Name of the rule operation.
- **Control-M server -** Select your Control-M server from the list.
- **Operation -** Operation to perform.
	- ** Obtain Token 		            - ** (Obtain a Token, first task to do)
	- ** Test your WorkFlow             - ** (Test your JSON file WorkFlow)
	- ** Deploy your WorkFlow  		 	- ** (Deploy your WorkFlow file in Control-M)
	- ** Run your WorkFlow jobs 		- ** (Deploy and execute your WorkFlow file)
	- ** Run a job	now	 		 		- ** (Run a job in Control-M)
	- ** Get status of jobs by jobname	- ** (Give you status of a jobs identified by it's jobs name or prefix)
	- ** Get status of jobs by Run ID   - ** (Give you status of a job identified by it's Run ID)
	- ** Get job Output         		- ** (Obtain the output of jobs identified by jobname prefix or/and job status)
	- ** Get job log 			 		- ** (Obtain the log of jobs)

- **WorkFlow JSON file -** Some operations require you set the path of a WorkFlow JSON file.
- **Job name -** Optional value to filter output by the name or prefix of job names, only on some operations.
- **Job Id -** Some operations require you provide the job Id.
- **Job Status -** Optional value to filter output by job status, only on some operations.
- **Timeout (seconds) -**  Time for the service stop trying to connect to the Control-M server.
- **Refresh time (seconds) -** Wait time between tries of connecting to the Control-M server.

### Note
All operations except for 'Obtain Token' depends on a Token. In a Rule, execute the operation `Obtain Token` before any other Control-M operation.





