const helper = require("./helper")

describe("Interests Routes", () => {
  it("should get all interests", async () => {
    const data = {
      endpoint:'interests'
    }
    const response = await helper.get_request(data);
    expect(response.statusCode).toBe(200);
  });

  it('should create a interest', async () => {
    const data = {
      endpoint: 'interests',
      body: {
        name:"test interests"
      },
    };
    const response = await helper.post_request(data);
    expect(response.statusCode).toBe(201); 
    expect(response.body.name).toBe(data.body.name);
  });

  it('should update a interest', async () => {
    const interestId = 1; 
    const data = {
      endpoint: `interests/${interestId}`,
      body :{
        name:"updated interests"
      }
    };
    const response = await helper.put_request(data);
    expect(response.statusCode).toBe(200);
    expect(response.body.interest_id).toBe(interestId);
    expect(response.body.name).toBe(data.params.name);
  });

  it("should get a interest by ID", async () => {
    const interestId = 1; 
    const data = {
      endpoint: `interests/${interestId}`,
    };
    const response = await helper.get_request(data);
    expect(response.statusCode).toBe(200);
    expect(response.body.interest_id).toBe(interestId);
  });

  it("should delete a interest", async () => {
    const interestId = 1; 
    const data = {
      endpoint: `interests/${interestId}`,
    };
    const response = await helper.delete_request(data);
    expect(response.statusCode).toBe(200);
    expect(response.body.interest_id).toBe(interestId);
  });
});
