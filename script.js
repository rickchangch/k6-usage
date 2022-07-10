import http from 'k6/http';
import { check, group } from 'k6';
import { Counter, Rate } from "k6/metrics";

const TEST_COUNTER = new Counter("test_counter");
const PASSED_RATE = new Rate("passed_rate");

const HOST = "http://your-target-host";

/**
 * @argu --vus|-u         How many virtual users will be activated
 * @argu --duration|-d    How long does this testing keep executing
 * @argu --interations|-i How many times the requests will be sent
 * @example k6 run --vus 2 --iterations 2 script.js
 * @example k6 run -u 2 -d 10s script.js
 */
export default function () {

  // Test GET
  group("GET", () => {
    const endpoint = '/v1/users';
    const params = {
      headers: {
        'Content-Type': 'application/json',
        'authorization': "Bearer {TOKEN}"
      },
    };

    let res = http.get(HOST + endpoint, params);
    let passed = check(res, {
      'OK': (r) => r.status === 200,
    });

    TEST_COUNTER.add(1);
    PASSED_RATE.add(passed);
  });

  // Test login
  group("Login", () => {
    const endpoint = '/v1/auth/login';
    const params = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const payload = JSON.stringify({
      email: '{EMAIL}',
      password: '{PWD}',
    });

    let res = http.post(HOST + endpoint, payload, params);
    let passed = check(res, {
      'OK': (r) => r.status === 200,
    });

    TEST_COUNTER.add(1);
    PASSED_RATE.add(passed);
  });
}
