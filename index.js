const express = require('express')
const bodyParser = require('body-parser')
const tourRouter = require('./routers/tour')
const guideRouter = require('./routers/guide')
const path = require('path');

require('./db/mongoose')


const app = express();

app.use('/', express.static(path.join(__dirname, 'html')));
app.use('/list', express.static(path.join(__dirname, 'html/tours.html')));
app.use('/js', express.static(path.join(__dirname, 'js')));
app.use('/add_tour', express.static(path.join(__dirname, 'html/add_tour_form.html')));
app.use('/add_guide', express.static(path.join(__dirname, 'html/add_guide_form.html')));
app.use('/public', express.static(path.join(__dirname, 'public')));





const port = process.env.PORT || 3001

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use(tourRouter)
app.use(guideRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})