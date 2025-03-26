import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { IS_PUBLIC_KEY } from 'src/common/decorators/public.decorator';
import appConfig from 'src/config/app.config';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(  
    @Inject(appConfig.KEY) // 👈 Inject entire appConfig object
    private readonly appConfiguration: ConfigType<typeof appConfig>,
 
    private readonly reflector: Reflector,
  ) {}

  canActivate(context: ExecutionContext): boolean {

    const isPublic = this.reflector.get(IS_PUBLIC_KEY, context.getHandler());

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.header('Authorization');

    return authHeader === this.appConfiguration.apiKey; // 👈 Access API key from injected config
  }
}
