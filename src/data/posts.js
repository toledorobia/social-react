import faker from "faker";

const post = [];
const types = ["empty", "text", "image", "video"];
const videos = [
  "0F0CAEoF4XM",
  "GuJQSAiODqI",
  "izGwDsrQ1eQ",
  "UqyT8IEBkvY",
  "OPf0YbXqDm0",
];

for (let i = 0; i < 30; i++) {
  const id = faker.datatype.uuid();
  const type = faker.random.arrayElement(types);

  const totalComments = faker.datatype.number(5);
  const totalLikes = faker.datatype.number(20);

  const comments = [];
  for (let i = 0; i < totalComments; i++) {
    const commentLikes = [];
    for (let j = 0; j < faker.datatype.number(5); j++) {
      commentLikes.push({
        id: faker.datatype.uuid(),
        user: {
          id: faker.datatype.uuid(),
          name: faker.name.findName(),
        },
        createdAt: faker.date.recent(),
      });
    }

    const commentUserUid = faker.datatype.uuid();
    comments.push({
      id: faker.datatype.uuid(),
      user: {
        id: commentUserUid,
        name: faker.name.findName(),
        avatar: "https://i.pravatar.cc/150?u=" + commentUserUid,
      },
      content: faker.datatype.boolean()
        ? faker.lorem.sentences()
        : faker.lorem.sentence(),
      createdAt: faker.date.recent(),
      likes: commentLikes,
    });
  }

  const likes = [];
  for (let j = 0; j < totalLikes; j++) {
    likes.push({
      id: faker.datatype.uuid(),
      user: {
        id: faker.datatype.uuid(),
        name: faker.name.findName(),
      },
      createdAt: faker.date.recent(),
    });
  }

  post.push({
    id: id,
    user: {
      id: faker.datatype.uuid(),
      name: faker.name.findName(),
      avatar: "https://i.pravatar.cc/150?u=" + id,
    },
    createdAt: faker.date.recent(),
    content: faker.datatype.boolean()
      ? faker.lorem.sentences()
      : faker.lorem.sentence(),
    image: type === "image" ? faker.image.image() : null,
    video: type === "video" ? faker.random.arrayElement(videos) : null,
    likes: likes,
    comments: comments,
  });
}

export default post;
