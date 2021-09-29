import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { NotFoundException } from '@nestjs/common';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('should return an array', () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('create', () => {
    it('should create a movie', () => {
      const beforeCreate = service.getAll().length;
      service.create({
        title: 'TestMovie',
        year: 2020,
        genres: ['test'],
      });
      const afterCreate = service.getAll().length;
      console.log(beforeCreate, afterCreate);
      expect(afterCreate).toBeGreaterThan(beforeCreate);
    });
  });

  describe('getOne', () => {
    it('should return a movie', () => {
      service.create({
        title: 'TestMovie',
        year: 2020,
        genres: ['test'],
      });
      const result = service.getOne(1);
      expect(result).toBeDefined();
      expect(result.id).toEqual(1);
    });

    it('should throw a NotFoundException', () => {
      try {
        service.getOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual(`Movie with ID 999 not found.`);
      }
    });
  });

  describe('deleteOne', () => {
    it('deletes a movie', () => {
      service.create({
        title: 'TestMovie',
        year: 2020,
        genres: ['test'],
      });
      const allMovies = service.getAll().length;
      service.deleteOne(1);
      const afterDelete = service.getAll().length;
      expect(afterDelete).toBeLessThan(allMovies);
    });
    it('should throw a NotFoundException', () => {
      expect(() => service.deleteOne(999)).toThrowError(
        `Movie with ID 999 not found.`,
      );
    });
  });

  describe('update', () => {
    it('should update a movie', () => {
      service.create({
        title: 'TestMovie',
        year: 2020,
        genres: ['test'],
      });
      service.update(1, {
        title: 'Updated Title',
      });
      const movie = service.getOne(1);
      expect(movie.title).toEqual('Updated Title');
    });
    it('should throw a NotFoundException', () => {
      expect(() =>
        service.update(999, {
          title: 'Updated Title',
        }),
      ).toThrowError(new NotFoundException(`Movie with ID 999 not found.`));
    });
  });
});
