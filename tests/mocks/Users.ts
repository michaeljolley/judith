import { User } from "../../src/common";

export function user():User {
  return new User(
    'testUser',
    'http://image.png',
    '12345678',
    'TestUser')
}