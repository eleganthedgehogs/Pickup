# eleganthedgehogs

> Pithy project description

### Team

  - __Product Owner__: Carlos Portillo
  - __Scrum Master__: Joe Lee
  - __Development Team Members__: Vien Tang, Erik Suddath 

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)
1. [Team](#team)
1. [Contributing](#contributing)

## Usage

> Some usage instructions

If map markers are flickering, go into the react-native-maps client/node_modules/react-native-maps/components/decorateMapComponent.js and
**************************************************************************
CHANGE LINE 51 FROM
'components.default = getDefaultComponent();' 
TO 
'if (!components.default) components.default = getDefaultComponent();'
**************************************************************************

## Requirements

- Node 0.10.x
- Redis 2.6.x
- Postgresql 9.1.x
- etc
- etc

## Development

### Installing Dependencies

From within the root directory:

```sh
sudo npm install -g bower
npm install
bower install
```

### Roadmap

View the project roadmap [here](LINK_TO_PROJECT_ISSUES)


## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.


