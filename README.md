# webpack-crash

a webpack overview for webpack developers


## architecture

1. Validate webpack.config Schema （using 'ajv'）*

2. form `Compiler instance `

- webpack.config === Array   ==> `MultiCompiler`
- webpack.config ==>   `Compiler`

3. `run Compiler`

- if watchMode is true, run `compiler.watch(watchOptions, callback);`



## compiler生命周期

#### 异步流程`eventEmitter`

1.  `this.applyPluginsAsync("before-run", this, err => {  step2 })`

2. `this.applyPluginsAsync("run", this, err => {  step3  })`

3. `this.readRecords(err => { step4  });`

4. `this.applyPluginsAsync("before-compile", params, err => {  step5  })`

#### 同步触发所有compile流程

5. `this.applyPlugins("compile", params);  const compilation = this.newCompilation(params); ` step6

#### 异步流程

6. `this.applyPluginsParallel("make", compilation, err => {  step7 }`

7. `compilation.finish();  compilation.seal(err => { step8 })`

8. `this.applyPluginsAsync("after-compile", compilation, err => { step9 })`

#### 编译结束

1.  if(this.applyPluginsBailResult("should-emit", compilation) === false)
```js
    if(this.applyPluginsBailResult("should-emit", compilation) === false) {
        this.applyPlugins("done", stats);
        return callback(null, stats);
    }
```

2. else
```js
    this.emitAssets(compilation, err => {
        if(compilation.applyPluginsBailResult("need-additional-pass")) {
            this.applyPluginsAsync("additional-pass", err => {
				if(err) return callback(err);
				this.compile(onCompiled);
			});
        }
        this.emitRecords(err => {
			if(err) return callback(err);
			const stats = new Stats(compilation);
			stats.startTime = startTime;
		    stats.endTime = Date.now();
			this.applyPlugins("done", stats);
			return callback(null, stats);
		});
    })
```

