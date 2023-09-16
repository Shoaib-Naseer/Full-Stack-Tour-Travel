const helper = require("./helper")

describe("Category Routes", () => {
  it("should get all categories", async () => {
    const data = {
      endpoint:'categories'
    }
    const response = await helper.get_request(data);
    expect(response.statusCode).toBe(200);
  });

  it('should create a category', async () => {
    const data = {
      endpoint: 'categories',
      body: {
        name:"test Category"
      },
    };
    const response = await helper.post_request(data);
    expect(response.statusCode).toBe(201); 
    expect(response.body.name).toBe(data.body.name);
  });

  it('should update a category', async () => {
    const categoryId = 1; 
    const data = {
      endpoint: `categories/${categoryId}`,
      params :{
        name:"updated Category"
      }
    };
    const response = await helper.put_request(data);
    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe(data.params.name);
  });

  it("should get a category by ID", async () => {
    const categoryId = 1; 
    const data = {
      endpoint: `categories/${categoryId}`,
    };
    const response = await helper.get_request(data);
    expect(response.statusCode).toBe(200);
    expect(response.body.id).toBe(data.categoryId);
  });

  it("should delete a category", async () => {
    const categoryId = 1; 
    const data = {
      endpoint: `categories/${categoryId}`,
    };
    const response = await helper.delete_request(data);
    expect(response.statusCode).toBe(200);
    expect(response.body.id).toBe(data.categoryId);
  });
});
