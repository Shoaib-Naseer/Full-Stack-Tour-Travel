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
        name:"test Category 90 9 "
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
      body :{
        name:"updated Category"
      }
    };
    const response = await helper.put_request(data);
    expect(response.statusCode).toBe(200);
    expect(response.body.category_id).toBe(categoryId);
    expect(response.body.name).toBe(data.params.name);
  });

  it("should get a category by ID", async () => {
    const categoryId = 1; 
    const data = {
      endpoint: `categories/${categoryId}`,
    };
    const response = await helper.get_request(data);
    expect(response.statusCode).toBe(200);
    expect(response.body.category_id).toBe(categoryId);
  });

  it("should delete a category", async () => {
    const categoryId = 1; 
    const data = {
      endpoint: `categories/${categoryId}`,
    };
    const response = await helper.delete_request(data);
    expect(response.statusCode).toBe(200);
    expect(response.body.category_id).toBe(categoryId);
  });
});
