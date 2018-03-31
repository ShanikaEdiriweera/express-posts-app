module.exports = function(req, res, next){
    let start = +new Date()
    let stream = process.stdout
    let url = req.url
    let method = req.method

    let body = ''
    res.on('data', (chunk) => {
        body += chunk
    });

    res.on('finish', () => {
        let duration = +new Date() - start
        // body not printing
        let message = method + ' to ' + url + '\ntook ' + duration + ' ms \n'+body+'\n\n'  
        stream.write(message)
    })
    next()
}