import { ProductProjection } from '@commercetools/platform-sdk';
import { CryptoMock } from '../../UI/tests/mockElements';
import ItemCard from './ItemCard';

const cryptoMock: CryptoMock = {
  randomUUID: jest.fn(),
};

describe('ItemCard component renders correct html element', () => {
  crypto.randomUUID = cryptoMock.randomUUID;

  const itemObject: ProductProjection = {
    id: 'db30bf01-7b1b-4109-995a-2068e0e1774c',
    version: 156,
    productType: {
      typeId: 'product-type',
      id: '0ce37203-6a9f-41b0-932c-8cd04ea81efc',
    },
    name: {
      'en-US': 'Jordan 1 Retro High OG SP',
    },
    description: {
      'en-US':
        "The Air Jordan 1 High OG SP Fragment Design x Travis Scott fragment draws inspiration from a Jordan 1 Royal press sample from 1985 with its white and blue tumbled leather upper. Similar to previous Travis Scott Jordan 1s, signature reverse Swooshes and hidden stash pockets in the collar add on to the classic design. From there, both Travis Scott's Cactus Jack and Fragment logos are debossed in black on the heel wrap.",
    },
    categories: [
      {
        typeId: 'category',
        id: '9e203bae-801d-44b8-8669-6594765cf2fd',
      },
      {
        typeId: 'category',
        id: '9bdfdf4f-e9e6-4d48-b96e-d551d7991b9e',
      },
    ],
    categoryOrderHints: {},
    slug: {
      'en-US': 'jordan-1-retro-high-og-sp',
    },
    metaTitle: {
      'en-US': 'Jordan 1 Retro High OG SP',
    },
    metaDescription: {
      'en-US': 'Fragment x Travis Scott',
    },
    masterVariant: {
      id: 1,
      sku: 'DH3227-105',
      prices: [
        {
          id: '6ab97f76-db5f-47e2-8cd3-b4b3d42291b7',
          value: {
            type: 'centPrecision',
            currencyCode: 'USD',
            centAmount: 199000,
            fractionDigits: 2,
          },
        },
      ],
      images: [
        {
          url: 'https://915bbb7153394a5ab127-621d79cbe72df8da4a99521c850db286.ssl.cf3.rackcdn.com/air-jordan-1-retro-h-ikeFxZaR.png',
          dimensions: {
            w: 700,
            h: 420,
          },
        },
        {
          url: 'https://915bbb7153394a5ab127-621d79cbe72df8da4a99521c850db286.ssl.cf3.rackcdn.com/air-jordan-1-retro-h-J3nbL3Zr.png',
          dimensions: {
            w: 700,
            h: 420,
          },
        },
        {
          url: 'https://915bbb7153394a5ab127-621d79cbe72df8da4a99521c850db286.ssl.cf3.rackcdn.com/air-jordan-1-retro-h-HfzOf4rh.png',
          dimensions: {
            w: 700,
            h: 420,
          },
        },
        {
          url: 'https://915bbb7153394a5ab127-621d79cbe72df8da4a99521c850db286.ssl.cf3.rackcdn.com/air-jordan-1-retro-h-AvGFl6_f.png',
          dimensions: {
            w: 700,
            h: 420,
          },
        },
        {
          url: 'https://915bbb7153394a5ab127-621d79cbe72df8da4a99521c850db286.ssl.cf3.rackcdn.com/Wethenew-Sneakers-Fr-L_hXaGDR.png',
          dimensions: {
            w: 600,
            h: 600,
          },
        },
        {
          url: 'https://915bbb7153394a5ab127-621d79cbe72df8da4a99521c850db286.ssl.cf3.rackcdn.com/Wethenew-Sneakers-Fr-1FEYRccX.png',
          dimensions: {
            w: 600,
            h: 600,
          },
        },
        {
          url: 'https://915bbb7153394a5ab127-621d79cbe72df8da4a99521c850db286.ssl.cf3.rackcdn.com/Wethenew-Sneakers-Fr-lfRmIK-j.png',
          dimensions: {
            w: 600,
            h: 600,
          },
        },
      ],
      attributes: [
        {
          name: 'size',
          value: {
            key: '20',
            label: 'no size',
          },
        },
        {
          name: 'color',
          value: 'Multicolor',
        },
      ],
      assets: [],
    },
    variants: [
      {
        id: 14,
        prices: [],
        images: [],
        attributes: [
          {
            name: 'size',
            value: {
              key: '8',
              label: 'US 7.5',
            },
          },
          {
            name: 'color',
            value: 'Multicolor',
          },
        ],
        assets: [],
      },
      {
        id: 15,
        prices: [],
        images: [],
        attributes: [
          {
            name: 'size',
            value: {
              key: '9',
              label: 'US 8',
            },
          },
          {
            name: 'color',
            value: 'Multicolor',
          },
        ],
        assets: [],
      },
      {
        id: 16,
        prices: [],
        images: [],
        attributes: [
          {
            name: 'size',
            value: {
              key: '10',
              label: 'US 8.5',
            },
          },
          {
            name: 'color',
            value: 'Multicolor',
          },
        ],
        assets: [],
      },
      {
        id: 17,
        prices: [],
        images: [],
        attributes: [
          {
            name: 'size',
            value: {
              key: '11',
              label: 'US 9',
            },
          },
          {
            name: 'color',
            value: 'Multicolor',
          },
        ],
        assets: [],
      },
      {
        id: 18,
        prices: [],
        images: [],
        attributes: [
          {
            name: 'size',
            value: {
              key: '12',
              label: 'US 9.5',
            },
          },
          {
            name: 'color',
            value: 'Multicolor',
          },
        ],
        assets: [],
      },
      {
        id: 19,
        prices: [],
        images: [],
        attributes: [
          {
            name: 'size',
            value: {
              key: '13',
              label: 'US 10',
            },
          },
          {
            name: 'color',
            value: 'Multicolor',
          },
        ],
        assets: [],
      },
      {
        id: 20,
        prices: [],
        images: [],
        attributes: [
          {
            name: 'color',
            value: 'Multicolor',
          },
          {
            name: 'size',
            value: {
              key: '14',
              label: 'US 10.5',
            },
          },
        ],
        assets: [],
      },
      {
        id: 21,
        prices: [],
        images: [],
        attributes: [
          {
            name: 'color',
            value: 'Multicolor',
          },
          {
            name: 'size',
            value: {
              key: '15',
              label: 'US 11',
            },
          },
        ],
        assets: [],
      },
      {
        id: 22,
        prices: [],
        images: [],
        attributes: [
          {
            name: 'color',
            value: 'Multicolor',
          },
          {
            name: 'size',
            value: {
              key: '16',
              label: 'US 11.5',
            },
          },
        ],
        assets: [],
      },
      {
        id: 23,
        prices: [],
        images: [],
        attributes: [
          {
            name: 'color',
            value: 'Multicolor',
          },
          {
            name: 'size',
            value: {
              key: '17',
              label: 'US 12',
            },
          },
        ],
        assets: [],
      },
      {
        id: 24,
        prices: [],
        images: [],
        attributes: [
          {
            name: 'color',
            value: 'Multicolor',
          },
          {
            name: 'size',
            value: {
              key: '18',
              label: 'US 12.5',
            },
          },
        ],
        assets: [],
      },
      {
        id: 25,
        prices: [],
        images: [],
        attributes: [
          {
            name: 'color',
            value: 'Multicolor',
          },
          {
            name: 'size',
            value: {
              key: '19',
              label: 'US 13',
            },
          },
        ],
        assets: [],
      },
    ],
    searchKeywords: {},
    hasStagedChanges: false,
    published: true,
    key: '1',
    taxCategory: {
      typeId: 'tax-category',
      id: 'fb2d4dd1-3a8e-45fd-a575-f440f041fa84',
    },
    priceMode: 'Embedded',
    createdAt: '2023-08-29T22:25:09.635Z',
    lastModifiedAt: '2023-09-05T16:00:09.330Z',
  };

  const itemCard = new ItemCard(false).render(itemObject);

  it('should return DIV as a container element', () => {
    expect(itemCard.tagName).toBe('DIV');
  });

  it('should render item image', () => {
    const item = itemCard.querySelector('.item-card__image');
    expect(item?.tagName).toBe('IMG');
  });

  it('should render price container with proper text content', () => {
    const item = itemCard.querySelector('.item-card__price-current');
    expect(item?.textContent).toBe('1990 USD');
  });
});
