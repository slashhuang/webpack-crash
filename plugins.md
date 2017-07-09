## plugins for webpack


# create a webpack plugins

A plugin for webpack consists of

1. A named JavaScript function.
2. Defines apply method in it's prototype.
3. Specifies webpack's event hook to attach itself.
4. Manipulates webpack internal instance specific data.
5. Invokes webpack provided callback after functionality is complete.


```js
    // A named JavaScript function.
    function MyExampleWebpackPlugin() {

    };
    // Defines `apply` method in it's prototype.
    MyExampleWebpackPlugin.prototype.apply = function(compiler) {
        // Specifies webpack's event hook to attach itself.
        compiler.plugin('webpacksEventHook', function(compilation /* Manipulates webpack internal             instance specific data. */, callback) {
            console.log("This is an example plugin!!!");
            // Invokes webpack provided callback after functionality is complete.
            callback();
        });
    };
```

### 依赖 tapable

> Tapable is a class for plugin ** binding and applying.**

