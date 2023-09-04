import { ProductProjection } from '@commercetools/platform-sdk';
import { CryptoMock } from '../../../UI/tests/mockElements';
import ProductDetails from './ProductDetails';

const cryptoMock: CryptoMock = {
  randomUUID: jest.fn(),
};

const mockProductResponse: ProductProjection = {
  categories: [{ id: '9e203bae-801d-44b8-8669-6594765cf2fd', typeId: 'category' }],
  categoryOrderHints: {},
  createdAt: '2023-08-29T22:25:09.635Z',
  description: {
    'en-US': 'The Air Jordan 1 High OG SP Fragment Design x Trav…ent logos are debossed in black on the heel wrap.',
  },
  hasStagedChanges: false,
  id: 'db30bf01-7b1b-4109-995a-2068e0e1774c',
  key: '1',
  lastModifiedAt: '2023-09-04T13:50:15.571Z',
  masterVariant: {
    id: 1,
    sku: 'DH3227-105',
    prices: [],
    images: [],
    attributes: [],
  },
  metaDescription: { 'en-US': '' },
  metaTitle: { 'en-US': '' },
  name: { 'en-US': 'Jordan 1 Retro High OG SP' },
  priceMode: 'Embedded',
  productType: {
    typeId: 'product-type',
    id: '0ce37203-6a9f-41b0-932c-8cd04ea81efc',
  },
  published: true,
  searchKeywords: {},
  slug: { 'en-US': 'jordan-1-retro-high-og-sp' },
  taxCategory: {
    typeId: 'tax-category',
    id: 'fb2d4dd1-3a8e-45fd-a575-f440f041fa84',
  },
  variants: [],
  version: 90,
};

describe('Product Details Component', () => {
  crypto.randomUUID = cryptoMock.randomUUID;

  const productDetails = new ProductDetails(mockProductResponse);
  const productDetailsEl = productDetails.render();

  it('should initialize without errors', () => {
    expect(() => {
      productDetails.render();
    }).not.toThrow();
  });

  it('should return modal as a container element', () => {
    expect(productDetailsEl.tagName).toBe('DIV');
  });

  it('should contain the following class', () => {
    expect(productDetailsEl.className).toBe('product-card__details-container');
  });

  it('should contain header', () => {
    const heading = productDetailsEl.querySelector('.product-card__header');
    expect(heading).not.toBeNull();
  });

  it('should contain price container', () => {
    const modalContent = productDetailsEl.querySelector('.product-card__price');
    expect(modalContent).not.toBeNull();
  });

  it('should contain price valid container', () => {
    const modalContent = productDetailsEl.querySelector('.product-card__price-valid');
    expect(modalContent).not.toBeNull();
  });

  it('should contain price valid container', () => {
    const modalContent = productDetailsEl.querySelector('.product-card__size-container');
    expect(modalContent).not.toBeNull();
  });

  it('should contain buttons container', () => {
    const modalContent = productDetailsEl.querySelector('.product-card__btn-container');
    expect(modalContent).not.toBeNull();
  });
});
