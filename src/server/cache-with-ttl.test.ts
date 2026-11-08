import { expect, test, vi } from "vitest";
import { cacheWithTtl } from "./cache-with-ttl";

const TTL = 1000;

const setup = () => {
  let time = 0;
  const load = vi.fn<[], Promise<number>>();
  const get = cacheWithTtl(load, TTL, () => time);
  return {
    load,
    get,
    advance: (ms: number) => {
      time += ms;
    },
  };
};

test("serves the cached value until the TTL expires", async () => {
  const { load, get, advance } = setup();
  load.mockResolvedValueOnce(1).mockResolvedValueOnce(2);

  expect(await get()).toBe(1);
  advance(TTL - 1);
  expect(await get()).toBe(1);
  advance(1);
  expect(await get()).toBe(2);
  expect(load).toHaveBeenCalledTimes(2);
});

test("shares one load between concurrent misses", async () => {
  const { load, get } = setup();
  load.mockResolvedValue(1);

  expect(await Promise.all([get(), get(), get()])).toEqual([1, 1, 1]);
  expect(load).toHaveBeenCalledTimes(1);
});

test("falls back to the last good value when a refresh fails", async () => {
  const { load, get, advance } = setup();
  load.mockResolvedValueOnce(1).mockRejectedValueOnce(new Error("db down"));

  expect(await get()).toBe(1);
  advance(TTL);
  expect(await get()).toBe(1);
});

test("propagates the error when nothing was ever loaded", async () => {
  const { load, get } = setup();
  load.mockRejectedValueOnce(new Error("db down")).mockResolvedValueOnce(1);

  await expect(get()).rejects.toThrow("db down");
  expect(await get()).toBe(1);
});
