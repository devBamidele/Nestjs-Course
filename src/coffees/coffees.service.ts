  import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';

@Injectable()
export class  CoffeesService {
    private coffees: Coffee[] = [
        {
            id: 1,
            name: 'Espresso',
            brand: 'Starbucks',
            flavours: ['strong', 'bitter']
        },
        {
            id: 2,
            name: 'Latte',
            brand: 'Costa Coffee',
            flavours: ['creamy', 'smooth']
        },
        {
            id: 3,
            name: 'Cappuccino ',
            brand: 'Lavazza',
            flavours: ['frothy', 'rich']
        },
        {
            id: 4,
            name: 'Mocha',
            brand: 'Nescafe',
            flavours: ['chocolate', 'sweet']
        },
        {
            id: 5,
            name: 'Americano',
            brand: 'Dunkin’ Donuts',
            flavours: ['bold', 'smooth']
        }
    ];

    findAll() : Coffee[] {
        return this.coffees;
    }

    findOne(id: string) {
        const coffee = this.coffees.find(item => item.id === +id);

        if(!coffee){
            throw new NotFoundException(`Coffee ${id} not found`);
        }

        return coffee; 
    }

    create(createCoffeeDto: any) {
        this.coffees.push(createCoffeeDto);
        return createCoffeeDto;
    }

     update(id: string, updateCoffeeDto: any){
        const existingCoffee = this.findOne(id);
        if(existingCoffee){}
    }

    remove(id: string) {
        const coffeeIndex = this.coffees.findIndex(item => item.id === +id);
    
        if (coffeeIndex !== -1) {
            this.coffees.splice(coffeeIndex, 1); // Remove the coffee at the found index
        }
    }

}