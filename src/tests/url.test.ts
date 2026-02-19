import { beforeAll, afterAll, describe, it, expect } from "vitest";
import request from "supertest";
import { connectTestDatabase, closeTestDatabase } from "./setupDB.js";
import app from "../index.js"; // make sure index exports app (see note below)
import urlModel from "../models/url.model.js";

beforeAll(async () => {
  await connectTestDatabase();
});

afterAll(async () => {
  await closeTestDatabase();
});

describe("URL Shortener API", () => {
  describe("GET /api/urls", () => {
    it("should return all shortened URLs", async () => {
      await urlModel.create({
        originalUrl: "https://stackoverflow.com/",
        code: "code1",
        clicks: 3,
      });

      const res = await request(app).get("/api/urls");

      expect(res.status).toBe(200);

      expect(Array.isArray(res.body)).toBe(true);

      expect(res.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            code: "code1",
            originalUrl: "https://stackoverflow.com/",
            clicks: 3,
          }),
        ]),
      );
    });
  });

  describe("GET /:code", () => {
    it("should redirect when code exists", async () => {
      const doc = await urlModel.create({
        originalUrl: "https://www.youtube.com",
        code: "abc123",
      });

      const res = await request(app).get(`/${doc.code}`);

      expect(res.status).toBe(302);
      expect(res.headers.location).toBe("https://www.youtube.com");
    });

    it("should return 404 when code does not exist", async () => {
      const res = await request(app).get(`/gdog`);
      expect(res.status).toBe(404);
      expect(res.body.error).toBe("URL not found");
    });
  });

  describe("POST /api/shorten", () => {
    it("should create a short URL", async () => {
      const res = await request(app)
        .post("/api/shorten")
        .send({ url: "https://www.google.com" });

      expect(res.status).toBe(201);
      expect(res.body.shortUrl).toBeDefined();
    });

    it("should reject invalid URL", async () => {
      const res = await request(app)
        .post("/api/shorten")
        .send({ url: `${+new Date()}` });

      expect(res.status).toBe(400);
    });

    it("should save URL to the database", async () => {
      await request(app)
        .post("/api/shorten")
        .send({ url: "https://www.youtube.com" });

      const foundDocument = await urlModel.findOne({
        originalUrl: "https://www.youtube.com",
      });

      expect(foundDocument).not.toBeNull();
    });
  });
});
