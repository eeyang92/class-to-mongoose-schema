'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = classToSchema;

var _mongoose = require('mongoose');

function isAttribute(obj) {
	if (obj === String || obj === Number || obj === Boolean || obj === Date || obj === _mongoose.Schema.Types.Mixed || obj === _mongoose.Schema.Types.ObjectId) {
		return true;
	}

	return false;
}

function getAllProps(obj) {
	var props = {
		methods: {},
		staticMethods: {},
		attributes: {},
		staticAttributes: {}
	};

	var usedNames = new Set();

	do {
		var tempStatics = Object.getOwnPropertyNames(obj.constructor).filter(function (value) {
			return value !== 'length' && value !== 'name' && value !== 'prototype' && !usedNames.has(value);
		});

		tempStatics.forEach(function (value) {
			var pValue = obj.constructor[value];
			if (typeof pValue === 'function' && !isAttribute(pValue)) {
				props.staticMethods[value] = pValue;
			} else {
				props.staticAttributes[value] = pValue;
			}

			usedNames.add(value);
		});

		var temp = Object.getOwnPropertyNames(obj).concat(Object.getOwnPropertySymbols(obj).map(function (s) {
			return s.toString();
		})).filter(function (value, i, arr) {
			return value !== 'constructor' && (i == 0 || value !== arr[i - 1]) && !usedNames.has(value);
		});

		temp.forEach(function (value) {
			var pValue = obj[value];
			if (typeof pValue === 'function' && !isAttribute(pValue)) {
				props.methods[value] = pValue;
			} else {
				props.attributes[value] = pValue;
			}

			usedNames.add(value);
		});
	} while ((obj = Object.getPrototypeOf(obj)) && Object.getPrototypeOf(obj));

	return props;
}

function classToSchema(obj, schemaOptions) {
	var props = getAllProps(obj);
	var schema = new _mongoose.Schema(props.attributes, schemaOptions);

	schema.statics = props.staticMethods;
	schema.methods = props.methods;

	return schema;
}

