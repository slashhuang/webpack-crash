/**
 * webpack运行架构
 */
// webpack step1  ==> validation
validateSchema(webpackOptionsSchema, options)
// webpack step2  ==> compiler [run or watch mode]
compiler.watch(watchOptions, callback);
compiler.run(callback);

/**
 * compiler architecture
 */ 
//ittle module for plugins
const Tapable = require("tapable");
//
class Compiler extends Tapable {
    watch(watchOptions, handler) {
		return new Watching(this, watchOptions, handler);
	}
    run(callback) {
        const onCompiled = (err, compilation) => {
            if(this.applyPluginsBailResult("should-emit", compilation) === false) {
                //
                this.applyPlugins("done", stats);
				return callback(null, stats);
            }
            this.emitAssets(compilation, err => {
				if(err) return callback(err);
				if(compilation.applyPluginsBailResult("need-additional-pass")) {
					compilation.needAdditionalPass = true;
					const stats = new Stats(compilation);
					stats.startTime = startTime;
					stats.endTime = Date.now();
					this.applyPlugins("done", stats);
					this.applyPluginsAsync("additional-pass", err => {
						if(err) return callback(err);
						this.compile(onCompiled);
					});
					return;
				}
                this.emitRecords(err => {
					if(err) return callback(err);
					const stats = new Stats(compilation);
					stats.startTime = startTime;
					stats.endTime = Date.now();
					this.applyPlugins("done", stats);
					return callback(null, stats);
				});
			});
        };
        this.applyPluginsAsync("before-run", this, err => {
			if(err) return callback(err);
			this.applyPluginsAsync("run", this, err => {
				if(err) return callback(err);
				this.readRecords(err => {
					if(err) return callback(err);
					this.compile(onCompiled);
				});
			});
		});
    }
}