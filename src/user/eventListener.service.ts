import { OnEvent } from '@nestjs/event-emitter';
import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';

@Injectable()
export class EventListenerService {
  constructor(private readonly userRepository: UserRepository) {}

  @OnEvent('user.getById')
  async handleUserGetById(userId: string) {
    return this.userRepository.findOne(userId);
  }

  @OnEvent('user.getByEmail')
  async handleUserGetByEmail(email: string) {
    return this.userRepository.findByEmail(email);
  }
}
