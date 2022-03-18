import { Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import bcrypt from "bcryptjs";

const items: Prisma.ItemCreateInput[] = [
  {
    title: "bag",
    image: "img.jpg",
    price: 1.9,
  },
  {
    title: "chair",
    image: "img.jpg",
    price: 2.4,
  },
  {
    title: "flower",
    image: "img.jpg",
    price: 5.0,
  },
];

const users: Prisma.UserCreateInput[] = [
  {
    name: "loli",
    email: "loli@mail",
    password: bcrypt.hashSync("loli"),
    orders: {
      create: [
        { item: { connect: { title: "flower" } }, quantity: 2 },
        { item: { connect: { title: "bag" } }, quantity: 1 },
      ],
    },
  },

  {
    name: "luli",
    email: "luli@mail",
    password: bcrypt.hashSync("luli"),
    orders: {
      create: [{ item: { connect: { title: "bag" } }, quantity: 2 }],
    },
  },

  {
    name: "leli",
    email: "leli@mail",
    password: bcrypt.hashSync("leli"),
    orders: {
      create: [
        { item: { connect: { title: "flower" } }, quantity: 2 },
        { item: { connect: { title: "bag" } }, quantity: 2 },
        { item: { connect: { title: "chair" } }, quantity: 2 },
      ],
    },
  },

  {
    name: "lili",
    email: "lili@mail",
    password: bcrypt.hashSync("lili"),
    orders: {},
  },
];

async function createStuff() {
  for (const item of items) {
    await prisma.item.create({ data: item });
  }
  for (const user of users) {
    await prisma.user.create({ data: user });
  }
}
createStuff();
