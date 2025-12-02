import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto /create-user.dto';
import { JwtAuthGuard } from '../common/guard/jwt-auth.guard';
import { RolesGuard } from '../common/guard/roles.guard';
import { PermissionsGuard } from 'src/common/guard/permissions.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Permissions } from 'src/common/decorators/permissions.decorator';

@Controller('user')
@UseGuards(JwtAuthGuard) // protección global del controlador
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Roles('admin')
  @Permissions('user.create')
  @UseGuards(RolesGuard, PermissionsGuard)
  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }

  @Roles('admin')
  @Permissions('user.read.one')
  @UseGuards(RolesGuard, PermissionsGuard)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.userService.findOne(id);
  }

  @Roles('admin')
  @Permissions('user.read.all')
  @UseGuards(RolesGuard, PermissionsGuard)
  @Get()
  findAll() {
    return this.userService.findAll();
  }
}
