import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { Coffee } from './entities/coffee.entity';
import { CreateCoffeeDto } from './dto/create-coffee.dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto/update-coffee.dto';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto/pagination-query.dto';

@Controller('coffees')
export class  CoffeesController {
    constructor(private readonly coffeesService: CoffeesService) {}
 
    @Get()
    async findAll(@Query() paginationQuery: PaginationQueryDto) : Promise<Coffee[]> {
        //const {limit, offset} = paginationQuery;
        return await this.coffeesService.findAll(paginationQuery);
    }
 
    @Get(':id')
    findOne(@Param('id') id: number ) {
        console.log(typeof id);
        return this.coffeesService.findOne('' + id);
    }
 
    @Post()
    create(@Body() createCoffeeDto : CreateCoffeeDto){
        console.log(createCoffeeDto instanceof CreateCoffeeDto )
        return this.coffeesService.create(createCoffeeDto);
    } 

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateCoffeeDto : UpdateCoffeeDto) {
       return this.coffeesService.update(id, updateCoffeeDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) { 
       return this.coffeesService.remove(id);
    }
}
 