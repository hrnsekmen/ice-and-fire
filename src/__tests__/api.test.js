import { test, expect } from "@jest/globals";
import axios from "axios";
test("Characters endpoint should return an array of characters", (done) => {
  axios
    .get("https://anapioficeandfire.com/api/characters")
    .then((response) => {
      expect(response.status).toBe(200);
      expect(Array.isArray(response.data)).toBe(true);
      done();
    })
    .catch((error) => {
      done(error);
    });
});
test("Houses endpoint should return an array of characters", (done) => {
  axios
    .get("https://anapioficeandfire.com/api/houses")
    .then((response) => {
      expect(response.status).toBe(200);
      expect(Array.isArray(response.data)).toBe(true);
      done();
    })
    .catch((error) => {
      done(error);
    });
});
test("Books endpoint should return an array of characters", (done) => {
  axios
    .get("https://anapioficeandfire.com/api/books")
    .then((response) => {
      expect(response.status).toBe(200);
      expect(Array.isArray(response.data)).toBe(true);
      done();
    })
    .catch((error) => {
      done(error);
    });
});
test("Houses endpoint should return data", async () => {
  const response = await axios.get(
    "https://anapioficeandfire.com/api/houses/1"
  );
  expect(response.status).toBe(200);
});
test("Characters endpoint should return data", async () => {
  const response = await axios.get(
    "https://anapioficeandfire.com/api/characters/1"
  );
  expect(response.status).toBe(200);
});
test("Books endpoint should return data", async () => {
  const response = await axios.get("https://anapioficeandfire.com/api/books/1");
  expect(response.status).toBe(200);
});
