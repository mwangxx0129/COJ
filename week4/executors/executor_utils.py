import os
import docker
import shutil
import uuid

from docker.errors import APIError
from docker.errors import ContainerError
from docker.errors import ImageNotFound

'''
"/afd/Example.java"
"/af/example.py"

javac xxx
python

java Example
python
'''

client = docker.from_env()

IMAGE_NAME = 'mwangxx/cs503_1703'
CURRENT_DIR = os.path.dirname(os.path.relpath(__file__))
TEMP_BUILD_DIR = '%s/tmp/' % CURRENT_DIR

SOURCE_FILE_NAMES = {
    'java': 'Example.java',
    'python': 'example.py'
}

BINARY_NAMES = {
    'java': 'Example',
    'python': 'example.py'
}

BUILD_COMMANDS = {
    'java': 'javac',
    'python': 'python'
}

EXECUTE_COMMANDS = {
    'java': 'java',
    'python': 'python'
}

def load_image():
    try:
        client.images.get(IMAGE_NAME)
        print 'image exists locally'
    except ImageNotFound:
        print 'image not found locally, loading from odocker hub...'
        client.images.pull(IMAGE_NAME)
    except APIError:
        print 'image not found'
        return
    print 'image loaded'

def make_dir(dir):
    try:
        os.mkdir(dir)
        print 'temp build dir [%s] created' % dir
    except OSError:
        print 'temp build dir [%s] exists. ' % dir

def build_and_run(code, lang):
    # "./tmp/uuid/Example.java"
    result = {'build': None, 'run': None}
    source_file_parent_dir_name = uuid.uuid4()
    source_file_host_dir = '%s/%s' % (TEMP_BUILD_DIR, source_file_parent_dir_name)

    # '/test/uuid/Example.java'
    source_file_guest_dir = '/test/%s' % (source_file_parent_dir_name)
    
    make_dir(source_file_host_dir)

    # write codes to file
    with open('%s/%s' % (source_file_host_dir, SOURCE_FILE_NAMES[lang]), 'w') as source_file:
        source_file.write(code)

    # build in docker
    try:
        client.containers.run(
            image=IMAGE_NAME,
            command="%s %s" % (BUILD_COMMANDS[lang], SOURCE_FILE_NAMES[lang]),
            volumes={source_file_host_dir: {'bind': source_file_guest_dir, 'mode': 'rw'}},
            working_dir=source_file_guest_dir
        )
        print 'source built'
        result['build'] = 'ok'
    except ContainerError as e:
        print 'build failed'
        result['build'] = e.stderr
        shutil.rmtree(source_file_host_dir)
        return result
    
    # run in docker
    try:
        log = client.containers.run(
            image=IMAGE_NAME,
            command="%s %s" % (EXECUTE_COMMANDS[lang], BINARY_NAMES[lang]),
            volumes={source_file_host_dir: {'bind': source_file_guest_dir, 'mode': 'rw'}},
            working_dir=source_file_guest_dir
        )
        print 'executed'
        result['run'] = log
    except ContainerError as e:
        print 'execution failed'
        result['run'] = e.stderr
        shutil.rmtree(source_file_host_dir)
        return result

    shutil.rmtree(source_file_host_dir)
    return result