Va
==

Helper function for javascript varargs.



Usage
-----

```javascript
var va = require('va');

var start = function (port, host, options, callback) {
    var args = va(arguments, 'number port', 'string host=', 'object options=', 'function callback=');
    console.log(args);
};

start(8080);
# => {port: 8080, host: undefined, options: undefined, callback: undefined}

start(8080, console.log);
# => {port: 8080, host: undefined, options: undefined, callback: console.log}

start(8080, 'localhost', console.log);
# => {port: 8080, host: 'localhost', options: undefined, callback: console.log}

start(8080, 'localhost', {timeout: 100}, console.log);
# => {port: 8080, host: 'localhost', options: {timeout: 100}, callback: console.log}

start(8080, {timeout: 100}, console.log);
# => {port: 8080, host: undefined, options: {timeout: 100}, callback: console.log}

start(console.log);
# => {} because the port is mandatory (no "=" at end of the argument description)
```



Git repository
--------------

git://github.com/francoiscolas/va.git



License
-------

MIT license  

Copyright (C) 2011 by François Colas <francoiscolas@gmail.com>  

Permission is hereby granted, free of charge, to any person obtaining a copy  
of this software and associated documentation files (the "Software"), to deal  
in the Software without restriction, including without limitation the rights  
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell  
copies of the Software, and to permit persons to whom the Software is  
furnished to do so, subject to the following conditions:  

The above copyright notice and this permission notice shall be included in  
all copies or substantial portions of the Software.  

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR  
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,  
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE  
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER  
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,  
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN  
THE SOFTWARE.  

