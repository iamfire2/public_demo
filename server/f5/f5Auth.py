import requests, json

class f5:

    url = None
    url_auth = '%s/shared/authn/login' % url

    def __init__(self, hostname, username, password):
        requests.packages.urllib3.disable_warnings()
        #Sets the global hostname to the IP:Port passed from the input
        self.hostname = hostname
        self.payload ={}
        self.bigip = requests.session()
        #Changes the headers for the F5 to accept JSON Payloads
        self.bigip.headers.update({'Content-Type': 'application/json'})
        self.bigip.auth = (username, password)
        self.bigip.verify = False
        self.url = 'https://%s/mgmt' % hostname
        #This is the url to authenicate to
        self.url_auth = '%s/shared/authn/login' % self.url
        self.get_token()
        # update session header
        self.bigip.headers.update({'X-F5-Auth-Token': self.token})
        #By default you don't need to input any variable for getConfig, however all you need to do to pull the config is add the parameter (yes or y) after the hostname


    def get_token(self):
        #This is needed to get the session token for the F5 for authentication
        self.payload['username'] = self.username
        self.payload['password'] = self.password
        self.payload['loginProviderName'] = 'tmos'
        reply = self.bigip.post(self.url_auth, json.dumps(self.payload))
        if reply.status_code != 200:
            raise ValueError("Connection to Device has failed.")

        reply = reply.json()
        self.token = reply["token"]["token"]

    def get_partitions(self):
        partitions = []
        vipUrl = "https://%s/mgmt/tm/auth/partition" % self.hostname #Path for Partitions in the F5
        result = self.bigip.get(vipUrl).json()
        for name in result["items"]:
            partitions.append(name['name'])
        return partitions

    def list_of_commands(self):
        list_of_commands = []
        #This takes the partition name list in the global list, and then is looped to be used to pull the config under the method get_config
        for name in self.get_partitions():
            list_of_commands.append('echo "cd /"' + name + '"; list ltm" | tmsh')
        return list_of_commands

    def get_config(self):
        payload = {}
        json_list = []
        #Runs each command created in the method list_of_commands into a loop for each partition for the ltm configuration (DOES NOT INCLUDE NETWORK/AUTH/SYS Modules)
        for command in self.list_of_commands():
            cmd = "-c \'" + command + "\'"
            payload['command'] = 'run'
            payload['utilCmdArgs'] = cmd

            configURL = 'https://%s/mgmt/tm/util/bash' % self.hostname #Path for using bash commands
            result = self.bigip.post(configURL, data=json.dumps(payload))
            json_data = result.json()

            if result.status_code is not 200:
                print('did not work')
            else:
                # print(json_conf) #This is the acutal output for the LTM Configuraiton Module
                json_list.append(json_data)
        return json_list






