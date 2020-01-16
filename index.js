const express = require('express')
const app = express()
const PORT =  process.env.PORT  || 3000

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('/', (req, res) => {
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})

module.exports = app
