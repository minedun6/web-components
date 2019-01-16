# Web Component Markup Kit

An HTML, CSS, and JavaScript boilerplate for building a web component in the [Pearson Web Components project](https://github.com/pearson-ux/web-components).

## Getting Started

Follow these steps carefully!

1. Navigate to the folder where the existing markup for the component lives.
2. Create a new git branch with the name `component/COMPONENT_NAME`, where `COMPONENT_NAME` is the name of the component you are building.
3. Download this repository as a zipfile.
  * If you clone this repo, **you must remove its `.git` directory**. If you do not remove this directory, the spec kit will become a submodule in the web component's repo. Submodules are not the correct approach, and are not supported.
4. Unzip the zipfile and move the contents of the resultant folder into the _root folder_ of the component you are working on.
  * This means that the existing `markup-kit` folder should be a _sibling_ of the new files from the spec-kit folder
5. Delete the folder that was created in the unzip operation.
5. From within the root of this project, run `npm install` to install its dependencies.
7. Run `gulp` to build, serve, and watch your spec kit. Your browser will open a new tab with a Browsersync server, which will automatically refresh as you develop.

The code below accomplishes steps 1 through 7 using cloning. Replace `PATH_TO_WEB_COMPONENTS_DIRECTORY` with the path to the web components repo on your machine, and replace `COMPONENT_NAME` with the name of the component you are developing.

```bash
# Move to the directory housing the existing markup-kit.
cd PATH_TO_WEB_COMPONENTS_DIRECTORY/COMPONENT_NAME
# Create a new branch for the web component
git checkout -b component/COMPONENT_NAME
# Clone the spec kit starter, renaming it as `temp`
# (the temp folder will be deleted shortly)
git clone --depth 1 https://github.com/pearson-ux/web-component-spec-kit temp
# Move the contents of `temp` into this folder
mv temp/* temp/.gitignore ./
# Delete the temp directory and its contents
rm -rf temp/
# Install the kit's dependencies
npm install
# Build, serve, and watch the spec kit for changes.
gulp
```

## Developing the web component

The existing markup kit should be used as the basis for the styling and behaviors of the final web component. Refer to the [Pearson UX Framework](https://uxframework.pearson.com/) for more details about how your component should behave. If your component is not in the UXF, details about it should be documented on a relevant issue on [Web Components project board](https://github.com/pearson-ux/web-components/projects).

### Building

This kit comes with a Gulp build system to streamline development. It exposes the following tasks:

- `default`: executes `build`, `watch`, and `serve`
- `build`: Transpiles the SASS and JavaScript files
- `watch`: Watches the HTML, SASS, and JavaScript files for changes
- `serve`: Starts a Browsersync server

Most of the time, the default task, executed by just running `gulp` itself, will be all you need.

### Setting up

After you run `gulp` the first time, the file tree in the spec kit will look like this:

``` bash
├── css
│   └──style.css
├── js
│   ├── dist
│   └── pearson-timepicker.js
├── markup-kit
├── node_modules
├── scss
│    ├── _animations.scss
│    ├── _elements.scss
│    ├── _example.scss
│    └── style.scss
├── gulpfile.js
├── index.html
├── package-lock.json
├── package.json
└── README.md
```

Replace the word `example` in the SCSS and JavaScript file names with the name the component you are developing. For instance, `_example.scss` should become `_alert.scss` These file names will have to be edited in where they are referenced, as well: `index.html` imports the `example.js` file; `style.scss` imports the `_example.scss` file.

To see your stylesheet applied to your component, you _must_ copy the code in `css/style.css` into the template in your JS file.

## Contributing

Consult the [Pearson Web Components project wiki](https://github.com/pearson-ux/web-components/wiki) to learn some best-practices for writing code and submitting pull requests to the project.
