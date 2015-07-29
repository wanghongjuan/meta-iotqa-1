'''Verify can't disconnect a sensow which haven't been connected'''
import os
from oeqa.utils.helper import get_files_dir
from oeqa.oetest import oeRuntimeTest
import readConfigFile

class TestDisconnectUnconnectedSensor(oeRuntimeTest):
    '''Verify fail to disconnect a sensor not connected'''
    def testDisconnectUnconnectedSensor(self):
        '''push binary to target and run with argument'''
        mkdir_path = "mkdir -p /opt/sensor-test/apps"
        (status, output) = self.target.run(mkdir_path)
        copy_to_path = os.path.join(get_files_dir(), 'test_disconnect_unconnected_sensor')
        (status, output) = self.target.copy_to(copy_to_path, \
"/opt/sensor-test/apps/")
        client_cmd = "/opt/sensor-test/apps/test_disconnect_unconnected_sensor "\
                     + readConfigFile.ReadConfFile.getSectionValue( 'sensors','invalid-id')
        (status, output) = self.target.run(client_cmd)
        print output
        self.assertEqual(status, 1, msg="Error messages: %s" % output)
