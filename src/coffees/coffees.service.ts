  import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCoffeeDto } from './dto/create-coffee.dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto/update-coffee.dto';

@Injectable()
export class CoffeesService {
    constructor(
        @InjectRepository(Coffee)
        private readonly coffeeRepository: Repository<Coffee>,    
    ){}

    async findAll() : Promise<Coffee[]> {
        return this.coffeeRepository.find();
    }

    async findOne(id: string): Promise<Coffee> {
        const coffee = await this.coffeeRepository.findOne({
            where: { id: parseInt(id, 10) } // Ensure ID is a number if applicable
        });
    
        if (!coffee) {
            throw new NotFoundException(`Coffee with ID ${id} not found`);
        }
    
        return coffee;
    }
    async create(createCoffeeDto: CreateCoffeeDto): Promise<Coffee> {
        const coffee = this.coffeeRepository.create(createCoffeeDto);
        return this.coffeeRepository.save(coffee);
    }

    async update(id: string, updateCoffeeDto: UpdateCoffeeDto ): Promise<Coffee> {
        const existingCoffee = await this.coffeeRepository.preload({
            id: +id, // Ensure ID is a number
            ...updateCoffeeDto,
        });
    
        if (!existingCoffee) {
            throw new NotFoundException(`Coffee ${id} not found`);
        }
     
        return this.coffeeRepository.save(existingCoffee);
    }

    async remove(id: string): Promise<void> {
        const result = await this.coffeeRepository.delete(+id);
    
        if (result.affected === 0) {
            throw new NotFoundException(`Coffee ${id} not found`);
        }
    } 

}