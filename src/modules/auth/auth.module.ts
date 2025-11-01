import { Module } from '@nestjs/common';
import { UserMongoModule } from 'src/shared';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthFactoryService } from './factory';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { OAuth2Client } from 'google-auth-library';

@Module({
  imports:[ UserMongoModule ],
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthFactoryService,
    JwtService,
    ConfigService,
    {
      provide: OAuth2Client,
      useFactory: (configService: ConfigService) => {
        return new OAuth2Client(configService.get('GOOGLE_CLIENT_ID'));
      },
      inject: [ConfigService],
    },
  ],
})
export class AuthModule {}
