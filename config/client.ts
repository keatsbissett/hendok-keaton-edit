export const clientConfig = {
  name: 'Hendok Group',
  shortName: 'Hendok',
  domain: 'hendok.nucleusai.co.za',
  poweredBy: 'Nucleus AI',
  brand: {
    primaryColor: '#C0392B',
    darkMode: true,
  },
  frameworks: [
    'price-alert',
    'sage-export',
    'screenshot',
    'logistics',
    'stock-take',
  ] as const,
  auth: {
    provider: 'microsoft' as const,
  },
  context: {
    company: 'Hendok Group',
    industry: 'Wire and steel manufacturing',
    location: 'Durban, South Africa',
    units: 'tonnes',
    currency: 'ZAR',
    products: [
      'field fence', 'agricultural wire', 'high-carbon wire',
      'galvanised wire', 'nails', 'roofing', 'wire mesh',
      'cap tie', 'barbed wire', 'black mesh',
    ],
    regions: [
      'Inner KZN', 'Outer KZN', 'Gauteng',
      'Cape Town', 'Botswana', 'Zimbabwe', 'Lesotho',
    ],
  },
}
