import { Body, Controller, Delete, Get, Param, Patch, Post, Query, SetMetadata } from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { Coffee } from './entities/coffee.entity';
import { CreateCoffeeDto } from './dto/create-coffee.dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto/update-coffee.dto';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto/pagination-query.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { resolve } from 'path';

@Controller('coffees')
export class  CoffeesController {
    constructor(private readonly coffeesService: CoffeesService) {}
 
    @Public()
    @Get()
    async findAll(@Query() paginationQuery: PaginationQueryDto): Promise<Coffee[]> {
        await new Promise(resolve => setTimeout(resolve, 5000));
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
 