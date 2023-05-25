import request from 'supertest';
import app from '../src/main'; // Assuming the Express app is exported from 'app.ts'

describe('GET /:address', () => {
  it('should return saved data if it exists', async () => {
    // Mock the dependencies or setup necessary test data
    const existingData = {
      _id: 'existingAddress',
      someProperty: 'someValue',
    };
    const UnwappedModel = {
      findById: jest.fn().mockResolvedValue(existingData),
    };

    // Make the request to the Express app
    const response = await request(app).get('/existingAddress');

    // Check the response
    expect(response.status).toBe(200);
    expect(response.body).toEqual(existingData);
  });

  it('should return new data if it does not exist', async () => {
    // Mock the dependencies or setup necessary test data
    const newUnwrappedData = {
      someProperty: 'newValue',
    };
    const metaScore = jest.fn().mockResolvedValue([newUnwrappedData, null]);
    const UnwappedModel = {
      findById: jest.fn().mockResolvedValue(null),
      save: jest.fn().mockResolvedValue(undefined),
    };

    // Make the request to the Express app
    const response = await request(app).get('/newAddress');

    // Check the response
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      _id: 'newAddress',
      ...newUnwrappedData,
    });

    // Check that the new data was saved
    expect(UnwappedModel.save).toHaveBeenCalledWith({
      _id: 'newAddress',
      ...newUnwrappedData,
    });
  });

  it('should handle invalid address', async () => {
    // Mock the dependencies or setup necessary test data
    const invalidAddress = 'invalidAddress';
    const addressJoi = {
      validate: jest.fn().mockReturnValue({ error: true }),
    };

    // Make the request to the Express app
    const response = await request(app).get(`/${invalidAddress}`);

    // Check the response
    expect(response.status).toBe(400);
    expect(response.text).toBe('Please enter a valid ethereum address');
  });

  it('should handle error during unwrapping', async () => {
    // Mock the dependencies or setup necessary test data
    const error = new Error('Unwrapping error');
    const metaScore = jest.fn().mockResolvedValue([null, error]);
    const UnwappedModel = {
      findById: jest.fn().mockResolvedValue(null),
    };

    // Make the request to the Express app
    const response = await request(app).get('/someAddress');

    // Check the response
    expect(response.status).toBe(500);
    expect(response.text).toBe('An unknown error occurred. Please try again later.');
  });
});
