import request from 'supertest';
import mongoose from "mongoose";
import Activity from "../models/Activity";
import app from '../app.js';
import testdb from "./test_db.js";

beforeEach(async () => {
  testdb();
});

afterAll(async () => {
  await Activity.deleteOne();
  await mongoose.connection.close();
});

const activity = {
    user_id: "60fc016e026bee11115ba1e4",
    email: "haliho@gmail.com",
    activityDate: "1966-06-06",
    activityTime: "06:35",
    duration: 144,
    activityType: "futás",
    distance: 18000,
    comment: "rohadt hideg volt",
};

const updatedActivity = {
    user_id: "60fc016e026bee11115ba1e4",
    email: "haliho@gmail.com",
    activityDate: "1966-06-06",
    activityTime: "06:35",
    duration: 144,
    activityType: "futás",
    distance: 18000,
    comment: "annyira nem volt hideg csak szeles",
};

describe("testing activities", () => {
    it("POST /activities should respond with 200", async () => {
        await request(app)
        .post("/api/activities")
        .send(activity)
        .expect(200)
        .then((response) => {
            expect(response).toBeTruthy();
            console.log('response', response.body);
            expect(response.body.message).toEqual('Activity saved');
            activity["id"] = response.body.newActivity._id;
        });
    });

    it("PUT /activities/:id should respond with 200", async () => {
        await request(app)
        .put(`/api/activities/${activity.id}`)
        .send(updatedActivity)
        .expect(200)
        .then((response) => {
            expect(response.body).toBeTruthy();
        });
    });

    it("GET /activities/:id should response with 200", async () => {
        await request(app)
        .get(`/api/activities/${req.params.id}`)
        .expect(200)
        .then((response) => {
            expect(response.body).toBeTruthy();
        });
    });


});