const express = require('express')
const app = express()
const port = 3000

const autoCompleteValues = ['Alpha','Beta','Gamma','Delta','Epsilon',
    'Zeta','Eta','Theta','Iota','Kappa','Lambda','Mu','Nu','Xi'
    ,'Omicron','Pi','Rho','Sigma','Tau','Upsilon','Phi','Chi','Psi','Omega']


app.get('/', (req, res) => {
    res.send(autoCompleteValues)
})

app.listen(port, () => {
    console.log(`App is listening on port ${port}`)
})