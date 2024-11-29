export default class Brand {
  constructor(
    public name: string,
    public productCount: string
  ) {}

  // Method to create a Brand instance from API response data
  static fromApiResponse(data: any) {
    return new Brand(data.name, data.productCount);
  }
}
