Model = require './base.coffee'
{ API_URL } = require('sharify').data

module.exports = class Coupon extends Model
  urlRoot: "#{API_URL}/account/customer/coupons"
