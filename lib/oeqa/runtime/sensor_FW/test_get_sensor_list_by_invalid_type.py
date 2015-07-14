'''Verify error returns if invalid type id provided to api sf_get_sensor_list()'''
import os
from oeqa.oetest import oeRuntimeTest
import readConfigFile

class TestGetSensorListByInvalidType(oeRuntimeTest):
    '''Verify error happens when try to get sensor list by invalid type id'''
    def test(self):
        '''push binary to target and run with argument'''
        mkdir_path = "mkdir -p /opt/sensor-test/apps"
        (status, output) = self.target.run(mkdir_path)
        copy_to_path = os.path.join(get_files_dir(), 'test_get_sensor_list_by_type')
        (status, output) = self.target.copy_to(copy_to_path, \
"/opt/sensor-test/apps/")
        #run test to check error message when get sensor list by invalid type id
        client_cmd = "/opt/sensor-test/apps/test_get_sensor_list_by_type "\
                     + readConfigFile.ReadConfFile.getSectionValue( 'sensors','invalid-sensor-type-id')
        (status, output) = self.target.run(client_cmd)
        print output
        self.assertEqual(status, 0, msg="Error messages: %s" % output)