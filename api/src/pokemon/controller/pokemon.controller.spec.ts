import { Test, TestingModule } from '@nestjs/testing';
import { PokemonController } from './pokemon.controller';
import { PokemonService } from '../service/pokemon.service';
import { NotFoundException, InternalServerErrorException } from '@nestjs/common';

describe('PokemonController', () => {
    let controller: PokemonController;
    let service: PokemonService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [PokemonController],
            providers: [
                {
                    provide: PokemonService,
                    useValue: {
                        findAll: jest.fn(),
                        findByName: jest.fn(),
                    },
                },
            ],
        }).compile();

        controller = module.get(PokemonController);
        service = module.get(PokemonService);
    });

    // Mock the PokemonController to return a mock response
    it('should return list of pokemons', async () => {
        const mockResult = ['bulbasaur', 'pikachu'];
        jest.spyOn(service, 'findAll').mockResolvedValue(mockResult);

        const result = await controller.getPokemons(0, 10);
        expect(result).toEqual(mockResult);
    });

    // Mock the PokemonController to return a mock response
    it('should return a pokemon by name', async () => {
        const mockPokemon = { name: 'pikachu' };
        jest.spyOn(service, 'findByName').mockResolvedValue(mockPokemon);

        const result = await controller.getPokemon('pikachu');
        expect(result).toEqual(mockPokemon);
    });

    // Mock the PokemonController to return a mock response
    it('should throw NotFoundException if pokemon not found', async () => {
        jest.spyOn(service, 'findByName').mockRejectedValue({
            response: { status: 404 },
        });

        await expect(controller.getPokemon('missingno')).rejects.toThrow(NotFoundException);
    });

    // Mock the PokemonController to return a mock response
    it('should throw InternalServerErrorException on other errors', async () => {
        jest.spyOn(service, 'findByName').mockRejectedValue(new Error('fail'));

        await expect(controller.getPokemon('pikachu')).rejects.toThrow(InternalServerErrorException);
    });

    // Mock the PokemonController to return a mock response
    it('should throw InternalServerErrorException when service fails in getPokemons', async () => {
        jest.spyOn(service, 'findAll').mockRejectedValue(new Error('fail'));

        await expect(controller.getPokemons(0, 10)).rejects.toThrow(InternalServerErrorException);
    });
});
