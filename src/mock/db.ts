import { factory } from "@mswjs/data";

import { StudentModel } from "./models/StudentModel";

export const db = factory({
  student: StudentModel,
});
