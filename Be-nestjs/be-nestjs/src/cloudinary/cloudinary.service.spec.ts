import { Test, TestingModule } from '@nestjs/testing';
import { CloudinaryThumbNailService } from './cloudinary.service';

describe('CloudinaryService', () => {
  let service: CloudinaryThumbNailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CloudinaryThumbNailService],
    }).compile();

    service = module.get<CloudinaryThumbNailService>(
      CloudinaryThumbNailService,
    );
  });

  it('CloudinaryThumbNailService should be defined', () => {
    expect(service).toBeDefined();
  });
});
