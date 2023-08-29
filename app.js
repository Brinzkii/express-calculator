const express = require('express');
const ExpressError = require('./expressError');
const app = express();

function mean(req, res, next) {
    try {
        if (!req.query.nums) throw new ExpressError('Must enter numbers via query string!', 400);

        let query = req.query.nums.split(',');
        let sum = 0; 

        query.forEach((val) => {
            if (!Number(val)) throw new ExpressError('Must include only numbers!', 400);

            sum += Number(val);
        })

        res.json({response:{operation: 'mean', value: sum / query.length}})
    } catch (err) {
        next(err)
    }
}
app.get('/mean', mean);

function median(req, res, next) {
    try {
        if (!req.query.nums) throw new ExpressError('Must enter numbers via query string!', 400);

        let result;
        let query = req.query.nums.split(',');
        let nums = query.map((val) => {
            if (!Number(val)) throw new ExpressError('Must include only numbers!', 400);

            return Number(val);
        })
        nums.sort((a,b) => {
            return a - b;
        });
        
        if (nums.length % 2 == 0) {
            let high = nums.length / 2;
            let low = high - 1;

            result = (nums[low] + nums[high]) / 2;
        } else {
            result = nums[Math.floor(nums.length / 2)];
        }

        res.json({response:{operation: 'median', value: result}});
    } catch (err) {
        next(err)
    }
}

app.get('/median', median);

function mode(req, res, next) {
    try {
        if (!req.query.nums) throw new ExpressError('Must enter numbers via query string!', 400);

        let query = req.query.nums.split(',');
        let count = {};

        query.forEach((val) => {
            if (!Number(val)) throw new ExpressError('Must include only numbers!', 400);

            if (count[Number(val)]) {
                count[Number(val)] += 1;
            } else {
                count[Number(val)] = 1;
            }
        })

        let highestVal = Math.max(...Object.values(count));
        console.log(highestVal);

        let results = Object.keys(count).filter((x) => count[x] === highestVal)

        if (results.length > 1) {
            res.json({response:{operation: 'mode', values: results.map((x) => {return Number(x)})}});
        } else {
            res.json({response:{operation: 'mode', value: Number(results[0])}});
        }

        
    } catch (err) {
        next(err)
    }
}

app.get('/mode', mode);

app.use((err, req, res, next) => {
    let status = err.status || 500;
    let message = err.message;

    return res.status(status).json({error: {message, status}});
})

app.listen(3000, () => {
    console.log('Calculator running on port 3000');
})

module.exports = {mean, median, mode};