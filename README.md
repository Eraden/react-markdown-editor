# react-markdown-editor
A markdown editor using React/Reflux.

## Installation
```bash
yarn add https://github.com/Eraden/react-markdown-editor.git file-loader url-loader font-awesome materialize-css
```

```css
@import "~react-markdown-editor/lib/MarkdownEditor.css";
@import "~font-awesome/css/font-awesome.css";
```

```javascript
module.exports = {
    module: {
        rules: [
            {
                test:   /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "url-loader?limit=10000&mimetype=application/font-woff"
            },
            {
                test:   /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "file-loader"
            }
        ]
    },
    resolve:   {
        extensions: [
            ".wasm",
            ".mjs",
            ".js",
            ".jsx",
            ".json",
            ".css",
            ".modules.css",
            ".png",
            ".jpg",
            ".jpeg",
            ".gif",
            ".svg",
            ".woff",
            ".ttf",
            ".eot",
            ".svg"
        ]
    }
};
```

## Features
From the UI:

- Bold
- Italic
- Header
- Subheader
- Link
- Unordered List
- Inline Images

Of course it is a regular markdown editor (using the nice [markdown-js](https://github.com/evilstreak/markdown-js) library), so you are not limited to the UI.

## Usage
To render the component:

```javascript
import React          from "react";
import MarkdownEditor from "react-markdown-editor";

import store from "./store";

const TestComponent = () => (
    <MarkdownEditor
        initialContent="Test"
        iconsSet="font-awesome"
        store={store}
        name="myEditor"
    />
);

React.render(<TestComponent />, document.getElementById('content'));
```

```javascript
import { combineReducers } from "redux";
import { reducers }        from "react-markdown-editor"


export default combineReducers({
    ...,
    myEditor: reducers,
});
```

```<MarkdownEditor /> ``` takes two required props:

    - initialContent which is the text you want the textarea to contain on initialization.
    - iconsSet which is the icons provider you want to use. It can either be font-awesome or materialize-ui

Optional props:

   - ```onContentChange```, function to be called on each content change, getting the new content as an argument (as the property name says!)

You can also listen to content changes on the editor. If you are using Reflux, by listening to the changes on ```MarkdownEditorContentStore```.
To be able to do so, just ```require('react-markdown-editor').MarkdownEditorContentStore;```

## Dependencies
You can modify the styles directly by modifying the styles declared in ```dist/MarkdownEditor.js```. The pre-existing styles assume that you are using Bootstrap and Font Awesome.

## TODO
- [ ] Cross-browsers testing
- [ ] Move to Redux

## Issues/Contribution
You can open an issue on the github repo, or contact me directly by email.

## Help
Please, if you are using this package, let me know. I am interested to know what you think of it, even if it was on a tiny side-project.

## Screenshots
![Editing tab](http://i.imgur.com/XPdJmqm.png "Editing tab")
![Editing tab with custom styles](http://imgur.com/a/pLuLd "Editing tab with custom styles")
![Preview tab](http://i.imgur.com/uavBSUN.png "Preview tab")
