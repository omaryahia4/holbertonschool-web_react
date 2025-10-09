#!/usr/bin/env python3

import json

with open('./task_2/package.json') as json_file:
    loaded_package_json = json.load(json_file)
    print(list(loaded_package_json.get('devDependencies').keys()))
    print(list(loaded_package_json.get('dependencies').keys()))
