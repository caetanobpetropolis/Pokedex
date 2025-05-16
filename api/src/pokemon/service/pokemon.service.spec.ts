import { Test, TestingModule } from '@nestjs/testing';
import { PokemonService } from './pokemon.service';
import { HttpService } from '@nestjs/axios';
import { of } from 'rxjs';

describe('PokemonService', () => {
    let service: PokemonService;
    let httpService: HttpService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PokemonService,
                {
                    provide: HttpService,
                    useValue: {
                        get: jest.fn(),
                    },
                },
            ],
        }).compile();

        service = module.get(PokemonService);
        httpService = module.get(HttpService);
    });

    // Mock the PokemonService to return a mock response
    it('should fetch list of pokemons', async () => {
        const mockResponse = { data: ['bulbasaur'] };
        (httpService.get as jest.Mock).mockReturnValue(of(mockResponse));

        const result = await service.findAll(0, 10);
        expect(result).toEqual(mockResponse.data);
    });

    // Mock the PokemonService to return a mock response
    it('should fetch a pokemon by name', async () => {
        const mockResponse = { data: { name: 'pikachu' } };
        (httpService.get as jest.Mock).mockReturnValue(of(mockResponse));

        const result = await service.findByName('pikachu');
        expect(result).toEqual(mockResponse.data);
    });

    // Mock the PokemonService to return a mock response
    it('should throw error if PokeAPI call in findAll fails', async () => {
        (httpService.get as jest.Mock).mockImplementation(() => {
            throw new Error('API failed');
        });

        await expect(service.findAll(0, 10)).rejects.toThrow('POKEAPI_FETCH_FAILED');
    });

    // Mock the PokemonService to return a mock response
    it('should throw error if PokeAPI call in findByName fails', async () => {
        (httpService.get as jest.Mock).mockImplementation(() => {
            throw new Error('Not found');
        });

        await expect(service.findByName('invalid')).rejects.toThrow('POKEMON_NOT_FOUND');
    });
});
