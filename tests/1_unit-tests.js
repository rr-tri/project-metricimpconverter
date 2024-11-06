const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function () {
    describe('Function convertHandler.getNum(input)', function () {
        it('should correctly read a whole number input', function () {
            assert.equal(convertHandler.getNum('4gal'), 4);
        });

        it('should correctly read a decimal number input', function () {
            assert.equal(convertHandler.getNum('4.2L'), 4.2);
        });

        it('should correctly read a fractional input', function () {
            assert.equal(convertHandler.getNum('1/2km'), 0.5);
        });

        it('should correctly read a fractional input with a decimal', function () {
            assert.equal(convertHandler.getNum('5.4/3lbs'), 1.8);
        });

        it('should correctly return an error on a double-fraction (i.e. 3/2/3)', function () {
            assert.equal(convertHandler.getNum('3/2/3kg'), 'invalid number');
        });

        it('should correctly default to a numerical input of 1 when no numerical input is provided', function () {
            assert.equal(convertHandler.getNum('kg'), 1);
        });
    });

    describe('Function convertHandler.getUnit(input)', function () {
        it('should correctly read each valid input unit', function () {
            const inputUnits = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
            inputUnits.forEach(unit => {
                assert.equal(convertHandler.getUnit(unit), unit);
            });
        });

        it('should correctly return an error for an invalid input unit', function () {
            assert.equal(convertHandler.getUnit('32g'), 'invalid unit');
        });
    });

    describe('Function convertHandler.getReturnUnit(initUnit)', function () {
        it('should return the correct return unit for each valid input unit', function () {
            const unitsMap = {
                'gal': 'L',
                'L': 'gal',
                'mi': 'km',
                'km': 'mi',
                'lbs': 'kg',
                'kg': 'lbs'
            };
            for (let unit in unitsMap) {
                assert.equal(convertHandler.getReturnUnit(unit), unitsMap[unit]);
            }
        });
    });

    describe('Function convertHandler.spellOutUnit(unit)', function () {
        it('should correctly return the spelled-out string unit for each valid input unit', function () {
            const spelledOutUnits = {
                'gal': 'gallons',
                'L': 'liters',
                'mi': 'miles',
                'km': 'kilometers',
                'lbs': 'pounds',
                'kg': 'kilograms'
            };
            for (let unit in spelledOutUnits) {
                assert.equal(convertHandler.spellOutUnit(unit), spelledOutUnits[unit]);
            }
        });
    });

    describe('Function convertHandler.convert(initNum, initUnit)', function () {
        it('should correctly convert gal to L', function () {
            assert.approximately(convertHandler.convert(1, 'gal'), 3.78541, 0.0001);
        });

        it('should correctly convert L to gal', function () {
            assert.approximately(convertHandler.convert(1, 'L'), 0.26417, 0.0001);
        });

        it('should correctly convert mi to km', function () {
            assert.approximately(convertHandler.convert(1, 'mi'), 1.60934, 0.0001);
        });

        it('should correctly convert km to mi', function () {
            assert.approximately(convertHandler.convert(1, 'km'), 0.62137, 0.0001);
        });

        it('should correctly convert lbs to kg', function () {
            assert.approximately(convertHandler.convert(1, 'lbs'), 0.45359, 0.0001);
        });

        it('should correctly convert kg to lbs', function () {
            assert.approximately(convertHandler.convert(1, 'kg'), 2.20462, 0.0001);
        });
    });

});
