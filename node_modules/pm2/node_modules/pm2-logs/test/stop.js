console.log('Process started');

setTimeout(function() {
  console.error('Process exits')
  process.exit(1)
}, 10)
