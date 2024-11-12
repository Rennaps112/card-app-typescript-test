import { server } from "../src/server"
import Prisma from "../src/db";


beforeAll(async () => {
  await Prisma.$connect();
});

//removing all test data in db
afterEach(async () => {
  await Prisma.entry.deleteMany({
    where: { title: {
      contains: "Test Valid Entry",
    },
  },});
});


afterAll(async () => {
  await Prisma.$disconnect();
});


describe("server test", () => {
  it("should assert 1 + 1 is 2", () => {
    expect(1 + 1).toEqual(2);
  });

  it("POST should create a new entry", async () => {
    const data = {
      title: "Test Valid Entry",
      description: "This is a valid test entry",
      created_at: new Date().toISOString().split("T")[0],
      deadline: new Date().toISOString().split("T")[0],
    };

    const response = await server.inject({
      method: "POST",
      url: "/create/",
      payload: data,
    });

    //verify correct post
    expect(response.statusCode).toBe(200);
    const newEntry = JSON.parse(response.body);
    expect(newEntry.title).toBe(data.title);
    expect(newEntry.description).toBe(data.description);

    //verify it was added to the database
    const entryFromDb = await Prisma.entry.findUnique({
      where: { id: newEntry.id }, 
    });
    expect(entryFromDb).not.toBeNull();
    expect(entryFromDb?.title).toBe(data.title);
    expect(entryFromDb?.description).toBe(data.description);
  });


  it("GET should retrieve the created entry", async () => {
    
    const testEntry = await Prisma.entry.create({
      data: {
        title: "Test Valid Entry - Retrieve Entry",
        description: "Testing GET",
        created_at: new Date(),
        deadline: new Date(),
      },
    });

    const response = await server.inject({
      method: "GET",
      url: `/get/${testEntry.id}`,
    });
    expect(response.statusCode).toBe(200);

    const retrievedEntry = JSON.parse(response.body);
    expect(retrievedEntry.title).toBe(testEntry.title);
    expect(retrievedEntry.description).toBe(testEntry.description);
  })

  it("GET should send 404 for non-existing entry", async () => {
    
    const response = await server.inject({
      method: "GET",
      url: "/get/no-id",
    });

    expect(response.statusCode).toBe(500);

    const responseBody = JSON.parse(response.body);
      expect(responseBody.msg).toBe(`Error finding entry with id no-id`);
  })

  it("DELETE should delete entry", async () => {
    
    const testEntry = await Prisma.entry.create({
      data: {
        title: "Test Valid Entry - Delete Entry",
        description: "Testing DELETE",
        created_at: new Date(),
        deadline: new Date(),
      },
    });

    const response = await server.inject({
      method: "DELETE",
      url: `/delete/${testEntry.id}`,
    });

    expect(response.statusCode).toBe(200);

    const deletedEntry = await Prisma.entry.findUnique({
      where: { id: testEntry.id },
    });
    expect(deletedEntry).toBeNull();
  })

  it("PUT should edit an existing entry", async () => {
    
    const testEntry = await Prisma.entry.create({
      data: {
        title: "Test Valid Entry - Edit Entry",
        description: "Testing PUT",
        created_at: new Date(),
        deadline: new Date(),
      },
    });

    const newData = {
    title: "Test Valid Entry - Updated Entry Title",
    description: "Updated description",
    deadline: new Date(Date.now() + 1000 * 7 * 24 * 60 * 60),
    };

    const response = await server.inject({
      method: "PUT",
      url: `/update/${testEntry.id}`,
      payload: newData,
    });

    expect(response.statusCode).toBe(200);
    const responseBody = JSON.parse(response.body);
    expect(responseBody.msg).toBe("Updated successfully");

    const updatedEntry = await Prisma.entry.findUnique({
      where: { id: testEntry.id },
    });
    expect(updatedEntry?.title).toBe(newData.title);
    expect(updatedEntry?.description).toBe(newData.description);
  })
});


