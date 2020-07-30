process.env.NODE_ENV = 'test';

let chai = require('chai');
let chaiHttp = require('chai-http');
var should = chai.should();
chai.use(chaiHttp);
let server = require('../bin/');
const APPKEY=require('../config/appConfig')
//Our parent block
describe('weather', () => {
 describe('/GET weather report', () => {
     it('it should GET report', (done) => {
     chai.request(server)
       .get(`/weather?appkey=${APPKEY}`)
       .end((err, res) => {
             (res).should.have.status(200);
             (res.body).should.be.a('object');
             (res.body.length).should.be.eql(1);
             done();
          });
       });
  });})


var expect  = require('chai').expect;
var request = require('request');

it('Main page content', function(done) {
    request('http://localhost:8080' , function(error, response, body) {
        expect(body).to.equal('Hello World');
        done();
    });
});