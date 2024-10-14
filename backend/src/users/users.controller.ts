import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags("users")
export class UsersController{
    constructor(){}
    @Get()
    getMany(){
        return "Hello"
    }
    
}