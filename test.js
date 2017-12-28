
var FunctionChain = require('./FunctionChain').FunctionChain

var chain = new FunctionChain()

function print1(msg, callback) {
    console.log("1. " + msg)
    callback()
}

function print2(msg, callback) {
    console.log("2. " + msg)
    callback()
}

var list = [[print1, "m1", ()=>{chain.runNext()}],
	    [print2, "m2", ()=>{chain.runNext()}]]

//chain.addAll(...list)
chain.add(...list[0])
chain.add(...list[1])
chain.onComplete(function() {
    console.log('completed')
})

chain.start()
