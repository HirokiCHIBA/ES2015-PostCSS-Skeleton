Mass-images-evaluator
===
A webapp to evaluate a lot of images while comparing with an example.  
This app was made for run on Apache HTTP server.

Build
---
Before using this application, you should build source files with following commands.
```sh
npm install -g gulp
npm install
gulp build
```

Usage
---
1. Prepare images to be evaluated and the example.
2. Prepare JSON files that descrives questions, datasets, answers, and the order.
3. Run build.
4. Place files under `build/` to your Apache server.
