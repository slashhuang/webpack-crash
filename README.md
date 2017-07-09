# webpack-crash

a webpack overview for webpack developers


## architecture

1. Validate webpack.config Schema （using 'ajv'）*

2. form `Compiler instance `

- webpack.config === Array   ==> `MultiCompiler`
- webpack.config ==>   `Compiler`

3. `run Compiler`

- if watchMode is true, run `compiler.watch(watchOptions, callback);`
