# [Angular 2 QuickStart (seed project)](https://github.com/angular/quickstart) + gulp for distribution
  
This project focuses on gulp distribution of Angular's [QuickStart seed project](https://github.com/angular/quickstart).  
  
[Distributed demo](http://mobilewebsmart.com/_tests/20170819_angular_quickstart_gulp/index.html)  
  
For now I like using the [Angular quickstart (seed project)](https://github.com/angular/quickstart) for development. I'd like to use it as is. It already has linting, karma and e2e set up. But, the quickstart project does not have any way of generating a dist folder for easily distributing a production build. So, this project aims to stay out of the way of the Angular Quickstart 'src' folder when generating a 'dist' folder. You have the original project to compare to before this additional of gulp was made. It also has a Web.config file that you can simply delete if you do not need it. I distribute to a Windows server that is set up for .Net and this Web.config lets me override .Net routing and 404 redirect which gets in the way of Angular routing.  
  
## Files that were modified:
- [package.json](https://github.com/BumbleB2na/Angular-2-Quickstart-Gulp/blob/master/package.json) ([original seed project version for comparison](https://github.com/angular/quickstart/blob/master/package.json)) <-- added new scripts for dist build and run with watch (in tutorial directory run `npm run startdist` script). The additional scripts are trivial and don't have to be reused but, there were also additional packages installed and saved to the project as devDependencies that should install when you run `npm start`. Those packages are needed for gulp. For details of those required packages refer to [this tutorial by Colin Eberhardt](http://blog.scottlogic.com/2015/12/24/creating-an-angular-2-build.html).
- [src/main.ts](https://github.com/BumbleB2na/Angular-2-Quickstart-Gulp/blob/master/src/main.ts)  <-- added code to [enable Angular production mode if not localhost](https://angular.io/guide/deployment#enable-production-mode).  
  
## Files that were created:
- [bs-config.dist.json](https://github.com/BumbleB2na/Angular-2-Quickstart-Gulp/blob/master/bs-config.dist.json)  <-- used in new package.json script to use 'dist' instead of 'src' folder during prod build.
- [gulpfile.js](https://github.com/BumbleB2na/Angular-2-Quickstart-Gulp/blob/master/gulpfile.js)  <-- used to compile and copy files from  (in tutorial directory run `gulp`).
- [src/index.dist.html](https://github.com/BumbleB2na/Angular-2-Quickstart-Gulp/blob/master/src/index.dist.html)  <-- used by gulp to copy a distribution version of index.html where base href can be modified.
- [src/web.config](https://github.com/BumbleB2na/Angular-2-Quickstart-Gulp/blob/master/src/Web.config)  <-- used for hosting Angular web app on a Windows server that already has .Net routing and 404 redirect.  
  
# To use (Windows):
1. Manually update the href in index.dist.html and Web.config to match your folder location on your server (or set to '/' if it sits at root or if subfolder is set up to be the root of a domain name). Delete Web.config if not hosting Angular web app on subfolder of a Windows server where .Net is set up.
2. `npm install`  <-- devDependency packages install to node_modules in your project folder
3. `gulp`  <-- builds to dist folder
4. Optional: `npm run startdist`  <-- runs and watches the dist build, like it is done with src (dev) build in Quickstart Seed package.json script
5. Copy the contents of the dist folder to your server location
  
To help integrate gulp I followed [this tutorial by Colin Eberhardt](http://blog.scottlogic.com/2015/12/24/creating-an-angular-2-build.html) but used a different base project. Refer to it for more explanation of some of the concepts used here. Unlike the tutorial my base project is based off of Angular 2 Quickstart Seed project and I don't want the gulp process to do as much so that I can further separate dev from dist. I don't need to set up a linter in gulp on dist build because, the quickstart project already has linting set up on the dev build. I like to use the dev build as-is.  
  
I've diverged a bit from that tutorial and changed my dev and dist strategy as follows: 
- do all linting and testing on development build
- distribution build can be ran and watched same as development build to verify that it works before moving to server
- alternate index.html file for distribution to get around having to manually update base href before copying dist folder contents to server
- web.config that sits in Angular web app root to override .Net settings that prevent Angular routing  
  
## Gulp default task:
1. Cleans dist directory  (dist is distribution folder)
2. Copies the minimum node\_modules .js files to dist/node_modules directory to be used by distribution  
3. Copies src/ and src/app files to the dist directory. Does not copy TypeScript files or files with '.spec' in the filename
4. Copies src/index.dist.html to dist/index.html
  
# Planned updates:
1. Todo: figure out how to include a small, compiled version of rxjs in the dist build
2. Todo: use webpack to make a lighter-weight dist build  
