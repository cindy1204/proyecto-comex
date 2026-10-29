import type { ContactRepository, ContactRequestInput } from '../domain/contact.js';

export class ContactService {
  constructor(private readonly contacts: ContactRepository) {}

  create(input: ContactRequestInput) {
    return this.contacts.create(input);
  }
}
