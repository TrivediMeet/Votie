import { Prisma } from "@prisma/client";
import { PrismaClient } from "@prisma/client/extension";

const prisma = new PrismaClient({
    log:["error","query"],
    errorFormate:"pretty",
});