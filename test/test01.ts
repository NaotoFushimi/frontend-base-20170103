import {test} from 'ava';
import {Hoge} from "../src/ts/Modules0";

test.serial('Async/Await!', async (t) => {
    const res0 = Hoge.say() == "hello";
    t.true(res0 , "OK");

    const res = 1 + 2 == 3;
    t.true(res, "success");
});
