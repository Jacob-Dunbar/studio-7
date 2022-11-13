import createSchema from "part:@sanity/base/schema-creator";
import schemaTypes from "all:part:@sanity/base/schema-type";

import s7class from "./s7class";
import banner from "./banner";
import session from "./session";
import trainer from "./trainer";

export default createSchema({
  name: "default",

  types: schemaTypes.concat([s7class, banner, session, trainer]),
});
