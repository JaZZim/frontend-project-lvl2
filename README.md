# Gendiff.js
[![Actions Status](https://github.com/JaZZim/frontend-project-lvl2/workflows/hexlet-check/badge.svg)](https://github.com/JaZZim/frontend-project-lvl2/actions)
[![jest](https://github.com/JaZZim/frontend-project-lvl2/workflows/test-check/badge.svg)](https://github.com/JaZZim/frontend-project-lvl2/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/0afd8caf24241c2a34ba/maintainability)](https://codeclimate.com/github/JaZZim/frontend-project-lvl2/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/0afd8caf24241c2a34ba/test_coverage)](https://codeclimate.com/github/JaZZim/frontend-project-lvl2/test_coverage)

CLI utility that defines the difference between the two data structures.
## Features
- Supports input formats: ***yaml***, ***json***
- Report generation as ***plain text***, ***stylish*** and ***json***

## Install
```bash
$ git clone https://github.com/JaZZim/frontend-project-lvl2
$ cd frontend-project-lvl2
$ make install
$ make link
```

## Usage
```bash
gendiff [options] <filepath1> <filepath2>

Options:
  -V, --version        output the version number
  -f, --format [type]  output format: stylish, plain, json (default: "stylish")
  -h, --help           display help for command
```
## Exemple
```bash
#stylish format
gendiff path/file.json another/path/file.yml

{
    common: {
        follow: false
      - setting4: foo
      + setting4: bar
        setting5: {
            key5: value5
        }
        setting6: {
          - doge: {
                wow: so much
            }
            key: value
        }
    }
}

#plain format
gendiff --format plain file1.json file2.yml

Property 'common.setting4' was updated. From 'foo' to 'bar'
Property 'common.setting6.doge' was removed
```

