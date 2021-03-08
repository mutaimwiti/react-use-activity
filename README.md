# react-use-activity

[![build](https://travis-ci.com/mutaimwiti/react-use-activity.svg?branch=main)](https://travis-ci.com/mutaimwiti/react-use-activity)
[![version](https://img.shields.io/npm/v/react-use-activity.svg)](https://www.npmjs.com/package/react-use-activity)
[![downloads](https://img.shields.io/npm/dm/react-use-activity.svg)](https://www.npmjs.com/package/react-use-activity)
[![license](https://img.shields.io/npm/l/react-use-activity.svg)](https://www.npmjs.com/package/react-use-activity)

React hook that let's you react to user activity or inactivity

### Installation

Use one of the two based on your project's dependency manager.

```bash
$ npm install react-use-activity --save

$ yarn add react-use-activity
```

### Getting started

```javascript
import useActivity from 'react-use-activity';

useActivity({
  timeout: 2000,
  onActivity: () => {},
  onInactivity: () => {},
  activityEvents: 'mousemove',
});
```

Arguments:
- `options`
  - `timeout` - the duration (ms) of inactivity that should trigger `onInactivity` - defaults to `2000`
  - `onActivity` - a callback that is executed any time user activity is registered
  - `onInactivity` - a callback that is executed when user is inactive for the specified timeout
  - `activityEvents` - a space delimited string specifying dom events that should be treated as user activity - defaults to `mousemove`
  -  `invokeOnActivityOnce` - a boolean indicating whether `onActivity` should be called once until an inactive state is reached - defaults to `true`
  
### CodeSandbox example
https://codesandbox.io/s/lingering-glade-p1yun?file=/src/App.js
   
### Licence

[MIT](https://mit-license.org/) © Mutai Mwiti |
[GitHub](https://github.com/mutaimwiti) |
[GitLab](https://gitlab.com/mutaimwiti)

_**DISCLAIMER:**_
_All opinions expressed in this repository are mine and do not reflect any company or organisation I'm involved with._
