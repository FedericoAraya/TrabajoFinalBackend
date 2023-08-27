import chai from 'chai';
import supertest from 'supertest';


const expect = chai.expect;
const requester = supertest('http://localhost:8080');

describe('Testing Product Router', () => {
  let authUserTest;
  let newProdId

  before(async () => {
    authUserTest = await requester
      .post(`/api/session/login`)
      .send({ email: 'Premium@gmail.com', password: 'premiumrep' });
  })

  it('New Product', async () => {
    const newProduct = {
      title: 'New Product',
      description: 'New Product Description',
      code: 'XXX1',
      price: 1,
      status: true,
      stock: 1,
      category: 'Test',
      thumbnails: 'none',
      owner: 'admin'
    };

    const response = await requester
      .post('/api/products')
      .set('Cookie', authUserTest.headers['set-cookie'])
      .send(newProduct);

    expect(response.status).to.equal(201);
    expect(response.body).to.have.property('_id');
    createdProductID = response.body._id;
  });

  it('Get All Products', async () => {
    const response = await requester.get('/api/products');
    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('object');
  });
  
  it('Debe obtener un producto por ID', async () => {
    const response = await requester.get(`/api/products/${newProdId}`);
    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('_id', newProdId.toString());
  });

  it('Moking Products', async () => {
    const response = await requester.get('/api/products/mockingproducts');
    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('payload').that.is.an('array');
    expect(response.body.payload).to.have.lengthOf(10);
  });

  after(async () => {
    if (createdProductID) {
      await requester
        .delete(`/api/products/${newProdId}`)
        .set('Cookie', authUserTest.headers['set-cookie']);
    }
  });
  
  
});