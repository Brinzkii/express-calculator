const axios = require('axios');
const url = 'http://localhost:3000/'

describe('mean', () => {
    it('finds the average of given numbers', async () => {
        let res = await axios.get(url + 'mean?nums=1,3,5');
        expect(res.data).toEqual({
            "response": {
                "operation": "mean",
                "value": 3
            }
        })
    })

    it('should return error message with code 400 if non numbers in list', async () => {
        try {
            let res = await axios.get(url + 'mean?nums=1,3,5,foo');
        } catch (err) {
            expect(err.response.status).toEqual(400);
        }
        
    })

    it('should return error message with code 400 if no numbers given', async () => {
        try {
            let res = await axios.get(url + 'mean?nums=');
        } catch (err) {
            expect(err.response.status).toEqual(400);
        }
    })
})

describe('median', () => {
    it('should find the midpoint of a range of values', async () => {
        let res = await axios.get(url + 'median?nums=1,2,3');
        expect(res.data).toEqual({
            "response": {
                "operation": "median",
                "value": 2
            }
        })

        res = await axios.get(url + 'median?nums=1,2,3,4');
        expect(res.data).toEqual({
            "response": {
                "operation": "median",
                "value": 2.5
            }
        })
    })

    it('should return error message with code 400 if non numbers in list', async () => {
        try {
            let res = await axios.get(url + 'median?nums=1,3,5,foo');
        } catch (err) {
            expect(err.response.status).toEqual(400);
        }
        
    })

    it('should return error message with code 400 if no numbers given', async () => {
        try {
            let res = await axios.get(url + 'median?nums=');
        } catch (err) {
            expect(err.response.status).toEqual(400);
        }
    })
})

describe('mode', () => {
    it('should find the value that appears most frequently in range of values', async () => {
        let res = await axios.get(url + 'mode?nums=1,1,1,2');
        expect(res.data).toEqual({
            "response": {
                "operation": "mode",
                "value": 1
            }
        })
    })

    it('should find multiple values if there is a tie for most frequent', async () => {
        let res = await axios.get(url + 'mode?nums=1,1,3,2,2')
        expect(res.data).toEqual({
            "response": {
                "operation": "mode",
                "values": [
                    1,
                    2
                ]
            }
        })
    })

    it('should return error message with code 400 if non numbers in list', async () => {
        try {
            let res = await axios.get(url + 'mode?nums=1,3,5,foo');
        } catch (err) {
            expect(err.response.status).toEqual(400);
        }
        
    })

    it('should return error message with code 400 if no numbers given', async () => {
        try {
            let res = await axios.get(url + 'mode?nums=');
        } catch (err) {
            expect(err.response.status).toEqual(400);
        }
    })
})