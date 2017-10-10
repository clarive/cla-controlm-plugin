
# Control-M plugin

Control-M plugin will allow you to automate the operation of Control-M from Clarive.

This plugin connect Clarive with Control-M through Control-M Automation API, you can do the following tasks from Clarive. 

- **Test and deploy job flows to the Control-M environment. -**
- **Run and test jobs against an existing Control-M. -**
- **List outputs and logs of jobs -**

# What is Control-M

It's  a BMC product to automate diverse batch application workloads, Enable DevOps collaboration with a Jobs-as-Code approach for application change and deployment cycle.

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

After restarting your Clarive's instance, you will have a new Resource 'ControlM'.

### ControlMServer
This Resource is to save your Control-M Server parameters:

- **Username -** User for Control-M Server.
- **Password -** The User password.
- **URL -** URL of the Control-M Server.
- **Port -** The Control-M Server port.
- **Accept any Server Certificate -** Check if you don't want to validate the Control-M Server Certificate.

Example:


		Username: Workbench
		Password: ********
		URL: 10.0.2.2
		Port: 8443
		Accept any Server Certificate: 'checked'

### Palette Service

This palette service 'Control-M action' will let you execute any available service of Control-M. The various parameters from the
palette service are:

- **ControlM Server-** Name of your ControlMServer Resource
- **Command-** Operation to perform.
		- Obtain token 			 		 - (obtain a Token, first task to do)
		- Build       			 		 - (test your JSON file workflow)
		- Deploy      			 		 - (Deploy your workflow file in Control-M)
		- Run jobs    			 		 - (Deploy and execute your workflow file)
		- Run Now the Job		 		 - (Run a job in Control-M)
		- Get status of Jobs by Jobname	 - (Give you status of a Jobs identified by it's Jobs name or prefix)
		- Get status of Jobs by Run ID   - (Give you status of a job identified by it's Run Id)
		- Get Job Output         		 - (Obtain the output of Jobs identified by jobname prefix or/and job status)
		- Get Job logs			 		 - (Obtain the log of Jobs)

- **Control-M JSON file-** Some commands require you provide a file describing the workflow in JSON format.
- **Job Name-** Some commands give you the option of filter results by the name or prefix of their Job Names.
- **JobId-** Some commands require you provide the Job Id.
- **Job Status-** Some commands give you the option of filter results by job status.
- **Timeout (seconds)-**  Time for the service stop trying to connect to the Control-M Server.
- **Refresh time (seconds)-** Wait time between tries of connecting to the Control-M Server.

Note: Para la regla se ejecute correctamente the first operation has to bee ser "obtain token" The first operation executed in a rule shoud be  "Obtain token" in order to execute any other command.




