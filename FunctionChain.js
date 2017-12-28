
class FunctionChain {
    constructor(options) {
	this.currentIdx = -1
	this.chain = new Array()
	this._context = new Object()
	
	if (options) {
	    this.options = options
	    if (options.chain) {
		this.addAll(options.chain)
	    }

	    if (options.complete) {
		this.onComplete(options.complete)
	    }
	}
    }

    add(function_call) {
	this.chain.push(Object.values(arguments))
    }

    addAll(function_list) {
	this.chain.push(...Object.values(arguments))
    }

    runNext() {
	this.currentIdx++
	this.runCurrent()
    }

    start() {
	this.currentIdx = 0
	this.runCurrent()
    }

    runCurrent(params) {
	if (this.currentIdx >= this.chain.length) {
	    if (this.completeCall) {
		this.completeCall()
	    }
	}else {
	    let currentCall = this.chain[this.currentIdx]
	    let runParams = new Array()
	    // If "prependChainParam" is set to true,
	    // when a function in this chain is called,
	    // prepend this chain to the parameter list as
	    // the first parameter.
	    if ((this.options) && (this.options.prependChainParam)) {
		runParams.push(this)
	    }
	    runParams.push(...currentCall.slice(1))

	    if (params != null) {
		if (Array.isArray(params)) {
		    runParams.push(...params)
		}else {
		    runParams.push(params)
		}
	    }

	    currentCall[0].apply(undefined, runParams)
	}
    }

    onComplete(completeCall) {
	this.completeCall = completeCall
    }
}

function createFunctionChain(options) {
    return new FunctionChain(options)
}

exports.FunctionChain = FunctionChain
exports.createFunctionChain = createFunctionChain
