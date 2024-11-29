  export default class Item {
    constructor(
      public id: string,
      public thumbnail: string,
      public images: string,
      public name: string,
      public brand: string,
      public price: number,
      public stock: number,
      public discount: number,
      public description: string,
      public colors: string[],
      public sizes: string[]
    ) {}

    static fromApiResponse(data: any) {
      return new Item(
        data._id,
        data.thumbnail || data.images[0],
        data.images,
        data.name,
        data.brand,
        data.price,
        data.stock,
        data.discount,
        data.description,
        data.colors,
        data.sizes
      );
    }
  }
