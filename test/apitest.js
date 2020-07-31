const app = require("../app");
const chai = require("chai");
const chaiHttp = require("chai-http");
const {APPKEY}=require('../config/appConfig')

const { expect } = chai;
chai.use(chaiHttp);
describe("weather api!", () => {
  it("get weather report api", done => {
    chai
      .request(app)
      .get("/weather")
      .query({appkey:APPKEY})
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.exist
        done();
      });
  });
  it("get weather live report api", done => {
    chai
      .request(app)
      .get("/liveweather")
      .query({appkey:APPKEY})
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.exist
        done();
      });
  });
  
});