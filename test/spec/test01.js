import test from 'ava';
import {Hoge} from "../modules/Modules0"

test.serial('Async/Await!', async (t) => {
    const res0 = Hoge.say() == "hello";
    t.true(res0 , "OK");

    console.log("hoge");
    const res = 1 + 2 == 3;
    t.true(res, "success");
    console.log("fuga");
});

